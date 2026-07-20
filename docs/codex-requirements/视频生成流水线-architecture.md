# 视频生成流水线 —— 架构设计 V2

## 项目结构

```
video-pipeline/
├── pipeline.py              ← 主入口 + 编排器
├── parser.py                ← 脚本解析
├── slides.py                ← PPT画面生成
├── audio_processor.py       ← 音频留白处理
├── config.py                ← 配置常量
├── requirements.txt         ← pydub, Pillow
└── README.md
```

## 模块职责

### parser.py —— 脚本解析器

输入：script.txt 路径
输出：Segment 列表 + 期号

```python
@dataclass
class Segment:
    index: int           # 段号，从1开始
    type: str            # "overview" | "segment" | "summary" | "intro"
    title: str           # 如 "第一劫：规则写不完"
    text: str            # 口播正文
```

解析逻辑：
1. 读全文，提取 `第X期：《标题》`
2. 按 `一、综述` `二、分段` `三、总结和下期预告` `四、自我介绍` 切大段
3. `二、分段` 内按 `第X劫：` 切子段
4. 校验段数与 audio/ 下 wav 文件数匹配
5. 遇到未知段类型——警告但不丢弃

### slides.py —— PPT画面生成器

输入：Segment，分辨率(宽, 高)
输出：PNG文件路径

用 Pillow 绘制。横屏(1920,1080) + 竖屏(1080,1920)。

按段类型选模板：
- overview → 大号期标题 + 副标题，居中
- segment → 大字段标题 + 副标题，上三分之一
- summary → "总结" + 下期预告精简文字
- intro → "我是晨汐" + 固定关注文案

配色：背景 #0f172a，主文字白色，强调色 #ec4899，副文字 #94a3b8

### audio_processor.py —— 音频处理器

输入：wav文件路径列表，silence_seconds=2
输出：处理后的wav文件路径列表

用 pydub 在每段末尾拼接静音段。输出到 `audio_processed/` 目录。

### pipeline.py —— 编排器

主入口：

```python
def run(input_dir: str, output_dir: str = None, silence: float = 2.0):
```

**断点续跑**：每步完成后写 `pipeline_state.json`，记录已完成步骤。重跑时跳过已完成步骤。

```json
{"steps": {"parse": "done", "slides_h": "done", "slides_v": "done", "audio": "done", "subtitle": "done", "compose": "pending"}}
```

流程：

```
1. 解析脚本 → Segment列表
2. 校验音频数 → len(segments) == len(audio_files)
3. 生成横屏PPT → slides.generate(seg, HORIZONTAL) ×N
4. 生成竖屏PPT → slides.generate(seg, VERTICAL) ×N
5. 音频留白 → audio_processor.add_silence(wavs, silence)
6. 字幕生成 → subprocess WhisperX（传text做对齐）
7. 横屏合成 → FFmpeg video_compose + concat → horizontal/ep1.mp4
8. 竖屏合成 → FFmpeg video_compose + concat → vertical/ep1.mp4（用竖屏slides重新合成，不裁剪）
```

每步 print 进度 + try/except 包裹。失败报具体段号和错误，可选择跳过或终止。

## OpenMontage 集成

不 import OpenMontage（它不是pip包，有独立venv和Node.js依赖）。通过 subprocess 调用其 CLI 工具。OpenMontage 根目录从环境变量 `OPENMONTAGE_PATH` 读取，默认 `E:/work/word/study/OpenMontage`。

### 字幕生成

用 OpenMontage 自带的 WhisperX 逐段生成SRT字幕。传音频路径 + 参考文本（用 Segment.text 做对齐校准提升准确率）：

```python
import subprocess

def run_subtitle_gen(audio_path: str, reference_text: str, output_path: str):
    subprocess.run([
        "whisperx", audio_path,
        "--model", "small",
        "--language", "zh",
        "--output_format", "srt",
        "--output_dir", str(Path(output_path).parent),
        "--initial_prompt", reference_text,   # ← text字段在这里被消费
    ], check=True, cwd=OPENMONTAGE_PATH)
```

### 视频合成

用 FFmpeg（OpenMontage 已安装）合成每段：画面PNG + 音频WAV + 字幕SRT → 段MP4：

```python
subprocess.run([
    "ffmpeg", "-loop", "1", "-i", slide_path,
    "-i", audio_path,
    "-vf", f"subtitles={subtitle_path}:force_style='FontSize=28,PrimaryColour=&H00FFFFFF,OutlineColour=&H00000000,Outline=2'",
    "-c:v", "libx264", "-tune", "stillimage",
    "-c:a", "aac", "-b:a", "192k",
    "-pix_fmt", "yuv420p", "-shortest",
    output_path,
], check=True)
```

### 段拼接

FFmpeg concat 拼接所有段MP4 + 嵌入章节元数据：

```python
# concat.txt: file 'segments/01.mp4' \n file 'segments/02.mp4' ...
# FFmpeg chapter metadata 文件标记每段开头时间点
subprocess.run([
    "ffmpeg", "-f", "concat", "-safe", "0", "-i", "concat.txt",
    "-i", "chapters.txt",
    "-map_metadata", "1",
    "-c", "copy", output_path,
], check=True)
```

### 竖屏版

**不从横屏裁剪**。竖屏版重新合成——用竖屏slides(1080×1920) + 同组音频和字幕，走同样的 video_compose + video_stitch 流程。横屏竖屏走同一套代码，只传入不同分辨率参数。

## 数据流

```
script.txt ──→ parser ──→ [Segment×N]  (含 title + text)
                              │
              ┌───────────────┤
              ↓               ↓
         slides.py      audio_processor.py
       (使用title)       (pydub静音)
     横PNG+竖PNG           WAV×N
              │               │
              └───────┬───────┘
                      ↓
              subprocess WhisperX
              (--initial_prompt text → 对齐校准)
              SRT×N
                      │
          ┌───────────┴───────────┐
          ↓                       ↓
    FFmpeg compose           FFmpeg compose
    (横PNG+WAV+SRT)         (竖PNG+WAV+SRT)
          │                       │
          ↓                       ↓
    FFmpeg concat            FFmpeg concat
    + 章节标记               + 章节标记
          │                       │
          ↓                       ↓
    horizontal/ep1.mp4      vertical/ep1.mp4
```

text 字段在 WhisperX 步骤被消费——`--initial_prompt` 传入口播原文，帮助模型对齐中文语音和文本，提升字幕准确率。

竖屏不从横屏裁剪——用竖屏slides(1080×1920)独立合成，保证PPT文字完整不被裁切。

## 错误处理

| 步骤 | 失败处理 |
|------|---------|
| 解析 | 报具体行号+格式问题，终止 |
| 音频不匹配 | "脚本N段但audio/下M个文件"，终止 |
| 单段PPT生成 | "第X段PPT生成失败：原因"，跳过继续 |
| 单段字幕 | "第X段字幕失败：原因"，跳过继续 |
| 单段合成 | "第X段合成失败：原因"，跳过继续 |
| 字体缺失 | "请安装微软雅黑或指定字体路径" |
| OpenMontage不可用 | "请设置OPENMONTAGE_PATH或确认已安装" |

## 中间产物

输出到带时间戳目录避免堆积：
```
ep1/output_20260718_2100/
├── horizontal/ep1.mp4
├── vertical/ep1.mp4
├── slides_h/01.png ...
├── slides_v/01.png ...
├── subtitles/01.srt ...
├── segments/01.mp4 ...
└── pipeline_state.json
```

每次跑新目录，旧的不删，用户自己清理。

## TDD实现顺序

1. parser → 解析一期文案，验证段数和标题
2. slides → 生成一张PNG，验证尺寸和颜色
3. audio_processor → 拼接静音，验证时长增加
4. pipeline → 端到端，用小数据跑通

前三可并行。

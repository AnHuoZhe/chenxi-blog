# 视频生成流水线 —— 锻造项目

> 发给 Codex。包含需求文档 + 架构设计，直接实现。

---

# 一、需求文档

## 项目目标

命令行工具。喂一期文案+对应音频，输出横屏竖屏两版视频。

## 输入格式

```
ep1/
├── script.txt          ← 文案
├── audio/
│   ├── 01.wav          ← 综述段
│   ├── 02.wav          ← 分段
│   ├── ...
```

script.txt 结构（Ai发展文案.docx格式）：

```
第一期：《AI的四次劫难》
一、综述
[口播正文]

二、分段
第一劫：规则写不完。
[口播正文]

第二劫：网络做不深。
[口播正文]
...

三、总结和下期预告
[口播正文]

四、自我介绍
我是晨汐。一个用唯物辩证法给你拆AI的人。
```

## 输出

```
ep1/output_时间戳/
├── horizontal/ep1.mp4       ← 横屏 1920×1080（B站/YouTube）
├── vertical/ep1.mp4         ← 竖屏 1080×1920（抖音/快手/小红书）
├── slides_h/01.png ...      ← 横屏PPT
├── slides_v/01.png ...      ← 竖屏PPT
├── subtitles/01.srt ...     ← 字幕
├── segments/01.mp4 ...      ← 逐段视频
└── pipeline_state.json      ← 断点续跑状态
```

## 功能要求

1. **解析脚本**：按 `一、综述` `二、分段` `三、总结` `四、自我介绍` 切段，分段内的 `第X劫：标题` 作为子段。遇到未知段类型警告不丢弃。

2. **PPT画面**：每段用 Pillow 绘制。深色背景(#0f172a)、白色文字、pink-500(#ec4899)强调。按段类型选模板——综述用大标题、分段用大字标题+副标题、总结用"总结"+预告、自我介绍用固定文案。同时生成横屏(1920×1080)和竖屏(1080×1920)两版。

3. **音频留白**：每段末尾用 pydub 拼接2秒静音，段间留给观众思考。

4. **字幕**：用 OpenMontage 自带的 WhisperX 逐段生成SRT。传 `--initial_prompt` 参数（口播原文）做对齐校准，提升中文准确率。

5. **视频合成**：用 FFmpeg（OpenMontage已安装）逐段合成画面+音频+字幕。横屏竖屏各自独立合成——竖屏不从横屏裁剪。

6. **章节标记**：完整视频嵌入 FFmpeg chapter metadata，观众可跳跃到任意段开头。

7. **断点续跑**：每步完成后写 pipeline_state.json，重跑跳过已完成步骤。每步 print 进度。

8. **输出到带时间戳目录**，旧产物不自动删。

## 外部依赖

已装：OpenMontage（含 WhisperX、FFmpeg）、GPT-SoVITS（用户手动生成音频用）

需装：`pip install pydub Pillow`

## 不做的

- 不做AI自动切分音频（用户在GPT-SoVITS逐段生成）
- 不做弹幕飘过（只有底部字幕）
- 不自动上传平台

---

# 二、架构设计

## 项目结构

```
video-pipeline/
├── pipeline.py              ← 主入口 + 编排器
├── parser.py                ← 脚本解析
├── slides.py                ← PPT画面生成
├── audio_processor.py       ← 音频留白处理
├── config.py                ← 配置常量
├── requirements.txt         ← pydub, Pillow
```

## 模块职责

### parser.py

```python
@dataclass
class Segment:
    index: int           # 段号，从1开始
    type: str            # "overview" | "segment" | "summary" | "intro"
    title: str           # 如 "第一劫：规则写不完"
    text: str            # 口播正文
```

解析 script.txt，输出 Segment 列表 + 期号。校验段数与 audio/ 下 wav 数匹配。

### slides.py

输入：Segment + 分辨率(宽, 高)。用 Pillow 绘制PPT画面，输出PNG。

### audio_processor.py

输入：wav文件路径列表，silence_seconds=2。用 pydub 末尾拼接静音段。

### pipeline.py

```python
def run(input_dir: str, output_dir: str = None, silence: float = 2.0):
```

编排全部流程。断点续跑，每步 try/except 包裹。

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

## OpenMontage 集成

不 import（不是pip包，有独立venv）。通过 subprocess 调用：

- **字幕**：`whisperx audio.wav --model small --language zh --output_format srt --initial_prompt "原文"`
- **合成**：`ffmpeg -loop 1 -i slide.png -i audio.wav -vf subtitles=sub.srt ...`
- **拼接**：`ffmpeg -f concat -i concat.txt -i chapters.txt -map_metadata 1 -c copy output.mp4`

## 错误处理

| 步骤 | 失败处理 |
|------|---------|
| 解析 | 报行号+格式问题，终止 |
| 段数不匹配 | "脚本N段但audio/下M个"，终止 |
| 单段PPT | 报段号+原因，跳过继续 |
| 单段字幕 | 报段号+原因，跳过继续 |
| 单段合成 | 报段号+原因，跳过继续 |
| 字体缺失 | "请安装微软雅黑" |
| OpenMontage缺失 | "请设置OPENMONTAGE_PATH" |

## TDD实现顺序

1. parser → test_parser.py
2. slides → test_slides.py
3. audio_processor → test_audio.py
4. pipeline → test_pipeline.py（端到端小数据）

前三个各自独立可并行。

## 配置常量 (config.py)

```python
HORIZONTAL = (1920, 1080)
VERTICAL = (1080, 1920)
BG_COLOR = "#0f172a"
ACCENT_COLOR = "#ec4899"
TEXT_COLOR = "#ffffff"
SUB_COLOR = "#94a3b8"
SILENCE_SECONDS = 2.0
OPENMONTAGE_PATH = "E:/work/word/study/OpenMontage"
```

---

直接改文件，不要先出设计说明再确认。用中文commit："第一版，视频生成流水线项目初始化"。

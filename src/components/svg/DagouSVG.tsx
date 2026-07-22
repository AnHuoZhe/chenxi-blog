/** 大狗叫：浅金拉布拉多，仰头张嘴咆哮，凶中带憨 */
export function DagouSVG({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" aria-label="大狗叫">
      <g stroke="#3a2a18" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
        {/* 脖子/胸 */}
        <path d="M35 118 Q30 88 44 72 L76 78 Q92 92 90 118 Z" fill="#f6d9a0" />
        {/* 头：仰头朝左 */}
        <path d="M30 62 Q22 34 46 24 Q72 15 84 34 Q92 48 84 62 Q74 80 52 78 Q34 76 30 62 Z" fill="#f2c979" />
        {/* 耳朵： floppy */}
        <path d="M78 32 Q96 30 98 48 Q99 62 88 66 Q80 54 78 32 Z" fill="#d9a959" />
        {/* 上颚（朝天的吻部） */}
        <path d="M28 46 Q14 40 12 28 Q24 22 38 30 Q46 36 44 44 Z" fill="#f6d9a0" />
        {/* 黑鼻头 */}
        <ellipse cx="16" cy="28" rx="6" ry="5" fill="#1c1310" transform="rotate(-30 16 28)" />
        {/* 口腔 */}
        <path d="M20 52 Q30 66 46 64 Q40 52 28 46 Z" fill="#7a1f1f" />
        {/* 牙齿：上排 */}
        <path d="M24 48 l4 6 l4 -5 l4 6 l4 -4" fill="none" stroke="#fff" strokeWidth="2.5" />
        {/* 舌头 */}
        <path d="M28 58 Q34 66 42 62 Q36 56 30 54 Z" fill="#e0596b" stroke="none" />
        {/* 下颚 */}
        <path d="M22 56 Q30 74 50 72 Q44 80 32 74 Q22 68 22 56 Z" fill="#f2c979" />
        {/* 眼睛：瞪圆带凶光 */}
        <circle cx="58" cy="40" r="6" fill="#fff" />
        <circle cx="59" cy="41" r="3.2" fill="#2b1a10" />
        <circle cx="60" cy="39.5" r="1" fill="#fff" stroke="none" />
        {/* 眉毛一挑：憨凶 */}
        <path d="M50 30 Q58 26 66 30" fill="none" />
        {/* 颈部条纹 */}
        <path d="M48 88 Q56 94 66 92" fill="none" stroke="#d9a959" strokeWidth="2.5" />
      </g>
    </svg>
  );
}

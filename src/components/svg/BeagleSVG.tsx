/** 比格犬：棕白黑三色，大垂耳白鼻梁，张嘴嚣张叫 */
export function BeagleSVG({ size = 150 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" aria-label="比格犬">
      <g stroke="#241608" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
        {/* 身体：棕色 + 白胸 */}
        <path d="M40 160 Q36 128 54 116 L106 116 Q124 128 120 160 Z" fill="#8b5a2b" />
        <path d="M66 160 Q64 132 80 124 Q96 132 94 160 Z" fill="#f5efe2" />
        {/* 左耳：大垂耳，黑棕 */}
        <path d="M38 44 Q14 52 16 88 Q17 112 34 116 Q44 96 44 70 Q44 52 38 44 Z" fill="#3a2410" />
        {/* 右耳：大垂耳，棕 */}
        <path d="M122 44 Q146 52 144 88 Q143 112 126 116 Q116 96 116 70 Q116 52 122 44 Z" fill="#5d3a17" />
        {/* 头 */}
        <circle cx="80" cy="72" r="44" fill="#8b5a2b" />
        {/* 白色鼻梁 blaze */}
        <path d="M80 30 Q90 48 87 72 Q85 90 80 100 Q75 90 73 72 Q70 48 80 30 Z" fill="#f5efe2" />
        {/* 白色嘴套 */}
        <ellipse cx="80" cy="98" rx="26" ry="18" fill="#f5efe2" />
        {/* 眼睛：嚣张半眯 */}
        <path d="M52 62 Q58 58 64 62" fill="none" strokeWidth="3.5" />
        <circle cx="58" cy="68" r="4.5" fill="#241608" />
        <circle cx="59.5" cy="66.5" r="1.2" fill="#fff" stroke="none" />
        <path d="M96 62 Q102 58 108 62" fill="none" strokeWidth="3.5" />
        <circle cx="102" cy="68" r="4.5" fill="#241608" />
        <circle cx="103.5" cy="66.5" r="1.2" fill="#fff" stroke="none" />
        {/* 黑鼻头 */}
        <ellipse cx="80" cy="90" rx="8" ry="6" fill="#14100c" />
        {/* 张嘴上颚固定，下颚开合（CSS动画） */}
        <path d="M62 100 Q80 106 98 100 L98 104 Q80 110 62 104 Z" fill="#7a1f1f" stroke="none" />
        <g className="beagle-jaw">
          <path d="M62 104 Q80 122 98 104 Q96 118 80 120 Q64 118 62 104 Z" fill="#5c1717" />
          <path d="M70 110 Q80 120 90 110 Q86 118 80 118 Q74 118 70 110 Z" fill="#e0596b" stroke="none" />
        </g>
        {/* 头顶黑色胎记 */}
        <path d="M62 32 Q80 24 98 32 Q92 26 80 26 Q68 26 62 32 Z" fill="#3a2410" stroke="none" />
      </g>
    </svg>
  );
}

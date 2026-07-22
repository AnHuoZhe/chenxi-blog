/** 形态3 哈气耄耋：棘背龙形态，弓背炸毛帆状脊，露尖牙眯眼哈气 */
export function HachimiHissSVG({ size = 96 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.75} viewBox="0 0 160 120" aria-label="哈气耄耋·棘背龙">
      <g stroke="#3a2208" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
        {/* 尾巴：膨炸竖起 */}
        <path d="M16 96 Q2 76 12 52 Q20 40 26 50 Q18 70 28 90 Z" fill="#e08f2b" />
        {/* 棘背龙帆状脊 */}
        <path d="M34 58 L40 32 L48 54 L56 26 L64 50 L74 22 L82 48 L92 28 L100 52 L108 36 L112 58 Z" fill="#c26a12" />
        {/* 身体：高弓背炸毛 */}
        <path className="cat-arch" d="M24 98 Q16 50 60 44 Q110 38 130 62 Q140 74 136 98 Z" fill="#f4a53f" />
        {/* 炸毛毛刺 */}
        <path d="M30 70 l-8 -4 M32 84 l-9 -2 M120 60 l9 -5 M126 74 l9 -3" stroke="#c26a12" strokeWidth="3" fill="none" />
        {/* 虎斑 */}
        <path d="M52 58 l4 14 M72 54 l2 16 M94 56 l0 16" stroke="#c26a12" strokeWidth="4" fill="none" />
        {/* 腿 */}
        <path d="M42 98 l0 12 M62 98 l0 12 M104 98 l0 12 M122 98 l0 12" strokeWidth="7" stroke="#e08f2b" />
        {/* 头：压低前伸 */}
        <circle cx="134" cy="58" r="20" fill="#f4a53f" />
        {/* 耳朵后压 */}
        <path d="M120 44 L108 38 L118 52 Z" fill="#f4a53f" />
        <path d="M148 44 L158 38 L150 52 Z" fill="#f4a53f" />
        {/* 眯成缝的眼：>< */}
        <path d="M122 54 l8 3 l-8 3 M140 54 l8 -3 l0 6" fill="none" strokeWidth="3" />
        {/* 张嘴哈气 + 尖牙 */}
        <path d="M124 66 Q134 78 148 68 Q144 82 134 82 Q126 80 124 66 Z" fill="#7a1f1f" />
        <path d="M128 68 l3 6 l3 -5 M138 70 l3 5 l3 -6" fill="#fff" stroke="#fff" strokeWidth="1.5" />
        {/* 哈气雾 */}
        <path className="hiss-breath" d="M152 74 q6 2 8 6 M150 80 q6 4 6 9" fill="none" stroke="#cbb6e2" strokeWidth="2.5" />
      </g>
    </svg>
  );
}

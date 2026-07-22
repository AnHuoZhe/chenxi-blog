/** 形态1 龙像尽显：橘虎斑，烦躁弓背，飞机耳，暗藏杀机 */
export function HachimiDragonSVG({ size = 96 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.75} viewBox="0 0 160 120" aria-label="耄耋·龙像尽显">
      <g stroke="#3a2208" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
        {/* 尾巴：低垂炸开，烦躁 */}
        <path d="M18 92 Q6 84 10 68 Q16 60 22 66 Q18 78 26 86 Z" fill="#f4a53f" />
        {/* 身体：微弓 */}
        <path className="cat-arch" d="M24 96 Q22 62 62 54 Q104 46 128 66 Q138 76 134 96 Z" fill="#f4a53f" />
        {/* 虎斑 */}
        <path d="M48 62 l6 14 M68 56 l4 16 M90 56 l2 16 M110 62 l-2 14" stroke="#c26a12" strokeWidth="4" fill="none" />
        {/* 腿 */}
        <path d="M40 96 l0 14 M60 96 l0 14 M104 96 l0 14 M122 96 l0 14" strokeWidth="7" stroke="#e08f2b" />
        {/* 头 */}
        <circle cx="132" cy="52" r="22" fill="#f4a53f" />
        {/* 飞机耳：向两侧压平 */}
        <path d="M114 40 L100 34 L112 48 Z" fill="#f4a53f" />
        <path d="M150 40 L162 34 L152 48 Z" fill="#f4a53f" />
        {/* 烦躁半眯眼 */}
        <path d="M122 50 l10 2 M142 52 l10 -2" strokeWidth="3.5" />
        <circle cx="128" cy="55" r="2" fill="#3a2208" />
        <circle cx="146" cy="55" r="2" fill="#3a2208" />
        {/* 不耐烦的嘴 */}
        <path d="M132 66 Q137 63 142 66" fill="none" />
        {/* 额头川字纹 */}
        <path d="M132 40 l0 6 M138 40 l0 6" stroke="#c26a12" strokeWidth="2.5" />
      </g>
    </svg>
  );
}

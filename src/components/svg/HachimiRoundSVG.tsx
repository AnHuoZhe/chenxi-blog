/** 形态2 圆头耄耋：圆脸大眼，呆萌天真 */
export function HachimiRoundSVG({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" aria-label="圆头耄耋">
      <g stroke="#3a2208" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
        {/* 耳朵 */}
        <path d="M30 34 L24 12 L48 24 Z" fill="#f4a53f" />
        <path d="M90 34 L96 12 L72 24 Z" fill="#f4a53f" />
        <path d="M32 28 L29 16 L42 22 Z" fill="#f7c68a" stroke="none" />
        <path d="M88 28 L91 16 L78 22 Z" fill="#f7c68a" stroke="none" />
        {/* 圆脸 */}
        <circle cx="60" cy="64" r="42" fill="#f4a53f" />
        {/* 额头虎斑 */}
        <path d="M48 28 l2 10 M60 25 l0 11 M72 28 l-2 10" stroke="#c26a12" strokeWidth="4" fill="none" />
        {/* 大眼睛：清澈呆萌 */}
        <circle cx="44" cy="58" r="10" fill="#fff" />
        <circle cx="45" cy="59" r="5.5" fill="#3a2208" />
        <circle cx="47" cy="56" r="2" fill="#fff" stroke="none" />
        <circle cx="76" cy="58" r="10" fill="#fff" />
        <circle cx="77" cy="59" r="5.5" fill="#3a2208" />
        <circle cx="79" cy="56" r="2" fill="#fff" stroke="none" />
        {/* 粉鼻子 + ω嘴 */}
        <path d="M56 74 Q60 71 64 74 Q62 78 60 78 Q58 78 56 74 Z" fill="#e88b93" />
        <path d="M60 78 Q60 84 53 84 M60 78 Q60 84 67 84" fill="none" strokeWidth="2.5" />
        {/* 胡须 */}
        <path d="M16 62 l14 2 M17 74 l13 -1 M104 62 l-14 2 M103 74 l-13 -1" strokeWidth="2" />
        {/* 腮红 */}
        <circle cx="32" cy="76" r="5" fill="#f0b26b" stroke="none" opacity="0.8" />
        <circle cx="88" cy="76" r="5" fill="#f0b26b" stroke="none" opacity="0.8" />
      </g>
    </svg>
  );
}

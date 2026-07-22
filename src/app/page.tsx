"use client";

import { useState } from "react";
import Link from "next/link";
import { useSound } from "@/hooks/useSound";

/** 光尘/余烬粒子 */
function Motes({ count, className }: { count: number; className: string }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={`absolute h-1 w-1 rounded-full ${className}`}
          style={{
            left: `${6 + ((i * 89) % 88)}%`,
            bottom: `${(i * 37) % 40}%`,
            animationDuration: `${6 + ((i * 1.7) % 7)}s`,
            animationDelay: `-${(i * 1.3) % 9}s`,
          }}
        />
      ))}
    </>
  );
}

/** 仙境之门 */
function HeavenDoor() {
  return (
    <Link href="/posts" className="group relative block">
      {/* 门后主光晕 */}
      <div className="halo-breathe absolute -inset-14 rounded-full bg-[radial-gradient(circle,rgba(253,230,138,0.5),transparent_65%)]" />
      {/* 光柱 */}
      <div className="ray-sweep absolute -top-16 left-1/2 h-80 w-28 -translate-x-1/2 bg-gradient-to-b from-amber-100/90 to-transparent blur-lg" />
      {/* 门体：石柱+拱顶 */}
      <div className="relative flex items-end">
        <div className="h-72 w-4 rounded-t bg-gradient-to-b from-amber-200 to-amber-300/80 shadow-[inset_0_0_8px_rgba(120,72,0,0.4)]" />
        <div className="holy-breathe relative mx-1 flex h-72 w-48 flex-col items-center justify-end overflow-hidden rounded-t-full border-4 border-amber-200 bg-gradient-to-b from-amber-50 via-amber-100 to-amber-200 pb-6 shadow-[inset_0_0_50px_rgba(253,230,138,0.9)] transition-transform duration-500 group-hover:scale-[1.04]">
          <div className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 bg-gradient-to-b from-white via-amber-100 to-white shadow-[0_0_22px_8px_rgba(255,255,255,0.95)]" />
          <div className="absolute left-6 top-1/2 h-3 w-3 rounded-full border-2 border-amber-400" />
          <div className="absolute right-6 top-1/2 h-3 w-3 rounded-full border-2 border-amber-400" />
          {/* 大狗叫浮雕：真实咆哮 */}
          <span className="relative z-10 rounded-full bg-amber-50/70 p-2 shadow-[0_0_18px_rgba(253,230,138,0.9)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
            <img
              src="/images/dagou-open-cut.png"
              alt="大狗叫"
              className="h-20 w-20 object-contain drop-shadow-[0_2px_6px_rgba(120,72,0,0.5)]"
            />
          </span>
          <span className="relative z-10 mt-1 text-2xl font-black tracking-[0.4em] text-amber-700">
            大狗
          </span>
        </div>
        <div className="h-72 w-4 rounded-t bg-gradient-to-b from-amber-200 to-amber-300/80 shadow-[inset_0_0_8px_rgba(120,72,0,0.4)]" />
      </div>
      <p className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm tracking-widest text-amber-200/0 transition-colors duration-300 group-hover:text-amber-200/95">
        大狗大狗…叫~~~~~
      </p>
    </Link>
  );
}

/** 邪域之门 */
function DoomDoor() {
  const [hiss, setHiss] = useState(false);
  return (
    <div
      className="group relative block cursor-not-allowed"
      onMouseEnter={() => setHiss(true)}
      onMouseLeave={() => setHiss(false)}
    >
      {/* 门后邪光 */}
      <div className="doom-pulse absolute -inset-12 rounded-full bg-[radial-gradient(circle,rgba(126,34,206,0.35),transparent_65%)]" />
      <div className="doom-rattle relative flex h-72 w-52 flex-col items-center justify-end overflow-hidden border-4 border-stone-700 bg-gradient-to-b from-[#241533] via-[#160a26] to-black pb-6 [border-radius:46%_46%_0_0/30%_30%_0_0]">
        {/* 石板纹理 */}
        <div className="absolute inset-0 opacity-40 [background:repeating-linear-gradient(0deg,transparent,transparent_34px,rgba(0,0,0,0.6)_35px)]" />
        {/* 蠕动裂缝紫光 */}
        <div className="crack-crawl absolute inset-y-0 left-1/3 w-[2px] bg-purple-500/70 blur-[1px]" />
        <div className="crack-crawl absolute inset-y-0 right-1/4 w-[2px] bg-fuchsia-600/60 blur-[1px]" style={{ animationDelay: "-1.7s" }} />
        {/* 锁链 */}
        <svg className="chain-sway absolute inset-x-0 top-12 h-8 w-full" viewBox="0 0 208 32">
          {Array.from({ length: 13 }).map((_, i) => (
            <ellipse key={i} cx={8 + i * 16} cy="16" rx="9" ry="6" fill="none" stroke="#71717a" strokeWidth="3" />
          ))}
        </svg>
        <svg className="chain-sway absolute inset-x-0 top-32 h-8 w-full" style={{ animationDelay: "-2s" }} viewBox="0 0 208 32">
          {Array.from({ length: 13 }).map((_, i) => (
            <ellipse key={i} cx={8 + i * 16} cy="16" rx="9" ry="6" fill="none" stroke="#52525b" strokeWidth="3" />
          ))}
        </svg>
        {/* 耄耋浮雕：龙像尽显 */}
        <span className="relative z-10 rounded-full bg-purple-950/60 p-2 shadow-[0_0_18px_rgba(126,34,206,0.7)]">
          <img
            src="/images/hachimi-dragon-cut.png"
            alt="耄耋·龙像尽显"
            className="h-20 w-20 object-contain drop-shadow-[0_0_10px_rgba(126,34,206,0.8)]"
          />
        </span>
        <span className="relative z-10 mt-1 text-2xl font-black tracking-[0.4em] text-purple-400">
          耄耋
        </span>
      </div>
      {hiss && (
        <p className="hiss-in absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm tracking-widest text-purple-400">
          哈——老吴哦~（锁链还封着）
        </p>
      )}
    </div>
  );
}

export default function Home() {
  const { play } = useSound();
  const [wer, setWer] = useState(false);

  const beagleClick = () => {
    play("beagle-wer");
    setWer(true);
    setTimeout(() => setWer(false), 1500);
  };

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden">
      {/* ===== 上半：仙境 ===== */}
      <div className="relative flex flex-[1.15] items-end justify-center bg-gradient-to-b from-sky-100 via-amber-50 to-amber-100/50 pb-14">
        {/* 云 */}
        <div className="cloud-drift absolute top-10 h-16 w-60 rounded-full bg-white/90 blur-2xl" style={{ animationDuration: "52s" }} />
        <div className="cloud-drift absolute top-28 h-12 w-44 rounded-full bg-white/70 blur-xl" style={{ animationDuration: "36s", animationDelay: "-12s" }} />
        <div className="cloud-drift absolute top-16 h-20 w-80 rounded-full bg-amber-100/80 blur-2xl" style={{ animationDuration: "66s", animationDelay: "-30s" }} />
        <div className="cloud-drift absolute top-40 h-10 w-36 rounded-full bg-white/60 blur-lg" style={{ animationDuration: "44s", animationDelay: "-20s" }} />
        {/* 光尘 */}
        <Motes count={14} className="mote-rise bg-amber-300/80 shadow-[0_0_6px_2px_rgba(252,211,77,0.7)]" />
        {/* 标题 */}
        <div className="absolute left-1/2 top-[13%] -translate-x-1/2 select-none text-center">
          <h1 className="title-emerge text-7xl font-black text-amber-900/85 drop-shadow-[0_2px_14px_rgba(253,230,138,1)] sm:text-8xl">
            晨汐
          </h1>
          <p className="mt-3 text-sm font-medium tracking-[0.6em] text-amber-700/70">
            被比格犬守护的地方
          </p>
        </div>
        <HeavenDoor />
      </div>

      {/* ===== 两界分界 + 守门比格犬 ===== */}
      <div className="relative z-10 flex h-0 items-center justify-center">
        <div className="horizon-glow absolute h-[3px] w-full bg-gradient-to-r from-transparent via-amber-200 to-transparent" />
        <button
          type="button"
          onClick={beagleClick}
          className="beagle-idle relative -translate-y-1/2 cursor-pointer"
          aria-label="比格犬守门人"
        >
          {wer && (
            <span className="absolute -top-12 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-amber-300 px-4 py-1.5 text-base font-black text-black shadow-lg">
              wer wer wer!
            </span>
          )}
          {/* 脚下浮空阴影 */}
          <span className="absolute -bottom-2 left-1/2 h-4 w-36 -translate-x-1/2 rounded-full bg-black/50 blur-md" />
          <span className="relative">
            <img
              src="/images/beagle-large-cut.png"
              alt="比格犬守门人"
              className="h-44 w-auto object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.85)]"
            />
          </span>
        </button>
      </div>

      {/* ===== 下半：邪域 ===== */}
      <div className="relative flex flex-1 items-start justify-center bg-gradient-to-b from-[#170a28] via-[#0e0519] to-black pt-14">
        {/* 紫雾 */}
        <div className="mist-rise absolute bottom-6 left-[14%] h-14 w-44 rounded-full bg-purple-700/40 blur-2xl" style={{ animationDuration: "6s" }} />
        <div className="mist-rise absolute bottom-10 right-[16%] h-16 w-52 rounded-full bg-fuchsia-800/30 blur-2xl" style={{ animationDuration: "8s", animationDelay: "-3s" }} />
        <div className="mist-rise absolute bottom-2 left-[46%] h-12 w-40 rounded-full bg-purple-900/50 blur-xl" style={{ animationDuration: "7s", animationDelay: "-5s" }} />
        {/* 余烬 */}
        <Motes count={16} className="ember-rise bg-purple-400/90 shadow-[0_0_6px_2px_rgba(168,85,247,0.7)]" />
        <DoomDoor />
      </div>
    </section>
  );
}

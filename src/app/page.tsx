"use client";

import { useState } from "react";
import Link from "next/link";
import { useSound } from "@/hooks/useSound";
import { DagouSVG } from "@/components/svg/DagouSVG";
import { HachimiDragonSVG } from "@/components/svg/HachimiDragonSVG";
import { BeagleSVG } from "@/components/svg/BeagleSVG";

/** 仙境之门 */
function HeavenDoor() {
  return (
    <Link href="/posts" className="group relative block">
      {/* 门后光柱 */}
      <div className="ray-sweep absolute -top-10 left-1/2 h-72 w-24 -translate-x-1/2 bg-gradient-to-b from-amber-100/80 to-transparent blur-md" />
      {/* 拱形门体 */}
      <div className="holy-breathe relative flex h-64 w-44 flex-col items-center justify-end overflow-hidden rounded-t-full border-4 border-amber-200/90 bg-gradient-to-b from-amber-50 via-amber-100 to-amber-200 pb-5 shadow-[inset_0_0_40px_rgba(253,230,138,0.8)] transition-transform duration-500 group-hover:scale-105">
        {/* 门缝透光 */}
        <div className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 bg-gradient-to-b from-white via-amber-100 to-white shadow-[0_0_18px_6px_rgba(255,255,255,0.9)]" />
        {/* 门环 */}
        <div className="absolute left-6 top-1/2 h-3 w-3 rounded-full border-2 border-amber-400" />
        <div className="absolute right-6 top-1/2 h-3 w-3 rounded-full border-2 border-amber-400" />
        {/* 大狗叫：仰头张嘴咆哮 */}
        <span className="relative z-10 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
          <DagouSVG size={72} />
        </span>
        {/* 门匾 */}
        <span className="relative z-10 mt-1 text-2xl font-black tracking-[0.4em] text-amber-700 [writing-mode:horizontal-tb]">
          大狗
        </span>
      </div>
      {/* hover提示 */}
      <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm text-amber-200/0 transition-colors duration-300 group-hover:text-amber-200/90">
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
      <div className="doom-rattle doom-pulse relative flex h-64 w-44 flex-col items-center justify-end overflow-hidden border-4 border-purple-800/90 bg-gradient-to-b from-purple-950 via-[#1a0b2e] to-black pb-5 [border-radius:50%_50%_0_0/38%_38%_0_0]">
        {/* 门上的裂痕紫光 */}
        <div className="absolute inset-y-0 left-1/3 w-[2px] bg-purple-500/60 blur-[1px]" />
        <div className="absolute inset-y-0 right-1/4 w-[2px] bg-fuchsia-600/50 blur-[1px]" />
        {/* 锁链 */}
        <svg className="chain-sway absolute inset-x-0 top-10 h-8 w-full" viewBox="0 0 176 32">
          {Array.from({ length: 11 }).map((_, i) => (
            <ellipse key={i} cx={8 + i * 16} cy="16" rx="9" ry="6" fill="none" stroke="#6b7280" strokeWidth="3" />
          ))}
        </svg>
        <svg className="chain-sway absolute inset-x-0 top-28 h-8 w-full" style={{ animationDelay: "-2s" }} viewBox="0 0 176 32">
          {Array.from({ length: 11 }).map((_, i) => (
            <ellipse key={i} cx={8 + i * 16} cy="16" rx="9" ry="6" fill="none" stroke="#4b5563" strokeWidth="3" />
          ))}
        </svg>
        {/* 耄耋哈基米：龙像尽显，烦躁弓背 */}
        <span className="relative z-10 inline-block">
          <HachimiDragonSVG size={80} />
          <span className="hiss-puff absolute -top-2 left-1/2 -translate-x-1/2 text-xl text-purple-200">
            哈——
          </span>
        </span>
        {/* 门匾 */}
        <span className="relative z-10 mt-1 text-2xl font-black tracking-[0.4em] text-purple-400">
          耄耋
        </span>
      </div>
      {/* 哈气提示 */}
      {hiss && (
        <p className="hiss-in absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm text-purple-400">
          哈——老吴哦~（还打不开）
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
      <div className="relative flex flex-1 items-end justify-center bg-gradient-to-b from-sky-100 via-amber-50 to-amber-100/40 pb-10">
        {/* 云 */}
        <div className="cloud-drift absolute top-8 h-16 w-56 rounded-full bg-white/90 blur-2xl" style={{ animationDuration: "48s" }} />
        <div className="cloud-drift absolute top-24 h-12 w-40 rounded-full bg-white/70 blur-xl" style={{ animationDuration: "34s", animationDelay: "-12s" }} />
        <div className="cloud-drift absolute top-16 h-20 w-72 rounded-full bg-amber-100/80 blur-2xl" style={{ animationDuration: "62s", animationDelay: "-30s" }} />
        {/* 标题 */}
        <h1 className="title-emerge absolute left-1/2 top-[16%] -translate-x-1/2 select-none text-6xl font-black text-amber-900/80 drop-shadow-[0_2px_10px_rgba(253,230,138,0.9)] sm:text-7xl">
          晨汐
        </h1>
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
            <span className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-amber-300 px-4 py-1.5 text-base font-black text-black shadow-lg">
              wer wer wer!
            </span>
          )}
          <span className="drop-shadow-[0_6px_16px_rgba(0,0,0,0.75)]"><BeagleSVG size={150} /></span>
        </button>
      </div>

      {/* ===== 下半：邪域 ===== */}
      <div className="relative flex flex-1 items-start justify-center bg-gradient-to-b from-[#150826] via-[#0d0418] to-black pt-10">
        {/* 紫雾 */}
        <div className="mist-rise absolute bottom-4 left-[15%] h-14 w-40 rounded-full bg-purple-700/40 blur-2xl" style={{ animationDuration: "6s" }} />
        <div className="mist-rise absolute bottom-8 right-[18%] h-16 w-48 rounded-full bg-fuchsia-800/30 blur-2xl" style={{ animationDuration: "8s", animationDelay: "-3s" }} />
        <div className="mist-rise absolute bottom-2 left-[45%] h-12 w-36 rounded-full bg-purple-900/50 blur-xl" style={{ animationDuration: "7s", animationDelay: "-5s" }} />
        <DoomDoor />
      </div>
    </section>
  );
}

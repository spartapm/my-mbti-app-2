"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import BackgroundDecor from "@/components/BackgroundDecor";
import { PERSONAS } from "@/lib/personas";

export default function ResultPage({
  params,
}: {
  params: { type: string };
}) {
  const mbtiType = params.type?.toUpperCase();
  const persona = PERSONAS[mbtiType];
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    const shareUrl = `${window.location.origin}/result/${mbtiType}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("아래 링크를 복사하세요", shareUrl);
    }
  };

  if (!persona) {
    return (
      <>
        <BackgroundDecor />
        <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
          <p className="text-lg font-bold text-white">
            결과를 찾을 수 없어요 🥲
          </p>
          <Link
            href="/"
            className="rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-6 py-3 font-bold text-white transition-all hover:scale-105"
          >
            홈으로 돌아가기
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <BackgroundDecor />
      <main className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-7 shadow-xl backdrop-blur"
        >
          <div className="text-center">
            <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-bold tracking-widest text-cyan-300">
              {persona.type}
            </span>
            <h1 className="mt-4 text-2xl font-black leading-snug text-white sm:text-3xl">
              {persona.title}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              &ldquo;{persona.tagline}&rdquo;
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900/50 p-5">
            <h2 className="mb-3 text-sm font-bold text-indigo-300">
              ✨ 나의 일상 특징
            </h2>
            <ul className="space-y-2.5">
              {persona.traits.map((trait, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm leading-relaxed text-slate-200"
                >
                  <span className="mt-0.5 text-cyan-400">•</span>
                  <span>{trait}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-4">
              <p className="text-xs font-bold text-emerald-300">
                💚 찰떡궁합 파트너
              </p>
              <p className="mt-1 text-sm font-bold text-white">
                {persona.bestMatch.type} · {persona.bestMatch.title}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                {persona.bestMatch.reason}
              </p>
            </div>
            <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-4">
              <p className="text-xs font-bold text-amber-300">
                😅 티키타카가 어려운 케미
              </p>
              <p className="mt-1 text-sm font-bold text-white">
                {persona.toughMatch.type} · {persona.toughMatch.title}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                {persona.toughMatch.reason}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={handleCopyLink}
              className="relative inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-6 py-3.5 font-bold text-white shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
            >
              {copied ? "✅ 링크가 복사되었어요!" : "🔗 결과 링크 복사하기"}
            </button>
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 font-bold text-slate-100 transition-all hover:scale-105 hover:bg-white/10 active:scale-95"
            >
              🔄 테스트 다시 하기
            </Link>
          </div>
        </motion.div>
      </main>
    </>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase, RESULTS_TABLE } from "@/lib/supabaseClient";

export default function HomeClient({
  initialCount,
}: {
  initialCount: number;
}) {
  const [count, setCount] = useState(initialCount);
  const [justBumped, setJustBumped] = useState(false);

  useEffect(() => {
    const channel = supabase
      .channel("mbti_results_realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: RESULTS_TABLE },
        () => {
          setCount((prev) => prev + 1);
          setJustBumped(true);
          setTimeout(() => setJustBumped(false), 400);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="mb-6 flex justify-center">
          <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-bold tracking-wide text-cyan-300">
            🚀 IT 직무 성향 테스트
          </span>
        </div>

        <h1 className="text-center text-3xl font-black leading-tight text-white sm:text-4xl">
          출근길 내 모습으로 알아보는
          <br />
          <span className="gradient-text">&apos;IT 부캐&apos;</span> 테스트
        </h1>

        <p className="mt-5 text-center text-base leading-relaxed text-slate-300">
          협업 스타일부터 위기 대처법까지,
          <br />내 MBTI 유형에 맞는 IT 직무 페르소나는?
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 px-5 py-4 text-center shadow-lg shadow-indigo-500/10 backdrop-blur"
        >
          <p className="text-sm font-semibold text-indigo-100">
            👥 이미{" "}
            <span
              className={`text-lg font-black text-cyan-300 ${
                justBumped ? "inline-block animate-count-pop" : ""
              }`}
            >
              {count.toLocaleString()}
            </span>
            명의 동료들이
            <br className="sm:hidden" /> 자신의 부캐를 확인했어요!
          </p>
        </motion.div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/quiz"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 hover:shadow-cyan-500/40 active:scale-95"
          >
            <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
            <span className="relative">내 IT 부캐 확인하러 가기</span>
            <span className="relative transition-transform group-hover:translate-x-1">
              ➔
            </span>
          </Link>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          8개의 질문 · 약 1분 소요 · 결과 공유 가능
        </p>
      </motion.div>
    </main>
  );
}

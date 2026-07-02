"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import BackgroundDecor from "@/components/BackgroundDecor";
import ProgressBar from "@/components/ProgressBar";
import { QUESTIONS } from "@/lib/questions";
import { calculateMbti } from "@/lib/mbti";
import { saveMbtiResult } from "@/lib/resultsApi";
import { AnsweredQuestion, Letter } from "@/lib/types";

export default function QuizPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnsweredQuestion[]>([]);
  const [isFinishing, setIsFinishing] = useState(false);

  const total = QUESTIONS.length;
  const currentQuestion = QUESTIONS[currentIndex];

  const handleSelect = useCallback(
    async (label: string, value: Letter) => {
      const newAnswer: AnsweredQuestion = {
        questionId: currentQuestion.id,
        question: currentQuestion.question,
        selectedLabel: label,
        selectedValue: value,
      };
      const nextAnswers = [...answers, newAnswer];
      setAnswers(nextAnswers);

      if (currentIndex + 1 < total) {
        setCurrentIndex((prev) => prev + 1);
        return;
      }

      setIsFinishing(true);
      const mbtiType = calculateMbti(nextAnswers);

      await saveMbtiResult(mbtiType, nextAnswers);

      setTimeout(() => {
        router.push(`/result/${mbtiType}`);
      }, 1600);
    },
    [answers, currentIndex, currentQuestion, router, total]
  );

  if (isFinishing) {
    return (
      <>
        <BackgroundDecor />
        <main className="flex min-h-screen flex-col items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-6 text-center"
          >
            <div className="relative h-16 w-16">
              <div className="absolute inset-0 animate-spin rounded-full border-4 border-indigo-500/20 border-t-cyan-400" />
              <div className="absolute inset-2 animate-pulse rounded-full bg-gradient-to-br from-indigo-500/30 to-cyan-400/30" />
            </div>
            <p className="text-lg font-bold text-white">
              당신의 IT 부캐를 분석하고 있어요...
            </p>
            <p className="text-sm text-slate-400">
              8개의 답변을 취합해 결과를 계산하는 중
            </p>
          </motion.div>
        </main>
      </>
    );
  }

  return (
    <>
      <BackgroundDecor />
      <main className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <ProgressBar current={currentIndex + 1} total={total} />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur"
            >
              <p className="text-center text-lg font-bold leading-relaxed text-white sm:text-xl">
                {currentQuestion.question}
              </p>

              <div className="mt-8 flex flex-col gap-4">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(option.label, option.value)}
                    className="group rounded-2xl border border-white/10 bg-slate-900/60 px-5 py-4 text-left text-sm leading-relaxed text-slate-100 shadow-lg transition-all hover:scale-105 hover:border-cyan-400/50 hover:bg-slate-800/80 hover:shadow-cyan-500/10 active:scale-95"
                  >
                    <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 text-xs font-bold text-white">
                      {option.value}
                    </span>
                    {option.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </>
  );
}

"use client";

import { useMemo, useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Compass,
  Gem,
  Home,
  Sparkles,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface QuizOptionClient {
  id: string;
  text: string;
}

export interface QuizQuestionClient {
  id: string;
  text: string;
  imageUrl: string | null;
  options: QuizOptionClient[];
}

export interface QuizInterfaceData {
  id: string;
  title: string;
  description: string | null;
  category: "STORY" | "GENERAL";
  story: {
    id: string;
    title: string;
    coverImage: string | null;
    region: string;
  } | null;
  questions: QuizQuestionClient[];
}

interface QuizInterfaceProps {
  quiz: QuizInterfaceData;
  answerKey: Record<string, string>;
  backHref?: string;
  onSubmitAttempt?: (quizId: string, score: number) => Promise<{
    success: boolean;
    error?: string;
    awardedScore?: number;
  }>;
}

export function QuizInterface({
  quiz,
  answerKey,
  backHref = "/dashboard/quiz",
  onSubmitAttempt,
}: QuizInterfaceProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [revealedCorrectAnswer, setRevealedCorrectAnswer] = useState<
    string | null
  >(null);
  const [isPending, startTransition] = useTransition();

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;

  const progress = useMemo(() => {
    if (totalQuestions === 0) return 0;
    return Math.round((currentQuestionIndex / totalQuestions) * 100);
  }, [currentQuestionIndex, totalQuestions]);

  const handleSelectAnswer = (optionId: string) => {
    if (!currentQuestion || selectedAnswer) return;

    const correctOptionId = answerKey[currentQuestion.id] ?? null;
    const isCorrect = correctOptionId === optionId;

    setSelectedAnswer(optionId);
    setRevealedCorrectAnswer(correctOptionId);

    if (isCorrect) {
      setScore((prev) => prev + 10);
    }

    window.setTimeout(() => {
      const nextIndex = currentQuestionIndex + 1;

      if (nextIndex >= totalQuestions) {
        setIsFinished(true);

        const finalScore = score + (isCorrect ? 10 : 0);
        if (onSubmitAttempt) {
          startTransition(async () => {
            await onSubmitAttempt(quiz.id, finalScore);
          });
        }
        return;
      }

      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(null);
      setRevealedCorrectAnswer(null);
    }, 1500);
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-zinc-950 text-[#F5F0EB]">
        <p className="text-sm tracking-[0.2em] uppercase text-zinc-500">
          Pertanyaan tidak tersedia
        </p>
      </div>
    );
  }

  if (isFinished) {
    const maxScore = totalQuestions * 10;

    return (
      <div className="min-h-[80vh] bg-zinc-950 p-4 md:p-8 text-[#F5F0EB] flex items-center justify-center">
        <div className="relative w-full max-w-3xl border border-[#2E2318] bg-[#0D0A08] p-7 md:p-10 shadow-[inset_0_0_80px_rgba(217,107,74,0.07)]">
          <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-[#E86B52]/70" />
          <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-[#E86B52]/70" />
          <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-[#E86B52]/70" />
          <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-[#E86B52]/70" />

          <div className="mb-8">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#E86B52] mb-3">
              Uji Wawasan Selesai
            </p>
            <h2 className="text-3xl md:text-5xl font-serif mb-2">Naskah Tertuntaskan</h2>
            <p className="text-sm text-[#9A8A7A] font-light max-w-xl">
              Keputusanmu membentuk akhir perjalanan. Pengetahuan budaya bertambah,
              dan karma kini tercatat dalam kronik Adyatara.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="border border-[#2E2318] bg-[#120D0A] p-4">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#9A8A7A] mb-1">Poin Karma</p>
              <p className="text-3xl font-serif text-[#E86B52]">+{score}</p>
            </div>
            <div className="border border-[#2E2318] bg-[#120D0A] p-4">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#9A8A7A] mb-1">Akurasi</p>
              <p className="text-3xl font-serif text-[#F5F0EB]">
                {maxScore === 0 ? 0 : Math.round((score / maxScore) * 100)}%
              </p>
            </div>
            <div className="border border-[#2E2318] bg-[#120D0A] p-4">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#9A8A7A] mb-1">Kategori</p>
              <p className="text-lg font-serif text-[#F5F0EB] flex items-center gap-2">
                {quiz.category === "STORY" ? (
                  <BookOpen className="w-4 h-4 text-[#E86B52]" />
                ) : (
                  <Compass className="w-4 h-4 text-[#E86B52]" />
                )}
                {quiz.category === "STORY" ? "Story-based" : "General Trivia"}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={backHref}
              className="inline-flex items-center justify-center gap-2 border border-[#2E2318] bg-[#120D0A] px-5 py-3 text-[11px] tracking-[0.2em] uppercase text-[#9A8A7A] hover:text-[#F5F0EB] hover:border-[#D96B4A]/50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Daftar Quiz
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 border border-[#2E2318] bg-[#1A1410] px-5 py-3 text-[11px] tracking-[0.2em] uppercase text-[#F5F0EB] hover:border-[#E86B52]/60 hover:text-[#E86B52] transition-colors"
            >
              <Home className="w-4 h-4" />
              Kembali ke Beranda
            </Link>
            <Link
              href="/dashboard/collection"
              className="inline-flex items-center justify-center gap-2 border border-[#E86B52]/50 bg-[#E86B52]/10 px-5 py-3 text-[11px] tracking-[0.2em] uppercase text-[#E86B52] hover:bg-[#E86B52]/20 transition-colors"
            >
              <Gem className="w-4 h-4" />
              Lihat Peti Pusaka
            </Link>
          </div>

          {isPending ? (
            <p className="mt-4 text-xs tracking-[0.15em] uppercase text-zinc-500">
              Menyimpan hasil...
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-zinc-950 text-[#F5F0EB] p-3 md:p-4">
      <div className="max-w-5xl mx-auto mb-3">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 border border-[#2E2318] bg-[#120D0A] px-4 py-2 text-[10px] tracking-[0.2em] uppercase text-[#9A8A7A] hover:text-[#F5F0EB] hover:border-[#D96B4A]/50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Link>
      </div>

      <div className="max-w-5xl mx-auto relative border border-[#2E2318] bg-[#0D0A08] shadow-[inset_0_0_60px_rgba(0,0,0,0.4)]">
        <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-[#E86B52]/60" />
        <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-[#E86B52]/60" />
        <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-[#E86B52]/60" />
        <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-[#E86B52]/60" />

        <div className="p-4 md:p-5 border-b border-[#2E2318]">
          <p className="text-[10px] tracking-[0.28em] uppercase text-[#E86B52] mb-2">
            {quiz.category === "STORY" ? "Story-based Quiz" : "General Trivia"}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h1 className="text-2xl md:text-3xl font-serif">{quiz.title}</h1>
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#9A8A7A]">
              {currentQuestionIndex + 1}/{totalQuestions}
            </span>
          </div>
          <div className="mt-4 h-1 w-full bg-[#1A1410] border border-[#2E2318] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#D96B4A] to-[#E86B52]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="p-4 md:p-5">
          <div className="relative w-full h-[170px] sm:h-[200px] md:h-[230px] lg:h-[450px] bg-black border border-[#2E2318] overflow-hidden mb-4">
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#E86B52]/40 z-10" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#E86B52]/40 z-10" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#E86B52]/40 z-10" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#E86B52]/40 z-10" />

            {currentQuestion.imageUrl ? (
              <Image
                src={currentQuestion.imageUrl}
                alt="Ilustrasi pertanyaan"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 960px"
              />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(232,107,82,0.2),transparent_45%),radial-gradient(circle_at_70%_80%,rgba(154,138,122,0.18),transparent_40%),linear-gradient(160deg,#0d0907_0%,#120d0a_50%,#0a0705_100%)] flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-[#E86B52]/40" />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0705]/85 via-transparent to-transparent" />
          </div>

          <div className="relative border border-[#2E2318] bg-[#120D0A] p-4 md:p-5 mb-3">
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#E86B52]/40" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#E86B52]/40" />
            <p className="text-base md:text-xl font-serif leading-relaxed">{currentQuestion.text}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedAnswer === option.id;
              const isCorrect = revealedCorrectAnswer === option.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleSelectAnswer(option.id)}
                  disabled={selectedAnswer !== null}
                  className={cn(
                    "relative border p-4 text-left transition-all duration-200",
                    "bg-[#0D0907] border-[#2E2318] hover:border-[#E86B52]/50 hover:bg-[#1A1410]",
                    isSelected && isCorrect &&
                      "border-emerald-500/60 ring-1 ring-emerald-500/40 bg-emerald-500/10",
                    isSelected && !isCorrect &&
                      "border-red-500/60 ring-1 ring-red-500/40 bg-red-500/10",
                    !isSelected && isCorrect && selectedAnswer !== null &&
                      "border-emerald-500/40 bg-emerald-500/5",
                  )}
                >
                  <span className="pr-7 block text-sm md:text-base font-serif text-[#F5F0EB]">
                    {option.text}
                  </span>
                  {selectedAnswer !== null && isCorrect ? (
                    <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                  ) : null}
                  {selectedAnswer !== null && isSelected && !isCorrect ? (
                    <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-400" />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

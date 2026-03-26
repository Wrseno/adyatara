"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Trophy, Gem, ChevronRight, XCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation?: string | null;
}

export interface Question {
  id: string;
  text: string;
  imageUrl?: string | null;
  options: Option[];
}

export interface QuizData {
  id: string;
  title: string;
  description?: string | null;
  questions: Question[];
}

interface QuizInterfaceProps {
  quiz: QuizData;
  onCompleteAction?: (userId: string, quizId: string, score: number) => Promise<{ success: boolean }>;
  quizId?: string;
  userId?: string;
}

export function QuizInterface({ quiz, onCompleteAction, quizId, userId }: QuizInterfaceProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswering, setIsAnswering] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = quiz.questions[currentIndex];

  const handleOptionSelect = (option: Option) => {
    if (isAnswering) return;

    setSelectedOptionId(option.id);
    setIsAnswering(true);

    if (option.isCorrect) {
      setScore((prev) => prev + 10);
    }

    setTimeout(() => {
      if (currentIndex < quiz.questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedOptionId(null);
        setIsAnswering(false);
      } else {
        setShowResult(true);
        if (onCompleteAction && userId && quizId) {
          const finalScore = score + (option.isCorrect ? 10 : 0);
          onCompleteAction(userId, quizId, finalScore);
        }
      }
    }, 2000); // 2 second delay to show feedback
  };

  if (!currentQuestion) return null;

  if (showResult) {
    const finalScore = score;
    const isPerfect = finalScore === quiz.questions.length * 10;

    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6 bg-[#0A0705]">
        <div className="relative w-full max-w-2xl bg-[#0a0604] border border-[#2E2318] p-8 md:p-12 text-center shadow-[inset_0_0_40px_rgba(217,107,74,0.05)]">
          {/* Corner Decals */}
          <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-[#D96B4A]/50" />
          <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-[#D96B4A]/50" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-[#D96B4A]/50" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-[#D96B4A]/50" />

          {/* Background Highlight */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
            <div className="w-64 h-64 bg-[#D96B4A] opacity-5 blur-[100px] rounded-full" />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#1A1410] border border-[#D96B4A] rotate-45 mb-10 shadow-[0_0_20px_rgba(217,107,74,0.2)]">
              {isPerfect ? (
                 <Gem className="w-8 h-8 text-[#D96B4A] -rotate-45" strokeWidth={1.5} />
              ) : (
                 <Trophy className="w-8 h-8 text-[#D96B4A] -rotate-45" strokeWidth={1.5} />
              )}
            </div>

            <h2 className="text-3xl md:text-5xl font-serif text-[#F5F0EB] mb-4">Uji Wawasan Selesai</h2>
            <p className="text-sm md:text-base text-[#9A8A7A] mb-8 font-light max-w-md mx-auto">
              Perjalananmu dalam merajut {quiz.title} membuahkan hasil.
            </p>

            <div className="flex justify-center gap-6 mb-10 border-y border-[#2E2318] py-6 bg-[#0D0A08]">
              <div className="text-center">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#9A8A7A] mb-1">Poin Karma</p>
                <p className="text-4xl font-serif text-[#D96B4A]">+{finalScore}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/explore"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-[#1A1410] border border-[#D96B4A]/50 text-[#D96B4A] px-8 py-4 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-[#D96B4A] hover:text-[#0A0705] transition-all group/btn shadow-[0_0_15px_rgba(217,107,74,0.1)] hover:shadow-[0_0_20px_rgba(217,107,74,0.3)]"
              >
                Kembali ke Kisah
                <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col max-w-5xl mx-auto p-4 md:p-6 pb-20">
      
      {/* Visual Area (Top) */}
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-[#0a0604] border border-[#2E2318] mb-6 overflow-hidden flex-shrink-0 group">
        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-[#D96B4A]/30 z-20" />
        <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-[#D96B4A]/30 z-20" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-[#D96B4A]/30 z-20" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-[#D96B4A]/30 z-20" />

        {currentQuestion.imageUrl ? (
          <Image
            src={currentQuestion.imageUrl}
            alt="Visual"
            fill
            className="object-cover opacity-80"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1A1410] to-[#0A0705]">
             <Sparkles className="w-16 h-16 text-[#D96B4A]/20" strokeWidth={1} />
          </div>
        )}

        {/* Quest Title / Progress Bar overlay */}
        <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center text-[#F5F0EB]">
           <div className="bg-[#0A0705]/80 border border-[#2E2318] px-4 py-1.5 backdrop-blur-sm">
             <span className="text-[10px] tracking-[0.2em] text-[#D96B4A] uppercase font-bold">{quiz.title}</span>
           </div>
           <div className="bg-[#0A0705]/80 border border-[#2E2318] px-4 py-1.5 backdrop-blur-sm text-[10px] tracking-[0.2em]">
             <span className="text-[#9A8A7A]">Pertanyaan </span>
             <span className="text-[#D96B4A]">{currentIndex + 1}</span>
             <span className="text-[#9A8A7A]"> / {quiz.questions.length}</span>
           </div>
        </div>

        {/* Bottom fading edge for smooth VN dialog transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0705] to-transparent z-10" />
      </div>

      {/* VN Dialogue / Question Box */}
      <div className="relative w-full bg-[#0D0A08] border border-[#2E2318] p-6 md:p-8 flex-grow flex flex-col shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]">
        {/* Name/Role plate style */}
        <div className="absolute -top-4 left-6 md:left-10 bg-[#1A1410] border border-[#D96B4A] px-6 py-1 shadow-[0_0_10px_rgba(217,107,74,0.15)]">
          <span className="text-[10px] md:text-sm font-serif tracking-widest text-[#D96B4A] uppercase">
            Naskah Misteri
          </span>
        </div>

        <div className="mt-4 mb-8">
          <p className="text-lg md:text-2xl font-serif text-[#F5F0EB] leading-relaxed">
            {currentQuestion.text}
          </p>
        </div>

        {/* Choices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-auto">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedOptionId === option.id;
            
            let stateClasses = "border-[#2E2318] bg-[#1A1410]/50 hover:bg-[#1A1410] hover:border-[#D96B4A]/50 text-[#9A8A7A] hover:text-[#F5F0EB]";
            let IconFeedback = null;
            
            if (isAnswering && isSelected) {
              if (option.isCorrect) {
                stateClasses = "border-emerald-500/50 bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]";
                IconFeedback = CheckCircle2;
              } else {
                stateClasses = "border-red-500/50 bg-red-500/10 text-red-400";
                IconFeedback = XCircle;
              }
            } else if (isAnswering && option.isCorrect) {
               // Show correct answer gracefully if user got it wrong
               stateClasses = "border-emerald-500/30 bg-emerald-500/5 text-emerald-400/80";
               IconFeedback = CheckCircle2;
            }

            return (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option)}
                disabled={isAnswering}
                className={cn(
                  "relative flex items-center justify-between p-4 md:p-5 text-left border transition-all duration-300",
                  "group overflow-hidden",
                  stateClasses
                )}
              >
                {/* Visual Novel Choice Decorator */}
                <div className={cn(
                  "absolute left-0 top-0 bottom-0 w-1 transition-colors duration-300",
                  isSelected && option.isCorrect ? "bg-emerald-500" :
                  isSelected && !option.isCorrect ? "bg-red-500" :
                  isAnswering && option.isCorrect ? "bg-emerald-500/50" :
                  "bg-transparent group-hover:bg-[#D96B4A]/50"
                )} />

                <div className="flex items-center gap-4 relative z-10 pl-2">
                  <span className="text-[10px] text-[#2E2318] group-hover:text-[#D96B4A]/50 font-mono transition-colors">
                    0{index + 1}
                  </span>
                  <span className={cn(
                    "text-sm md:text-base font-serif transition-colors",
                    isAnswering && isSelected ? "opacity-100" : "opacity-90"
                  )}>
                    {option.text}
                  </span>
                </div>

                {IconFeedback && (
                  <IconFeedback className="w-5 h-5 opacity-80 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

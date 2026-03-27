import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { constructMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Sparkles, Trophy, BookOpen, ChevronRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Uji Wawasan - Adyatara",
  description: "Uji wawasanmu tentang cerita-cerita nusantara",
});

interface QuizListPageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function QuizListPage({ searchParams }: QuizListPageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  // Fetch quizzes with their stories and attempt status
  const quizzes = await db.quiz.findMany({
    include: {
      story: {
        select: { title: true, coverImage: true, region: true },
      },
      questions: {
        select: { id: true, imageUrl: true }
      },
      attempts: {
        where: { userId: session.user.id }
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const storyBasedQuizzes = quizzes.filter((quiz) => quiz.category === "STORY");
  const generalTriviaQuizzes = quizzes.filter((quiz) => quiz.category === "GENERAL");
  const resolvedSearchParams = await searchParams;
  const selectedTab = resolvedSearchParams.tab === "general" ? "general" : "story";

  const activeQuizzes = selectedTab === "story" ? storyBasedQuizzes : generalTriviaQuizzes;

  const tabDescription =
    selectedTab === "story"
      ? "Quiz Story-based berisi pertanyaan yang langsung terkait alur, tokoh, dan keputusan dari kisah folklore yang kamu mainkan."
      : "General Trivia berisi pertanyaan umum budaya Indonesia seperti adat istiadat, tarian daerah, baju tradisional, dan rumah adat.";

  const renderQuizCard = (quiz: (typeof quizzes)[number]) => {
    const bestAttempt = quiz.attempts.length > 0
      ? quiz.attempts.reduce((max, attempt) => attempt.score > max.score ? attempt : max, quiz.attempts[0])
      : null;

    const thumbnailImage =
      quiz.story?.coverImage ??
      quiz.questions.find((question) => question.imageUrl)?.imageUrl ??
      null;

    return (
      <div key={quiz.id} className="relative bg-[#0a0604] border border-[#2E2318] group flex flex-col hover:border-[#D96B4A]/50 transition-colors shadow-[0_0_15px_rgba(0,0,0,0.5)]">
        <div className="relative h-40 w-full bg-[#1A1410] border-b border-[#2E2318] overflow-hidden">
          {thumbnailImage ? (
            <Image
              src={thumbnailImage}
              alt={quiz.story?.title ?? quiz.title}
              fill
              className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-[#2E2318]" />
            </div>
          )}
          {bestAttempt && (
            <div className="absolute top-3 right-3 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 flex items-center gap-2 backdrop-blur-sm shadow-[0_0_10px_rgba(16,185,129,0.2)]">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span className="text-[10px] text-emerald-400 font-bold tracking-widest">{bestAttempt.score} KARMA</span>
            </div>
          )}
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <div className="mb-4">
            <span className="text-[10px] text-[#D96B4A] tracking-[0.2em] uppercase">
              {quiz.story?.title ?? "TRIVIA NUSANTARA"}
            </span>
            <h3 className="text-xl font-serif text-[#F5F0EB] mt-1">{quiz.title}</h3>
            <p className="text-xs text-[#9A8A7A] mt-2 line-clamp-2">{quiz.description || "Uji wawasan Anda seputar kisah ini."}</p>
            <p className="text-[10px] text-[#9A8A7A] mt-2 tracking-[0.2em] uppercase">
              {quiz.category === "STORY" ? "Story-based" : "General Trivia"}
            </p>
          </div>

          <div className="mt-auto pt-5 border-t border-[#2E2318] flex items-center justify-between">
            <div className="text-[11px] text-[#9A8A7A] flex items-center gap-2">
              <Trophy className="w-3.5 h-3.5 text-[#D96B4A]" />
              {quiz.questions.length} Pertanyaan
            </div>
            <Link href={`/dashboard/quiz/${quiz.id}`} className="text-[10px] uppercase tracking-[0.2em] text-[#D96B4A] hover:text-[#E86B52] flex items-center transition-colors">
              Mulai <ChevronRight className="w-3 h-3 ml-1" />
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-transparent group-hover:border-[#D96B4A]/50 transition-colors m-px" />
        <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-transparent group-hover:border-[#D96B4A]/50 transition-colors m-px" />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0A0705] text-[#F5F0EB] p-6 md:p-8">
      <div className="md:hidden h-14" />
      
      {/* Header */}
      <div className="relative mb-8 md:mb-10 bg-[#0a0604] border border-[#2E2318] p-8 overflow-hidden group shadow-[inset_0_0_40px_rgba(217,107,74,0.05)]">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#D96B4A] opacity-[0.03] blur-[80px] rounded-full pointer-events-none" />
        
        {/* Corner frames */}
        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-[#D96B4A]/30" />
        <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-[#D96B4A]/30" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-[#D96B4A]/30" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-[#D96B4A]/30" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#D96B4A]"></div>
              <p className="text-[10px] tracking-[0.3em] text-[#D96B4A] uppercase font-medium">Tes Tantangan</p>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif text-[#F5F0EB] mb-2 drop-shadow-sm leading-tight">
              Uji Wawasan
            </h1>
            <p className="text-sm text-[#9A8A7A] font-light max-w-xl leading-relaxed">
              Buktikan ingatanmu tentang kisah-kisah Nusantara. Jawab dengan benar dan kumpulkan Karma yang tersembunyi.
            </p>
          </div>
        </div>
      </div>

      {quizzes.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 border border-[#2E2318] border-dashed text-center bg-[#0a0604]">
          <BookOpen className="w-12 h-12 text-[#2E2318] mb-4 opacity-50" strokeWidth={1} />
          <p className="text-sm md:text-base text-[#9A8A7A] mb-4 font-serif">Belum ada gulungan ujian yang terbuka.</p>
        </div>
      ) : (
        <div className="space-y-6">
          <section className="relative border border-[#2E2318] bg-[#0a0604] p-5 md:p-6">
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#D96B4A]/40" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#D96B4A]/40" />

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <Link
                href="/dashboard/quiz?tab=story"
                className={cn(
                  "inline-flex items-center justify-center px-5 py-3 text-[11px] tracking-[0.2em] uppercase border transition-colors",
                  selectedTab === "story"
                    ? "border-[#D96B4A] bg-[#D96B4A]/10 text-[#D96B4A]"
                    : "border-[#2E2318] text-[#9A8A7A] hover:text-[#F5F0EB] hover:border-[#D96B4A]/50",
                )}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Story-based
              </Link>
              <Link
                href="/dashboard/quiz?tab=general"
                className={cn(
                  "inline-flex items-center justify-center px-5 py-3 text-[11px] tracking-[0.2em] uppercase border transition-colors",
                  selectedTab === "general"
                    ? "border-[#D96B4A] bg-[#D96B4A]/10 text-[#D96B4A]"
                    : "border-[#2E2318] text-[#9A8A7A] hover:text-[#F5F0EB] hover:border-[#D96B4A]/50",
                )}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                General Trivia
              </Link>
            </div>

            <p className="text-sm text-[#9A8A7A] leading-relaxed">
              {tabDescription}
            </p>
          </section>

          <section>
            {activeQuizzes.length === 0 ? (
              <p className="text-sm text-[#9A8A7A]">
                {selectedTab === "story"
                  ? "Belum ada kuis berbasis cerita."
                  : "Belum ada kuis general trivia budaya Indonesia."}
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeQuizzes.map(renderQuizCard)}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

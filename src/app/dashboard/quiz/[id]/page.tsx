import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { constructMetadata } from "@/lib/metadata";
import { QuizInterface } from "@/components/quiz/QuizInterface";
import { getQuizById, submitQuizAttempt } from "@/actions/quiz";

export const metadata = constructMetadata({
  title: "Uji Wawasan - Adyatara",
});

interface QuizPageProps {
  params: Promise<{ id: string }>;
}

export default async function QuizPage({ params }: QuizPageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const { id } = await params;

  const quizResult = await getQuizById(id);
  if (!quizResult.success || !quizResult.data) {
    redirect("/dashboard/quiz");
  }

  const answerKeyRecord = await (async () => {
    const quizWithAnswers = await db.quiz.findUnique({
      where: { id },
      include: {
        questions: {
          include: {
            options: {
              where: { isCorrect: true },
              select: { id: true },
            },
          },
        },
      },
    });

    if (!quizWithAnswers) return {} as Record<string, string>;

    return Object.fromEntries(
      quizWithAnswers.questions
        .filter((q) => q.options.length > 0)
        .map((q) => [q.id, q.options[0].id]),
    );
  })();

  return (
    <QuizInterface
      quiz={quizResult.data}
      answerKey={answerKeyRecord}
      backHref={`/dashboard/quiz?tab=${quizResult.data.category === "GENERAL" ? "general" : "story"}`}
      onSubmitAttempt={submitQuizAttempt}
    />
  );
}

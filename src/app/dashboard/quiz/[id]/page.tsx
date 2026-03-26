import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { constructMetadata } from "@/lib/metadata";
import { QuizInterface } from "@/components/quiz/quiz-interface";
import { completeQuizAction } from "@/actions/quiz";

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

  // Cek apakah kuis ada di database
  const quiz = await db.quiz.findUnique({
    where: { id },
    include: {
      questions: {
        include: {
          options: true
        }
      }
    }
  });

  if (!quiz) {
    redirect("/dashboard/quiz");
  }

  return (
    <QuizInterface 
      quiz={quiz} 
      onCompleteAction={completeQuizAction} 
      quizId={quiz.id}
      userId={session.user.id}
    />
  );
}

"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export interface QuizOptionPayload {
  id: string;
  text: string;
}

export interface QuizQuestionPayload {
  id: string;
  text: string;
  imageUrl: string | null;
  options: QuizOptionPayload[];
}

export interface QuizPayload {
  id: string;
  title: string;
  description: string | null;
  category: "STORY" | "GENERAL";
  storyId: string | null;
  story: {
    id: string;
    title: string;
    coverImage: string | null;
    region: string;
  } | null;
  questions: QuizQuestionPayload[];
}

export async function getQuizById(
  quizId: string,
): Promise<{ success: boolean; data?: QuizPayload; error?: string }> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const quiz = await db.quiz.findUnique({
      where: { id: quizId },
      include: {
        story: {
          select: {
            id: true,
            title: true,
            coverImage: true,
            region: true,
          },
        },
        questions: {
          orderBy: { createdAt: "asc" },
          include: {
            options: {
              orderBy: { createdAt: "asc" },
              select: {
                id: true,
                text: true,
              },
            },
          },
        },
      },
    });

    if (!quiz) {
      return { success: false, error: "Quiz not found" };
    }

    return {
      success: true,
      data: {
        id: quiz.id,
        title: quiz.title,
        description: quiz.description ?? null,
        category: quiz.category,
        storyId: quiz.storyId,
        story: quiz.story,
        questions: quiz.questions.map((question) => ({
          id: question.id,
          text: question.text,
          imageUrl: question.imageUrl ?? null,
          options: question.options,
        })),
      },
    };
  } catch (error) {
    console.error("Failed to get quiz:", error);
    return { success: false, error: "Failed to load quiz" };
  }
}

export async function submitQuizAttempt(quizId: string, score: number) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const quiz = await db.quiz.findUnique({
      where: { id: quizId },
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

    if (!quiz) {
      return { success: false, error: "Quiz not found" };
    }

    const maxScore = quiz.questions.length * 10;
    const safeScore = Math.max(0, Math.min(score, maxScore));

    const attempt = await db.quizAttempt.create({
      data: {
        userId: session.user.id,
        quizId,
        score: safeScore,
        isCompleted: true,
        completedAt: new Date(),
      },
    });

    await db.user.update({
      where: { id: session.user.id },
      data: {
        totalScore: { increment: safeScore },
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/quiz");
    revalidatePath(`/dashboard/quiz/${quizId}`);

    return { success: true, attempt, awardedScore: safeScore };
  } catch (error) {
    console.error("Failed to submit quiz:", error);
    return { success: false, error: "Failed to save quiz attempt" };
  }
}

export async function completeQuizAction(
  userId: string,
  quizId: string,
  score: number,
) {
  void userId;
  return submitQuizAttempt(quizId, score);
}

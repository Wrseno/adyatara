"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function completeQuizAction(userId: string, quizId: string, score: number) {
  try {
    // Upsert or create Quiz Attempt
    const attempt = await db.quizAttempt.create({
      data: {
        userId,
        quizId,
        score,
        isCompleted: true,
      },
    });

    // Award karma / score to user
    await db.user.update({
      where: { id: userId },
      data: {
        totalScore: { increment: score }
      }
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/quiz");
    revalidatePath(`/dashboard/quiz/${quizId}`);

    return { success: true, attempt };
  } catch (error) {
    console.error("Failed to complete quiz:", error);
    return { success: false, error: "Failed to save quiz attempt" };
  }
}

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { storyCollectibleMap } from "@/stories/collectible-map";

export async function POST(req: Request) {
  try {
    const sessionAuth = await auth();
    const user = sessionAuth?.user;
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { sessionId, storySlug, score, ending } = body;

    // New flow: NarraLeaf-based finish with storySlug + score
    if (storySlug) {
      const gameScore = typeof score === "number" && score > 0 ? score : 0;
      const gameEnding = typeof ending === "string" ? ending : "neutral";

      // Try to find Story in DB for GameSession reference
      const story = await db.story.findFirst({
        where: { title: { contains: storySlug.replace(/-/g, " "), mode: "insensitive" } },
      });

      if (story) {
        await db.gameSession.create({
          data: {
            userId: user.id,
            storyId: story.id,
            currentNodeId: "completed",
            score: gameScore,
            status: "completed",
            finishedAt: new Date(),
          },
        });
      }

      await db.user.update({
        where: { id: user.id },
        data: {
          totalScore: { increment: gameScore },
          level: { increment: 1 },
        },
      });

      // Award collectibles based on story + ending (only new ones)
      const collectibleIds = storyCollectibleMap[storySlug]?.[gameEnding] || [];
      let newCollectibles = 0;
      if (collectibleIds.length > 0) {
        // Check which ones user already has
        const existing = await db.userCollectible.findMany({
          where: {
            userId: user.id,
            collectibleId: { in: collectibleIds },
          },
          select: { collectibleId: true },
        });
        const existingIds = new Set(existing.map((e) => e.collectibleId));
        const toCreate = collectibleIds
          .filter((id) => !existingIds.has(id))
          .map((id) => ({ userId: user.id, collectibleId: id }));

        if (toCreate.length > 0) {
          await db.userCollectible.createMany({ data: toCreate });
          newCollectibles = toCreate.length;
        }
      }

      return NextResponse.json({
        success: true,
        score: gameScore,
        ending: gameEnding,
        collectiblesUnlocked: newCollectibles,
      });
    }

    // Old flow: sessionId-based finish (backward compatibility)
    if (sessionId) {
      const session = await db.gameSession.findUnique({
        where: { id: sessionId },
      });

      if (!session || session.userId !== user.id) {
        return NextResponse.json(
          { error: "Invalid session or unauthorized" },
          { status: 403 }
        );
      }

      if (session.status !== "active") {
        return NextResponse.json(
          { error: "Session already completed" },
          { status: 400 }
        );
      }

      const updatedSession = await db.gameSession.update({
        where: { id: sessionId },
        data: {
          status: "completed",
          finishedAt: new Date(),
        },
      });

      return NextResponse.json(updatedSession);
    }

    return NextResponse.json(
      { error: "Missing storySlug or sessionId" },
      { status: 400 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

import { db } from "@/lib/db";

// Types
export type GameStatus = "active" | "completed";
export type Rank = "A" | "B" | "C";

export async function startGame(userId: string, storyId: string) {
  // Check if user and story exist
  const story = await db.story.findUnique({
    where: { id: storyId },
    include: { nodes: true },
  });

  if (!story) throw new Error("Story not found");

  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");

  // Check level requirements
  if (user.level < story.levelReq) {
    throw new Error("Level requirement not met");
  }

  // Find the first node (usually the one without incoming choices, or we can just pick the first one by creation, assuming first node is the start. Ideally, we should have an `isStartNode` flag).
  // For simplicity, we assume the first node associated with the story is the start context.
  const firstNode = await db.node.findFirst({
    where: { storyId: storyId },
    orderBy: { createdAt: 'asc' }
  });

  if (!firstNode) throw new Error("Story has no nodes");

  const session = await db.gameSession.create({
    data: {
      userId,
      storyId,
      currentNodeId: firstNode.id,
      score: 0,
      status: "active",
    },
  });

  return session;
}

export async function getCurrentNode(sessionId: string) {
  const session = await db.gameSession.findUnique({
    where: { id: sessionId },
    include: {
      story: {
        select: {
          title: true,
          backgroundMusicDefault: true,
          themeColor: true
        }
      }
    }
  });

  if (!session) throw new Error("Session not found");

  const node = await db.node.findUnique({
    where: { id: session.currentNodeId },
    include: {
      currentCharacter: {
        select: {
          name: true,
          avatar: true
        }
      },
      choices: {
        select: {
          id: true,
          text: true,
          soundEffect: true,
          isImportant: true
        }
      },
    },
  });

  if (!node) throw new Error("Node not found");

  // Format node for the Visual Novel frontend contract
  const formattedNode = {
    id: node.id,
    content: node.content,
    type: node.type,
    speaker: node.currentCharacter ? {
      name: node.currentCharacter.name,
      avatar: node.currentCharacter.avatar
    } : null,
    backgroundImage: node.backgroundImage,
    backgroundMusic: node.backgroundMusic || session.story.backgroundMusicDefault,
    soundEffect: node.soundEffect,
    expression: node.expression,
    position: node.position,
    isAutoPlay: node.isAutoPlay,
    delayMs: node.delayMs,
    choices: node.choices
  };

  return { session, node: formattedNode };
}

export async function submitChoice(sessionId: string, choiceId: string, userId: string) {
  const session = await db.gameSession.findUnique({
    where: { id: sessionId },
  });

  if (!session || session.status === "completed") {
    throw new Error("Invalid or completed session");
  }

  if (session.userId !== userId) {
      throw new Error("Unauthorized access to session");
  }

  const choice = await db.choice.findUnique({
    where: { id: choiceId },
  });

  if (!choice || choice.nodeId !== session.currentNodeId) {
    throw new Error("Invalid choice for current node");
  }

  // Calculate new score
  const newScore = session.score + choice.scoreDelta;

  // Unlock knowledge if Choice has knowledge appended
  if (choice.knowledgeId) {
    // Upsert to handle existing knowledge unlocks smoothly
    await db.userKnowledge.upsert({
        where: {
            userId_knowledgeId: {
                userId,
                knowledgeId: choice.knowledgeId
            }
        },
        update: {},
        create: {
            userId,
            knowledgeId: choice.knowledgeId
        }
    })
  }

  // Award collectible if Choice has collectible appended
  if (choice.collectibleId) {
    await db.userCollectible.upsert({
        where: {
            userId_collectibleId: {
                userId,
                collectibleId: choice.collectibleId
            }
        },
        update: {},
        create: {
            userId,
            collectibleId: choice.collectibleId
        }
    })
  }

  if (!choice.nextNodeId) {
    throw new Error("Choice does not lead anywhere");
  }

  // Check if it's the end node
  const nextNode = await db.node.findUnique({
      where: { id: choice.nextNodeId }
  });

  let status = session.status;
  let finishedAt = null;

  if (nextNode?.type === "ending") {
      status = "completed";
      finishedAt = new Date();
  }

  // Update session
  const updatedSession = await db.gameSession.update({
    where: { id: sessionId },
    data: {
      currentNodeId: choice.nextNodeId,
      score: newScore,
      status,
      finishedAt
    },
  });

  if (status === "completed") {
      await finishGameProcess(sessionId, userId, newScore);
  }

  return updatedSession;
}


async function finishGameProcess(sessionId: string, userId: string, finalScore: string | number) {
    const session = await db.gameSession.findUnique({
        where: { id: sessionId },
        include: { story: true }
    });

    if (!session) throw new Error("Session not found");

    // Scoring system A/B/C
    // Let's assume max score is arbitrary, for now we will just use basic fixed values.
    // E.g., Rank A >= 100, B >= 50, C < 50. Ideally maxScore is defined per story.
    
    // Update user rank/score/level
    await db.user.update({
        where: { id: userId },
        data: {
            totalScore: { increment: Number(finalScore) }, 
            level: { increment: 1 } // Simple progression: +1 level per completed story
        }
    })

    return { session, finalScore }
}

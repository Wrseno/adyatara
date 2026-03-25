import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { constructMetadata } from "@/lib/metadata";
import {
  Trophy,
  Award,
  BookOpen,
  Lightbulb,
  Clock,
  TrendingUp,
  Gem,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata = constructMetadata({
  title: "Dashboard - Statistik",
  description: "Lihat statistik permainan dan progress Anda",
  path: "/dashboard",
});

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  // Fetch user data
  const userData = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      level: true,
      totalScore: true,
      createdAt: true,
      gameSessions: {
        include: {
          story: true,
        },
        orderBy: {
          startedAt: "desc",
        },
      },
      userKnowledges: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!userData) {
    redirect("/auth/signin");
  }

  // Calculate stats
  const totalScore = userData.totalScore || 0;
  const level = userData.level || 1;
  
  // Count unique completed stories (each story counted only once)
  const uniqueCompletedStoryIds = new Set(
    userData.gameSessions
      .filter((s) => s.status === "completed")
      .map((s) => s.storyId)
  );
  const completedStories = uniqueCompletedStoryIds.size;
  
  const totalStories = await db.story.count();
  const knowledgeUnlocked = userData.userKnowledges.length;
  const recentActivities = userData.gameSessions.slice(0, 5);

  // Calculate progress to next level (simple formula: level * 1000)
  const currentLevelThreshold = (level - 1) * 1000;
  const nextLevelThreshold = level * 1000;
  const rawProgress =
    ((totalScore - currentLevelThreshold) /
      (nextLevelThreshold - currentLevelThreshold)) *
    100;
  // Clamp progress between 0 and 100
  const levelProgress = Math.max(0, Math.min(rawProgress, 100));

  // Calculate region progress from actual database data
  const storiesByRegion = await db.story.groupBy({
    by: ["region"],
    _count: {
      id: true,
    },
  });

  const completedByRegion = await db.gameSession.groupBy({
    by: ["storyId"],
    where: {
      userId: session.user.id,
      status: "completed",
    },
    _count: {
      id: true,
    },
  });

  const completedStoryIds = completedByRegion.map((g) => g.storyId);
  const completedStoriesData = await db.story.findMany({
    where: {
      id: {
        in: completedStoryIds,
      },
    },
    select: {
      region: true,
    },
  });

  // Build region progress from regions that exist in database
  const regionProgress = storiesByRegion.map((regionData) => {
    const region = regionData.region;
    const total = regionData._count.id;
    const completed = completedStoriesData.filter(
      (s) => s.region === region
    ).length;
    return {
      name: region,
      total,
      completed,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  });

  // Fetch recent collectibles unlocked by user
  const recentCollectibles = await db.userCollectible.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      collectible: {
        include: {
          story: {
            select: {
              title: true,
            },
          },
        },
      },
    },
    orderBy: {
      unlockedAt: "desc",
    },
    take: 5,
  });

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return "Baru saja";
    if (hours < 24) return `${hours} jam yang lalu`;
    if (days === 1) return "1 hari yang lalu";
    return `${days} hari yang lalu`;
  };

  return (
    <div className="min-h-screen bg-[#0A0705] text-[#F5F0EB] p-6 md:p-8">
      {/* Welcome Header */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px w-12 bg-[#D96B4A]/30"></div>
          <p className="text-[9px] tracking-[0.3em] text-[#D96B4A] uppercase font-medium">DASHBOARD</p>
        </div>
        <h1 className="text-4xl font-serif text-white mb-3">
          Selamat Datang, {userData.name || "Penjelajah"}!
        </h1>
        <p className="text-[13px] text-gray-400 font-light">
          Lihat progress dan pencapaian Anda dalam menjelajahi budaya Nusantara
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* Total Score */}
        <div className="relative p-6 bg-[#0D0907] border border-transparent group min-h-[140px]">
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-gray-800 group-hover:border-[#D96B4A]/60 transition-colors" />
          <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-gray-800 group-hover:border-[#D96B4A]/60 transition-colors" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-gray-800 group-hover:border-[#D96B4A]/60 transition-colors" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-gray-800 group-hover:border-[#D96B4A]/60 transition-colors" />

          <div className="mb-4 inline-flex p-3 border border-gray-800/80 group-hover:border-[#D96B4A]/30 rounded-sm transition-colors relative">
            <div className="absolute top-0 left-0 w-1 h-1 border-l border-t border-gray-600"></div>
            <div className="absolute bottom-0 right-0 w-1 h-1 border-r border-b border-gray-600"></div>
            <Trophy className="w-5 h-5 text-[#D96B4A]" strokeWidth={2} />
          </div>
          <p className="text-[10px] tracking-[0.2em] text-gray-500 uppercase mb-2">Total Skor</p>
          <p className="text-3xl font-serif text-[#D96B4A]">
            {totalScore.toLocaleString()}
          </p>
        </div>

        {/* Level */}
        <div className="relative p-6 bg-[#0D0907] border border-transparent group min-h-[140px]">
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-gray-800 group-hover:border-[#D96B4A]/60 transition-colors" />
          <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-gray-800 group-hover:border-[#D96B4A]/60 transition-colors" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-gray-800 group-hover:border-[#D96B4A]/60 transition-colors" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-gray-800 group-hover:border-[#D96B4A]/60 transition-colors" />

          <div className="mb-4 inline-flex p-3 border border-gray-800/80 group-hover:border-[#D96B4A]/30 rounded-sm transition-colors relative">
            <div className="absolute top-0 left-0 w-1 h-1 border-l border-t border-gray-600"></div>
            <div className="absolute bottom-0 right-0 w-1 h-1 border-r border-b border-gray-600"></div>
            <Award className="w-5 h-5 text-[#D96B4A]" strokeWidth={2} />
          </div>
          <p className="text-[10px] tracking-[0.2em] text-gray-500 uppercase mb-2">Level</p>
          <div className="flex items-end gap-2 mb-3">
            <p className="text-3xl font-serif text-white">{level}</p>
            <p className="text-sm text-gray-500 mb-1">/ Level {level + 1}</p>
          </div>
          <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#D96B4A] to-[#E86B52] rounded-full transition-all"
              style={{ width: `${levelProgress}%` }}
            />
          </div>
          <p className="text-[10px] text-gray-500 mt-2">
            {Math.round(levelProgress)}% menuju level berikutnya
          </p>
        </div>

        {/* Stories Completed */}
        <div className="relative p-6 bg-[#0D0907] border border-transparent group min-h-[140px]">
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-gray-800 group-hover:border-[#D96B4A]/60 transition-colors" />
          <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-gray-800 group-hover:border-[#D96B4A]/60 transition-colors" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-gray-800 group-hover:border-[#D96B4A]/60 transition-colors" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-gray-800 group-hover:border-[#D96B4A]/60 transition-colors" />

          <div className="mb-4 inline-flex p-3 border border-gray-800/80 group-hover:border-[#D96B4A]/30 rounded-sm transition-colors relative">
            <div className="absolute top-0 left-0 w-1 h-1 border-l border-t border-gray-600"></div>
            <div className="absolute bottom-0 right-0 w-1 h-1 border-r border-b border-gray-600"></div>
            <BookOpen className="w-5 h-5 text-[#D96B4A]" strokeWidth={2} />
          </div>
          <p className="text-[10px] tracking-[0.2em] text-gray-500 uppercase mb-2">Cerita Selesai</p>
          <p className="text-3xl font-serif text-white">{completedStories}</p>
          <p className="text-[10px] text-gray-500 mt-1">dari {totalStories} cerita</p>
        </div>

        {/* Knowledge Unlocked */}
        <div className="relative p-6 bg-[#0D0907] border border-transparent group min-h-[140px]">
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-gray-800 group-hover:border-[#D96B4A]/60 transition-colors" />
          <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-gray-800 group-hover:border-[#D96B4A]/60 transition-colors" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-gray-800 group-hover:border-[#D96B4A]/60 transition-colors" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-gray-800 group-hover:border-[#D96B4A]/60 transition-colors" />

          <div className="mb-4 inline-flex p-3 border border-gray-800/80 group-hover:border-[#D96B4A]/30 rounded-sm transition-colors relative">
            <div className="absolute top-0 left-0 w-1 h-1 border-l border-t border-gray-600"></div>
            <div className="absolute bottom-0 right-0 w-1 h-1 border-r border-b border-gray-600"></div>
            <Lightbulb className="w-5 h-5 text-[#D96B4A]" strokeWidth={2} />
          </div>
          <p className="text-[10px] tracking-[0.2em] text-gray-500 uppercase mb-2">Pengetahuan</p>
          <p className="text-3xl font-serif text-white">{knowledgeUnlocked}</p>
          <p className="text-[10px] text-gray-500 mt-1">pengetahuan terbuka</p>
        </div>
      </div>

      {/* Region Progress & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Region Progress */}
        <div className="relative p-8 bg-[#0D0907] border border-transparent group">
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-gray-800 group-hover:border-[#D96B4A]/60 transition-colors" />
          <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-gray-800 group-hover:border-[#D96B4A]/60 transition-colors" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-gray-800 group-hover:border-[#D96B4A]/60 transition-colors" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-gray-800 group-hover:border-[#D96B4A]/60 transition-colors" />

          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex p-2 border border-gray-800/80 rounded-sm relative">
              <div className="absolute top-0 left-0 w-1 h-1 border-l border-t border-gray-600"></div>
              <div className="absolute bottom-0 right-0 w-1 h-1 border-r border-b border-gray-600"></div>
              <TrendingUp className="w-4 h-4 text-[#D96B4A]" strokeWidth={2} />
            </div>
            <h3 className="text-lg font-serif text-white">Progress Per Region</h3>
          </div>

          <div className="space-y-5">
            {regionProgress.map((region) => (
              <div key={region.name}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[13px] text-gray-300">{region.name}</span>
                  <span className="text-[11px] text-gray-500">
                    {region.completed}/{region.total}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#D96B4A] to-[#E86B52] rounded-full transition-all"
                    style={{ width: `${region.percentage}%` }}
                  />
                </div>
              </div>
            ))}
            {regionProgress.length === 0 && (
              <p className="text-[13px] text-gray-500 text-center py-8">
                Belum ada progress di region manapun.{" "}
                <Link href="/explore" className="text-[#D96B4A] hover:text-[#E86B52] transition-colors">
                  Mulai jelajah sekarang!
                </Link>
              </p>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="relative p-8 bg-[#0D0907] border border-transparent group">
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-gray-800 group-hover:border-[#D96B4A]/60 transition-colors" />
          <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-gray-800 group-hover:border-[#D96B4A]/60 transition-colors" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-gray-800 group-hover:border-[#D96B4A]/60 transition-colors" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-gray-800 group-hover:border-[#D96B4A]/60 transition-colors" />

          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex p-2 border border-gray-800/80 rounded-sm relative">
              <div className="absolute top-0 left-0 w-1 h-1 border-l border-t border-gray-600"></div>
              <div className="absolute bottom-0 right-0 w-1 h-1 border-r border-b border-gray-600"></div>
              <Clock className="w-4 h-4 text-[#D96B4A]" strokeWidth={2} />
            </div>
            <h3 className="text-lg font-serif text-white">Aktivitas Terbaru</h3>
          </div>

          <div className="space-y-4">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 pb-4 border-b border-gray-800/50 last:border-0 last:pb-0"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-1.5 ${
                      activity.status === "completed"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-[13px] text-gray-300">
                      {activity.status === "completed" ? "Selesai" : "Memainkan"}{" "}
                      &quot;{activity.story.title}&quot;
                    </p>
                    <p className="text-[11px] text-gray-500 mt-1">
                      {formatDate(activity.startedAt)} •{" "}
                      {activity.status === "completed"
                        ? `Skor: ${activity.score}`
                        : "Dalam progress"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-[13px] text-gray-500 text-center py-8">
                Belum ada aktivitas.{" "}
                <Link href="/explore" className="text-[#D96B4A] hover:text-[#E86B52] transition-colors">
                  Mulai petualangan Anda!
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Collectibles Section */}
      <div className="relative p-8 bg-[#0D0907] border border-transparent group">
        {/* Corner brackets */}
        <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-gray-800 group-hover:border-[#D96B4A]/60 transition-colors" />
        <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-gray-800 group-hover:border-[#D96B4A]/60 transition-colors" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-gray-800 group-hover:border-[#D96B4A]/60 transition-colors" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-gray-800 group-hover:border-[#D96B4A]/60 transition-colors" />

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="inline-flex p-2 border border-gray-800/80 rounded-sm relative">
              <div className="absolute top-0 left-0 w-1 h-1 border-l border-t border-gray-600"></div>
              <div className="absolute bottom-0 right-0 w-1 h-1 border-r border-b border-gray-600"></div>
              <Gem className="w-4 h-4 text-[#D96B4A]" strokeWidth={2} />
            </div>
            <h3 className="text-lg font-serif text-white">Koleksi Terbaru</h3>
          </div>
          <Link 
            href="/dashboard/collection" 
            className="text-[11px] tracking-[0.15em] text-[#D96B4A] hover:text-[#E86B52] transition-colors uppercase"
          >
            Lihat Semua
          </Link>
        </div>

        {recentCollectibles.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {recentCollectibles.map((item) => (
              <div
                key={item.id}
                className="relative p-4 bg-[#0A0705] border border-gray-800/50 hover:border-[#D96B4A]/40 transition-colors group/item"
              >
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-gray-700 group-hover/item:border-[#D96B4A]/50 transition-colors" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-gray-700 group-hover/item:border-[#D96B4A]/50 transition-colors" />
                
                <div className="relative aspect-square mb-3 overflow-hidden bg-[#1A1410] rounded-sm">
                  <Image
                    src={item.collectible.image}
                    alt={item.collectible.name}
                    fill
                    className="object-cover"
                  />
                  {/* Rarity badge */}
                  <div className={`absolute top-1 right-1 px-1.5 py-0.5 text-[8px] uppercase tracking-wider font-medium rounded-sm ${
                    item.collectible.rarity === "legendary" 
                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      : item.collectible.rarity === "rare"
                      ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                      : item.collectible.rarity === "uncommon"
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                  }`}>
                    {item.collectible.rarity}
                  </div>
                </div>
                
                <p className="text-[12px] text-gray-200 font-medium truncate">
                  {item.collectible.name}
                </p>
                <p className="text-[10px] text-gray-500 truncate mt-0.5">
                  {item.collectible.story.title}
                </p>
                <p className="text-[9px] text-gray-600 mt-1">
                  {formatDate(item.unlockedAt)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Gem className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <p className="text-[13px] text-gray-500">
              Belum ada koleksi.{" "}
              <Link href="/explore" className="text-[#D96B4A] hover:text-[#E86B52] transition-colors">
                Mainkan cerita untuk mengumpulkan item!
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

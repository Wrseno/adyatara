import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { constructMetadata } from "@/lib/metadata";
import {
  Trophy,
  
  BookOpen,
  Lightbulb,
  Clock,
  TrendingUp,
  Gem,
  Map,
  Compass,
  Footprints,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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

  // Calculate progress to next level dynamically 
  // Assuming a rough scale of ~100-200 score per level for the visual bar 
  const scoreThreshold = 100;
  const currentLevelBase = (level - 1) * scoreThreshold;
  let rawProgress = ((totalScore - currentLevelBase) / scoreThreshold) * 100;
  if (rawProgress < 0) rawProgress = 0;
  if (rawProgress > 99) rawProgress = (totalScore % scoreThreshold); // Wrap around for visual looping if they overshot
  
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
      {/* Spacer for mobile nav */}
      <div className="md:hidden h-14" />
      
      {/* Hero Banner */}
      <div className="relative mb-8 md:mb-10 bg-[#0a0604] border border-[#2E2318] p-8 md:p-12 overflow-hidden group shadow-[inset_0_0_40px_rgba(217,107,74,0.05)]">
        {/* Background MAP/Texture placeholder */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#D96B4A] opacity-[0.03] blur-[80px] rounded-full pointer-events-none" />
        
        {/* Corner frames */}
        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-[#D96B4A]/30 group-hover:border-[#D96B4A]/60 transition-colors" />
        <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-[#D96B4A]/30 group-hover:border-[#D96B4A]/60 transition-colors" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-[#D96B4A]/30 group-hover:border-[#D96B4A]/60 transition-colors" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-[#D96B4A]/30 group-hover:border-[#D96B4A]/60 transition-colors" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#D96B4A]"></div>
              <p className="text-[10px] tracking-[0.3em] text-[#D96B4A] uppercase font-medium">Buku Harian Penjelajah</p>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif text-[#F5F0EB] mb-4 drop-shadow-sm leading-tight">
              Salam, {userData.name || "Penjelajah"}!<br/>
              <span className="text-[#9A8A7A] text-2xl md:text-3xl">Legenda Menanti...</span>
            </h1>
            <p className="text-sm text-[#9A8A7A] font-light max-w-xl leading-relaxed">
              Buka lembaran baru dan temukan rahasia yang tersembunyi di penjuru Nusantara. Setiap pilihanmu mengukir legenda baru.
            </p>
          </div>
          <Link href="/explore" className="inline-flex items-center justify-center bg-[#1A1410] border border-[#D96B4A]/50 text-[#D96B4A] px-6 py-3 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-[#D96B4A] hover:text-[#0A0705] transition-all group/btn shadow-[0_0_15px_rgba(217,107,74,0.1)] hover:shadow-[0_0_20px_rgba(217,107,74,0.3)]">
            Mulai Perjalanan
            <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Konsolidasi Stats - Player Status Bar */}
      <div className="mb-8 md:mb-10 bg-[#0a0604] border border-[#2E2318] p-5 md:p-6 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] relative">
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
          {/* Level Ring/Bar */}
          <div className="flex items-center gap-5 flex-1 w-full">
            <div className="relative w-[70px] h-[70px] shrink-0 flex items-center justify-center border border-[#D96B4A]/40 bg-[#1A1410] rotate-45 group hover:border-[#D96B4A] transition-colors shadow-[0_0_15px_rgba(217,107,74,0.1)]">
              <div className="absolute inset-1 border border-[#2E2318]" />
              <span className="text-2xl font-serif text-[#F5F0EB] -rotate-45">{level}</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#9A8A7A] font-medium">Tingkat Penjelajah</span>
                <span className="text-[10px] text-[#D96B4A]">{Math.round(levelProgress)}% ke Lv {level + 1}</span>
              </div>
              <div className="w-full h-1.5 bg-[#1A1410] border border-[#2E2318] overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#D96B4A] to-[#E86B52] shadow-[0_0_8px_rgba(217,107,74,0.6)]" style={{ width: `${levelProgress}%` }} />
              </div>
            </div>
          </div>

          {/* Sub Stats List */}
          <div className="flex flex-wrap md:flex-nowrap items-center justify-between md:justify-end gap-6 md:gap-10 w-full md:w-auto border-t md:border-t-0 md:border-l border-[#2E2318] pt-5 md:pt-0 md:pl-10">
            {/* Karma */}
            <div className="flex items-center gap-3">
              <div className="p-2 border border-[#2E2318] bg-[#0D0A08] rotate-45 hidden md:block">
                <Trophy className="w-4 h-4 text-[#D96B4A] -rotate-45" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[9px] tracking-[0.2em] text-[#9A8A7A] uppercase mb-0.5">Karma</p>
                <p className="text-xl font-serif text-[#F5F0EB]">{totalScore.toLocaleString()}</p>
              </div>
            </div>
            {/* Legenda */}
            <div className="flex items-center gap-3">
              <div className="p-2 border border-[#2E2318] bg-[#0D0A08] rotate-45 hidden md:block">
                <BookOpen className="w-4 h-4 text-[#D96B4A] -rotate-45" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[9px] tracking-[0.2em] text-[#9A8A7A] uppercase mb-0.5">Legenda</p>
                <p className="text-xl font-serif text-[#F5F0EB]">{completedStories}<span className="text-xs text-[#9A8A7A]">/{totalStories}</span></p>
              </div>
            </div>
            {/* Wawasan */}
            <div className="flex items-center gap-3">
              <div className="p-2 border border-[#2E2318] bg-[#0D0A08] rotate-45 hidden md:block">
                <Lightbulb className="w-4 h-4 text-[#D96B4A] -rotate-45" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[9px] tracking-[0.2em] text-[#9A8A7A] uppercase mb-0.5">Naskah</p>
                <p className="text-xl font-serif text-[#F5F0EB]">{knowledgeUnlocked}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Region Progress & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-10">
        {/* Region Progress */}
        <div className="relative p-5 md:p-8 bg-[#0a0604] border border-[#2E2318] group shadow-[inset_0_0_30px_rgba(0,0,0,0.5)] flex flex-col">
          {/* Corner frames */}
          <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-[#D96B4A]/30" />
          <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-[#D96B4A]/30" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-[#D96B4A]/30" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-[#D96B4A]/30" />

          <div className="flex items-center gap-3 mb-6 md:mb-8 border-b border-[#2E2318] pb-4">
            <TrendingUp className="w-5 h-5 text-[#D96B4A]" strokeWidth={1.5} />
            <h3 className="text-lg md:text-xl font-serif text-[#F5F0EB] tracking-wide">Peta Penjelajahan</h3>
          </div>

          <div className="space-y-5 md:space-y-6 flex-1 flex flex-col justify-center">
            {regionProgress.length > 0 ? regionProgress.map((region) => (
              <div key={region.name} className="relative">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm md:text-base text-[#D96B4A] uppercase tracking-wider">{region.name}</span>
                  <span className="text-[11px] md:text-[12px] text-[#9A8A7A] font-medium">
                    {region.completed}/{region.total} WILAYAH
                  </span>
                </div>
                <div className="w-full h-1.5 md:h-2 bg-[#1A1410] overflow-hidden border border-[#2E2318]">
                  <div
                    className="h-full bg-gradient-to-r from-[#D96B4A] to-[#E86B52] shadow-[0_0_10px_rgba(217,107,74,0.5)]"
                    style={{ width: `${region.percentage}%` }}
                  />
                </div>
              </div>
            )) : (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                 <Compass className="w-12 h-12 text-[#2E2318] mb-4 opacity-50" strokeWidth={1} />
                 <p className="text-sm md:text-base text-[#9A8A7A] mb-4 font-serif">Peta penjelajahanmu masih rahasia</p>
                 <Link href="/explore" className="text-[11px] text-[#D96B4A] uppercase tracking-[0.2em] hover:text-[#E86B52] border-b border-[#D96B4A]/30 pb-1 flex items-center gap-2 transition-all">
                    Buka Peta <Map className="w-3 h-3" />
                 </Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="relative p-5 md:p-8 bg-[#0a0604] border border-[#2E2318] group shadow-[inset_0_0_30px_rgba(0,0,0,0.5)] flex flex-col">
          {/* Corner frames */}
          <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-[#D96B4A]/30" />
          <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-[#D96B4A]/30" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-[#D96B4A]/30" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-[#D96B4A]/30" />

          <div className="flex items-center gap-3 mb-6 md:mb-8 border-b border-[#2E2318] pb-4">
            <Clock className="w-5 h-5 text-[#D96B4A]" strokeWidth={1.5} />
            <h3 className="text-lg md:text-xl font-serif text-[#F5F0EB] tracking-wide">Jejak Langkah Terkini</h3>
          </div>

          <div className="space-y-3 md:space-y-4 flex-1 flex flex-col justify-center">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-3 md:p-4 bg-[#1A1410]/40 border border-[#2E2318] hover:border-[#D96B4A]/30 transition-all hover:bg-[#1A1410]"
                >
                  <div
                    className={`w-1.5 h-full min-h-[40px] ${
                      activity.status === "completed"
                        ? "bg-[#D96B4A] shadow-[0_0_8px_rgba(217,107,74,0.4)]"
                        : "bg-[#9A8A7A]"
                    }`}
                  />
                  <div className="flex-1 min-w-0 py-1">
                    <p className="text-sm md:text-base font-serif text-[#F5F0EB] truncate drop-shadow-sm">
                      {activity.status === "completed" ? "Tamat" : "Menyelusuri"}{" "}
                      <span className="text-[#D96B4A]">&quot;{activity.story.title}&quot;quot;{activity.story.title}&quot;{activity.story.title}&quot;quot;quot;{activity.story.title}&quot;{activity.story.title}&quot;quot;{activity.story.title}&quot;{activity.story.title}&quot;quot;quot;</span>
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[10px] text-[#9A8A7A] tracking-widest uppercase">
                        {formatDate(activity.startedAt)}
                      </span>
                      <span className="text-[#D96B4A]/50 text-xs">•</span>
                      <span className="text-[10px] text-[#9A8A7A] uppercase tracking-wider">
                        {activity.status === "completed"
                          ? `Reputasi: +${activity.score || 0}`
                          : "Dalam perjalanan"}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
               <div className="flex flex-col items-center justify-center py-6 text-center">
                 <Footprints className="w-12 h-12 text-[#2E2318] mb-4 opacity-50" strokeWidth={1} />
                 <p className="text-sm md:text-base text-[#9A8A7A] mb-4 font-serif">Kisahmu belum dimulai</p>
                 <Link href="/explore" className="text-[11px] text-[#D96B4A] uppercase tracking-[0.2em] hover:text-[#E86B52] border-b border-[#D96B4A]/30 pb-1 flex items-center gap-2 transition-all">
                    Ayunkan Langkah Pertama
                 </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Collectibles Section */}
      <div className="relative p-5 md:p-8 bg-[#0a0604] border border-[#2E2318] group shadow-[inset_0_0_30px_rgba(0,0,0,0.5)]">
        {/* Corner frames */}
        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-[#D96B4A]/30" />
        <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-[#D96B4A]/30" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-[#D96B4A]/30" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-[#D96B4A]/30" />

        <div className="flex items-center justify-between mb-6 md:mb-8 border-b border-[#2E2318]/50 pb-4">
          <div className="flex items-center gap-3">
            <Gem className="w-5 h-5 text-[#D96B4A]" strokeWidth={1.5} />
            <h3 className="text-lg md:text-xl font-serif text-[#F5F0EB] tracking-wide">Peti Pusaka</h3>
          </div>
          <Link 
            href="/dashboard/collection" 
            className="text-[10px] md:text-[11px] tracking-[0.2em] text-[#D96B4A] hover:text-[#E86B52] transition-colors uppercase border border-[#D96B4A]/20 hover:border-[#D96B4A]/50 px-4 py-2 bg-[#1A1410]/50"
          >
            Lihat Semua
          </Link>
        </div>

        {recentCollectibles.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {recentCollectibles.map((item) => (
              <div
                key={item.id}
                className="relative p-3 md:p-4 bg-[#0D0907] border border-[#2E2318] hover:border-[#D96B4A]/60 transition-all group/item hover:shadow-[0_0_15px_rgba(217,107,74,0.15)]"
              >
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-[#D96B4A]/30 group-hover/item:border-[#D96B4A] transition-colors" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-[#D96B4A]/30 group-hover/item:border-[#D96B4A] transition-colors" />
                
                <div className="relative aspect-square mb-3 md:mb-4 overflow-hidden bg-[#1A1410] border border-[#2E2318] group-hover/item:border-[#D96B4A]/30">
                  <Image
                    src={item.collectible.image}
                    alt={item.collectible.name}
                    fill
                    className="object-cover group-hover/item:scale-110 transition-transform duration-500"
                  />
                  {/* Rarity badge */}
                  <div className={`absolute top-1 right-1 px-1.5 md:px-2 py-0.5 text-[8px] md:text-[9px] uppercase tracking-widest font-bold border ${
                    item.collectible.rarity === "legendary" 
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                      : item.collectible.rarity === "rare"
                      ? "bg-purple-500/10 text-purple-400 border-purple-500/50 shadow-[0_0_10px_rgba(168,85,247,0.2)]"
                      : item.collectible.rarity === "uncommon"
                      ? "bg-blue-500/10 text-blue-400 border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.2)]"
                      : "bg-[#9A8A7A]/10 text-[#9A8A7A] border-[#9A8A7A]/50"
                  }`}>
                    {item.collectible.rarity}
                  </div>
                </div>
                
                <p className="text-xs md:text-sm text-[#F5F0EB] font-serif truncate group-hover/item:text-[#D96B4A] transition-colors">
                  {item.collectible.name}
                </p>
                <p className="text-[10px] md:text-[11px] text-[#9A8A7A] truncate mt-1 border-t border-[#2E2318] pt-1">
                  {item.collectible.story.title}
                </p>
              </div>
            ))}
            
            {/* Fill empty spots to show inventory feel if less than 5 items */}
            {Array.from({ length: Math.max(0, 5 - recentCollectibles.length) }).map((_, i) => (
               <div key={`empty-${i}`} className="relative p-3 md:p-4 bg-[#0a0604] border border-[#2E2318]/50 opacity-60 hidden md:block">
                  <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-[#2E2318]" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-[#2E2318]" />
                  <div className="relative aspect-square mb-3 md:mb-4 bg-[#1A1410] border border-[#2E2318]">
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-none border border-[#2E2318] rotate-45" />
                     </div>
                  </div>
                  <div className="h-4 bg-[#1A1410] w-3/4 mb-2"></div>
                  <div className="h-3 bg-[#1A1410] w-1/2"></div>
               </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
             {/* 5 Empty Inventory Slots */}
             {[1, 2, 3, 4, 5].map((i) => (
               <div key={i} className={`relative p-3 md:p-4 bg-[#0a0604] border border-[#2E2318]/50 opacity-60 ${i > 2 ? 'hidden sm:block' : ''}`}>
                  <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-[#2E2318]" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-[#2E2318]" />
                  <div className="relative aspect-square mb-3 md:mb-4 bg-[#1A1410] border border-[#2E2318]">
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-none border border-[#2E2318] rotate-45 flex items-center justify-center">
                           <span className="text-[10px] text-[#2E2318] -rotate-45">?</span>
                        </div>
                     </div>
                  </div>
                  <div className="h-3 bg-[#1A1410] w-3/4 mb-1 border border-[#2E2318]"></div>
                  <div className="h-2 bg-[#1A1410] w-1/2 border border-[#2E2318]"></div>
               </div>
             ))}
          </div>
        )}
      </div>
</div>
  );
}

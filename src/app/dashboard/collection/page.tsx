import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { constructMetadata } from "@/lib/metadata";
import { Lock } from "lucide-react";

export const metadata = constructMetadata({
  title: "Koleksi",
  description: "Lihat koleksi pengetahuan dan pencapaian Anda",
  path: "/dashboard/collection",
});

const rarityStyles: Record<string, string> = {
  common: "text-gray-400 border-gray-600",
  rare: "text-blue-400 border-blue-600",
  legendary: "text-yellow-400 border-yellow-500",
};

const rarityLabels: Record<string, string> = {
  common: "Umum",
  rare: "Langka",
  legendary: "Legendaris",
};

export default async function CollectionPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  // Fetch all collectibles
  const allCollectibles = await db.collectible.findMany({
    orderBy: [{ storyId: "asc" }, { rarity: "asc" }],
  });

  // Fetch user's unlocked collectible IDs
  const userCollectibles = await db.userCollectible.findMany({
    where: { userId: session.user.id },
    select: { collectibleId: true },
  });
  const unlockedIds = new Set(userCollectibles.map((uc) => uc.collectibleId));

  return (
    <div className="min-h-screen bg-[#0A0705] text-[#F5F0EB] p-6 md:p-8">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px w-12 bg-[#D96B4A]/30"></div>
          <p className="text-[9px] tracking-[0.3em] text-[#D96B4A] uppercase font-medium">
            KOLEKSI
          </p>
        </div>
        <h1 className="text-4xl font-serif text-white mb-3">Koleksi Saya</h1>
        <p className="text-[13px] text-gray-400 font-light">
          {unlockedIds.size} dari {allCollectibles.length} item terkumpul
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {allCollectibles.map((item) => {
          const isUnlocked = unlockedIds.has(item.id);

          return (
            <div
              key={item.id}
              className={`relative bg-[#0D0907] border border-transparent group overflow-hidden transition-colors ${
                isUnlocked ? "hover:border-[#D96B4A]/60" : "opacity-50"
              }`}
            >
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-gray-800 group-hover:border-[#D96B4A]/60 transition-colors z-10" />
              <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-gray-800 group-hover:border-[#D96B4A]/60 transition-colors z-10" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-gray-800 group-hover:border-[#D96B4A]/60 transition-colors z-10" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-gray-800 group-hover:border-[#D96B4A]/60 transition-colors z-10" />

              {/* Image */}
              <div className="aspect-square overflow-hidden m-4 bg-[#1A1410]">
                {isUnlocked ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                    <Lock className="w-10 h-10 text-gray-700 transition duration-500 group-hover:text-orange-700" />
                    <p className="text-[10px] tracking-[0.2em] text-gray-600 uppercase transition duration-500 group-hover:text-orange-700">
                      Terkunci
                    </p>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="px-4 py-3 border-t border-gray-800/50">
                <p
                  className={`text-[13px] ${isUnlocked ? "text-gray-200" : "text-gray-600"}`}
                >
                  {isUnlocked ? item.name : "???"}
                </p>
                {isUnlocked && (
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`text-[10px] tracking-[0.15em] uppercase border px-1.5 py-0.5 ${rarityStyles[item.rarity]}`}
                    >
                      {rarityLabels[item.rarity] || item.rarity}
                    </span>
                    {item.category && (
                      <span className="text-[10px] text-gray-500">
                        {item.category}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

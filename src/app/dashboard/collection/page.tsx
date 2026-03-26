import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { constructMetadata } from "@/lib/metadata";
import { CollectionGrid } from "@/components/dashboard/collection-grid";

export const metadata = constructMetadata({
  title: "Koleksi",
  description: "Lihat koleksi pengetahuan dan pencapaian Anda",
  path: "/dashboard/collection",
});

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
      {/* Spacer for mobile nav */}
      <div className="md:hidden h-14" />
      
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px w-12 bg-[#D96B4A]/30"></div>
          <p className="text-[10px] tracking-[0.3em] text-[#D96B4A] uppercase font-medium">
            KOLEKSI
          </p>
        </div>
        <h1 className="text-5xl font-serif text-white mb-3">Koleksi Saya</h1>
        <p className="text-sm text-gray-400 font-light">
          {unlockedIds.size} dari {allCollectibles.length} item terkumpul
        </p>
      </div>

      {/* Grid */}
      <CollectionGrid
        collectibles={allCollectibles}
        unlockedIds={unlockedIds}
      />
    </div>
  );
}

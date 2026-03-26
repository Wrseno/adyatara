"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { CollectibleDetailModal } from "@/components/dashboard/collectible-detail-modal";

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

interface CollectibleItem {
  id: string;
  name: string;
  description: string | null;
  image: string;
  rarity: string;
  category: string | null;
  funFact?: string | null;
  wikipediaUrl?: string | null;
}

interface CollectionGridProps {
  collectibles: CollectibleItem[];
  unlockedIds: Set<string>;
}

export function CollectionGrid({
  collectibles,
  unlockedIds,
}: CollectionGridProps) {
  const [selectedCollectible, setSelectedCollectible] =
    useState<CollectibleItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleItemClick = (item: CollectibleItem) => {
    if (!unlockedIds.has(item.id)) return;
    setSelectedCollectible(item);
    setModalOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {collectibles.map((item) => {
          const isUnlocked = unlockedIds.has(item.id);

          return (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`relative bg-[#0D0907] border border-transparent group overflow-hidden transition-colors ${
                isUnlocked
                  ? "hover:border-[#D96B4A]/60 cursor-pointer"
                  : "opacity-50 cursor-default"
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
                    <p className="text-xs tracking-[0.2em] text-gray-600 uppercase transition duration-500 group-hover:text-orange-700">
                      Terkunci
                    </p>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="px-4 py-3 border-t border-gray-800/50">
                <p
                  className={`text-sm ${isUnlocked ? "text-gray-200" : "text-gray-600"}`}
                >
                  {isUnlocked ? item.name : "???"}
                </p>
                {isUnlocked && (
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`text-[11px] tracking-[0.15em] uppercase border px-1.5 py-0.5 ${rarityStyles[item.rarity]}`}
                    >
                      {rarityLabels[item.rarity] || item.rarity}
                    </span>
                    {item.category && (
                      <span className="text-xs text-gray-500">
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

      <CollectibleDetailModal
        collectible={selectedCollectible}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
}

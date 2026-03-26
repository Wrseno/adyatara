"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ExternalLink, Sparkles } from "lucide-react";

const rarityLabels: Record<string, string> = {
  common: "Umum",
  rare: "Langka",
  legendary: "Legendaris",
};

const rarityColors: Record<string, string> = {
  common: "text-gray-400 border-gray-600",
  rare: "text-blue-400 border-blue-600",
  legendary: "text-yellow-400 border-yellow-500",
};

interface CollectibleData {
  id: string;
  name: string;
  description: string | null;
  image: string;
  rarity: string;
  category: string | null;
  funFact: string | null;
  wikipediaUrl: string | null;
}

interface CollectibleDetailModalProps {
  collectible: CollectibleData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CollectibleDetailModal({
  collectible,
  open,
  onOpenChange,
}: CollectibleDetailModalProps) {
  if (!collectible) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0A0705]/95 border border-gray-800/80 backdrop-blur-sm rounded-none sm:max-w-xl p-0 overflow-hidden">
        {/* Corner brackets */}
        <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-gray-700/50 z-10" />
        <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-gray-700/50 z-10" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-gray-700/50 z-10" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-gray-700/50 z-10" />

        {/* Image */}
        <div className="aspect-16/10 overflow-hidden bg-[#1A1410]">
          <img
            src={collectible.image}
            alt={collectible.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="px-8 pb-8 space-y-5">
          <DialogHeader className="gap-3 pt-1">
            <div className="flex items-center gap-3">
              <div className="h-4 w-1 bg-orange-500" />
              <DialogTitle className="font-serif text-2xl text-white">
                {collectible.name}
              </DialogTitle>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs tracking-[0.15em] uppercase border px-2 py-0.5 ${rarityColors[collectible.rarity]}`}
              >
                {rarityLabels[collectible.rarity] || collectible.rarity}
              </span>
              {collectible.category && (
                <DialogDescription className="text-gray-500 text-sm m-0">
                  {collectible.category}
                </DialogDescription>
              )}
            </div>
          </DialogHeader>

          <div className="border-t border-gray-800/60" />

          {/* Description */}
          {collectible.description && (
            <p className="text-[15px] text-gray-300 leading-relaxed font-light">
              {collectible.description}
            </p>
          )}

          {/* Fun Fact */}
          {collectible.funFact && (
            <div className="bg-[#1A1410] border border-gray-800/50 p-5 space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D96B4A]" />
                <span className="text-xs tracking-[0.2em] uppercase text-[#D96B4A] font-medium">
                  Fun Fact
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed font-light">
                {collectible.funFact}
              </p>
            </div>
          )}

          {/* Wikipedia Link */}
          {collectible.wikipediaUrl && (
            <div className="pt-1">
              <a
                href={collectible.wikipediaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-8 px-4 rounded-none border border-gray-700/60 bg-background text-[11px] tracking-[0.2em] uppercase text-gray-400 hover:bg-gray-800/50 hover:text-white transition-colors"
              >
                Baca di Wikipedia
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

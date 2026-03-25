"use client";

import { GameMenu, Item } from "narraleaf-react";

export function AdyataraMenu({ items }: { items: number[] }) {
  return (
    <GameMenu className="absolute bottom-0 w-full h-full flex items-end justify-center pb-6 md:pb-8">
      <div className="max-w-6xl w-full mx-auto">
        <div className="bg-[#0A0705]/95 border border-gray-800/80 backdrop-blur-sm p-6 md:p-8 relative">
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-gray-700/50" />
          <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-gray-700/50" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-gray-700/50" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-gray-700/50" />
          
          {/* Menu title */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-4 w-1 bg-[#D96B4A]" />
            <p className="text-[#D96B4A] tracking-[0.15em] font-medium">
              Pilihlah jawabanmu:
            </p>
          </div>
          
          {/* Menu items */}
          <div className="space-y-3">
            {items.map((index) => (
              <Item
                key={index}
                className="w-full p-4 md:p-5 border border-gray-700/60 bg-transparent flex items-center gap-5 hover:border-[#D96B4A]/50 hover:bg-[#D96B4A]/5 cursor-pointer transition-all group"
              />
            ))}
          </div>
        </div>
      </div>
    </GameMenu>
  );
}

"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import {
  GameProviders,
  Player,
  useGame,
  Storable,
  LiveGame,
} from "narraleaf-react";
import { useSearchParams } from "next/navigation";
import { Loader2, Pause } from "lucide-react";
import { toast } from "sonner";
import type { Story } from "narraleaf-react";
import { loadStory, type StoryMeta } from "@/stories";
import { getGameNamespace } from "@/lib/game-utils";
import { AdyataraDialog } from "./adyatara-dialog";
import { AdyataraMenu } from "./adyatara-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function GamePlayer({
  story,
  storySlug,
  storyMeta,
}: {
  story: Story;
  storySlug: string;
  storyMeta: StoryMeta;
}) {
  const game = useGame();
  const startedRef = useRef(false);
  const liveGameRef = useRef<LiveGame | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setIsPaused(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (liveGameRef.current) {
        liveGameRef.current.game.dispose();
        liveGameRef.current = null;
        try {
          const eng = (game as any)?.engine;
          if (eng && eng.audio) {
            eng.audio.destroy?.();
            const ch =
              eng.audio.masterChannel?.getChannel?.("voice") ||
              eng.audio.getChannel?.("voice");
            if (ch) ch.remove?.();
          }
        } catch {
          // Ignore teardown errors during route transitions.
        }
      }
    };
  }, []);

  // Configure game immediately
  useEffect(() => {
    game.configure({
      dialog: AdyataraDialog,
      menu: AdyataraMenu,
      defaultTextColor: "#F5F0EB",
      defaultNametagColor: "#D96B4A",
      // Keep input scoped to player to avoid click/key carry-over
      // from previous UI interactions (e.g. menu choice -> next scene).
      useWindowListener: false,
    });
  }, [game]);

  const handleEnd = useCallback(
    async (ctx: { storable: InstanceType<typeof Storable> }) => {
      let score = 0;
      let ending = "neutral";
      try {
        if (ctx.storable.hasNamespace("game")) {
          const ns = getGameNamespace(ctx.storable);
          const raw = ns.get("score");
          score = typeof raw === "number" && !Number.isNaN(raw) ? raw : 0;
          ending = (ns.get("ending") as string) || "neutral";
        }
      } catch {
        // storable read failed, use defaults
      }

      let newCollectibles = 0;
      try {
        const res = await fetch("/api/game/finish", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            storySlug,
            score,
            title: storyMeta.title,
            ending,
          }),
        });
        const data = await res.json();
        newCollectibles = data.collectiblesUnlocked || 0;
      } catch {
        // Score save failed silently
      }

      // Toast: new collectibles
      if (newCollectibles > 0) {
        toast.success(`${newCollectibles} item koleksi baru ditemukan!`);
      }

      window.location.href = `/game/result?story=${storySlug}&ending=${ending}&score=${score}`;
    },
    [storySlug, storyMeta.title],
  );

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {/* Story title overlay */}
      <div className="absolute top-0 left-0 right-0 z-30 p-3 sm:p-4 lg:p-8 pointer-events-none">
        <div className="flex items-start justify-between">
          <div className="relative">
            {/* Darker at top, fades out toward bottom for readability */}
            <div className="absolute -left-6 -right-20 -top-6 -bottom-10 rounded-lg bg-gradient-to-b from-black/80 via-black/52 to-transparent blur-2xl [mask-image:linear-gradient(180deg,black_0%,black_72%,transparent_100%)]" />
            <div className="absolute -left-4 -right-12 -top-3 h-14 rounded-md bg-black/45 blur-lg" />

            <div className="relative">
            <div className="flex items-center gap-x-1.5 sm:gap-x-2 mb-0.5 sm:mb-1">
              <div className="h-3 sm:h-4 w-[2px] sm:w-1 bg-orange-500" />
              <p className="text-[8px] sm:text-[10px] lg:text-xs tracking-[0.1em] sm:tracking-[0.2em] text-[#D96B4A] font-extrabold uppercase">
                {storyMeta.description}
              </p>
            </div>

            <h2 className="text-sm sm:text-lg lg:text-2xl font-serif text-white">
              {storyMeta.title}
            </h2>
            <p className="text-[9px] sm:text-xs lg:text-sm mt-0.5 sm:mt-1 text-white">
              Tekan &quot;spasi&quot; untuk memulai/melanjutkan cerita
            </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="pointer-events-auto text-[#D96B4A] hover:text-[#E8724A] hover:bg-[#D96B4A]/10 w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10"
            onClick={() => setIsPaused(true)}
          >
            <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
          </Button>
        </div>
      </div>

      {/* Pause confirmation dialog */}
      <Dialog open={isPaused} onOpenChange={setIsPaused}>
        <DialogContent className="bg-[#0A0705]/95 border border-gray-800/80 backdrop-blur-sm rounded-none max-w-md p-6 lg:p-8">
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-gray-700/50" />
          <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-gray-700/50" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-gray-700/50" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-gray-700/50" />

          <DialogHeader className="gap-3">
            <div className="flex items-center gap-3">
              <div className="h-4 w-1 bg-orange-500" />
              <DialogTitle className="font-serif text-lg text-white">
                Keluar dari permainan?
              </DialogTitle>
            </div>
            <DialogDescription className="text-gray-500 text-xs tracking-[0.15em]">
              Progress tidak dapat tersimpan.
            </DialogDescription>
          </DialogHeader>

          <div className="border-t border-gray-800/60 my-2" />

          <DialogFooter className="gap-3 mx-0 mb-0 border-0 bg-transparent p-0 sm:justify-end">
            <Button
              variant="outline"
              onClick={() => setIsPaused(false)}
              className="rounded-none tracking-[0.2em] uppercase text-xs border-gray-700/60 text-gray-300 hover:bg-gray-800/50 hover:text-white"
            >
              Lanjutkan
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                liveGameRef.current?.game.dispose();
                window.location.href = "/explore";
              }}
              className="rounded-none tracking-[0.2em] uppercase text-xs"
            >
              Keluar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Player
        story={story}
        width="100vw"
        height="100vh"
        onReady={({ liveGame, storable }) => {
          liveGameRef.current = liveGame;
          if (!startedRef.current) {
            startedRef.current = true;

            // Start new game
            liveGame.newGame();
            const gameNs = Storable.createNamespace("game", {
              score: 0,
              ending: "",
            });
            storable.setNamespace("game", gameNs);
          }
        }}
        onEnd={(ctx) => handleEnd(ctx)}
        onError={(error) => {
          toast.error("Terjadi kesalahan: " + error.message);
        }}
      />
    </div>
  );
}

export function AdyataraPlayer() {
  const searchParams = useSearchParams();
  const storySlug = searchParams.get("story");
  const [storyData, setStoryData] = useState<{
    story: Story;
    meta: StoryMeta;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      if (!storySlug) {
        setError("Cerita tidak ditemukan");
        setLoading(false);
        return;
      }

      try {
        const data = await loadStory(storySlug);
        if (!data) {
          setError("Cerita tidak ditemukan");
          setLoading(false);
          return;
        }

        setStoryData({ story: data.default, meta: data.storyMeta });
      } catch {
        setError("Gagal memuat cerita");
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [storySlug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0705] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-[#D96B4A]" />
          <p className="text-[10px] tracking-[0.4em] text-gray-500 uppercase">
            Memuat cerita...
          </p>
        </div>
      </div>
    );
  }

  if (error || !storyData) {
    return (
      <div className="min-h-screen bg-[#0A0705] flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-serif text-[#D96B4A] mb-4">
          {error || "Cerita tidak ditemukan"}
        </h2>
        <button
          onClick={() => window.location.href = "/explore"}
          className="px-6 py-2 border border-[#D96B4A] text-[#D96B4A] hover:bg-[#D96B4A]/10 transition-colors"
        >
          Kembali ke Peta
        </button>
      </div>
    );
  }

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#0A0705" }}>
      <GameProviders>
        <GamePlayer
          story={storyData.story}
          storySlug={storySlug!}
          storyMeta={storyData.meta}
        />
      </GameProviders>
    </div>
  );
}

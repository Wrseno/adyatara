"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { GameProviders, Player, useGame, Storable } from "narraleaf-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { Story } from "narraleaf-react";
import { loadStory, type StoryMeta } from "@/stories";
import { getGameNamespace } from "@/lib/game-utils";
import { AdyataraDialog } from "./adyatara-dialog";
import { AdyataraMenu } from "./adyatara-menu";

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
  const router = useRouter();
  const startedRef = useRef(false);

  useEffect(() => {
    game.configure({
      dialog: AdyataraDialog,
      menu: AdyataraMenu,
      defaultTextColor: "#F5F0EB",
      defaultNametagColor: "#D96B4A",
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
      try {
        await fetch("/api/game/finish", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            storySlug,
            score,
            title: storyMeta.title,
            ending,
          }),
        });
      } catch {
        // Score save failed silently
      }
      router.push(
        `/game/result?story=${storySlug}&ending=${ending}&score=${score}`,
      );
    },
    [storySlug, storyMeta.title, router],
  );

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {/* Story title overlay */}
      <div className="absolute top-0 left-0 right-0 z-30 p-6 md:p-8 pointer-events-none">
        <div className="flex items-center gap-x-2 mb-1">
          <div className="h-4 w-1 bg-orange-500" />
          <p className="text-xs tracking-[0.2em] text-[#D96B4A] font-extrabold uppercase">
            {storyMeta.description}
          </p>
        </div>

        <h2 className="text-2xl font-serif text-white">{storyMeta.title}</h2>
        <p className="text-sm mt-1 text-white">
          Tekan "spasi" untuk memulai/melanjutkan cerita
        </p>
      </div>

      <Player
        story={story}
        width="100vw"
        height="100vh"
        onReady={({ liveGame, storable }) => {
          if (!startedRef.current) {
            startedRef.current = true;
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
  const router = useRouter();
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
          onClick={() => router.push("/dashboard")}
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

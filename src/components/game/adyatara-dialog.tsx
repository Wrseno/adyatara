"use client";

import { useEffect } from "react";
import { Dialog, Nametag, Texts, useVoiceState } from "narraleaf-react";

function waitForFirstUserGesture(): Promise<void> {
  return new Promise((resolve) => {
    const handler = () => {
      cleanup();
      resolve();
    };

    const cleanup = () => {
      window.removeEventListener("click", handler);
      window.removeEventListener("touchstart", handler);
      window.removeEventListener("keydown", handler);
    };

    window.addEventListener("click", handler, { once: true });
    window.addEventListener("touchstart", handler, { once: true });
    window.addEventListener("keydown", handler, { once: true });
  });
}

/**
 * Inner component rendered inside <Dialog> so it has access to the
 * sentence context that useVoiceState reads.
 * Triggers playVoice() once every time a new voiced sentence starts.
 */
function VoiceAutoPlay() {
  const { voice, playVoice } = useVoiceState();

  useEffect(() => {
    if (!voice) return;

    let cancelled = false;

    const run = async () => {
      try {
        await playVoice();
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown audio error";

        if (!message.includes("Audio context is not ready") || cancelled) {
          return;
        }

        await waitForFirstUserGesture();
        if (cancelled) return;

        try {
          await playVoice();
        } catch {
          // Ignore second failure; next sentence or interaction can retry.
        }
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voice]); // re-run only when the Sound object changes (= new sentence)

  return null;
}

export function AdyataraDialog() {
  return (
    <Dialog className="relative bg-[#0A0705]/95 border border-gray-800/80 backdrop-blur-sm p-6 md:p-8 max-w-6xl mx-auto w-full">
      {/* Corner brackets */}
      <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-gray-700/50" />
      <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-gray-700/50" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-gray-700/50" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-gray-700/50" />

      {/* Auto-plays voice for each sentence that has one */}
      <VoiceAutoPlay />

      <div className="flex items-center gap-3 mb-4">
        <div className="h-4 w-1 bg-orange-500" />
        <Nametag className="text-sm tracking-[0.4em] uppercase font-medium" />
      </div>

      <Texts className="adyatara-dialog-texts leading-relaxed font-light text-justify wrap-break-words whitespace-pre-wrap w-full" />
    </Dialog>
  );
}

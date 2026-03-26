"use client";

import { useEffect, useState, useRef, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Minimize2,
  Music,
} from "lucide-react";
import { useAudioStore } from "@/hooks/use-audio-store";
import { cn } from "@/lib/utils";

// Hydration-safe mounted check
const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
}

/**
 * Draggable floating audio player for Indonesian regional music
 * Hidden when user is on /game route
 */
export function AudioPlayer() {
  const pathname = usePathname();
  const isGameRoute = pathname?.startsWith("/game");
  const isMounted = useIsMounted();

  const {
    currentSong,
    isPlaying,
    volume,
    currentTime,
    duration,
    isMinimized,
    position,
    togglePlay,
    next,
    prev,
    seekTo,
    setVolume,
    setIsMinimized,
    setPosition,
  } = useAudioStore();

  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const playerRef = useRef<HTMLDivElement>(null);

  // Handle drag start
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!playerRef.current) return;

    const rect = playerRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsDragging(true);
  };

  // Handle drag move
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;

      // Constrain to viewport
      const maxX = window.innerWidth - (playerRef.current?.offsetWidth || 0);
      const maxY = window.innerHeight - (playerRef.current?.offsetHeight || 0);

      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset, setPosition]);

  // Don't render during SSR or before hydration
  if (!isMounted) {
    return null;
  }

  // Hide player on game route
  if (isGameRoute) {
    return null;
  }

  // Don't render until we have a song
  if (!currentSong) {
    return null;
  }

  // Format time (seconds to MM:SS)
  const formatTime = (seconds: number) => {
    if (!isFinite(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Progress percentage
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      {/* Minimized view */}
      {isMinimized && (
        <div
          ref={playerRef}
          className="fixed z-50 cursor-move select-none"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
          onMouseDown={handleMouseDown}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized(false);
            }}
            className="group relative bg-[#0A0705]/95 border border-gray-800 p-3 backdrop-blur-sm hover:border-[#D96B4A]/60 transition-colors"
          >
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-gray-700/50 group-hover:border-[#D96B4A]/60" />
            <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-gray-700/50 group-hover:border-[#D96B4A]/60" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-gray-700/50 group-hover:border-[#D96B4A]/60" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-gray-700/50 group-hover:border-[#D96B4A]/60" />

            <Music
              className={cn(
                "w-5 h-5",
                isPlaying ? "text-[#D96B4A]" : "text-gray-400",
              )}
            />
          </button>
        </div>
      )}

      {/* Expanded view */}
      {!isMinimized && (
        <div
          ref={playerRef}
          className="fixed z-50 bg-[#0A0705]/95 border border-gray-800 backdrop-blur-sm select-none w-80"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        >
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-gray-700/50" />
          <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-gray-700/50" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-gray-700/50" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-gray-700/50" />

          {/* Drag handle + minimize button */}
          <div
            className="flex items-center justify-between px-3 py-2 cursor-move border-b border-gray-800/60"
            onMouseDown={handleMouseDown}
          >
            <div className="flex items-center gap-2 text-gray-500 text-xs">
              <span className="text-[10px] tracking-[0.2em] uppercase">
                Music
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMinimized(true);
              }}
              className="text-gray-500 hover:text-[#D96B4A] transition-colors p-1"
            >
              <Minimize2 className="w-3 h-3" />
            </button>
          </div>

          {/* Song info */}
          <div className="px-4 py-3 border-b border-gray-800/60">
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-10 h-10 bg-[#0D0907] border border-gray-800/80 flex items-center justify-center">
                <Music className="w-5 h-5 text-[#D96B4A]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium text-sm truncate">
                  {currentSong.title}
                </h3>
                <p className="text-gray-500 text-xs mt-0.5">
                  {currentSong.region}
                </p>
              </div>
            </div>
          </div>

          {/* Progress bar - seekable */}
          <div className="px-4 py-2">
            <div className="flex items-center gap-2 text-[10px] text-gray-600">
              <span className="w-8 text-right">{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={(e) => seekTo(Number(e.target.value))}
                className="flex-1 h-1 appearance-none cursor-pointer rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:bg-[#D96B4A] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:-mt-0.75 [&::-moz-range-thumb]:w-2.5 [&::-moz-range-thumb]:h-2.5 [&::-moz-range-thumb]:bg-[#D96B4A] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:rounded-full [&::-moz-range-track]:h-1 [&::-moz-range-track]:rounded-full"
                style={{
                  background: `linear-gradient(to right, #D96B4A ${progress}%, rgb(31 41 55 / 0.8) ${progress}%)`,
                }}
              />
              <span className="w-8">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Playback controls */}
          <div className="px-4 py-3 border-t border-gray-800/60">
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={prev}
                className="text-gray-400 hover:text-white transition-colors p-2"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              <button
                onClick={togglePlay}
                className="bg-[#D96B4A] hover:bg-[#E8724A] text-white p-3 transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" fill="currentColor" />
                ) : (
                  <Play className="w-5 h-5" fill="currentColor" />
                )}
              </button>

              <button
                onClick={next}
                className="text-gray-400 hover:text-white transition-colors p-2"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Volume control */}
          <div className="px-4 py-3 border-t border-gray-800/60">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setVolume(volume > 0 ? 0 : 0.7)}
                className="text-gray-400 hover:text-white transition-colors shrink-0"
              >
                {volume === 0 ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>

              <input
                type="range"
                min="0"
                max="100"
                value={volume * 100}
                onChange={(e) => setVolume(Number(e.target.value) / 100)}
                className="flex-1 h-1 appearance-none cursor-pointer rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-[#D96B4A] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:-mt-1 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:bg-[#D96B4A] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:rounded-full [&::-moz-range-track]:h-1 [&::-moz-range-track]:rounded-full"
                style={{
                  background: `linear-gradient(to right, #D96B4A ${volume * 100}%, rgb(31 41 55 / 0.8) ${volume * 100}%)`,
                }}
              />

              <span className="text-[10px] text-gray-600 w-8 text-right">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

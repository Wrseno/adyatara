"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useAudioStore } from "@/hooks/use-audio-store";

/**
 * AudioPlayerProvider manages the actual HTML5 audio element
 * and syncs it with the Zustand store state.
 * 
 * This provider should wrap the entire app to enable audio playback.
 */
export function AudioPlayerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentSongIdRef = useRef<string | null>(null);
  const isAudioReadyRef = useRef(false);
  const pathname = usePathname();

  const {
    currentSong,
    isPlaying,
    volume,
    currentTime,
    seekTime,
    setIsPlaying,
    setCurrentTime,
    setDuration,
    clearSeek,
    initialize,
    next,
  } = useAudioStore();

  // Initialize with random song on mount
  useEffect(() => {
    initialize();
  }, [initialize]);

  // Hide/pause when on /game route
  const isGameRoute = pathname?.startsWith("/game");

  useEffect(() => {
    if (isGameRoute && isPlaying) {
      setIsPlaying(false);
    }
  }, [isGameRoute, isPlaying, setIsPlaying]);

  // Handle seek requests
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || seekTime === null) return;

    // Apply seek to audio element
    audio.currentTime = seekTime;
    clearSeek();
  }, [seekTime, clearSeek]);

  // Sync audio element with current song
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    // Only load new song if song ID changed
    if (currentSongIdRef.current !== currentSong.id) {
      currentSongIdRef.current = currentSong.id;
      isAudioReadyRef.current = false;
      
      // Encode the URL properly for spaces and special characters
      const encodedSrc = encodeURI(currentSong.src);
      audio.src = encodedSrc;
      audio.load();
      
      // Mark audio as ready when it can play
      const handleCanPlay = () => {
        if (currentTime > 0 && currentTime < audio.duration) {
          audio.currentTime = currentTime;
        }
        isAudioReadyRef.current = true;
        audio.removeEventListener("canplay", handleCanPlay);
      };
      audio.addEventListener("canplay", handleCanPlay);
    }
  }, [currentSong, currentTime]);

  // Sync play/pause state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    if (isPlaying) {
      // If audio is not ready yet, wait for it
      if (!isAudioReadyRef.current) {
        const handleCanPlayThrough = () => {
          audio.play().catch((error) => {
            console.error("Audio play failed:", error);
            setIsPlaying(false);
          });
          audio.removeEventListener("canplaythrough", handleCanPlayThrough);
        };
        audio.addEventListener("canplaythrough", handleCanPlayThrough);
        return () => {
          audio.removeEventListener("canplaythrough", handleCanPlayThrough);
        };
      }
      
      const playPromise = audio.play();
      // Handle play promise to avoid errors
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Audio play failed:", error);
          setIsPlaying(false);
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, setIsPlaying, currentSong]);

  // Sync volume
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
  }, [volume]);

  // Set up audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      // Auto-play next song when current ends
      next();
      setIsPlaying(true);
    };

    const handleError = (e: Event) => {
      const audioElement = e.target as HTMLAudioElement;
      console.error("Audio error:", audioElement.error?.message || "Unknown error");
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [setCurrentTime, setDuration, setIsPlaying, next]);

  return (
    <>
      {children}
      {/* Hidden audio element */}
      <audio ref={audioRef} preload="auto" />
    </>
  );
}

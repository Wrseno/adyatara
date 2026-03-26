import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Song } from "@/lib/music-data";
import { getRandomSong } from "@/lib/music-data";

interface Position {
  x: number;
  y: number;
}

interface AudioState {
  // Playback state
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number; // 0-1
  currentTime: number; // seconds
  duration: number; // seconds
  seekTime: number | null; // Used to trigger seek in provider

  // UI state
  isMinimized: boolean;
  position: Position;

  // Play history for smart shuffle (stores last 3-4 song IDs)
  playHistory: string[];

  // Actions
  setCurrentSong: (song: Song | null) => void;
  setIsPlaying: (playing: boolean) => void;
  setVolume: (volume: number) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setIsMinimized: (minimized: boolean) => void;
  setPosition: (position: Position) => void;
  
  // Playback controls
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  next: () => void;
  prev: () => void;
  seekTo: (time: number) => void; // Seek to specific time
  clearSeek: () => void; // Clear seek after provider handles it
  
  // Initialize with random song
  initialize: () => void;
  
  // Add song to play history
  addToHistory: (songId: string) => void;
}

const HISTORY_LIMIT = 4; // Keep last 4 songs in history

// Safe default position that works on SSR (bottom-right)
const getDefaultPosition = (): Position => {
  if (typeof window !== "undefined") {
    return { 
      x: window.innerWidth - 340, // 320px width + 20px margin
      y: window.innerHeight - 280 
    };
  }
  return { x: 500, y: 500 }; // Fallback for SSR
};

export const useAudioStore = create<AudioState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentSong: null,
      isPlaying: false,
      volume: 0.7,
      currentTime: 0,
      duration: 0,
      seekTime: null,
      isMinimized: false,
      position: getDefaultPosition(),
      playHistory: [],

      // Setters
      setCurrentSong: (song) => set({ currentSong: song }),
      setIsPlaying: (playing) => set({ isPlaying: playing }),
      setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),
      setCurrentTime: (time) => set({ currentTime: time }),
      setDuration: (duration) => set({ duration: duration }),
      setIsMinimized: (minimized) => set({ isMinimized: minimized }),
      setPosition: (position) => set({ position }),

      // Playback controls
      play: () => set({ isPlaying: true }),
      pause: () => set({ isPlaying: false }),
      togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

      seekTo: (time) => set({ seekTime: time, currentTime: time }),
      clearSeek: () => set({ seekTime: null }),

      next: () => {
        const state = get();
        const nextSong = getRandomSong(state.playHistory);
        set({ 
          currentSong: nextSong,
          currentTime: 0,
          seekTime: null,
        });
        // Add to history
        get().addToHistory(nextSong.id);
      },

      prev: () => {
        const state = get();
        
        // If we're more than 3 seconds into the song, restart it
        if (state.currentTime > 3) {
          set({ seekTime: 0, currentTime: 0 });
          return;
        }

        // Otherwise, go to previous song (random from available pool)
        const prevSong = getRandomSong(state.playHistory);
        set({ 
          currentSong: prevSong,
          currentTime: 0,
          seekTime: null,
        });
        // Add to history
        get().addToHistory(prevSong.id);
      },

      initialize: () => {
        const state = get();
        // Only initialize if no song is set
        if (!state.currentSong) {
          const firstSong = getRandomSong();
          set({ currentSong: firstSong });
          get().addToHistory(firstSong.id);
        }
      },

      addToHistory: (songId) => {
        set((state) => {
          const newHistory = [songId, ...state.playHistory];
          // Keep only last HISTORY_LIMIT songs
          return {
            playHistory: newHistory.slice(0, HISTORY_LIMIT),
          };
        });
      },
    }),
    {
      name: "audio-player-storage",
      partialize: (state) => ({
        // Persist these fields
        currentSong: state.currentSong,
        volume: state.volume,
        currentTime: state.currentTime,
        isMinimized: state.isMinimized,
        position: state.position,
        playHistory: state.playHistory,
        // Don't persist isPlaying, seekTime (always start paused)
      }),
    }
  )
);

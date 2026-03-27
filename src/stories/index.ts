import type { Story } from "narraleaf-react";

export interface StoryMeta {
  title: string;
  region: string;
  description: string;
  difficulty: string;
  coverImage: string;
}

type StoryModule = { default: Story; storyMeta: StoryMeta };

export const storyRegistry: Record<string, () => Promise<StoryModule>> = {
  "prambanan": () => import("./prambanan"),
  "timun-mas": () => import("./timun-mas"),
  "malin-kundang": () => import("./malin-kundang"),
  "danau-tondano": () => import("./danau-tondano"),
};

export const storyInfoMap: Record<string, { title: string; coverImage: string }> = {
  "prambanan": { title: "Legenda Candi Prambanan", coverImage: "/images/jawa-tengah.webp" },
  "timun-mas": { title: "Legenda Timun Mas", coverImage: "/images/jawa-tengah.webp" },
  "malin-kundang": { title: "Malin Kundang", coverImage: "/images/sumatera-barat.webp" },
  "danau-tondano": { title: "Legenda Danau Tondano", coverImage: "/images/sulawesi-utara.webp" },
};

export const endingLabels: Record<string, { label: string; color: string }> = {
  best: { label: "Best Ending", color: "#F5C542" },
  good: { label: "Good Ending", color: "#4ADE80" },
  neutral: { label: "Neutral Ending", color: "#9CA3AF" },
  bad: { label: "Bad Ending", color: "#EF4444" },
};

export const provinceStoryMap: Record<string, string> = {
  "Yogyakarta": "prambanan",
  "Jawa Tengah": "timun-mas",
  "Sumatera Barat": "malin-kundang",
  "Sulawesi Utara": "danau-tondano",
};

export async function loadStory(slug: string): Promise<StoryModule | null> {
  const loader = storyRegistry[slug];
  if (!loader) return null;
  return loader();
}

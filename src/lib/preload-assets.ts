/**
 * Asset preloader for visual novel stories
 * Preloads critical images and audio before game starts
 */

export interface PreloadProgress {
  loaded: number;
  total: number;
  percent: number;
  currentAsset?: string;
}

type ProgressCallback = (progress: PreloadProgress) => void;

/**
 * Preload a single image
 */
function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

/**
 * Preload a single audio file
 */
function preloadAudio(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    audio.oncanplaythrough = () => resolve();
    audio.onerror = () => reject(new Error(`Failed to load audio: ${src}`));
    audio.preload = "auto";
    audio.src = src;
  });
}

/**
 * Extract asset URLs from story module
 * This extracts background images, character images, and first BGM
 */
export function extractCriticalAssets(storySlug: string): {
  images: string[];
  audio: string[];
} {
  // Define critical assets per story (first scene bg + first characters + first BGM)
  const assetMap: Record<string, { images: string[]; audio: string[] }> = {
    "timun-mas": {
      images: [
        "/images/stories/timun-mas/bg/village-day.webp",
        "/images/stories/timun-mas/chars/mboksrini/1.webp",
        "/images/stories/timun-mas/chars/mboksrini/2.webp",
      ],
      audio: ["/music/timun-mas/1.mp3"],
    },
    prambanan: {
      images: [
        "/images/stories/prambanan/1.webp",
        "/images/stories/prambanan/2.webp",
        "/images/stories/prambanan/bandung/1.webp",
      ],
      audio: ["/music/prambanan/1.mp3"],
    },
    "danau-tondano": {
      images: [
        "/images/stories/danau-tondano/bg/panorama.webp",
        "/images/stories/danau-tondano/bg/village_north.webp",
      ],
      audio: ["/music/danau-tondano/minahasa_intro.mp3"],
    },
  };

  return assetMap[storySlug] || { images: [], audio: [] };
}

/**
 * Preload all critical assets for a story with progress tracking
 */
export async function preloadStoryAssets(
  storySlug: string,
  onProgress?: ProgressCallback,
): Promise<void> {
  const { images, audio } = extractCriticalAssets(storySlug);
  const allAssets = [...images, ...audio];
  const total = allAssets.length;

  if (total === 0) {
    onProgress?.({ loaded: 0, total: 0, percent: 100 });
    return;
  }

  let loaded = 0;

  const loadAsset = async (src: string) => {
    try {
      onProgress?.({
        loaded,
        total,
        percent: Math.round((loaded / total) * 100),
        currentAsset: src.split("/").pop(),
      });

      if (src.match(/\.(mp3|wav|ogg)$/i)) {
        await preloadAudio(src);
      } else {
        await preloadImage(src);
      }

      loaded++;
      onProgress?.({
        loaded,
        total,
        percent: Math.round((loaded / total) * 100),
        currentAsset: src.split("/").pop(),
      });
    } catch {
      // Continue loading other assets even if one fails
      loaded++;
      console.warn(`Failed to preload: ${src}`);
    }
  };

  // Load images in parallel (up to 4 at a time for performance)
  const chunkSize = 4;
  for (let i = 0; i < allAssets.length; i += chunkSize) {
    const chunk = allAssets.slice(i, i + chunkSize);
    await Promise.all(chunk.map(loadAsset));
  }
}

/**
 * Prefetch story module (code splitting)
 */
export function prefetchStoryModule(storySlug: string): void {
  // This hints to webpack to prefetch the story module
  switch (storySlug) {
    case "timun-mas":
      import("@/stories/timun-mas");
      break;
    case "prambanan":
      import("@/stories/prambanan");
      break;
    case "danau-tondano":
      import("@/stories/danau-tondano");
      break;
  }
}

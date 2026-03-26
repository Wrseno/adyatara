export interface Song {
  id: string;
  title: string;
  region: string;
  src: string;
}

/**
 * Indonesian regional music collection
 * Files located in /public/music/regional/
 * Naming convention: "Title_Region.mp3"
 */
export const regionalSongs: Song[] = [
  {
    id: "ampar-ampar-pisang",
    title: "Ampar Ampar Pisang",
    region: "Kalimantan Selatan",
    src: "/music/regional/Ampar Ampar Pisang_Kalimantan Selatan.mp3",
  },
  {
    id: "bubuy-bulan",
    title: "Bubuy Bulan",
    region: "Jawa Barat",
    src: "/music/regional/Bubuy Bulan_Jawa Barat.mp3",
  },
  {
    id: "bungong-jeumpa",
    title: "Bungong Jeumpa",
    region: "Aceh",
    src: "/music/regional/Bungong Jeumpa_Aceh.mp3",
  },
  {
    id: "gundul-gundul-pacul",
    title: "Gundul-Gundul Pacul",
    region: "Jawa Tengah",
    src: "/music/regional/Gundul-Gundul Pacul_Jawa Tengah.mp3",
  },
  {
    id: "rasa-sayange",
    title: "Rasa Sayange",
    region: "Maluku",
    src: "/music/regional/Rasa Sayange_Maluku.mp3",
  },
  {
    id: "si-patokaan",
    title: "Si Patokaan",
    region: "Sulawesi Utara",
    src: "/music/regional/Si Patokaan_Sulawesi Utara.mp3",
  },
  {
    id: "sinanggar-tullo",
    title: "Sinanggar Tullo",
    region: "Sumatra Utara",
    src: "/music/regional/Sinanggar Tullo_Sumatra Utara.mp3",
  },
  {
    id: "yamko-rambe-yamko",
    title: "Yamko Rambe Yamko",
    region: "Papua",
    src: "/music/regional/Yamko Rambe Yamko_Papua.mp3",
  },
];

/**
 * Get a random song, excluding recently played songs
 * @param excludeIds - Array of song IDs to exclude (recent play history)
 * @returns A random song not in the exclude list, or a random song if all excluded
 */
export function getRandomSong(excludeIds: string[] = []): Song {
  const availableSongs = regionalSongs.filter(
    (song) => !excludeIds.includes(song.id)
  );

  // If all songs are excluded, reset and pick from all
  const pool = availableSongs.length > 0 ? availableSongs : regionalSongs;

  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex]!;
}

/**
 * Mapping: storySlug → ending → collectible NAMES to award.
 * Using names instead of IDs makes it more robust against database seeds/resets.
 */
export const storyCollectibleMap: Record<string, Record<string, string[]>> = {
  prambanan: {
    best: [
      "Candi Prambanan",
      "Keris Yogyakarta",
      "Gamelan Jawa",
      "Wayang Kulit",
      "Batik Parang",
    ],
    neutral: [
      "Wayang Kulit",
      "Batik Parang",
    ],
    bad: [
      "Gudeg",
    ],
  },
  "timun-mas": {
    best: [
      "Malioboro",
      "Angklung",
      "Nasi Pecel",
    ],
    bad: [
      "Jamu Tradisional",
      "Lumpia Semarang",
      "Rumah Joglo",
    ],
  },
  "danau-tondano": {
    best: [
      "Monumen Yesus Memberkati",
      "Rumah Woloan",
      "Pedang Bara Sangihe",
    ],
    bad: [
      "Tari Kabasaran",
      "Alat Musik Kolintang",
      "Tinutuan",
    ],
  },
};

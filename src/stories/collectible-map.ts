/**
 * Mapping: storySlug → ending → collectible IDs to award.
 * Kept in a separate file (no narraleaf-react dependency) so it can
 * be safely imported from server-side API routes.
 */
export const storyCollectibleMap: Record<string, Record<string, string[]>> = {
  prambanan: {
    best: [
      "cmn4d50ui000gvksbd7roi8nw", // Candi Prambanan (legendary)
      "cmn4d50uh000evksbfj6g8qvg", // Keris Yogyakarta (rare)
      "cmn4d50ui000fvksbyzepdfqp", // Gamelan Jawa (rare)
    ],
    neutral: [
      "cmn4d50ui000ivksbt9f7oju9", // Wayang Kulit (rare)
      "cmn4d50uh000dvksbqfdfzlh2", // Batik Parang (common)
    ],
    bad: [
      "cmn4d50ui000hvksbcx6nk7pv", // Gudeg (common)
    ],
  },
  "timun-mas": {
    best: [
      "cmn4d53a3000yvksbzqsvarci", // Reog Ponorogo (legendary)
      "cmn4d53a3000xvksbwte9wz17", // Angklung (rare)
      "cmn4d53a3000zvksb38mn3t80", // Topeng Cirebon (rare)
    ],
    bad: [
      "cmn4d53a3000vvksbih55v7qz", // Batik Mega Mendung (common)
      "cmn4d53a3000wvksb0r3ct3eq", // Jamu Tradisional (common)
      "cmn4d53a30010vksbnlpnf8ud", // Lumpia Semarang (common)
    ],
  },
};

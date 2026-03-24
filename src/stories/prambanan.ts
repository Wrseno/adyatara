import {
  Scene,
  Character,
  Story,
  Menu,
  Script,
  Image,
  Sound,
} from "narraleaf-react";
import { addScore, setEnding, unlockKnowledge } from "@/lib/game-utils";

// --- KARAKTER ---
const narrator = new Character("Narator", { color: "#D96B4A" });
const bandung = new Character("Bandung Bondowoso", { color: "#E86B52" });
const roro = new Character("Roro Jonggrang", { color: "#EAA87E" });
const jin = new Character("Jin", { color: "#DA2525" });

// --- GAMBAR EKSPRESI KARAKTER ---
const IMG = { zoom: 0.7, position: { yalign: 0.45, xalign: 0.5 } };

// Bandung Bondowoso
const imgBandung1 = new Image({
  src: "/images/stories/prambanan/bandung/1.webp",
  ...IMG,
});
const imgBandung2 = new Image({
  src: "/images/stories/prambanan/bandung/2.webp",
  ...IMG,
});
const imgBandung3 = new Image({
  src: "/images/stories/prambanan/bandung/3.webp",
  ...IMG,
});
const imgBandung5 = new Image({
  src: "/images/stories/prambanan/bandung/5.webp",
  ...IMG,
});
const imgBandung6 = new Image({
  src: "/images/stories/prambanan/bandung/6.webp",
  ...IMG,
});
const imgBandung7 = new Image({
  src: "/images/stories/prambanan/bandung/7.webp",
  ...IMG,
});
const imgBandung8 = new Image({
  src: "/images/stories/prambanan/bandung/8.webp",
  ...IMG,
});
const imgBandung9 = new Image({
  src: "/images/stories/prambanan/bandung/9.webp",
  ...IMG,
});
const imgBandung10 = new Image({
  src: "/images/stories/prambanan/bandung/10.webp",
  ...IMG,
});

// Roro Jonggrang
const imgRoro1 = new Image({
  src: "/images/stories/prambanan/roro/1.webp",
  ...IMG,
});
const imgRoro2 = new Image({
  src: "/images/stories/prambanan/roro/2.webp",
  ...IMG,
});
const imgRoro4 = new Image({
  src: "/images/stories/prambanan/roro/4.webp",
  ...IMG,
});
const imgRoro5 = new Image({
  src: "/images/stories/prambanan/roro/5.webp",
  ...IMG,
});
const imgRoro6 = new Image({
  src: "/images/stories/prambanan/roro/6.webp",
  ...IMG,
});
const imgRoro7 = new Image({
  src: "/images/stories/prambanan/roro/7.webp",
  ...IMG,
});
const imgRoro8 = new Image({
  src: "/images/stories/prambanan/roro/8.webp",
  ...IMG,
});

// Jin Guardian
const imgJin1 = new Image({
  src: "/images/stories/prambanan/jin/1.webp",
  ...IMG,
});
const imgJin2 = new Image({
  src: "/images/stories/prambanan/jin/2.webp",
  ...IMG,
});

const imgJin3 = new Image({
  src: "/images/stories/prambanan/jin/3.webp",
  ...IMG,
});

const imgJin4 = new Image({
  src: "/images/stories/prambanan/jin/4.webp",
  ...IMG,
});

// --- VOICE ACTING ---

// Bandung Bondowoso
const vBandung1 = new Sound({ src: "/audio/prambanan/bandung/1.mp3" });
const vBandung2 = new Sound({ src: "/audio/prambanan/bandung/2.mp3" });
const vBandung3 = new Sound({ src: "/audio/prambanan/bandung/3.mp3" });
const vBandung5 = new Sound({ src: "/audio/prambanan/bandung/5.mp3" });
const vBandung6 = new Sound({ src: "/audio/prambanan/bandung/6.mp3" });
const vBandung7 = new Sound({ src: "/audio/prambanan/bandung/7.mp3" });
const vBandung8 = new Sound({ src: "/audio/prambanan/bandung/8.mp3" });
const vBandung9 = new Sound({ src: "/audio/prambanan/bandung/9.mp3" });
const vBandung10 = new Sound({ src: "/audio/prambanan/bandung/10.mp3" });
const vBandung11 = new Sound({ src: "/audio/prambanan/bandung/1-1.mp3" });
const vBandung12 = new Sound({ src: "/audio/prambanan/bandung/12.mp3" });

// Roro Jonggrang
const vRoro1 = new Sound({ src: "/audio/prambanan/roro/1.mp3" });
const vRoro2 = new Sound({ src: "/audio/prambanan/roro/2.mp3" });
const vRoro3 = new Sound({ src: "/audio/prambanan/roro/3.mp3" });
const vRoro4 = new Sound({ src: "/audio/prambanan/roro/4.mp3" });
const vRoro5 = new Sound({ src: "/audio/prambanan/roro/5.mp3" });
const vRoro6 = new Sound({ src: "/audio/prambanan/roro/6.mp3" });
const vRoro7 = new Sound({ src: "/audio/prambanan/roro/7.mp3" });

// Jin Guardian
const vJin1 = new Sound({ src: "/audio/prambanan/jin/1.mp3" });
const vJin2 = new Sound({ src: "/audio/prambanan/jin/2.mp3" });
const vJin3 = new Sound({ src: "/audio/prambanan/jin/3.mp3" });
// TODO: Tambahkan voice untuk jawaban kuis Jin
const vJin4 = new Sound({ src: "/audio/prambanan/jin/4.mp3" }); // "Benar! Joglo adalah..."
const vJin5 = new Sound({ src: "/audio/prambanan/jin/5.mp3" }); // "Salah! Limasan bukan..."
const vJin6 = new Sound({ src: "/audio/prambanan/jin/6.mp3" }); // "Salah! Rumah Gadang berasal..."

// --- BACKGROUND MUSIC (BGM) ---
const soundConfigBgm = { volume: 0.2, loop: true, sync: false };

const bgm1 = Sound.bgm({
  ...soundConfigBgm,
  src: "/music/prambanan/1.mp3",
}); // Intro — damai
const bgm2 = Sound.bgm({
  ...soundConfigBgm,
  src: "/music/prambanan/2.mp3",
}); // Choice1 — penuh pertimbangan
const bgm3 = Sound.bgm({
  ...soundConfigBgm,
  src: "/music/prambanan/3.mp3",
}); // Proposal — romantis
const bgm4 = Sound.bgm({
  ...soundConfigBgm,
  src: "/music/prambanan/4.mp3",
}); // Force — tegang/gelap
const bgm5 = Sound.bgm({
  ...soundConfigBgm,
  src: "/music/prambanan/5.mp3",
}); // Challenge — dramatis
const bgm6 = Sound.bgm({
  ...soundConfigBgm,
  src: "/music/prambanan/6.mp3",
}); // Build — epik
// TODO: Tambahkan BGM untuk scene quiz
const bgm7 = Sound.bgm({ ...soundConfigBgm, src: "/music/prambanan/7.mp3" }); // Quiz1 — mistis/magis

// --- PENGATURAN BACKGROUND SCENE ---
const sceneIntro = new Scene("intro", {
  background: "/images/stories/prambanan/1.webp",
  backgroundMusic: bgm1,
  backgroundMusicFade: 1000,
});

const sceneChoice1 = new Scene("choice1", {
  background: "/images/stories/prambanan/2.webp",
  backgroundMusic: bgm2,
  backgroundMusicFade: 1000,
});

const sceneProposal = new Scene("proposal", {
  background: "/images/stories/prambanan/3.webp",
  backgroundMusic: bgm3,
  backgroundMusicFade: 1000,
});

const sceneForce = new Scene("force", {
  background: "/images/stories/prambanan/4.webp",
  backgroundMusic: bgm4,
  backgroundMusicFade: 1000,
});

const sceneChallenge = new Scene("challenge", {
  background: "/images/stories/prambanan/5.webp",
  backgroundMusic: bgm5,
  backgroundMusicFade: 1000,
});

const sceneBuild = new Scene("build", {
  background: "/images/stories/prambanan/6.webp",
  backgroundMusic: bgm6,
  backgroundMusicFade: 1000,
});

const sceneBest = new Scene("best", {
  background: "/images/stories/prambanan/6.webp",
  backgroundMusic: bgm6,
  backgroundMusicFade: 1000,
});

const sceneQuiz1 = new Scene("quiz1", {
  background: "/images/stories/prambanan/7.webp",
  backgroundMusic: bgm7,
  backgroundMusicFade: 1000,
});

// --- STORY FLOW ---

// 1. INTRO — Dua kerajaan bermusuhan
sceneIntro.action([
  narrator.say`Di sebuah zaman dahulu kala, terdapat dua kerajaan yang saling bermusuhan, yaitu Pengging dan Boko.`,
  narrator.say`Kerajaan Pengging dipimpin oleh seorang raja yang memiliki putra perkasa bernama Bandung Bondowoso.`,
  narrator.say`Sementara itu, Kerajaan Boko memiliki seorang putri yang sangat cantik jelita bernama Roro Jonggrang.`,
  sceneIntro.jumpTo(sceneChoice1),
]);

// 2. PILIHAN — Bandung melihat Roro
sceneChoice1.action([
  imgBandung1.show({ ease: "easeInOut", duration: 1000 }),
  vBandung1.play(),
  bandung.say`Kamu adalah Bandung Bondowoso yang baru saja memenangkan perang setelah menaklukkan Kerajaan Boko.`,
  vBandung1.stop(),
  vBandung11.play(),
  bandung.say`Kamu melihat putri kerajaan musuh, Roro Jonggrang yang sedang berduka, namun kamu justru jatuh hati kepadanya.`,
  vBandung11.stop(),
  imgBandung1.hide({ ease: "easeInOut", duration: 1000 }),

  Menu.prompt("Apa yang kamu lakukan?")
    .choose("Lamar dia dengan sopan", [
      Script.execute(({ storable }) => addScore(storable, 30)),
      sceneChoice1.jumpTo(sceneProposal),
    ])
    .choose("Gunakan kekuatan untuk memaksanya", [
      sceneChoice1.jumpTo(sceneForce),
    ]),
]);

// 3. PROPOSAL — Bandung melamar Roro
sceneProposal.action([
  imgBandung2.show({ ease: "easeInOut", duration: 1000 }),
  vBandung2.play(),
  bandung.say`Roro Jonggrang, aku ingin mempersuntingmu. Maukah kau menjadi permaisuriku?`,
  imgBandung2.hide({ ease: "easeInOut", duration: 1000 }),
  vBandung2.stop(),

  imgRoro1.show({ ease: "easeInOut", duration: 1000 }),
  vRoro1.play(),
  roro.say`Aku... aku tidak bisa begitu saja menerimamu, Bondowoso.`,
  imgRoro1.hide({ ease: "easeInOut", duration: 1000 }),
  vRoro1.stop(),

  imgRoro2.show({ ease: "easeInOut", duration: 1000 }),
  vRoro2.play(),
  roro.say`Jika kau benar-benar ingin mempersuntingku, kau harus memenuhi syaratku.`,
  imgRoro2.hide({ ease: "easeInOut", duration: 1000 }),
  vRoro2.stop(),

  imgBandung3.show({ ease: "easeInOut", duration: 1000 }),
  vBandung3.play(),
  bandung.say`Apa syaratnya? Aku akan memenuhinya!`,
  imgBandung3.hide({ ease: "easeInOut", duration: 1000 }),
  vBandung3.stop(),

  imgRoro2.show({ ease: "easeInOut", duration: 1000 }),
  vRoro3.play(),
  roro.say`Bangunkan 1000 candi untukku dalam waktu satu malam saja.`,
  imgRoro2.hide({ ease: "easeInOut", duration: 1000 }),
  vRoro3.stop(),

  narrator.say`Syarat yang mustahil, namun Bandung Bondowoso tidak gentar.`,
  imgBandung3.show({ ease: "easeInOut", duration: 1000 }),

  Menu.prompt("Apa yang akan kamu lakukan?")
    .choose("Terima syaratnya", [
      Script.execute(({ storable }) => addScore(storable, 30)),
      sceneProposal.jumpTo(sceneBuild),
    ])
    .choose("Tolak syarat itu", [
      Script.execute(({ storable }) => addScore(storable, 10)),
      sceneProposal.jumpTo(sceneChallenge),
    ]),
]);

// 4. FORCE — Bandung menggunakan kekuatan (Bad Ending)
sceneForce.action([
  imgBandung5.show({ ease: "easeInOut", duration: 1000 }),
  vBandung5.play(),
  bandung.say`Kau tidak punya pilihan, Roro Jonggrang! Kau akan menjadi istriku!`,
  imgBandung5.hide({ ease: "easeInOut", duration: 1000 }),
  vBandung5.stop(),

  imgRoro4.show({ ease: "easeInOut", duration: 1000 }),
  vRoro4.play(),
  roro.say`Tidak! Aku tidak akan pernah mau menjadi istrimu, Bondowoso!`,
  imgRoro4.hide({ ease: "easeInOut", duration: 1000 }),
  vRoro4.stop(),

  narrator.say`Roro Jonggrang marah besar dan menolak dengan keras.`,
  narrator.say`Bandung Bondowoso kehilangan kesabarannya dan murka.`,
  imgBandung6.show({ ease: "easeInOut", duration: 1000 }),
  narrator.say`Karena amarahnya, ia mengutuk Roro Jonggrang menjadi batu.`,
  imgBandung6.hide({ ease: "easeInOut", duration: 1000 }),
  imgRoro8.show({ ease: "easeInOut", duration: 1000 }),
  narrator.say`Dan demikianlah kisah tragis berakhir. Tamat (Bad Ending).`,
  bgm4.stop(),
  Script.execute(({ storable }) => setEnding(storable, "bad")),
]);

// 5. CHALLENGE — Jin tolak / Tolak syarat (Neutral Ending)
sceneChallenge.action([
  imgBandung7.show({ ease: "easeInOut", duration: 1000 }),
  vBandung6.play(),
  bandung.say`Syarat itu terlalu berlebihan, Roro Jonggrang!`,
  imgBandung7.hide({ ease: "easeInOut", duration: 1000 }),
  vBandung6.stop(),

  imgRoro7.show({ ease: "easeInOut", duration: 1000 }),
  vRoro7.play(),
  roro.say`Jika kau tidak bisa memenuhinya, berarti kau tidak layak untukku.`,
  imgRoro7.hide({ ease: "easeInOut", duration: 1000 }),
  vRoro7.stop(),

  imgBandung7.show({ ease: "easeInOut", duration: 1000 }),
  vBandung7.play(),
  bandung.say`Kau akan menyesal telah menolakku!`,
  imgBandung7.hide({ ease: "easeInOut", duration: 1000 }),
  vBandung7.stop(),

  narrator.say`Bandung Bondowoso meninggalkan Roro Jonggrang dengan kekecewaan besar.`,
  narrator.say`Dan kisah ini berakhir tanpa kebahagiaan. Tamat (Neutral Ending).`,
  bgm5.stop(),
  Script.execute(({ storable }) => setEnding(storable, "neutral")),
]);

// 6. BUILD — Bandung terima syarat, panggil jin
sceneBuild.action([
  imgBandung8.show({ ease: "easeInOut", duration: 1000 }),
  vBandung8.play(),
  bandung.say`Baiklah! Aku terima syaratmu! Aku akan membangun 1000 candi dalam satu malam!`,
  imgBandung8.hide({ ease: "easeInOut", duration: 1000 }),
  vBandung8.stop(),

  narrator.say`Bandung Bondowoso bertapa di puncak bukit dan memanggil pasukan jin dengan mantra kuno.`,
  narrator.say`Tanah bergetar, kabut tebal menyelimuti, dan sesosok makhluk gaib muncul dari dalam bumi.`,
  sceneBuild.jumpTo(sceneQuiz1),
]);

// 7. QUIZ — Jin Guardian bertanya tentang rumah adat Jogja
sceneQuiz1.action([
  imgJin1.show({ ease: "easeInOut", duration: 1000 }),
  vJin1.play(),
  jin.say`Siapa yang berani memanggil kami?!`,
  vJin1.stop(),
  vJin2.play(),
  jin.say`Kami bisa membantumu membangun 1000 candi. Tapi kau harus menjawab pertanyaanku lebih dulu!`,
  vJin2.stop(),
  imgJin1.hide({ ease: "easeInOut", duration: 1000 }),
  imgJin2.hide({ ease: "easeInOut", duration: 1000 }),

  imgBandung3.show({ ease: "easeInOut", duration: 1000 }),
  vBandung12.play(),
  bandung.say`Tanyakanlah! Aku akan menjawab apapun!`,
  imgBandung3.hide({ ease: "easeInOut", duration: 1000 }),
  vBandung12.stop(),

  imgJin2.show({ ease: "easeInOut", duration: 1000 }),
  vJin3.play(),
  Menu.prompt(
    'Apa nama rumah adat khas Daerah Istimewa Yogyakarta?',
  )
    .choose("Joglo", [
      imgJin2.hide({ ease: "easeInOut", duration: 1000 }),
      imgJin3.show({ ease: "easeInOut", duration: 1000 }),
      vJin3.stop(),
      // TODO: Ganti dengan vJin4 (voice "Benar! Joglo adalah...")
      vJin4.play(),
      Script.execute(({ storable }) => {
        addScore(storable, 20);
        unlockKnowledge(storable, "K1");
      }),
      jin.say`Benar! Joglo adalah rumah adat khas Yogyakarta dengan atap menjulang tinggi melambangkan hubungan manusia dengan Sang Pencipta. Baik, kami akan membantumu!`,
      vJin4.stop(),
      sceneQuiz1.jumpTo(sceneBest),
    ])
    .choose("Limasan", [
      imgJin2.hide({ ease: "easeInOut", duration: 1000 }),
      imgJin4.show({ ease: "easeInOut", duration: 1000 }),
      vJin3.stop(),
      // TODO: Ganti dengan vJin5 (voice "Salah! Limasan bukan...")
      vJin5.play(),
      Script.execute(({ storable }) => addScore(storable, 0)),
      jin.say`Salah! Limasan bukan rumah adat khas Yogyakarta. Kau tidak cukup mengenal tanah ini. Kami tidak akan membantumu!`,
      vJin5.stop(),
      sceneQuiz1.jumpTo(sceneChallenge),
    ])
    .choose("Rumah Gadang", [
      imgJin2.hide({ ease: "easeInOut", duration: 1000 }),
      imgJin4.show({ ease: "easeInOut", duration: 1000 }),
      vJin3.stop(),
      // TODO: Ganti dengan vJin6 (voice "Salah! Rumah Gadang berasal...")
      vJin6.play(),
      Script.execute(({ storable }) => addScore(storable, 0)),
      jin.say`Salah! Rumah Gadang berasal dari Minangkabau, Sumatera Barat. Kau tidak cukup mengenal tanah ini. Kami tidak akan membantumu!`,
      vJin6.stop(),
      sceneQuiz1.jumpTo(sceneChallenge),
    ]),
]);

// 8. BEST ENDING — Jin berhasil, candi terbangun, Roro jadi candi ke-1000
sceneBest.action([
  narrator.say`Pasukan jin mulai membangun candi di bawah sinar bulan. Satu per satu candi berdiri megah.`,
  narrator.say`Roro Jonggrang panik melihat candi-candi hampir selesai.`,

  imgRoro5.show({ ease: "easeInOut", duration: 1000 }),
  vRoro5.play(),
  roro.say`Tidak... hampir 1000! Aku harus melakukan sesuatu!`,
  imgRoro5.hide({ ease: "easeInOut", duration: 1000 }),
  vRoro5.stop(),

  imgRoro6.show({ ease: "easeInOut", duration: 1000 }),
  vRoro6.play(),
  narrator.say`Roro Jonggrang membakar jerami dan membangunkan ayam-ayam agar berkokok seolah fajar telah tiba.`,
  narrator.say`Pasukan jin yang mendengar ayam berkokok langsung pergi, mengira pagi telah tiba.`,
  imgRoro6.hide({ ease: "easeInOut", duration: 1000 }),
  vRoro6.stop(),

  imgBandung9.show({ ease: "easeInOut", duration: 1000 }),
  vBandung9.play(),
  bandung.say`Tidak! Candi baru 999! Kau curang, Roro Jonggrang!`,
  imgBandung9.hide({ ease: "easeInOut", duration: 1000 }),
  vBandung9.stop(),

  imgBandung10.show({ ease: "easeInOut", duration: 1000 }),
  vBandung10.play(),
  bandung.say`Kau telah mengkhianatiku! Terimalah kutukanmu!`,
  imgBandung10.hide({ ease: "easeInOut", duration: 1000 }),
  vBandung10.stop(),

  narrator.say`Bandung Bondowoso marah besar dan mengutuk Roro Jonggrang menjadi candi yang ke-1000.`,
  imgRoro8.show({ ease: "easeInOut", duration: 1000 }),
  narrator.say`Begitulah Legenda Candi Prambanan tercipta. Roro Jonggrang menjadi candi, dan Bandung Bondowoso kehilangan cintanya selamanya. Tamat (Best Ending).`,
  bgm6.stop(),
  Script.execute(({ storable }) => setEnding(storable, "best")),
]);

// Create and export story
const story = new Story("Legenda Candi Prambanan");
story.entry(sceneIntro);

export default story;
export const storyMeta = {
  title: "Legenda Candi Prambanan",
  region: "Yogyakarta",
  description: "Kisah cinta Bandung Bondowoso dan Roro Jonggrang",
  difficulty: "Menengah",
  coverImage: "/images/jawa-tengah.webp",
};

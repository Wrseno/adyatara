import {
  Scene,
  Character,
  Story,
  Menu,
  Script,
  Image,
  Sound,
} from "narraleaf-react";
import { addScore, setEnding } from "@/lib/game-utils";
const narrator = new Character("Narator", { color: "#D96B4A" });
const bandung = new Character("Bandung Bondowoso", { color: "#E86B52" });
const roro = new Character("Roro Jonggrang", { color: "#EAA87E" });

const bandung1 = new Image({
  src: "/images/prambanan/bandung/1.png",
  zoom: 0.7,
  position: {
    yalign: 0.45,
    xalign: 0.5,
  },
});
const bandung2 = new Image({
  src: "/images/prambanan/bandung/2.png",
  zoom: 0.7,
  position: {
    yalign: 0.45,
    xalign: 0.5,
  },
});
const bandung3 = new Image({
  src: "/images/prambanan/bandung/3.png",
  zoom: 0.7,
  position: {
    yalign: 0.45,
    xalign: 0.5,
  },
});
const bandung5 = new Image({
  src: "/images/prambanan/bandung/5.png",
  zoom: 0.7,
  position: {
    yalign: 0.45,
    xalign: 0.5,
  },
});
const bandung6 = new Image({
  src: "/images/prambanan/bandung/6.png",
  zoom: 0.7,
  position: {
    yalign: 0.45,
    xalign: 0.5,
  },
});
const bandung7 = new Image({
  src: "/images/prambanan/bandung/7.png",
  zoom: 0.7,
  position: {
    yalign: 0.45,
    xalign: 0.5,
  },
});
const bandung8 = new Image({
  src: "/images/prambanan/bandung/8.png",
  zoom: 0.7,
  position: {
    yalign: 0.45,
    xalign: 0.5,
  },
});
const bandung9 = new Image({
  src: "/images/prambanan/bandung/9.png",
  zoom: 0.7,
  position: {
    yalign: 0.45,
    xalign: 0.5,
  },
});
const bandung10 = new Image({
  src: "/images/prambanan/bandung/10.png",
  zoom: 0.7,
  position: {
    yalign: 0.45,
    xalign: 0.5,
  },
});

const roro1 = new Image({
  src: "/images/prambanan/roro/1.png",
  zoom: 0.6,
  position: {
    yalign: 0.45,
    xalign: 0.5,
  },
});
const roro2 = new Image({
  src: "/images/prambanan/roro/2.png",
  zoom: 0.6,
  position: {
    yalign: 0.45,
    xalign: 0.5,
  },
});
const roro4 = new Image({
  src: "/images/prambanan/roro/4.png",
  zoom: 0.6,
  position: {
    yalign: 0.45,
    xalign: 0.5,
  },
});
const roro5 = new Image({
  src: "/images/prambanan/roro/5.png",
  zoom: 0.6,
  position: {
    yalign: 0.45,
    xalign: 0.5,
  },
});
const roro6 = new Image({
  src: "/images/prambanan/roro/6.png",
  zoom: 0.6,
  position: {
    yalign: 0.45,
    xalign: 0.5,
  },
});
const roro7 = new Image({
  src: "/images/prambanan/roro/7.png",
  zoom: 0.6,
  position: {
    yalign: 0.45,
    xalign: 0.5,
  },
});

const roro8 = new Image({
  src: "/images/prambanan/roro/8.png",
  zoom: 0.6,
  position: {
    yalign: 0.45,
    xalign: 0.5,
  },
});

// Sound - Bandung Bondowoso
const soundConfig = { volume: 1, loop: false, sync: false };

const soundConfigBgm = { volume: 0.2, loop: true, sync: false };

const soundbandung1 = new Sound({
  ...soundConfig,
  src: "/images/prambanan/bandung/1.mp3",
});
const soundbandung2 = new Sound({
  ...soundConfig,
  src: "/images/prambanan/bandung/2.mp3",
});
const soundbandung3 = new Sound({
  ...soundConfig,
  src: "/images/prambanan/bandung/3.mp3",
});
const soundbandung5 = new Sound({
  ...soundConfig,
  src: "/images/prambanan/bandung/5.mp3",
});
const soundbandung6 = new Sound({
  ...soundConfig,
  src: "/images/prambanan/bandung/6.mp3",
});
const soundbandung7 = new Sound({
  ...soundConfig,
  src: "/images/prambanan/bandung/7.mp3",
});
const soundbandung8 = new Sound({
  ...soundConfig,
  src: "/images/prambanan/bandung/8.mp3",
});
const soundbandung9 = new Sound({
  ...soundConfig,
  src: "/images/prambanan/bandung/9.mp3",
});
const soundbandung10 = new Sound({
  ...soundConfig,
  src: "/images/prambanan/bandung/10.mp3",
});
const soundbandung11 = new Sound({
  ...soundConfig,
  src: "/images/prambanan/bandung/1-1.mp3",
});

// Sound - Roro Jonggrang
const soundroro1 = new Sound({
  ...soundConfig,
  src: "/images/prambanan/roro/1.mp3",
});
const soundroro2 = new Sound({
  ...soundConfig,
  src: "/images/prambanan/roro/2.mp3",
});
const soundroro3 = new Sound({
  ...soundConfig,
  src: "/images/prambanan/roro/3.mp3",
});
const soundroro4 = new Sound({
  ...soundConfig,
  src: "/images/prambanan/roro/4.mp3",
});
const soundroro5 = new Sound({
  ...soundConfig,
  src: "/images/prambanan/roro/5.mp3",
});
const soundroro6 = new Sound({
  ...soundConfig,
  src: "/images/prambanan/roro/6.mp3",
});
const soundroro7 = new Sound({
  ...soundConfig,
  src: "/images/prambanan/roro/7.mp3",
});

// bgmusic

const bgm1 = Sound.bgm({
  ...soundConfigBgm,
  src: "/music/1.mp3",
});

const bgm2 = Sound.bgm({
  ...soundConfigBgm,
  src: "/music/2.mp3",
});

const bgm3 = Sound.bgm({
  ...soundConfigBgm,
  src: "/music/3.mp3",
});

const bgm4 = Sound.bgm({
  ...soundConfigBgm,
  src: "/music/4.mp3",
});

const bgm5 = Sound.bgm({
  ...soundConfigBgm,
  src: "/music/5.mp3",
});

const bgm6 = Sound.bgm({
  ...soundConfigBgm,
  src: "/music/6.mp3",
});

// Scenes
const sceneIntro = new Scene("intro", {
  background: "/images/prambanan/1.jpeg",
  backgroundMusic: bgm1,
  backgroundMusicFade: 1000,
});

const sceneChoice1 = new Scene("choice1", {
  background: "/images/prambanan/2.jpeg",
  backgroundMusic: bgm2,
  backgroundMusicFade: 1000,
});

const sceneProposal = new Scene("proposal", {
  background: "/images/prambanan/3.jpeg",
  backgroundMusic: bgm3,
  backgroundMusicFade: 1000,
});

const sceneForce = new Scene("force", {
  background: "/images/prambanan/4.jpeg",
  backgroundMusic: bgm4,
  backgroundMusicFade: 1000,
});

const sceneChallenge = new Scene("challenge", {
  background: "/images/prambanan/5.jpeg",
  backgroundMusic: bgm5,
  backgroundMusicFade: 1000,
});

const sceneBuild = new Scene("build", {
  background: "/images/prambanan/6.jpeg",
  backgroundMusic: bgm6,
  backgroundMusicFade: 1000,
});

// Story flow
sceneIntro.action([
  narrator.say`Di sebuah zaman dahulu kala, terdapat dua kerajaan yang saling bermusuhan, yaitu Pengging dan Boko.`,
  narrator.say`Kerajaan Pengging dipimpin oleh seorang raja yang memiliki putra perkasa bernama Bandung Bondowoso.`,
  narrator.say`Sementara itu, Kerajaan Boko memiliki seorang putri yang sangat cantik jelita bernama Roro Jonggrang.`,
  sceneIntro.jumpTo(sceneChoice1),
]);

sceneChoice1.action([
  bandung1.show({ ease: "easeInOut", duration: 1000 }),
  soundbandung1.play(),
  bandung.say`Kamu adalah Bandung Bondowoso yang baru saja memenangkan perang setelah menaklukkan Kerajaan Boko.`,
  soundbandung1.stop(),
  soundbandung11.play(),
  bandung.say`Kamu melihat putri kerajaan musuh, Roro Jonggrang yang sedang berduka, namun kamu justru jatuh hati kepadanya.`,
  soundbandung11.stop(),
  Menu.prompt("Apa yang kamu lakukan?")
    .choose("Lamar dia dengan sopan", [
      Script.execute(({ storable }) => addScore(storable, 30)),
      sceneChoice1.jumpTo(sceneProposal),
    ])
    .choose("Gunakan kekuatan untuk memaksanya", [
      sceneChoice1.jumpTo(sceneForce),
    ]),
]);

sceneProposal.action([
  bandung2.show({ ease: "easeInOut", duration: 1000 }),
  soundbandung2.play(),
  bandung.say`Roro Jonggrang, aku ingin mempersuntingmu. Maukah kau menjadi permaisuriku?`,
  bandung2.hide({ ease: "easeInOut", duration: 1000 }),
  roro1.show({ ease: "easeInOut", duration: 1000 }),
  soundbandung2.stop(),
  soundroro1.play(),
  roro.say`Aku... aku tidak bisa begitu saja menerimamu, Bondowoso.`,
  roro1.hide({ ease: "easeInOut", duration: 1000 }),
  roro2.show({ ease: "easeInOut", duration: 1000 }),
  soundroro1.stop(),
  soundroro2.play(),
  roro.say`Jika kau benar-benar ingin mempersuntingku, kau harus memenuhi syaratku.`,
  roro2.hide({ ease: "easeInOut", duration: 1000 }),
  bandung3.show({ ease: "easeInOut", duration: 1000 }),
  soundroro2.stop(),
  soundbandung3.play(),
  bandung.say`Apa syaratnya? Aku akan memenuhinya!`,
  bandung3.hide({ ease: "easeInOut", duration: 1000 }),
  roro2.show({ ease: "easeInOut", duration: 1000 }),
  soundbandung3.stop(),
  soundroro3.play(),
  roro.say`Bangunkan 1000 candi untukku dalam waktu satu malam saja.`,
  roro2.hide({ ease: "easeInOut", duration: 1000 }),
  soundroro3.stop(),
  narrator.say`Syarat yang mustahil, namun Bandung Bondowoso tidak gentar.`,
  bandung3.show({ ease: "easeInOut", duration: 1000 }),
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

sceneForce.action([
  bandung5.show({ ease: "easeInOut", duration: 1000 }),
  soundbandung5.play(),
  bandung.say`Kau tidak punya pilihan, Roro Jonggrang! Kau akan menjadi istriku!`,
  bandung5.hide({ ease: "easeInOut", duration: 1000 }),
  roro4.show({ ease: "easeInOut", duration: 1000 }),
  soundbandung5.stop(),
  soundroro4.play(),
  roro.say`Tidak! Aku tidak akan pernah mau menjadi istrimu, Bondowoso!`,
  roro4.hide({ ease: "easeInOut", duration: 1000 }),
  soundroro4.stop(),
  narrator.say`Roro Jonggrang marah besar dan menolak dengan keras.`,
  narrator.say`Bandung Bondowoso kehilangan kesabarannya dan murka.`,
  bandung6.show({ ease: "easeInOut", duration: 1000 }),
  soundbandung6.play(),
  narrator.say`Karena amarahnya, ia mengutuk Roro Jonggrang menjadi batu.`,
  narrator.say`Dan demikianlah kisah tragis berakhir. Tamat (Bad Ending).`,
  soundbandung6.stop(),
  Script.execute(({ storable }) => setEnding(storable, "bad")),
]);

sceneChallenge.action([
  bandung7.show({ ease: "easeInOut", duration: 1000 }),
  soundbandung7.play(),
  bandung.say`Syarat itu terlalu berlebihan, Roro Jonggrang!`,
  bandung7.hide({ ease: "easeInOut", duration: 1000 }),
  roro7.show({ ease: "easeInOut", duration: 1000 }),
  soundbandung7.stop(),
  soundroro7.play(),
  roro.say`Jika kau tidak bisa memenuhinya, berarti kau tidak layak untukku.`,
  roro7.hide({ ease: "easeInOut", duration: 1000 }),
  bandung7.show({ ease: "easeInOut", duration: 1000 }),
  soundroro7.stop(),
  soundbandung7.play(),
  bandung.say`Kau akan menyesal telah menolakku!`,
  bandung7.hide({ ease: "easeInOut", duration: 1000 }),
  soundbandung7.stop(),
  narrator.say`Bandung Bondowoso meninggalkan Roro Jonggrang dengan kekecewaan besar.`,
  narrator.say`Dan kisah ini berakhir tanpa kebahagiaan. Tamat (Neutral Ending).`,
  Script.execute(({ storable }) => setEnding(storable, "neutral")),
]);

sceneBuild.action([
  bandung8.show({ ease: "easeInOut", duration: 1000 }),
  soundbandung8.play(),
  bandung.say`Baiklah! Aku terima syaratmu! Aku akan membangun 1000 candi dalam satu malam!`,
  bandung8.hide({ ease: "easeInOut", duration: 1000 }),
  soundbandung8.stop(),
  narrator.say`Bandung Bondowoso memanggil pasukan jin untuk membantunya membangun candi.`,
  narrator.say`Satu per satu candi mulai berdiri megah di bawah sinar bulan.`,
  narrator.say`Roro Jonggrang panik melihat candi-candi hampir selesai.`,
  roro5.show({ ease: "easeInOut", duration: 1000 }),
  soundroro5.play(),
  roro.say`Tidak... hampir 1000! Aku harus melakukan sesuatu!`,
  roro5.hide({ ease: "easeInOut", duration: 1000 }),
  roro6.show({ ease: "easeInOut", duration: 1000 }),
  soundroro5.stop(),
  soundroro6.play(),
  narrator.say`Roro Jonggrang membakar jerami dan membangunkan ayam-ayam agar berkokok seolah fajar telah tiba.`,
  narrator.say`Pasukan jin yang mendengar ayam berkokok langsung pergi, mengira pagi telah tiba.`,
  roro6.hide({ ease: "easeInOut", duration: 1000 }),
  bandung9.show({ ease: "easeInOut", duration: 1000 }),
  soundroro6.stop(),
  soundbandung9.play(),
  bandung.say`Tidak! Candi baru 999! Kau curang, Roro Jonggrang!`,
  bandung9.hide({ ease: "easeInOut", duration: 1000 }),
  bandung10.show({ ease: "easeInOut", duration: 1000 }),
  soundbandung9.stop(),
  soundbandung10.play(),
  bandung.say`Kau telah mengkhianatiku! Terimalah kutukanmu!`,
  bandung10.hide({ ease: "easeInOut", duration: 1000 }),
  soundbandung10.stop(),
  narrator.say`Bandung Bondowoso marah besar dan mengutuk Roro Jonggrang menjadi candi yang ke-1000.`,
  roro8.show({ ease: "easeInOut", duration: 1000 }),
  narrator.say`Begitulah Legenda Candi Prambanan tercipta. Roro Jonggrang menjadi candi, dan Bandung Bondowoso kehilangan cintanya selamanya. Tamat (Best Ending).`,
  Script.execute(({ storable }) => setEnding(storable, "best")),
]);

// Create and export story
const story = new Story("Legenda Candi Prambanan");
story.entry(sceneIntro);

export default story;
export const storyMeta = {
  title: "Legenda Candi Prambanan",
  region: "Jawa Tengah",
  description:
    "Kisah cinta dan pengkhianatan Bandung Bondowoso dan Roro Jonggrang.",
  difficulty: "Pemula",
  coverImage: "/images/jawa-tengah.jpg",
};

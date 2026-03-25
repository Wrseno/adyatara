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

// --- PENGATURAN KARAKTER ---
const narrator = new Character("Narator", { color: "#9A8A7A" });
const tonaasU = new Character("Tonaas Utara", { color: "#795548" });
const marimbow = new Character("Marimbow", { color: "#E91E63" });
const maharimbow = new Character("Maharimbow", { color: "#4A90E2" });

const IMG_DURATION = 1000;
const IMG_CONFIG = { zoom: 0.65, position: { yalign: 0.45, xalign: 0.5 } };

// --- ASET GAMBAR ---
const imgMar1 = new Image({
  src: "/images/stories/danau-tondano/chars/marimbow/normal.webp",
  ...IMG_CONFIG,
});
const imgMar2 = new Image({
  src: "/images/stories/danau-tondano/chars/marimbow/disguise.webp",
  ...IMG_CONFIG,
});
const imgMar3 = new Image({
  src: "/images/stories/danau-tondano/chars/marimbow/fight.webp",
  ...IMG_CONFIG,
});
const imgMar4 = new Image({
  src: "/images/stories/danau-tondano/chars/marimbow/revealed.webp",
  ...IMG_CONFIG,
});
const imgMar5 = new Image({
  src: "/images/stories/danau-tondano/chars/marimbow/sad.webp",
  ...IMG_CONFIG,
});

const imgMah1 = new Image({
  src: "/images/stories/danau-tondano/chars/maharimbow/guard.webp",
  ...IMG_CONFIG,
});
const imgMah2 = new Image({
  src: "/images/stories/danau-tondano/chars/maharimbow/surprised.webp",
  ...IMG_CONFIG,
});
const imgMah3 = new Image({
  src: "/images/stories/danau-tondano/chars/maharimbow/love.webp",
  ...IMG_CONFIG,
});

const imgTonaas = new Image({
  src: "/images/stories/danau-tondano/chars/tonaas-utara/old.webp",
  ...IMG_CONFIG,
});

// --- AUDIO (VA) ---
const vMarSumpah = new Sound({
  src: "/audio/danau-tondano/marimbow/sumpah.mp3",
});
const vMarResiko = new Sound({
  src: "/audio/danau-tondano/marimbow/resiko.mp3",
});
const vMarTersesat = new Sound({
  src: "/audio/danau-tondano/marimbow/tersesat.mp3",
});
const vMarNama = new Sound({
  src: "/audio/danau-tondano/marimbow/perkenalan.mp3",
});
const vMarBimbang = new Sound({
  src: "/audio/danau-tondano/marimbow/bimbang.mp3",
});
const vMarTolak = new Sound({
  src: "/audio/danau-tondano/marimbow/tolak_nikah.mp3",
});

const vMahSiapa = new Sound({
  src: "/audio/danau-tondano/maharimbow/siapa_kau.mp3",
});
const vMahTawan = new Sound({
  src: "/audio/danau-tondano/maharimbow/tawan.mp3",
});
const vMahCantik = new Sound({
  src: "/audio/danau-tondano/maharimbow/cantik.mp3",
});
const vMahJanji = new Sound({
  src: "/audio/danau-tondano/maharimbow/janji_ketemu.mp3",
});
const vMahAjak = new Sound({
  src: "/audio/danau-tondano/maharimbow/ajak_nikah.mp3",
});
const vMahSetia = new Sound({
  src: "/audio/danau-tondano/maharimbow/setia_tunggu.mp3",
});

const vTonaasPeringatan = new Sound({
  src: "/audio/danau-tondano/tonaas-utara/peringatan.mp3",
});
const vTonaasLarang = new Sound({
  src: "/audio/danau-tondano/tonaas-utara/larangan.mp3",
});

// --- BGM ---
const bgmIntro = Sound.bgm({
  src: "/music/danau-tondano/minahasa_intro.mp3",
  volume: 0.2,
  loop: true,
});
const bgmForest = Sound.bgm({
  src: "/music/danau-tondano/forest_mystery.mp3",
  volume: 0.2,
  loop: true,
});
const bgmFight = Sound.bgm({
  src: "/music/danau-tondano/action_drums.mp3",
  volume: 0.2,
  loop: true,
});
const bgmRomance = Sound.bgm({
  src: "/music/danau-tondano/kolintang_soft.mp3",
  volume: 0.2,
  loop: true,
});
const bgmPanic = Sound.bgm({
  src: "/music/danau-tondano/disaster_eruption.mp3",
  volume: 0.2,
  loop: true,
});

// --- SCENES ---
const sceneIntro = new Scene("intro", {
  background: "/images/stories/danau-tondano/bg/panorama.webp",
  backgroundMusic: bgmIntro,
  backgroundMusicFade: 1000,
});
const sceneNorth = new Scene("north", {
  background: "/images/stories/danau-tondano/bg/village_north.webp",
  backgroundMusic: bgmIntro,
  backgroundMusicFade: 1000,
});
const sceneBorder = new Scene("border", {
  background: "/images/stories/danau-tondano/bg/border_forest.webp",
  backgroundMusic: bgmForest,
  backgroundMusicFade: 1000,
});
const sceneBattle = new Scene("battle", {
  background: "/images/stories/danau-tondano/bg/battle_ground.webp",
  backgroundMusic: bgmFight,
  backgroundMusicFade: 1000,
});
const sceneHome = new Scene("home", {
  background: "/images/stories/danau-tondano/bg/tonaas_house.webp",
  backgroundMusic: bgmRomance,
  backgroundMusicFade: 1000,
});
const sceneEruption = new Scene("eruption", {
  background: "/images/stories/danau-tondano/bg/volcano.webp",
  backgroundMusic: bgmPanic,
  backgroundMusicFade: 1000,
});
const sceneFlood = new Scene("flood", {
  background: "/images/stories/danau-tondano/bg/flood_strike.webp",
  backgroundMusic: bgmPanic,
  backgroundMusicFade: 1000,
});
const sceneFinalBad = new Scene("final_bad", {
  background: "/images/stories/danau-tondano/bg/lake_tondano.webp",
  backgroundMusic: bgmPanic,
  backgroundMusicFade: 1000,
});
const sceneFinalGood = new Scene("final_good", {
  background: "/images/stories/danau-tondano/bg/prosperity_village.webp",
  backgroundMusic: bgmRomance,
  backgroundMusicFade: 1000,
});

// --- STORY FLOW ---

sceneIntro.action([
  narrator.say`Provinsi Sulawesi Utara adalah daerah paling utara di Pulau Sulawesi. Di provinsi ini terbentang rangkaian pegunungan yang mengelilingi Danau Tondano.`,
  narrator.say`Kuis Geografi: Danau Tondano merupakan danau terluas di provinsi mana?`,
  Menu.prompt(" ")
    .choose("Sulawesi Utara", [
      Script.execute(({ storable }) => {
        addScore(storable, 20);
        unlockKnowledge(storable, "GEO1");
      }),
      narrator.say`Tepat sekali! Danau ini adalah ikon kebanggaan masyarakat Minahasa.`,
      sceneIntro.jumpTo(sceneNorth),
    ])
    .choose("Sulawesi Selatan", [
      narrator.say`Kurang tepat. Danau Tondano terletak di Sulawesi Utara.`,
      sceneIntro.jumpTo(sceneNorth),
    ]),
]);

sceneNorth.action([
  narrator.say`Dahulu, wilayah Minahasa dipimpin oleh para Tonaas. Marimbow, putri Tonaas Utara, merasa lelah karena terus didatangi pelamar.`,
  imgMar1.show({ ease: "easeInOut", duration: IMG_DURATION }),
  vMarSumpah.play(),
  marimbow.say`Aku bersumpah demi rakyat di utara, aku takkan menikah terlebih dahulu sebelum siap menggantikan posisi ayah sebagai Tonaas!`,
  vMarSumpah.stop(),
  imgMar1.hide({ ease: "easeInOut", duration: IMG_DURATION }),

  imgTonaas.show({ ease: "easeInOut", duration: IMG_DURATION }),
  vTonaasPeringatan.play(),
  tonaasU.say`Tapi anakku, bagaimana jika kau lupa dengan sumpahmu ini? Berhati-hatilah.`,
  vTonaasPeringatan.stop(),
  imgTonaas.hide({ ease: "easeInOut", duration: IMG_DURATION }),

  imgMar1.show({ ease: "easeInOut", duration: IMG_DURATION }),
  vMarResiko.play(),
  marimbow.say`Aku akan menerima semua resikonya. Aku akan mengubah penampilanku agar mereka mengira aku seorang laki-laki.`,
  vMarResiko.stop(),
  imgMar1.hide({ ease: "easeInOut", duration: IMG_DURATION }),

  imgMar2.show({ ease: "easeInOut", duration: IMG_DURATION }),
  narrator.say`Dengan penyamaran itu, Marimbow bebas berlatih beladiri dan berburu di hutan.`,
  sceneNorth.jumpTo(sceneBorder),
]);

sceneBorder.action([
  narrator.say`Suatu hari, Marimbow tersesat hingga memasuki wilayah Selatan. Ia diincar oleh penjaga perbatasan, Maharimbow.`,
  imgMah1.show({ ease: "easeInOut", duration: IMG_DURATION }),
  vMahSiapa.play(),
  maharimbow.say`Siapa kau?! Kenapa berani memasuki wilayah ini? Kamu pasti mata-mata dari Utara!`,
  vMahSiapa.stop(),
  imgMah1.hide({ ease: "easeInOut", duration: IMG_DURATION }),

  imgMar2.show({ ease: "easeInOut", duration: IMG_DURATION }),
  vMarTersesat.play(),
  marimbow.say`Tuduhanmu tidak benar! Aku hanya sedang berburu dan tersesat. Biarkan aku kembali!`,
  vMarTersesat.stop(),
  imgMar2.hide({ ease: "easeInOut", duration: IMG_DURATION }),

  imgMah1.show({ ease: "easeInOut", duration: IMG_DURATION }),
  vMahTawan.play(),
  maharimbow.say`Aku tidak percaya! Kau akan menjadi tawananku sekarang!`,
  vMahTawan.stop(),
  imgMah1.hide({ ease: "easeInOut", duration: IMG_DURATION }),

  narrator.say`Marimbow menolak keras. Pertarungan sengit pun terjadi!`,
  sceneBorder.jumpTo(sceneBattle),
]);

sceneBattle.action([
  imgMar3.show({ ease: "easeInOut", duration: IMG_DURATION }),
  narrator.say`Marimbow berusaha mengelak, namun gerakan Maharimbow terlalu cepat. Tutup kepalanya terlepas...`,
  imgMar3.hide({ ease: "easeInOut", duration: IMG_DURATION }),

  imgMar4.show({ ease: "easeInOut", duration: IMG_DURATION }),
  narrator.say`Rambut hitam panjang Marimbow terurai di depan Maharimbow.`,
  imgMar4.hide({ ease: "easeInOut", duration: IMG_DURATION }),

  imgMah2.show({ ease: "easeInOut", duration: IMG_DURATION }),
  vMahCantik.play(),
  maharimbow.say`Seorang... wanita? Aku tidak menyangka lawanku secantik ini. Maafkan kekasaranku.`,
  vMahCantik.stop(),
  imgMah2.hide({ ease: "easeInOut", duration: IMG_DURATION }),

  imgMar4.show({ ease: "easeInOut", duration: IMG_DURATION }),
  vMarNama.play(),
  marimbow.say`Aku Marimbow, putri Tonaas Utara. Aku sudah bilang aku hanya tersesat.`,
  vMarNama.stop(),
  imgMar4.hide({ ease: "easeInOut", duration: IMG_DURATION }),

  imgMah3.show({ ease: "easeInOut", duration: IMG_DURATION }),
  vMahJanji.play(),
  maharimbow.say`Maukah kau berjanji... datanglah kembali ke perbatasan ini beberapa hari lagi?`,
  vMahJanji.stop(),
  imgMah3.hide({ ease: "easeInOut", duration: IMG_DURATION }),
  sceneBattle.jumpTo(sceneHome),
]);

sceneHome.action([
  narrator.say`Mereka sering berjumpa hingga jatuh cinta. Namun Marimbow bimbang karena sumpahnya.`,
  imgTonaas.show({ ease: "easeInOut", duration: IMG_DURATION }),
  vTonaasLarang.play(),
  tonaasU.say`Bukankah kau berjanji tidak menikah sebelum jadi Tonaas? Ayah tidak mengizinkan kalian bersatu!`,
  vTonaasLarang.stop(),
  imgTonaas.hide({ ease: "easeInOut", duration: IMG_DURATION }),

  imgMar5.show({ ease: "easeInOut", duration: IMG_DURATION }),
  vMarBimbang.play(),
  marimbow.say`Maharimbow, ayahku melarang kita. Bagaimana dengan sumpahmu?`,
  vMarBimbang.stop(),
  imgMar5.hide({ ease: "easeInOut", duration: IMG_DURATION }),

  imgMah3.show({ ease: "easeInOut", duration: IMG_DURATION }),
  vMahAjak.play(),
  maharimbow.say`Mari kita menikah diam-diam di desa yang jauh. Hanya ada aku dan kau.`,
  vMahAjak.stop(),
  imgMah3.hide({ ease: "easeInOut", duration: IMG_DURATION }),

  narrator.say`Pilihan Sulit: Apa yang akan Marimbow putuskan?`,
  Menu.prompt(" ")
    .choose("Ikuti Maharimbow & Menikah Diam-diam", [
      Script.execute(({ storable }) => {
        addScore(storable, 10);
        unlockKnowledge(storable, "KARUARI_BROKEN");
      }),
      sceneHome.jumpTo(sceneEruption),
    ])
    .choose("Pegang Teguh Sumpah demi Rakyat", [
      Script.execute(({ storable }) => {
        addScore(storable, 30);
        unlockKnowledge(storable, "INTEGRITY_WIN");
      }),
      sceneHome.jumpTo(sceneFinalGood),
    ]),
]);

sceneEruption.action([
  narrator.say`Pernikahan dilakukan secara rahasia. Sesaat kemudian, alam bereaksi hebat!`,
  narrator.say`Gunung Kaweng menyemburkan lahar panas dan gempa dahsyat menghancurkan segalanya.`,
  narrator.say`Kuis Geologi: Gunung apa yang meletus dalam legenda ini?`,
  Menu.prompt(" ")
    .choose("Gunung Kaweng", [
      Script.execute(({ storable }) => {
        addScore(storable, 15);
        unlockKnowledge(storable, "VOLCANO1");
      }),
      narrator.say`Benar. Gunung Kaweng saksi bisu kemurkaan alam.`,
    ])
    .choose("Gunung Klabat", [
      narrator.say`Kurang tepat. Legenda menyebut Gunung Kaweng.`,
    ]),
  sceneEruption.jumpTo(sceneFlood),
]);

sceneFlood.action([
  narrator.say`Tiba-tiba datang air bah yang menenggelamkan desa dan seisinya. Sumpah yang dilanggar membawa petaka.`,
  sceneFlood.jumpTo(sceneFinalBad),
]);

sceneFinalBad.action([
  narrator.say`Daerah yang terendam kini menjadi Danau Tondano. Tamat (Bad Ending).`,
  Script.execute(({ storable }) => setEnding(storable, "bad")),
]);

sceneFinalGood.action([
  imgMar5.show({ ease: "easeInOut", duration: IMG_DURATION }),
  vMarTolak.play(),
  marimbow.say`Maafkan aku, aku tidak bisa membangun cinta di atas sumpah yang patah.`,
  vMarTolak.stop(),
  imgMar5.hide({ ease: "easeInOut", duration: IMG_DURATION }),

  imgMah3.show({ ease: "easeInOut", duration: IMG_DURATION }),
  vMahSetia.play(),
  maharimbow.say`Jika itu keputusanmu, aku akan setia menunggumu hingga tugasmu selesai.`,
  vMahSetia.stop(),
  imgMah3.hide({ ease: "easeInOut", duration: IMG_DURATION }),

  narrator.say`Marimbow menjadi Tonaas yang bijaksana. Tamat (Best Ending).`,
  Script.execute(({ storable }) => setEnding(storable, "best")),
]);

const story = new Story("Legenda Danau Tondano");
story.entry(sceneIntro);

export default story;
export const storyMeta = {
  title: "Legenda Danau Tondano",
  region: "Sulawesi Utara",
  description:
    "Kisah cinta terlarang Marimbow dan Maharimbow yang berujung pada terbentuknya Danau Tondano.",
  difficulty: "Menengah",
  coverImage: "/images/sulawesi-utara.webp",
};

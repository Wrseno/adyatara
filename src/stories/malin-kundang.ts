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
const narrator = new Character("Narator", { color: "#9A8A7A" });
const malin = new Character("Malin Kundang", { color: "#e84b30" });
const ibu = new Character("Ibu Malin", { color: "#E16A54" });
const istri = new Character("Istri Malin", { color: "#F39E60" });

// --- GAMBAR KARAKTER ---
const IMG_CENTER = { 
  zoom: 0.85,
  position: { yalign: 0.5, xalign: 0.5 } // Tengah
};

const IMG_LEFT = {
  zoom: 0.85,
  position: { yalign: 0.5, xalign: 0.3 } // Kiri (untuk dialog berdua)
};

const IMG_RIGHT = {
  zoom: 0.85,
  position: { yalign: 0.5, xalign: 0.7 } // Kanan (untuk dialog berdua)
};

// Malin Kundang
const imgMalin1 = new Image({
  src: "/images/stories/malin-kundang/chars/malin/1.webp", // Netral/Serius
  ...IMG_CENTER,
});
const imgMalin2 = new Image({
  src: "/images/stories/malin-kundang/chars/malin/2.webp", // Sedih/Menyesal
  ...IMG_CENTER,
});
const imgMalin3 = new Image({
  src: "/images/stories/malin-kundang/chars/malin/3.webp", // Senang/Bangga
  ...IMG_CENTER,
});
const imgMalin4 = new Image({
  src: "/images/stories/malin-kundang/chars/malin/4.webp", // Marah/Sombong
  ...IMG_CENTER,
});
const imgMalin5 = new Image({
  src: "/images/stories/malin-kundang/chars/malin/5.webp", // Ketakutan/Panik
  ...IMG_CENTER,
});
const imgMalin6 = new Image({
  src: "/images/stories/malin-kundang/chars/malin/6.webp", // Kabur
  ...IMG_CENTER,
});
const imgMalin7 = new Image({
  src: "/images/stories/malin-kundang/chars/malin/7.webp", // Mali
  ...IMG_CENTER,
});

// Malin (posisi kiri - untuk dialog berdua dengan istri)
const imgMalinLeft = new Image({
  src: "/images/stories/malin-kundang/chars/malin/1.webp", // Netral
  ...IMG_LEFT,
});
const imgMalinLeft3 = new Image({
  src: "/images/stories/malin-kundang/chars/malin/3.webp", // Senang
  ...IMG_LEFT,
});
const imgMalinLeft4 = new Image({
  src: "/images/stories/malin-kundang/chars/malin/4.webp", // Marah
  ...IMG_LEFT,
});

// Ibu Malin
const imgIbu1 = new Image({
  src: "/images/stories/malin-kundang/chars/ibu/1.webp", // Sedih/Khawatir
  ...IMG_CENTER,
});
const imgIbu2 = new Image({
  src: "/images/stories/malin-kundang/chars/ibu/2.webp", // Bahagia/Lega
  ...IMG_CENTER,
});
const imgIbu3 = new Image({
  src: "/images/stories/malin-kundang/chars/ibu/3.webp", // Tegas/Marah
  ...IMG_CENTER,
});
const imgIbu4 = new Image({
  src: "/images/stories/malin-kundang/chars/ibu/4.webp", // Bahagia/Terharu
  ...IMG_CENTER,
});
const imgIbu5 = new Image({
  src: "/images/stories/malin-kundang/chars/ibu/5.webp", // Bahagia Menangis
  ...IMG_CENTER,
});
const imgIbu6 = new Image({
  src: "/images/stories/malin-kundang/chars/ibu/6.webp", // Terkejut/Kecewa
  ...IMG_CENTER,
});
const imgIbu7 = new Image({
  src: "/images/stories/malin-kundang/chars/ibu/7.webp", // Marah/Mengutuk
  ...IMG_CENTER,
});

// Ibu (posisi kanan - untuk dialog berdua dengan Malin)
const imgIbuRight1 = new Image({
  src: "/images/stories/malin-kundang/chars/ibu/1.webp", // Sedih/Khawatir
  ...IMG_RIGHT,
});

// Istri Malin
const imgIstri1 = new Image({
  src: "/images/stories/malin-kundang/chars/istri/1.webp", // Netral/Anggun
  ...IMG_RIGHT,
});
const imgIstri2 = new Image({
  src: "/images/stories/malin-kundang/chars/istri/2.webp", // Bingung/Khawatir
  ...IMG_RIGHT,
});
const imgIstri3 = new Image({
  src: "/images/stories/malin-kundang/chars/istri/3.webp", // Jijik/Sombong
  ...IMG_RIGHT,
});

// --- BACKGROUND MUSIC ---
const bgmVillage = new Sound({
  src: "/music/malin-kundang/1.mp3",
  loop: true,
  volume: 0.2,
}); // Desa Tenang
const bgmJourney = new Sound({
  src: "/music/malin-kundang/2.mp3",
  loop: true,
  volume: 0.2,
}); // Perjalanan
const bgmSuccess = new Sound({
  src: "/music/malin-kundang/3.mp3",
  loop: true,
  volume: 0.2,
}); // Kesuksesan
const bgmSad = new Sound({
  src: "/music/malin-kundang/4.mp3",
  loop: true,
  volume: 0.2,
}); // Kesedihan
const bgmCurse = new Sound({
  src: "/music/malin-kundang/5.mp3",
  loop: true,
  volume: 0.2,
}); // Kutukan

// --- VOICE ACTING ---
// Malin Kundang
const vMalin1 = new Sound({ src: "/audio/malin-kundang/malin/1.mp3" }); // Meminta izin
const vMalin2 = new Sound({ src: "/audio/malin-kundang/malin/2.mp3" }); // Pamit
const vMalin3 = new Sound({ src: "/audio/malin-kundang/malin/3.mp3" }); // Mengakui ibu
const vMalin4 = new Sound({ src: "/audio/malin-kundang/malin/4.mp3" }); // Menyangkal ibu
const vMalin5 = new Sound({ src: "/audio/malin-kundang/malin/5.mp3" }); // Berteriak

// Ibu Malin
const vIbu1 = new Sound({ src: "/audio/malin-kundang/ibu/1.mp3" }); // Khawatir
const vIbu2 = new Sound({ src: "/audio/malin-kundang/ibu/2.mp3" }); // Melarang
const vIbu3 = new Sound({ src: "/audio/malin-kundang/ibu/3.mp3" }); // Merestui
const vIbu4 = new Sound({ src: "/audio/malin-kundang/ibu/4.mp3" }); // Bertemu lagi
const vIbu5 = new Sound({ src: "/audio/malin-kundang/ibu/5.mp3" }); // Terkejut
const vIbu6 = new Sound({ src: "/audio/malin-kundang/ibu/6.mp3" }); // Mengutuk
const vIbu7 = new Sound({ src: "/audio/malin-kundang/ibu/7.mp3" }); // Bersyukur

// Istri Malin
const vIstri1 = new Sound({ src: "/audio/malin-kundang/istri/1.mp3" }); // 
const vIstri2 = new Sound({ src: "/audio/malin-kundang/istri/2.mp3" }); // 
const vIstri3 = new Sound({ src: "/audio/malin-kundang/istri/3.mp3" }); //


// --- SCENES ---
const sceneIntro = new Scene("intro", {
  background: "/images/stories/malin-kundang/bg/village-day.webp",
});
const sceneRequest = new Scene("request", {
  background: "/images/stories/malin-kundang/bg/village-day.webp", 
});
const sceneRequestReject = new Scene("request-reject", {
  background: "/images/stories/malin-kundang/bg/village-day.webp", 
});
const sceneEscape = new Scene("escape", {
  background: "/images/stories/malin-kundang/bg/night.webp",
});
const sceneFarewell = new Scene("farewell", {
  background: "/images/stories/malin-kundang/bg/village-day.webp", 
});
const sceneSuccess = new Scene("success", {
  background: "/images/stories/malin-kundang/bg/ship.webp",
});
const sceneReturn = new Scene("return", {
  background: "/images/stories/malin-kundang/bg/port.webp",
});
const sceneChoice = new Scene("choice", {
  background: "/images/stories/malin-kundang/bg/port.webp",
});
const sceneGoodEnding = new Scene("good-ending", {
  background: "/images/stories/malin-kundang/bg/port.webp", 
});
const sceneGoodEndingFinal = new Scene("good-ending-final", {
  background: "/images/stories/malin-kundang/bg/happy.webp", 
});
const sceneBadEnding = new Scene("bad-ending", {
  background: "/images/stories/malin-kundang/bg/port.webp",
});
const sceneCurse = new Scene("curse", {
  background: "/images/stories/malin-kundang/bg/stone.webp", 
});
const sceneCurseFinal = new Scene("curse-final", {
  background: "/images/stories/malin-kundang/bg/curse.webp",
});
const sceneWorstEnding = new Scene("worst-ending", {
  background: "/images/stories/malin-kundang/bg/storm.webp",
});

// --- STORY FLOW ---

// 1. INTRO
sceneIntro.action([
  bgmVillage.play(),
  
  // Tampilkan Malin (kiri) dan Ibu (kanan) di desa
  imgMalinLeft.show({ ease: "easeInOut", duration: 1000 }), // Malin netral (kiri)
  imgIbuRight1.show({ ease: "easeInOut", duration: 1000 }), // Ibu sedih/khawatir (kanan)
  
  narrator.say`Di sebuah desa nelayan di pesisir Sumatera Barat, hiduplah seorang janda miskin bersama anaknya yang bernama Malin Kundang.`,
  narrator.say`Mereka hidup sederhana dari hasil melaut. Namun Malin memiliki mimpi besar.`,
  
  imgMalinLeft.hide({ ease: "easeInOut", duration: 500 }),
  imgIbuRight1.hide({ ease: "easeInOut", duration: 500 }),
  
  sceneIntro.jumpTo(sceneRequest),
]);

// 2. MALIN INGIN MERANTAU
sceneRequest.action([
  imgMalin1.show({ ease: "easeInOut", duration: 1000 }), // Netral/Serius
  vMalin1.play(),
  malin.say(
    "Ibu, aku ingin pergi merantau untuk mengubah nasib kita. Izinkan aku pergi!",
  ),
  vMalin1.stop(),
  imgMalin1.hide({ ease: "easeInOut", duration: 1000 }),

  imgIbu3.show({ ease: "easeInOut", duration: 1000 }), // Sedih/Khawatir
  vIbu1.play(),
  ibu.say("Anakku... perjalanan itu berbahaya..."),
  vIbu1.stop(),

  Menu.prompt("Sebagai ibu Malin, apa yang akan kamu lakukan?")
    .choose("Restui Malin dengan doa", [
      sceneRequest.jumpTo(sceneFarewell),
    ])
    .choose("Larang Malin pergi", [
      sceneRequest.jumpTo(sceneRequestReject),
    ]),

]);



// 3A. IBU MERESTUI (Good Path)
sceneFarewell.action([
  imgIbu2.show({ ease: "easeInOut", duration: 200 }), // Bahagia/Lega (tapi sedih)
  vIbu3.play(),
  ibu.say(
    "Baiklah anakku, pergilah. Tapi jangan lupakan ibumu di kampung halaman.",
  ),
  vIbu3.stop(),
  imgIbu2.hide({ ease: "easeInOut", duration: 1000 }),

  Script.execute(({ storable }) => {
    addScore(storable, 20);
    unlockKnowledge(storable, "K1");
  }),
  
  bgmVillage.stop(),
  bgmJourney.play(),
  
  sceneFarewell.jumpTo(sceneSuccess),
]);

// 3B. IBU MELARANG (Bad Path)
sceneRequestReject.action([
  imgIbu7.show({ ease: "easeInOut", duration: 1000 }), 
  vIbu2.play(),
  ibu.say("Tidak! Kamu terlalu muda. Ibu tidak mengizinkan!"),
  vIbu2.stop(),
  imgIbu7.hide({ ease: "easeInOut", duration: 1000 }), 


  imgMalin2.show({ ease: "easeInOut", duration: 1000 }),
  vMalin2.play(),
  malin.say("Maafkan aku, Ibu..."),
  vMalin2.stop(),
  imgMalin2.hide({ ease: "easeInOut", duration: 1000 }),

  bgmVillage.stop(),
  bgmSad.play(),

  sceneRequestReject.jumpTo(sceneEscape),
]);

sceneEscape.action([
  imgMalin6.show({ ease: "easeInOut", duration: 1000 }),

  narrator.say`Malin kabur di malam hari. Ibunya sakit hati dan berdoa agar Malin tidak berhasil.`,

  sceneEscape.jumpTo(sceneWorstEnding),
]);

// 3. MALIN SUKSES
sceneSuccess.action([
  bgmJourney.stop(),
  bgmSuccess.play(), // BGM Kesuksesan
  
  // Tampilkan Malin sukses dengan istri
  imgMalinLeft3.show({ ease: "easeInOut", duration: 500 }), // Senang/Bangga
  imgIstri1.show({ ease: "easeInOut", duration: 500 }), // Anggun
  
  narrator.say`Bertahun-tahun berlalu. Malin Kundang menjadi pedagang kaya dan menikah dengan putri saudagar.`,
  narrator.say`Suatu hari, kapal Malin berlabuh di kampung halamannya. Ibunya mendengar kabar dan datang menemuinya.`,
  
  imgMalinLeft3.hide({ ease: "easeInOut", duration: 500 }),
  imgIstri1.hide({ ease: "easeInOut", duration: 500 }),
  
  sceneSuccess.jumpTo(sceneReturn),
]);

// 4. IBU MEMANGGIL MALIN
sceneReturn.action([
  imgIbu4.show({ ease: "easeInOut", duration: 1000 }), // Bahagia/Terharu
  vIbu4.play(),
  ibu.say("Malin! Anakku! Kamu sudah pulang!"),
  vIbu4.stop(),
  imgIbu4.hide({ ease: "easeInOut", duration: 1000 }),

  imgMalinLeft3.show({ ease: "easeInOut", duration: 1000 }),
  imgIstri2.show({ ease: "easeInOut", duration: 1000 }), // Bingung/Khawatir
  narrator.say`Istrinya melihat seorang wanita tua berpakaian lusuh mendekat.`,
  vIstri1.play(),
  istri.say("Suamiku, siapa wanita itu?"),
  vIstri1.stop(),
  imgIstri2.hide({ ease: "easeInOut", duration: 500 }),
  imgMalinLeft3.hide({ ease: "easeInOut", duration: 500 }),
  
  sceneReturn.jumpTo(sceneChoice),
]);

// 5. PILIHAN KRUSIAL
sceneChoice.action([
  imgMalin3.show({ ease: "easeInOut", duration: 1000 }),
  Menu.prompt("Apa yang akan kamu lakukan?")
    .choose("Akui dia sebagai ibumu", [
      sceneChoice.jumpTo(sceneGoodEnding),
    ])
    .choose("Menyangkal dan mengusirnya", [
      sceneChoice.jumpTo(sceneBadEnding),
    ]),
]);

// 6. GOOD ENDING - Part 1
sceneGoodEnding.action([
  // Malin (kiri) dan Istri (kanan) muncul
  imgMalinLeft3.show({ ease: "easeInOut", duration: 1000 }), // Senang/Bangga
  imgIstri1.show({ ease: "easeInOut", duration: 1000 }), // Netral/Anggun
  
  vMalin3.play(),
  malin.say("Ya, ini ibuku. Maafkan aku ibu, aku sudah lama tidak pulang."),
  vMalin3.stop(),
  
  vIstri2.play(),
  istri.say("Ibu mertua, selamat datang. Mari ikut kami ke rumah."),
  vIstri2.stop(),

  imgMalinLeft3.hide({ ease: "easeInOut", duration: 500 }),
  imgIstri1.hide({ ease: "easeInOut", duration: 500 }),

  // Malin dan Ibu berpelukan
  imgMalin7.show({ ease: "easeInOut", duration: 1000 }),
  narrator.say`Malin dan ibunya berpelukan. Air mata kebahagiaan mengalir.`,
  imgMalin7.hide({ ease: "easeInOut", duration: 1000 }),

  Script.execute(({ storable }) => {
    addScore(storable, 50);
    unlockKnowledge(storable, "K2");
  }),
  
  sceneGoodEnding.jumpTo(sceneGoodEndingFinal),
]);

// 6. GOOD ENDING - Part 2 (Final)
sceneGoodEndingFinal.action([
  vIbu7.play(),
  ibu.say("Syukurlah anakku masih mengingatku..."),
  vIbu7.stop(),
  narrator.say`Malin membawa ibunya ke rumah megahnya. Mereka hidup bahagia selamanya.`,
  bgmSuccess.stop(),
  Script.execute(({ storable }) => setEnding(storable, "best")),
]);

// 7. BAD ENDING - Part 1 (Rejection)
sceneBadEnding.action([
  bgmSuccess.stop(),
  bgmSad.play(),
  // Malin (kiri) dan Istri (kanan) muncul
  imgMalinLeft4.show({ ease: "easeInOut", duration: 1000 }), // Marah/Sombong
  imgIstri3.show({ ease: "easeInOut", duration: 1000 }), // Jijik/Sombong
  
  vMalin4.play(),
  malin.say("Aku tidak kenal wanita itu! Pergi kau, pengemis tua!"),
  vMalin4.stop(),

  vIstri3.play(),
  istri.say("Suamiku, jangan biarkan pengemis itu mendekat!"),
  vIstri3.stop(),

  imgMalinLeft4.hide({ ease: "easeInOut", duration: 1000 }),
  imgIstri3.hide({ ease: "easeInOut", duration: 1000 }),

  Script.execute(({ storable }) => addScore(storable, -20)),
  
  sceneBadEnding.jumpTo(sceneCurse),
]);

// 7. BAD ENDING - Part 2 (Curse)
sceneCurse.action([
  bgmSad.stop(),
  bgmCurse.play(), // BGM Kutukan

  imgIbu6.show({ ease: "easeInOut", duration: 1000 }), // Terkejut/Kecewa
  vIbu5.play(),
  ibu.say("Malin... kenapa kau menyangkalku?"),
  vIbu5.stop(),
  imgIbu6.hide({ ease: "easeInOut", duration: 1000 }),

  imgIbu7.show({ ease: "easeInOut", duration: 1000 }), // Marah/Mengutuk
  vIbu6.play(),
  ibu.say("Malin Kundang! Anak durhaka! Jadilah kau batu!"),
  vIbu6.stop(),
  imgIbu7.hide({ ease: "easeInOut", duration: 1000 }),

  // Opsional: Malin berteriak
  imgMalin5.show({ ease: "easeInOut", duration: 1000 }), // Ketakutan/Panik
  vMalin5.play(),
  malin.say("Tidaaaak! Ampuuun!"),
  vMalin5.stop(),
  imgMalin5.hide({ ease: "easeInOut", duration: 1000 }),
  
  sceneCurse.jumpTo(sceneCurseFinal),
]);

// 7. BAD ENDING - Part 3 (Final)
sceneCurseFinal.action([
  bgmCurse.stop(),
  bgmSad.play(),
  // Tampilkan batu Malin
  narrator.say`Badai besar datang. Kapal Malin hancur dan tubuhnya berubah menjadi batu.`,

  
  // Tampilkan ibu sedih di pantai
  narrator.say`Hingga kini, batu Malin Kundang masih ada di Pantai Air Manis, Padang.`,
  
  bgmCurse.stop(),
  Script.execute(({ storable }) => setEnding(storable, "bad")),
]);

// 8. WORST ENDING (KABUR TANPA RESTU)
sceneWorstEnding.action([

  narrator.say`Malin kabur tanpa restu. Di tengah laut, badai menghantam kapalnya.`,
  narrator.say`Tanpa doa ibu, Malin tenggelam di laut. Tamat.`,

  bgmSad.stop(),
  Script.execute(({ storable }) => setEnding(storable, "bad")),
]);

// Create and export story
const story = new Story("Malin Kundang");
story.entry(sceneIntro);

export default story;
export const storyMeta = {
  title: "Malin Kundang",
  region: "Sumatera Barat",
  description:
    "Kisah anak durhaka yang dikutuk menjadi batu karena menyangkal ibunya sendiri.",
  difficulty: "Mudah",
  coverImage: "/images/sumatera-barat.webp",
};

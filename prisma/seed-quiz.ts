import { db as prisma } from "../src/lib/db";

async function main() {
  const stories = await prisma.story.findMany();
  
  if (stories.length === 0) {
    console.log("No stories found. Please run seed-story.ts first.");
    return;
  }

  // Helper to find a specific story by a keyword in its title
  const findStory = (keyword: string) => stories.find(s => s.title.toLowerCase().includes(keyword.toLowerCase())) || stories[0];

  const tondanoStory = findStory("tondano");
  const prambananStory = findStory("prambanan");
  const timunMasStory = findStory("timun");

  console.log("Seeding quizzes...");

  // Quiz 1: Ujian Tondano
  const quiz1 = await prisma.quiz.create({
    data: {
      title: "Ujian Tondano",
      description: "Buktikan wawasanmu tentang asal usul Danau Tondano.",
      storyId: tondanoStory.id,
      questions: {
        create: [
          {
            text: "Siapakah nama putri Tonaas utara yang menolak untuk menikah?",
            imageUrl: "/images/stories/danau-tondano/scene-1.jpg",
            options: {
              create: [
                 { text: "Marimbow", isCorrect: true },
                 { text: "Maharimbow", isCorrect: false },
                 { text: "Roro Jonggrang", isCorrect: false }
              ]
            }
          },
          {
            text: "Apa yang menjadi lambang kutukan saat janji dilanggar di Danau Tondano?",
            imageUrl: null,
            options: {
              create: [
                 { text: "Banjir Besar", isCorrect: true },
                 { text: "Gunung Meletus", isCorrect: false },
                 { text: "Pohon Tumbang", isCorrect: false }
              ]
            }
          }
        ]
      }
    }
  });
  console.log("Quiz created:", quiz1.title);

  // Quiz 2: Lanjutan Ujian Tondano (Harder)
  const quiz2 = await prisma.quiz.create({
    data: {
      title: "Legenda Minahasa",
      description: "Tingkat lanjutan: Menguji ingatanmu secara detail mengenai kisah cinta terlarang di tanah Minahasa Utara.",
      storyId: tondanoStory.id,
      questions: {
        create: [
          {
            text: "Mengapa Tonaas Utara menentang keras bersatunya Marimbow dan Maharimbow?",
            imageUrl: "/images/stories/danau-tondano/scene-3.jpg",
            options: {
              create: [
                 { text: "Karena mereka berasal dari keturunan yang sama (incest)", isCorrect: true },
                 { text: "Karena Maharimbow adalah pemberontak kerajaan", isCorrect: false },
                 { text: "Karena kutukan yang meramalkan kehancuran desa", isCorrect: false },
                 { text: "Karena Maharimbow tidak memiliki harta", isCorrect: false }
              ]
            }
          },
          {
            text: "Dua wilayah mana yang dipimpin oleh Tonaas Utara dan Tonaas Selatan menurut legenda Tondano?",
            imageUrl: null,
            options: {
              create: [
                 { text: "Makaruyen dan Toumbulu", isCorrect: false },
                 { text: "Toulour dan Tondano", isCorrect: true },
                 { text: "Tonsea dan Tombatu", isCorrect: false }
              ]
            }
          },
          {
            text: "Di manakah Marimbow dan Maharimbow mengikrarkan sumpah dan cinta terlarang mereka?",
            imageUrl: "/images/stories/danau-tondano/scene-4.jpg",
            options: {
              create: [
                 { text: "Di atas bukit suci", isCorrect: false },
                 { text: "Di tepi sungai batas perbatasan", isCorrect: true },
                 { text: "Di tengah hutan bambu", isCorrect: false },
                 { text: "Di dalam gua leluhur", isCorrect: false }
              ]
            }
          }
        ]
      }
    }
  });
  console.log("Quiz created:", quiz2.title);

  // Quiz 3: Candi Prambanan
  const quiz3 = await prisma.quiz.create({
    data: {
      title: "Ujian Bandung Bondowoso",
      description: "Seberapa jauh kamu memahami legenda berdirinya Candi Prambanan?",
      storyId: prambananStory.id,
      questions: {
        create: [
          {
            text: "Siapakah nama Raja raksasa yang dikalahkan oleh Bandung Bondowoso?",
            imageUrl: "/images/stories/prambanan/scene-1.jpg",
            options: {
              create: [
                 { text: "Prabu Baka", isCorrect: true },
                 { text: "Patih Gupita", isCorrect: false },
                 { text: "Adipati Karna", isCorrect: false }
              ]
            }
          },
          {
            text: "Apa syarat yang diajukan Roro Jonggrang untuk menerima lamaran Bandung Bondowoso?",
            imageUrl: "/images/stories/prambanan/scene-2.jpg",
            options: {
              create: [
                 { text: "Membangun 1.000 candi dalam satu malam", isCorrect: true },
                 { text: "Membawa jantung singa gaib", isCorrect: false },
                 { text: "Menaklukkan kerajaan tetangga", isCorrect: false },
                 { text: "Bertapa selama ratusan hari", isCorrect: false }
              ]
            }
          },
          {
            text: "Cara apa yang digunakan Roro Jonggrang untuk menggagalkan usaha Bandung Bondowoso?",
            imageUrl: "/images/stories/prambanan/scene-4.jpg",
            options: {
              create: [
                 { text: "Membakar jerami untuk meniru fajar dan meminta wanita menumbuk padi", isCorrect: true },
                 { text: "Meminta bantuan dewa untuk menurunkan gerhana", isCorrect: false },
                 { text: "Menyumbat mata air yang dibutuhkan para jin", isCorrect: false }
              ]
            }
          },
          {
            text: "Berapakah jumlah candi yang sebenarnya sudah berhasil diselesaikan jin penjaga sebelum fajar palsu muncul?",
            imageUrl: null,
            options: {
              create: [
                 { text: "990", isCorrect: false },
                 { text: "999", isCorrect: true },
                 { text: "1000", isCorrect: false }
              ]
            }
          }
        ]
      }
    }
  });
  console.log("Quiz created:", quiz3.title);

  // Quiz 4: Timun Mas
  const quiz4 = await prisma.quiz.create({
    data: {
      title: "Ujian Timun Mas",
      description: "Tes pengetahuan keberanian gadis desa mengalahkan buto ijo.",
      storyId: timunMasStory.id,
      questions: {
        create: [
          {
            text: "Dari siapakah Mbok Srini menerima biji timun gaib yang kelak menjadi Timun Mas?",
            imageUrl: "/images/stories/timun-mas/scene-1.jpg",
            options: {
              create: [
                 { text: "Buto Ijo", isCorrect: true },
                 { text: "Seorang Pertapa", isCorrect: false },
                 { text: "Dewa Kayangan", isCorrect: false }
              ]
            }
          },
          {
            text: "Ketika melarikan diri, Timun Mas melempar biji mentimun. Biji tersebut secara gaib berubah menjadi...",
            imageUrl: "/images/stories/timun-mas/scene-3.jpg",
            options: {
              create: [
                 { text: "Ladang mentimun pelilit raksasa", isCorrect: true },
                 { text: "Lautan api", isCorrect: false },
                 { text: "Hutan bambu runcing", isCorrect: false },
                 { text: "Gunung batu", isCorrect: false }
              ]
            }
          },
          {
            text: "Benda magis terakhir (keempat) yang dilemparkan oleh Timun Mas dan akhirnya menenggelamkan Buto Ijo adalah...",
            imageUrl: "/images/stories/timun-mas/scene-5.jpg",
            options: {
              create: [
                 { text: "Jarum peniti", isCorrect: false },
                 { text: "Garam", isCorrect: false },
                 { text: "Terasi", isCorrect: false },
                 { text: "Terasi (Lautan Lumpur/Lumpur Hisap)", isCorrect: true }
              ]
            }
          }
        ]
      }
    }
  });
  console.log("Quiz created:", quiz4.title);
  
  console.log("All quizzes seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

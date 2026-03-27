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

  // Reset existing quizzes so category separation stays clean after reseed
  await prisma.quiz.deleteMany();

  // Quiz 1: Ujian Tondano
  const quiz1 = await prisma.quiz.create({
    data: {
      title: "Ujian Tondano",
      description: "Buktikan wawasanmu tentang asal usul Danau Tondano.",
      category: "STORY",
      storyId: tondanoStory.id,
      questions: {
        create: [
          {
            text: "Siapakah nama putri Tonaas utara yang menolak untuk menikah?",
            imageUrl: "/images/stories/danau-tondano/bg/tonaas_house.jpg",
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
      category: "STORY",
      storyId: tondanoStory.id,
      questions: {
        create: [
          {
            text: "Mengapa Tonaas Utara menentang keras bersatunya Marimbow dan Maharimbow?",
            imageUrl: "/images/stories/danau-tondano/bg/3.jpg",
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
            imageUrl: "/images/stories/danau-tondano/4.jpg",
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
      category: "STORY",
      storyId: prambananStory.id,
      questions: {
        create: [
          {
            text: "Siapakah nama Raja raksasa yang dikalahkan oleh Bandung Bondowoso?",
            imageUrl: "/images/stories/prambanan/1.jpg",
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
            imageUrl: "/images/stories/prambanan/2.jpg",
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
            imageUrl: "/images/stories/prambanan/4.jpg",
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
      category: "STORY",
      storyId: timunMasStory.id,
      questions: {
        create: [
          {
            text: "Dari siapakah Mbok Srini menerima biji timun gaib yang kelak menjadi Timun Mas?",
            imageUrl: "/images/stories/timun-mas/1.jpg",
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
            imageUrl: "/images/stories/timun-mas/3.jpg",
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
            imageUrl: "/images/stories/timun-mas/5.jpg",
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

  const generalQuiz = await prisma.quiz.create({
    data: {
      title: "Trivia Budaya Nusantara",
      description: "Uji pengetahuan umum tentang adat istiadat, tarian daerah, baju tradisional, dan rumah adat Indonesia.",
      category: "GENERAL",
      questions: {
        create: [
          {
            text: "Rumah Gadang merupakan rumah adat dari provinsi...",
            imageUrl: "/images/sumatera-barat.webp",
            options: {
              create: [
                { text: "Sumatera Barat", isCorrect: true },
                { text: "Sumatera Selatan", isCorrect: false },
                { text: "Aceh", isCorrect: false },
                { text: "Riau", isCorrect: false },
              ],
            },
          },
          {
            text: "Tari Kecak berasal dari daerah...",
            imageUrl: null,
            options: {
              create: [
                { text: "Bali", isCorrect: true },
                { text: "Jawa Barat", isCorrect: false },
                { text: "Nusa Tenggara Timur", isCorrect: false },
                { text: "Sulawesi Selatan", isCorrect: false },
              ],
            },
          },
          {
            text: "Baju adat 'Bodo' merupakan pakaian tradisional dari suku di provinsi...",
            imageUrl: null,
            options: {
              create: [
                { text: "Sulawesi Selatan", isCorrect: true },
                { text: "Nusa Tenggara Barat", isCorrect: false },
                { text: "Jawa Tengah", isCorrect: false },
                { text: "Papua", isCorrect: false },
              ],
            },
          },
          {
            text: "Tradisi 'Ngaben' sebagai upacara pembakaran jenazah merupakan adat istiadat masyarakat...",
            imageUrl: null,
            options: {
              create: [
                { text: "Bali", isCorrect: true },
                { text: "Minangkabau", isCorrect: false },
                { text: "Betawi", isCorrect: false },
                { text: "Bugis", isCorrect: false },
              ],
            },
          },
        ],
      },
    },
  });
  console.log("Quiz created:", generalQuiz.title);

  const generalQuiz2 = await prisma.quiz.create({
    data: {
      title: "Trivia Tarian & Musik Daerah",
      description: "Kenali tari tradisional dan alat musik khas dari berbagai daerah di Indonesia.",
      category: "GENERAL",
      questions: {
        create: [
          {
            text: "Alat musik tradisional Angklung berasal dari daerah...",
            imageUrl: null,
            options: {
              create: [
                { text: "Jawa Barat", isCorrect: true },
                { text: "Jawa Timur", isCorrect: false },
                { text: "Banten", isCorrect: false },
                { text: "Bali", isCorrect: false },
              ],
            },
          },
          {
            text: "Tari Saman dikenal sebagai tarian khas dari provinsi...",
            imageUrl: null,
            options: {
              create: [
                { text: "Aceh", isCorrect: true },
                { text: "Sumatera Barat", isCorrect: false },
                { text: "Sumatera Utara", isCorrect: false },
                { text: "Riau", isCorrect: false },
              ],
            },
          },
          {
            text: "Sasando merupakan alat musik petik tradisional dari...",
            imageUrl: null,
            options: {
              create: [
                { text: "Nusa Tenggara Timur", isCorrect: true },
                { text: "Nusa Tenggara Barat", isCorrect: false },
                { text: "Maluku", isCorrect: false },
                { text: "Papua", isCorrect: false },
              ],
            },
          },
          {
            text: "Tari Piring adalah kesenian tradisional yang berasal dari...",
            imageUrl: null,
            options: {
              create: [
                { text: "Sumatera Barat", isCorrect: true },
                { text: "Jambi", isCorrect: false },
                { text: "Bengkulu", isCorrect: false },
                { text: "Lampung", isCorrect: false },
              ],
            },
          },
        ],
      },
    },
  });
  console.log("Quiz created:", generalQuiz2.title);

  const generalQuiz3 = await prisma.quiz.create({
    data: {
      title: "Trivia Rumah & Busana Adat",
      description: "Uji wawasanmu tentang rumah adat dan pakaian tradisional Indonesia.",
      category: "GENERAL",
      questions: {
        create: [
          {
            text: "Rumah adat Tongkonan merupakan rumah tradisional suku...",
            imageUrl: null,
            options: {
              create: [
                { text: "Toraja", isCorrect: true },
                { text: "Bugis", isCorrect: false },
                { text: "Dayak", isCorrect: false },
                { text: "Asmat", isCorrect: false },
              ],
            },
          },
          {
            text: "Pakaian adat Ulee Balang berasal dari daerah...",
            imageUrl: null,
            options: {
              create: [
                { text: "Aceh", isCorrect: true },
                { text: "Sumatera Utara", isCorrect: false },
                { text: "Kalimantan Selatan", isCorrect: false },
                { text: "Nusa Tenggara Barat", isCorrect: false },
              ],
            },
          },
          {
            text: "Rumah Honai merupakan rumah adat khas masyarakat...",
            imageUrl: null,
            options: {
              create: [
                { text: "Papua", isCorrect: true },
                { text: "Maluku", isCorrect: false },
                { text: "Sulawesi Tengah", isCorrect: false },
                { text: "Kalimantan Tengah", isCorrect: false },
              ],
            },
          },
          {
            text: "Kebaya secara luas dikenal sebagai busana tradisional perempuan dari budaya...",
            imageUrl: null,
            options: {
              create: [
                { text: "Jawa", isCorrect: true },
                { text: "Dayak", isCorrect: false },
                { text: "Batak", isCorrect: false },
                { text: "Toraja", isCorrect: false },
              ],
            },
          },
        ],
      },
    },
  });
  console.log("Quiz created:", generalQuiz3.title);

  const generalQuiz4 = await prisma.quiz.create({
    data: {
      title: "Trivia Adat Istiadat Nusantara",
      description: "Pertanyaan umum seputar upacara adat, tradisi, dan nilai budaya daerah di Indonesia.",
      category: "GENERAL",
      questions: {
        create: [
          {
            text: "Tradisi Karapan Sapi merupakan budaya khas masyarakat...",
            imageUrl: null,
            options: {
              create: [
                { text: "Madura", isCorrect: true },
                { text: "Betawi", isCorrect: false },
                { text: "Minangkabau", isCorrect: false },
                { text: "Banjar", isCorrect: false },
              ],
            },
          },
          {
            text: "Upacara adat Rambu Solo merupakan tradisi pemakaman khas suku...",
            imageUrl: null,
            options: {
              create: [
                { text: "Toraja", isCorrect: true },
                { text: "Sasak", isCorrect: false },
                { text: "Dani", isCorrect: false },
                { text: "Osing", isCorrect: false },
              ],
            },
          },
          {
            text: "Tradisi lompat batu (fahombo) berasal dari budaya masyarakat...",
            imageUrl: null,
            options: {
              create: [
                { text: "Nias", isCorrect: true },
                { text: "Mentawai", isCorrect: false },
                { text: "Simeulue", isCorrect: false },
                { text: "Sumbawa", isCorrect: false },
              ],
            },
          },
          {
            text: "Sekaten adalah tradisi budaya yang berkembang kuat di wilayah...",
            imageUrl: null,
            options: {
              create: [
                { text: "Yogyakarta dan Surakarta", isCorrect: true },
                { text: "Cirebon dan Banten", isCorrect: false },
                { text: "Denpasar dan Mataram", isCorrect: false },
                { text: "Makassar dan Manado", isCorrect: false },
              ],
            },
          },
        ],
      },
    },
  });
  console.log("Quiz created:", generalQuiz4.title);
  
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

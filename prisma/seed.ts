import { db as prisma } from '../src/lib/db';

async function main() {
  // =============================
  // STORY 1: Legenda Candi Prambanan
  // =============================
  const story1 = await prisma.story.create({
    data: {
      title: "Legenda Candi Prambanan",
      region: "Yogyakarta",
      description: "Kisah cinta dan pengkhianatan Bandung Bondowoso dan Roro Jonggrang.",
      difficulty: "Menengah",
      levelReq: 1,
    }
  });

  // --- Knowledge ---
  const k1 = await prisma.knowledge.create({
    data: {
      title: "Bandung Bondowoso",
      content: "Seorang ksatria sakti yang menguasai pasukan jin.",
      category: "Tokoh",
      storyId: story1.id
    }
  });

  // --- Nodes ---
  const nodeIntro1 = await prisma.node.create({
    data: {
      storyId: story1.id,
      content: "Di sebuah zaman dahulu kala, terdapat dua kerajaan yang saling bermusuhan, yaitu Pengging dan Boko.",
      type: "narration",
      isAutoPlay: false
    }
  });

  const node1 = await prisma.node.create({
    data: {
      storyId: story1.id,
      content: "Kamu adalah Bandung Bondowoso. Kamu melihat putri kerajaan musuh, Roro Jonggrang. Apa yang kamu lakukan?",
      type: "choice"
    }
  });

  await prisma.choice.create({
    data: { nodeId: nodeIntro1.id, text: "Lanjutkan", nextNodeId: node1.id }
  });

  const node2 = await prisma.node.create({
    data: {
      storyId: story1.id,
      content: "Roro Jonggrang memberikan syarat: membangun 1000 candi dalam satu malam.",
      type: "choice"
    }
  });

  const node3 = await prisma.node.create({
    data: {
      storyId: story1.id,
      content: "Kamu memaksa dan Roro Jonggrang marah. Tamat.",
      type: "ending"
    }
  });

  const node4 = await prisma.node.create({
    data: {
      storyId: story1.id,
      content: "Pasukan jin mulai membangun candi. Namun Roro Jonggrang curang.",
      type: "choice"
    }
  });

  const node5 = await prisma.node.create({
    data: {
      storyId: story1.id,
      content: "Kamu mengutuk Roro Jonggrang menjadi candi ke-1000. Tamat.",
      type: "ending"
    }
  });

  // --- Choices ---
  await prisma.choice.create({
    data: {
      nodeId: node1.id, text: "Lamar dia dengan sopan.",
      nextNodeId: node2.id, scoreDelta: 10, knowledgeId: k1.id
    }
  });
  await prisma.choice.create({
    data: {
      nodeId: node1.id, text: "Gunakan kekuatan untuk memaksanya.",
      nextNodeId: node3.id, scoreDelta: 0
    }
  });
  await prisma.choice.create({
    data: {
      nodeId: node2.id, text: "Terima syaratnya.",
      nextNodeId: node4.id, scoreDelta: 20
    }
  });
  await prisma.choice.create({
    data: {
      nodeId: node4.id, text: "Kutuk dia jadi candi",
      nextNodeId: node5.id, scoreDelta: 50
    }
  });

  // --- Collectibles: Yogyakarta ---
  const collectibles1 = await Promise.all([
    prisma.collectible.create({
      data: {
        name: "Batik Parang",
        description: "Motif batik khas Yogyakarta berbentuk huruf S yang melambangkan keberanian dan kekuatan. Dipakai oleh raja dan bangsawan Keraton Yogyakarta.",
        image: "/images/collectibles/batik-parang.webp", rarity: "common", category: "Budaya", storyId: story1.id
      }
    }),
    prisma.collectible.create({
      data: {
        name: "Keris Yogyakarta",
        description: "Senjata tradisional Jawa yang dianggap memiliki kekuatan spiritual. Keris bukan sekadar senjata, melainkan pusaka yang melambangkan kedaulatan dan kebijaksanaan.",
        image: "/images/collectibles/keris-yogyakarta.webp", rarity: "rare", category: "Budaya", storyId: story1.id
      }
    }),
    prisma.collectible.create({
      data: {
        name: "Gamelan Jawa",
        description: "Ansambel musik tradisional Jawa yang terdiri dari bonang, saron, kendang, dan gong. Gamelan digunakan dalam upacara adat, pertunjukan wayang, dan tari.",
        image: "/images/collectibles/gamelan-jawa.webp", rarity: "rare", category: "Seni", storyId: story1.id
      }
    }),
    prisma.collectible.create({
      data: {
        name: "Candi Prambanan",
        description: "Candi Hindu terbesar di Indonesia yang dibangun abad ke-9. Terdiri dari 3 candi utama untuk Trimurti: Brahma, Wisnu, dan Siwa.",
        image: "/images/collectibles/candi-prambanan.webp", rarity: "legendary", category: "Sejarah", storyId: story1.id
      }
    }),
    prisma.collectible.create({
      data: {
        name: "Gudeg",
        description: "Makanan khas Yogyakarta berbahan nangka muda yang dimasak dengan santan dan gula merah. Disajikan dengan nasi, ayam, telur, dan sambal krecek.",
        image: "/images/collectibles/gudeg.webp", rarity: "common", category: "Kuliner", storyId: story1.id
      }
    }),
    prisma.collectible.create({
      data: {
        name: "Wayang Kulit",
        description: "Seni pertunjukan tradisional Jawa yang dimainkan oleh dalang menggunakan boneka kulit. Ceritanya diambil dari Ramayana dan Mahabharata.",
        image: "/images/collectibles/wayang-kulit.webp", rarity: "rare", category: "Seni", storyId: story1.id
      }
    }),
  ]);

  // =============================
  // STORY 2: Legenda Timun Mas
  // =============================
  const story2 = await prisma.story.create({
    data: {
      title: "Legenda Timun Mas",
      region: "Jawa Tengah",
      description: "Bantu Timun Mas melarikan diri dari Buto Ijo menggunakan pengetahuan tentang alam.",
      difficulty: "Menengah",
      levelReq: 1,
    }
  });

  // --- Knowledge ---
  const k2 = await prisma.knowledge.create({
    data: {
      title: "Biji Mentimun",
      content: "Biji menyimpan embrio kehidupan. Dalam kondisi yang tepat, ia akan membelah sel dan tumbuh menjadi ladang sulur yang kuat.",
      category: "Sains",
      storyId: story2.id
    }
  });

  const k3 = await prisma.knowledge.create({
    data: {
      title: "Garam Laut",
      content: "Garam (Natrium Klorida) menyerap kelembapan dan mewakili kekuatan lautan luas.",
      category: "Sains",
      storyId: story2.id
    }
  });

  // --- Nodes ---
  const nodeIntro2 = await prisma.node.create({
    data: {
      storyId: story2.id,
      content: "Di sebuah desa di Jawa Tengah, Mbok Srini menerima biji mentimun dari Buto Ijo dengan syarat.",
      type: "narration",
      isAutoPlay: false
    }
  });

  const nodeT1 = await prisma.node.create({
    data: {
      storyId: story2.id,
      content: "Timun Mas sudah berusia 17 tahun. Buto Ijo datang menagih janji!",
      type: "choice"
    }
  });

  await prisma.choice.create({
    data: { nodeId: nodeIntro2.id, text: "Lanjutkan", nextNodeId: nodeT1.id }
  });

  const nodeQuiz = await prisma.node.create({
    data: {
      storyId: story2.id,
      content: "Pertapa Sakti memberikan ujian sebelum memberikan bungkusan sakti.",
      type: "choice"
    }
  });

  const nodeBad = await prisma.node.create({
    data: {
      storyId: story2.id,
      content: "Mbok Srini menolak. Buto Ijo menghancurkan desa. Tamat.",
      type: "ending"
    }
  });

  const nodeBest = await prisma.node.create({
    data: {
      storyId: story2.id,
      content: "Timun Mas menggunakan 4 bungkusan sakti dan mengalahkan Buto Ijo. Tamat.",
      type: "ending"
    }
  });

  // --- Choices ---
  await prisma.choice.create({
    data: {
      nodeId: nodeT1.id, text: "Terima perjanjian dan cari Pertapa Sakti",
      nextNodeId: nodeQuiz.id, scoreDelta: 10, knowledgeId: k2.id
    }
  });
  await prisma.choice.create({
    data: {
      nodeId: nodeT1.id, text: "Tolak dengan tegas",
      nextNodeId: nodeBad.id, scoreDelta: 0
    }
  });
  await prisma.choice.create({
    data: {
      nodeId: nodeQuiz.id, text: "Gunakan semua bungkusan sakti",
      nextNodeId: nodeBest.id, scoreDelta: 30, knowledgeId: k3.id
    }
  });

  // --- Collectibles: Jawa Tengah ---
  const collectibles2 = await Promise.all([
    prisma.collectible.create({
      data: {
        name: "Rumah Joglo",
        description: "Rumah adat khas Daerah Istimewa Yogyakarta dengan atap menjulang tinggi yang melambangkan hubungan manusia dengan Sang Pencipta. Terdiri dari tajug, dhapur, dan emper.",
        image: "/images/collectibles/rumah-joglo.webp", rarity: "common", category: "Budaya", storyId: story2.id
      }
    }),
    prisma.collectible.create({
      data: {
        name: "Jamu Tradisional",
        description: "Ramuan herbal turun-temurun dari Jawa Tengah. Dibuat dari rempah-rempah seperti kunyit, temulawak, jahe, dan kencur. Warisan budaya tak benda UNESCO.",
        image: "/images/collectibles/jamu-tradisional.webp", rarity: "common", category: "Kesehatan", storyId: story2.id
      }
    }),
    prisma.collectible.create({
      data: {
        name: "Angklung",
        description: "Alat musik tradisional dari bambu yang dimainkan dengan cara digoyangkan. Setiap angklung menghasilkan satu nada, sehingga dimainkan secara berkelompok.",
        image: "/images/collectibles/angklung.webp", rarity: "rare", category: "Seni", storyId: story2.id
      }
    }),
    prisma.collectible.create({
      data: {
        name: "Malioboro",
        description: "Jalan utama dan ikon Kota Yogyakarta yang menjadi pusat perdagangan, kuliner, dan budaya. Nama Malioboro diambil dari seorang bangsawan Inggris bernama Marlborough.",
        image: "/images/collectibles/malioboro.webp", rarity: "legendary", category: "Budaya", storyId: story2.id
      }
    }),
    prisma.collectible.create({
      data: {
        name: "Nasi Pecel",
        description: "Makanan khas Jawa Tengah berupa nasi yang disajikan dengan sayuran rebus dan bumbu kacang. Biasanya disertai tempe, tahu, dan rempeyek.",
        image: "/images/collectibles/nasi-pecel.webp", rarity: "rare", category: "Kuliner", storyId: story2.id
      }
    }),
    prisma.collectible.create({
      data: {
        name: "Lumpia Semarang",
        description: "Makanan khas Semarang berupa gulungan kulit tipis berisi rebung, telur, dan udang. Perpaduan budaya Tionghoa dan Jawa yang sudah ada sejak abad ke-19.",
        image: "/images/collectibles/lumpia-semarang.webp", rarity: "common", category: "Kuliner", storyId: story2.id
      }
    }),
  ]);

  console.log("Seed complete.");
  console.log("Story 1 (Prambanan):", story1.id, "-", collectibles1.length, "collectibles");
  console.log("Story 2 (Timun Mas):", story2.id, "-", collectibles2.length, "collectibles");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

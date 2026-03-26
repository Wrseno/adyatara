import { db as prisma } from '../src/lib/db';

async function main() {
  // =============================
  // STORY: Malin Kundang
  // =============================
  const story = await prisma.story.create({
    data: {
      title: "Malin Kundang",
      region: "Sumatera Barat",
      description: "Kisah anak durhaka yang dikutuk menjadi batu karena menyangkal ibunya sendiri.",
      difficulty: "Mudah",
      levelReq: 1,
      coverImage: "/images/stories/malin-kundang/1.webp",
      themeColor: "#2563eb" // Biru laut
    }
  });

  // --- Characters ---
  const malin = await prisma.character.create({
    data: {
      name: "Malin Kundang",
      avatar: "/images/characters/malin.webp",
      region: "Sumatera Barat"
    }
  });

  const ibu = await prisma.character.create({
    data: {
      name: "Ibu Malin",
      avatar: "/images/characters/ibu-malin.webp",
      region: "Sumatera Barat"
    }
  });

  const narrator = await prisma.character.create({
    data: {
      name: "Narator",
      avatar: null,
      region: "Sumatera Barat"
    }
  });

  // --- Knowledge ---
  const k1 = await prisma.knowledge.create({
    data: {
      title: "Nilai Bakti kepada Orang Tua",
      content: "Dalam budaya Minangkabau, berbakti kepada orang tua adalah kewajiban tertinggi. Anak yang durhaka akan mendapat kutukan dan celaka.",
      category: "Moral",
      storyId: story.id
    }
  });

  const k2 = await prisma.knowledge.create({
    data: {
      title: "Budaya Merantau Minang",
      content: "Merantau adalah tradisi masyarakat Minangkabau untuk mencari ilmu dan rezeki. Namun, tidak boleh melupakan kampung halaman dan keluarga.",
      category: "Budaya",
      storyId: story.id
    }
  });

  const k3 = await prisma.knowledge.create({
    data: {
      title: "Pantai Air Manis",
      content: "Lokasi batu Malin Kundang berada di Pantai Air Manis, Padang. Tempat ini menjadi destinasi wisata dan pengingat akan kisah anak durhaka.",
      category: "Sejarah",
      storyId: story.id
    }
  });

  // --- Nodes (Story Flow) ---
  
  // Node 1: Pembuka
  const node1 = await prisma.node.create({
    data: {
      storyId: story.id,
      content: "Di sebuah desa nelayan di pesisir Sumatera Barat, hiduplah seorang janda miskin bersama anaknya yang bernama Malin Kundang.",
      type: "narration",
      speakerId: narrator.id,
      backgroundImage: "/images/stories/malin-kundang/1.webp",
      backgroundMusic: "/audio/malin-kundang/bg-village.mp3",
      isAutoPlay: false
    }
  });

  // Node 2: Malin ingin merantau
  const node2 = await prisma.node.create({
    data: {
      storyId: story.id,
      content: "Ibu, aku ingin pergi merantau untuk mengubah nasib kita. Izinkan aku pergi!",
      type: "dialogue",
      speakerId: malin.id,
      backgroundImage: "/images/stories/malin-kundang/2.webp",
      expression: "determined",
      position: "left"
    }
  });

  // Node 3: Pilihan ibu
  const node3 = await prisma.node.create({
    data: {
      storyId: story.id,
      content: "Sebagai ibu Malin, apa yang akan kamu lakukan?",
      type: "choice",
      speakerId: ibu.id,
      backgroundImage: "/images/stories/malin-kundang/2.webp",
      expression: "worried",
      position: "right"
    }
  });

  // Node 4a: Ibu merestui (path baik)
  const node4a = await prisma.node.create({
    data: {
      storyId: story.id,
      content: "Baiklah anakku, pergilah. Tapi jangan lupakan ibumu di kampung halaman.",
      type: "dialogue",
      speakerId: ibu.id,
      backgroundImage: "/images/stories/malin-kundang/3.webp",
      expression: "sad",
      soundEffect: "/audio/malin-kundang/sfx-boat.mp3"
    }
  });

  // Node 4b: Ibu melarang (path buruk)
  const node4b = await prisma.node.create({
    data: {
      storyId: story.id,
      content: "Tidak! Kamu terlalu muda. Ibu tidak mengizinkan!",
      type: "dialogue",
      speakerId: ibu.id,
      backgroundImage: "/images/stories/malin-kundang/2.webp",
      expression: "angry"
    }
  });

  // Node 5a: Malin pergi dengan restu
  const node5a = await prisma.node.create({
    data: {
      storyId: story.id,
      content: "Bertahun-tahun berlalu. Malin Kundang menjadi pedagang kaya dan menikah dengan putri saudagar.",
      type: "narration",
      speakerId: narrator.id,
      backgroundImage: "/images/stories/malin-kundang/4.webp",
      backgroundMusic: "/audio/malin-kundang/bg-success.mp3"
    }
  });

  // Node 5b: Malin kabur tanpa restu (ending buruk)
  const node5b = await prisma.node.create({
    data: {
      storyId: story.id,
      content: "Malin kabur di malam hari. Ibunya sakit hati dan berdoa agar Malin tidak berhasil. Malin tenggelam di laut. TAMAT.",
      type: "ending",
      speakerId: narrator.id,
      backgroundImage: "/images/stories/malin-kundang/7.webp",
      backgroundMusic: "/audio/malin-kundang/bg-sad.mp3"
    }
  });

  // Node 6: Malin pulang ke kampung
  const node6 = await prisma.node.create({
    data: {
      storyId: story.id,
      content: "Suatu hari, kapal Malin berlabuh di kampung halamannya. Ibunya mendengar kabar dan datang menemuinya.",
      type: "narration",
      speakerId: narrator.id,
      backgroundImage: "/images/stories/malin-kundang/5.webp"
    }
  });

  // Node 7: Ibu memanggil Malin
  const node7 = await prisma.node.create({
    data: {
      storyId: story.id,
      content: "Malin! Anakku! Kamu sudah pulang!",
      type: "dialogue",
      speakerId: ibu.id,
      backgroundImage: "/images/stories/malin-kundang/5.webp",
      expression: "happy",
      position: "right"
    }
  });

  // Node 8: Pilihan Malin (krusial)
  const node8 = await prisma.node.create({
    data: {
      storyId: story.id,
      content: "Istrimu melihat wanita tua compang-camping mendekatimu. Apa yang akan kamu lakukan?",
      type: "choice",
      speakerId: malin.id,
      backgroundImage: "/images/stories/malin-kundang/5.webp"
    }
  });

  // Node 9a: Malin mengakui ibunya (ending baik)
  const node9a = await prisma.node.create({
    data: {
      storyId: story.id,
      content: "Ya, ini ibuku. Maafkan aku ibu, aku sudah lama tidak pulang. Malin dan ibunya berpelukan. Mereka hidup bahagia. TAMAT.",
      type: "ending",
      speakerId: narrator.id,
      backgroundImage: "/images/stories/malin-kundang/5.webp",
      backgroundMusic: "/audio/malin-kundang/bg-happy.mp3"
    }
  });

  // Node 9b: Malin menyangkal (lanjut ke kutukan)
  const node9b = await prisma.node.create({
    data: {
      storyId: story.id,
      content: "Aku tidak kenal wanita itu! Pergi kau, pengemis tua!",
      type: "dialogue",
      speakerId: malin.id,
      backgroundImage: "/images/stories/malin-kundang/6.webp",
      expression: "angry",
      soundEffect: "/audio/malin-kundang/sfx-shock.mp3"
    }
  });

  // Node 10: Ibu mengutuk
  const node10 = await prisma.node.create({
    data: {
      storyId: story.id,
      content: "Malin Kundang! Anak durhaka! Jadilah kau batu!",
      type: "dialogue",
      speakerId: ibu.id,
      backgroundImage: "/images/stories/malin-kundang/6.webp",
      expression: "furious",
      soundEffect: "/audio/malin-kundang/sfx-thunder.mp3"
    }
  });

  // Node 11: Ending kutukan
  const node11 = await prisma.node.create({
    data: {
      storyId: story.id,
      content: "Badai besar datang. Kapal Malin hancur dan tubuhnya berubah menjadi batu. Hingga kini, batu Malin Kundang masih ada di Pantai Air Manis, Padang. TAMAT.",
      type: "ending",
      speakerId: narrator.id,
      backgroundImage: "/images/stories/malin-kundang/7.webp",
      backgroundMusic: "/audio/malin-kundang/bg-curse.mp3"
    }
  });

  // --- Choices (Story Branches) ---
  
  // Dari node1 ke node2
  await prisma.choice.create({
    data: {
      nodeId: node1.id,
      text: "Lanjutkan",
      nextNodeId: node2.id
    }
  });

  // Dari node2 ke node3
  await prisma.choice.create({
    data: {
      nodeId: node2.id,
      text: "Lanjutkan",
      nextNodeId: node3.id
    }
  });

  // Pilihan di node3
  await prisma.choice.create({
    data: {
      nodeId: node3.id,
      text: "Restui Malin dengan doa",
      nextNodeId: node4a.id,
      scoreDelta: 20,
      knowledgeId: k2.id,
      isImportant: true
    }
  });

  await prisma.choice.create({
    data: {
      nodeId: node3.id,
      text: "Larang Malin pergi",
      nextNodeId: node4b.id,
      scoreDelta: 0
    }
  });

  // Dari node4a ke node5a
  await prisma.choice.create({
    data: {
      nodeId: node4a.id,
      text: "Lanjutkan",
      nextNodeId: node5a.id
    }
  });

  // Dari node4b ke node5b (ending buruk)
  await prisma.choice.create({
    data: {
      nodeId: node4b.id,
      text: "Malin kabur diam-diam",
      nextNodeId: node5b.id,
      scoreDelta: -10
    }
  });

  // Dari node5a ke node6
  await prisma.choice.create({
    data: {
      nodeId: node5a.id,
      text: "Lanjutkan",
      nextNodeId: node6.id
    }
  });

  // Dari node6 ke node7
  await prisma.choice.create({
    data: {
      nodeId: node6.id,
      text: "Lanjutkan",
      nextNodeId: node7.id
    }
  });

  // Dari node7 ke node8
  await prisma.choice.create({
    data: {
      nodeId: node7.id,
      text: "Lanjutkan",
      nextNodeId: node8.id
    }
  });

  // Pilihan krusial di node8
  await prisma.choice.create({
    data: {
      nodeId: node8.id,
      text: "Akui dia sebagai ibumu",
      nextNodeId: node9a.id,
      scoreDelta: 50,
      knowledgeId: k1.id,
      isImportant: true
    }
  });

  await prisma.choice.create({
    data: {
      nodeId: node8.id,
      text: "Menyangkal dan mengusirnya",
      nextNodeId: node9b.id,
      scoreDelta: -20,
      isImportant: true
    }
  });

  // Dari node9b ke node10
  await prisma.choice.create({
    data: {
      nodeId: node9b.id,
      text: "Lanjutkan",
      nextNodeId: node10.id
    }
  });

  // Dari node10 ke node11 (ending kutukan)
  await prisma.choice.create({
    data: {
      nodeId: node10.id,
      text: "Lanjutkan",
      nextNodeId: node11.id,
      knowledgeId: k3.id
    }
  });

  // --- Collectibles: Sumatera Barat ---
  const collectibles = await Promise.all([
    prisma.collectible.create({
      data: {
        name: "Rendang",
        description: "Masakan daging khas Minangkabau yang dimasak dengan santan dan rempah-rempah. Dinobatkan sebagai makanan terenak di dunia oleh CNN.",
        image: "/images/collectibles/rendang.webp",
        rarity: "legendary",
        category: "Kuliner",
        storyId: story.id
      }
    }),
    prisma.collectible.create({
      data: {
        name: "Rumah Gadang",
        description: "Rumah adat Minangkabau dengan atap berbentuk tanduk kerbau. Melambangkan kemenangan dalam pertarungan antara kerbau Minang melawan kerbau Jawa.",
        image: "/images/collectibles/rumah-gadang.webp",
        rarity: "rare",
        category: "Budaya",
        storyId: story.id
      }
    }),
    prisma.collectible.create({
      data: {
        name: "Tari Piring",
        description: "Tarian tradisional Minangkabau yang menggunakan piring sebagai properti. Menggambarkan kegembiraan masyarakat saat panen raya.",
        image: "/images/collectibles/tari-piring.webp",
        rarity: "rare",
        category: "Seni",
        storyId: story.id
      }
    }),
    prisma.collectible.create({
      data: {
        name: "Songket Minang",
        description: "Kain tenun tradisional dengan benang emas atau perak. Dipakai dalam upacara adat dan pernikahan sebagai simbol kemewahan.",
        image: "/images/collectibles/songket-minang.webp",
        rarity: "rare",
        category: "Budaya",
        storyId: story.id
      }
    }),
    prisma.collectible.create({
      data: {
        name: "Jam Gadang",
        description: "Menara jam ikonik di Bukittinggi yang dibangun tahun 1926. Atapnya menyerupai atap Rumah Gadang dan menjadi landmark Sumatera Barat.",
        image: "/images/collectibles/jam-gadang.webp",
        rarity: "legendary",
        category: "Sejarah",
        storyId: story.id
      }
    }),
    prisma.collectible.create({
      data: {
        name: "Kerupuk Sanjai",
        description: "Kerupuk khas Bukittinggi yang terbuat dari singkong dengan rasa pedas manis. Camilan favorit oleh-oleh dari Sumatera Barat.",
        image: "/images/collectibles/kerupuk-sanjai.webp",
        rarity: "common",
        category: "Kuliner",
        storyId: story.id
      }
    }),
  ]);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

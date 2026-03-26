# 🎬 Scene Mapping Lengkap - Malin Kundang

Dokumentasi lengkap untuk setiap scene dengan detail background, ekspresi karakter, dan dialog.

---

## 📊 Scene Flow Overview

```
INTRO → REQUEST → [CHOICE 1] → SUCCESS/WORST → RETURN → [CHOICE 2] → GOOD/BAD ENDING
```

---

## 🎭 SCENE 1: INTRO (Pembuka)

### Background
- **File:** `village-day.webp`
- **Deskripsi:** Desa nelayan di pagi hari, rumah sederhana, pantai
- **Mood:** Tenang, sederhana, damai

### Dialog
- **Narator:** "Di sebuah desa nelayan di pesisir Sumatera Barat, hiduplah seorang janda miskin bersama anaknya yang bernama Malin Kundang."

### Karakter
- Tidak ada karakter muncul (hanya narasi)

### BGM
- `1.mp3` - Desa Tenang

---

## 🎭 SCENE 2: REQUEST (Malin Minta Izin)

### Background
- **File:** `house-interior.webp` (BARU - perlu dibuat)
- **Deskripsi:** Interior rumah sederhana, Malin dan ibu di dalam rumah
- **Mood:** Intimate, serius
- **Alternatif:** Gunakan `village-day.webp` jika belum ada

### Dialog & Ekspresi

#### Dialog 1: Malin Meminta Izin
- **Karakter:** Malin
- **Ekspresi:** `malin/1.webp` - Netral/Serius
- **Dialog:** "Ibu, aku ingin pergi merantau untuk mengubah nasib kita. Izinkan aku pergi!"
- **Voice:** `malin/1.mp3`

#### Dialog 2: Ibu Khawatir
- **Karakter:** Ibu
- **Ekspresi:** `ibu/1.webp` - Sedih/Khawatir
- **Dialog:** "Anakku... perjalanan itu berbahaya..."
- **Voice:** `ibu/1.mp3`

### BGM
- `1.mp3` - Desa Tenang (lanjutan)

---

## 🎭 SCENE 3A: CHOICE 1 - Path Restui (Good Path)

### Background
- **File:** `house-door.webp` (BARU - perlu dibuat)
- **Deskripsi:** Pintu rumah, Malin akan berangkat, ibu melepas
- **Mood:** Emotional, farewell
- **Alternatif:** Gunakan `village-day.webp` jika belum ada

### Dialog & Ekspresi

#### Dialog: Ibu Merestui
- **Karakter:** Ibu
- **Ekspresi:** `ibu/2.webp` - Bahagia/Lega (tapi sedih)
- **Dialog:** "Baiklah anakku, pergilah. Tapi jangan lupakan ibumu di kampung halaman."
- **Voice:** `ibu/3.mp3`

### BGM
- `1.mp3` → Transisi ke `2.mp3` (Perjalanan)

---

## 🎭 SCENE 3B: CHOICE 1 - Path Larang (Bad Path)

### Background
- **File:** `house-interior.webp` (sama dengan scene 2)
- **Deskripsi:** Interior rumah, suasana tegang
- **Mood:** Tense, conflict

### Dialog & Ekspresi

#### Dialog 1: Ibu Melarang
- **Karakter:** Ibu
- **Ekspresi:** `ibu/3.webp` - Tegas/Marah (BARU - perlu dibuat)
- **Dialog:** "Tidak! Kamu terlalu muda. Ibu tidak mengizinkan!"
- **Voice:** `ibu/2.mp3`

#### Dialog 2: Malin Menyesal
- **Karakter:** Malin
- **Ekspresi:** `malin/2.webp` - Sedih/Menyesal
- **Dialog:** "Maafkan aku, Ibu..."
- **Voice:** `malin/2.mp3`

### Background Transition
- **File:** `night-escape.webp` (BARU - perlu dibuat)
- **Deskripsi:** Malam hari, Malin kabur dari rumah
- **Mood:** Dark, sneaky
- **Alternatif:** Gunakan `village-day.webp` dengan filter gelap

### BGM
- `1.mp3` → `4.mp3` (Kesedihan)

---

## 🎭 SCENE 4: SUCCESS (Malin Jadi Kaya)

### Background
- **File:** `ship.webp` (sudah ada)
- **Deskripsi:** Kapal dagang megah, layar besar, laut biru
- **Mood:** Triumphant, wealthy, success

### Dialog
- **Narator:** "Bertahun-tahun berlalu. Malin Kundang menjadi pedagang kaya dan menikah dengan putri saudagar."
- **Narator:** "Suatu hari, kapal Malin berlabuh di kampung halamannya. Ibunya mendengar kabar dan datang menemuinya."

### Karakter
- Tidak ada karakter muncul (hanya narasi)

### BGM
- `3.mp3` - Kesuksesan

---

## 🎭 SCENE 5: RETURN (Ibu Bertemu Malin)

### Background
- **File:** `port.webp` (sudah ada)
- **Deskripsi:** Pelabuhan ramai, kapal besar, orang-orang
- **Mood:** Busy, crowded, reunion

### Dialog & Ekspresi

#### Dialog: Ibu Memanggil Malin
- **Karakter:** Ibu
- **Ekspresi:** `ibu/4.webp` - Bahagia/Terharu (BARU - perlu dibuat)
- **Dialog:** "Malin! Anakku! Kamu sudah pulang!"
- **Voice:** `ibu/4.mp3`

### BGM
- `3.mp3` - Kesuksesan (lanjutan)

---

## 🎭 SCENE 6: CHOICE 2 (Pilihan Krusial)

### Background
- **File:** `port-crowd.webp` (BARU - perlu dibuat)
- **Deskripsi:** Pelabuhan, Malin dengan istri, ibu mendekat
- **Mood:** Tense, critical moment
- **Alternatif:** Gunakan `port.webp` jika belum ada

### Karakter
- Tidak ada karakter muncul (hanya narasi pilihan)

### Dialog
- **Narator:** "Istrimu melihat wanita tua compang-camping mendekatimu."
- **Prompt:** "Apa yang akan kamu lakukan?"

---

## 🎭 SCENE 7A: GOOD ENDING (Mengakui Ibu)

### Background Sequence

#### BG 1: Port (Reunion)
- **File:** `port-reunion.webp` (BARU - perlu dibuat)
- **Deskripsi:** Pelabuhan, Malin memeluk ibu
- **Mood:** Emotional, happy, reunion
- **Alternatif:** Gunakan `port.webp`

#### BG 2: Rich House (Happy Life)
- **File:** `rich-house.webp` (BARU - perlu dibuat)
- **Deskripsi:** Rumah megah, Malin dan ibu bahagia
- **Mood:** Wealthy, happy ending
- **Alternatif:** Gunakan `ship.webp`

### Dialog & Ekspresi

#### Dialog 1: Malin Mengakui
- **Karakter:** Malin
- **Ekspresi:** `malin/3.webp` - Senang/Bangga (tapi humble)
- **Dialog:** "Ya, ini ibuku. Maafkan aku ibu, aku sudah lama tidak pulang."
- **Voice:** `malin/3.mp3`

#### Dialog 2: Ibu Lega
- **Karakter:** Ibu
- **Ekspresi:** `ibu/5.webp` - Bahagia Menangis (BARU - perlu dibuat)
- **Dialog:** "Syukurlah anakku masih mengingatku..."
- **Voice:** `ibu/7.mp3` (BARU)

### BGM
- `3.mp3` → Stop → Ending music (happy)

---

## 🎭 SCENE 7B: BAD ENDING (Menyangkal Ibu)

### Background Sequence

#### BG 1: Port (Rejection)
- **File:** `port-reject.webp` (BARU - perlu dibuat)
- **Deskripsi:** Pelabuhan, Malin mengusir ibu
- **Mood:** Tense, rejection, sad
- **Alternatif:** Gunakan `port.webp`

#### BG 2: Storm
- **File:** `storm-sea.webp` (BARU - perlu dibuat)
- **Deskripsi:** Laut badai, petir, ombak besar
- **Mood:** Dark, dramatic, curse
- **Alternatif:** Gunakan `stone.webp` dengan filter gelap

#### BG 3: Stone Beach
- **File:** `stone.webp` (sudah ada)
- **Deskripsi:** Pantai Air Manis, batu Malin Kundang
- **Mood:** Tragic, curse, ending

### Dialog & Ekspresi

#### Dialog 1: Malin Menyangkal
- **Karakter:** Malin
- **Ekspresi:** `malin/4.webp` - Marah/Sombong
- **Dialog:** "Aku tidak kenal wanita itu! Pergi kau, pengemis tua!"
- **Voice:** `malin/4.mp3`

#### Dialog 2: Ibu Terkejut
- **Karakter:** Ibu
- **Ekspresi:** `ibu/6.webp` - Terkejut/Kecewa (BARU - perlu dibuat)
- **Dialog:** "Malin... kenapa kau menyangkalku?"
- **Voice:** `ibu/5.mp3`

#### Dialog 3: Ibu Mengutuk
- **Karakter:** Ibu
- **Ekspresi:** `ibu/7.webp` - Marah/Mengutuk (BARU - perlu dibuat)
- **Dialog:** "Malin Kundang! Anak durhaka! Jadilah kau batu!"
- **Voice:** `ibu/6.mp3`

#### Dialog 4: Malin Berteriak (Opsional)
- **Karakter:** Malin
- **Ekspresi:** `malin/5.webp` - Ketakutan/Panik (BARU - perlu dibuat)
- **Dialog:** "Tidaaaak! Ampuuun!"
- **Voice:** `malin/5.mp3`

### BGM
- `3.mp3` → `5.mp3` (Kutukan)

---

## 🎭 SCENE 8: WORST ENDING (Kabur Tanpa Restu)

### Background Sequence

#### BG 1: Night Escape
- **File:** `night-escape.webp` (sama dengan scene 3B)
- **Deskripsi:** Malam hari, Malin kabur
- **Mood:** Dark, sneaky

#### BG 2: Storm Sea
- **File:** `storm-sea.webp` (sama dengan scene 7B)
- **Deskripsi:** Laut badai, kapal tenggelam
- **Mood:** Dark, tragic

### Dialog
- **Narator:** "Malin kabur tanpa restu. Di tengah laut, badai menghantam kapalnya."
- **Narator:** "Tanpa doa ibu, Malin tenggelam di laut. Tamat."

### BGM
- `4.mp3` - Kesedihan

---

## 📊 Summary: Asset yang Dibutuhkan

### Background Images (Total: 11 file)

#### Prioritas TINGGI (Wajib)
1. ✅ `village-day.webp` - Desa nelayan (sudah ada)
2. ✅ `ship.webp` - Kapal megah (sudah ada)
3. ✅ `port.webp` - Pelabuhan (sudah ada)
4. ✅ `stone.webp` - Batu Malin Kundang (sudah ada)

#### Prioritas SEDANG (Recommended)
5. ⭕ `house-interior.webp` - Interior rumah sederhana
6. ⭕ `house-door.webp` - Pintu rumah (farewell)
7. ⭕ `storm-sea.webp` - Laut badai
8. ⭕ `night-escape.webp` - Malam hari (kabur)

#### Prioritas RENDAH (Opsional)
9. ⭕ `port-crowd.webp` - Pelabuhan ramai (choice moment)
10. ⭕ `port-reunion.webp` - Pelabuhan (reunion)
11. ⭕ `rich-house.webp` - Rumah megah (good ending)

---

### Character Expressions (Total: 15 file)

#### Malin Kundang (5 ekspresi)
1. ✅ `malin/1.webp` - Netral/Serius (sudah ada)
2. ✅ `malin/2.webp` - Sedih/Menyesal (sudah ada)
3. ✅ `malin/3.webp` - Senang/Bangga (sudah ada)
4. ✅ `malin/4.webp` - Marah/Sombong (sudah ada)
5. ⭕ `malin/5.webp` - Ketakutan/Panik (BARU)

#### Ibu Malin (7 ekspresi)
1. ✅ `ibu/1.webp` - Sedih/Khawatir (sudah ada)
2. ✅ `ibu/2.webp` - Bahagia/Lega (sudah ada)
3. ⭕ `ibu/3.webp` - Tegas/Marah (BARU)
4. ⭕ `ibu/4.webp` - Bahagia/Terharu (BARU)
5. ⭕ `ibu/5.webp` - Bahagia Menangis (BARU)
6. ⭕ `ibu/6.webp` - Terkejut/Kecewa (BARU)
7. ⭕ `ibu/7.webp` - Marah/Mengutuk (BARU)

#### Istri Malin (3 ekspresi) - BARU
1. ⭕ `istri/1.webp` - Netral/Anggun (BARU)
2. ⭕ `istri/2.webp` - Bingung/Khawatir (BARU)
3. ⭕ `istri/3.webp` - Jijik/Sombong (BARU)

---

## 🎨 Deskripsi Detail Ekspresi BARU

### Malin/5.webp - Ketakutan/Panik
- **Kapan:** Saat dikutuk jadi batu
- **Ekspresi:** Mata terbuka lebar, mulut terbuka lebar (berteriak), tangan di depan wajah (melindungi diri)
- **Pakaian:** Pakaian pedagang mewah (sama dengan 3 & 4)
- **Mood:** Terror, panic, desperate

---

### Ibu/3.webp - Tegas/Marah
- **Kapan:** Saat melarang Malin pergi
- **Ekspresi:** Alis turun (tegas), mata tajam, mulut tertutup rapat, tangan di pinggang atau menunjuk
- **Mood:** Firm, protective, stern (bukan marah besar, tapi tegas)

---

### Ibu/4.webp - Bahagia/Terharu
- **Kapan:** Saat bertemu Malin lagi di pelabuhan
- **Ekspresi:** Senyum lebar, mata berkaca-kaca (air mata bahagia), tangan terbuka (ingin memeluk)
- **Mood:** Joyful, emotional, reunion

---

### Ibu/5.webp - Bahagia Menangis
- **Kapan:** Good ending, saat Malin mengakui dia
- **Ekspresi:** Senyum sambil menangis, air mata mengalir, tangan di dada (lega)
- **Mood:** Overwhelming happiness, relief, grateful

---

### Ibu/6.webp - Terkejut/Kecewa
- **Kapan:** Saat Malin menyangkalnya (sebelum marah)
- **Ekspresi:** Mata terbuka lebar (shock), mulut terbuka sedikit, alis naik, tangan di pipi atau mulut
- **Mood:** Shocked, hurt, disbelief

---

### Ibu/7.webp - Marah/Mengutuk
- **Kapan:** Saat mengutuk Malin jadi batu
- **Ekspresi:** Alis naik tinggi, mata melotot (fury), mulut terbuka lebar (berteriak), tangan menunjuk ke depan (mengutuk), aura gelap/petir di sekitar (opsional)
- **Mood:** Furious, curse, supernatural power

---

### Istri/1.webp - Netral/Anggun
- **Kapan:** Saat pertama muncul, scene sukses, good ending
- **Ekspresi:** Senyum tipis, mata tenang, postur anggun, tangan di depan (sopan)
- **Pakaian:** Gaun mewah, perhiasan, kerudung/selendang sutra
- **Mood:** Elegant, wealthy, graceful

---

### Istri/2.webp - Bingung/Khawatir
- **Kapan:** Saat melihat ibu Malin mendekat
- **Ekspresi:** Alis naik (bingung), mata melirik ke Malin, mulut sedikit terbuka, tangan di dagu
- **Mood:** Confused, concerned, questioning

---

### Istri/3.webp - Jijik/Sombong
- **Kapan:** Bad ending, saat Malin menyangkal ibunya
- **Ekspresi:** Alis turun (jijik), mata menyipit, hidung terangkat, mulut mencibir, tangan menutupi hidung atau menjauh
- **Mood:** Disgusted, arrogant, dismissive

---

## 🎨 Deskripsi Detail Background BARU

### house-interior.webp
- **Deskripsi:** Interior rumah sederhana, dinding kayu, jendela kecil, cahaya redup, furniture minimal
- **Elemen:** Meja kayu, tikar, lampu minyak, foto keluarga (opsional)
- **Mood:** Intimate, poor but cozy

---

### house-door.webp
- **Deskripsi:** Pintu rumah terbuka, Malin di depan pintu (siluet), ibu di dalam rumah, cahaya pagi
- **Elemen:** Pintu kayu, tas/barang bawaan Malin, pantai terlihat dari pintu
- **Mood:** Farewell, emotional goodbye

---

### storm-sea.webp
- **Deskripsi:** Laut dengan ombak besar, langit gelap, petir, hujan lebat, kapal tenggelam (opsional)
- **Elemen:** Ombak tinggi, petir menyambar, langit hitam, angin kencang
- **Mood:** Dramatic, dangerous, curse

---

### night-escape.webp
- **Deskripsi:** Malam hari di desa, bulan sabit, Malin berjalan menjauh dari rumah (siluet)
- **Elemen:** Rumah di background, jalan tanah, pohon kelapa, bintang
- **Mood:** Dark, sneaky, sad

---

### port-crowd.webp
- **Deskripsi:** Pelabuhan ramai, banyak orang, kapal besar, Malin dengan istri cantik, ibu compang-camping mendekat
- **Elemen:** Crowd, kapal megah, pedagang, barang dagangan
- **Mood:** Busy, tense, critical moment

---

### port-reunion.webp
- **Deskripsi:** Pelabuhan, Malin memeluk ibu, orang-orang di sekitar tersenyum
- **Elemen:** Pelukan, air mata bahagia, kapal di background
- **Mood:** Emotional, happy reunion

---

### rich-house.webp
- **Deskripsi:** Rumah megah dengan taman, Malin dan ibu duduk di teras, suasana damai
- **Elemen:** Rumah besar, taman indah, furniture mewah, langit cerah
- **Mood:** Wealthy, peaceful, happy ending

---

## 📝 Checklist Pembuatan Asset

### Background Images
- [ ] `house-interior.webp`
- [ ] `house-door.webp`
- [ ] `storm-sea.webp`
- [ ] `night-escape.webp`
- [ ] `port-crowd.webp` (opsional)
- [ ] `port-reunion.webp` (opsional)
- [ ] `rich-house.webp` (opsional)

### Character Expressions - Malin
- [ ] `malin/5.webp` - Ketakutan/Panik

### Character Expressions - Ibu
- [ ] `ibu/3.webp` - Tegas/Marah
- [ ] `ibu/4.webp` - Bahagia/Terharu
- [ ] `ibu/5.webp` - Bahagia Menangis
- [ ] `ibu/6.webp` - Terkejut/Kecewa
- [ ] `ibu/7.webp` - Marah/Mengutuk

### Character Expressions - Istri (BARU)
- [ ] `istri/1.webp` - Netral/Anggun
- [ ] `istri/2.webp` - Bingung/Khawatir
- [ ] `istri/3.webp` - Jijik/Sombong

---

**Total Asset Baru:**
- Background: 7 file (4 prioritas sedang, 3 opsional)
- Karakter: 9 file (1 Malin, 5 Ibu, 3 Istri)

**Grand Total: 16 file baru**


---

## 👥 Karakter Istri Malin - Detail Lengkap

### Folder Path
`public/images/stories/malin-kundang/chars/istri/`

### Deskripsi Umum
- **Nama:** Istri Malin (tidak disebutkan nama spesifik)
- **Peran:** Putri saudagar kaya yang menikah dengan Malin
- **Penampilan:** Cantik, anggun, berpakaian mewah
- **Kepribadian:** Sombong, tidak suka kemiskinan (bad path), atau baik hati (good path)

### Ekspresi yang Dibutuhkan

#### 1. istri/1.webp - Netral/Anggun
- **Kapan digunakan:** Scene sukses, good ending
- **Ekspresi:** Senyum tipis, mata tenang, postur anggun
- **Pakaian:** Gaun mewah, perhiasan emas, kerudung sutra
- **Pose:** Tangan di depan (sopan), berdiri tegak
- **Mood:** Elegant, wealthy, graceful

#### 2. istri/2.webp - Bingung/Khawatir
- **Kapan digunakan:** Saat melihat ibu Malin mendekat
- **Ekspresi:** Alis naik (bingung), mata melirik ke Malin, mulut sedikit terbuka
- **Pose:** Tangan di dagu, kepala sedikit miring
- **Mood:** Confused, concerned, questioning

#### 3. istri/3.webp - Jijik/Sombong
- **Kapan digunakan:** Bad ending, saat Malin menyangkal ibunya
- **Ekspresi:** Alis turun (jijik), mata menyipit, hidung terangkat, mulut mencibir
- **Pose:** Tangan menutupi hidung atau menjauh, kepala menoleh
- **Mood:** Disgusted, arrogant, dismissive

---

## 📍 Posisi Karakter di Layar

### Konfigurasi Posisi

```typescript
// Tengah (solo character)
IMG_CENTER = { zoom: 0.85, position: { xalign: 0.5, yalign: 0.55 } }

// Kiri (dialog berdua)
IMG_LEFT = { zoom: 0.85, position: { xalign: 0.3, yalign: 0.55 } }

// Kanan (dialog berdua)
IMG_RIGHT = { zoom: 0.85, position: { xalign: 0.7, yalign: 0.55 } }
```

### Penggunaan Posisi

- **Malin solo:** Tengah (IMG_CENTER)
- **Ibu solo:** Tengah (IMG_CENTER)
- **Malin + Istri:** Malin kiri, Istri kanan
- **Malin + Ibu (berpelukan):** Keduanya tengah (overlap)
- **Keluarga (Malin + Istri + Ibu):** Semua muncul bersamaan

---

## 🎬 Scene dengan Karakter Istri

### Scene 4: Success
- **Karakter:** Malin (kiri) + Istri (kanan)
- **Ekspresi:** Malin senang (3), Istri anggun (1)
- **Narasi:** Malin sukses dan menikah

### Scene 5: Return
- **Karakter:** Ibu (tengah) → Malin (kiri) + Istri (kanan)
- **Ekspresi:** Ibu terharu (4) → Malin netral (left), Istri bingung (2)
- **Dialog:** Istri bertanya "Siapa wanita itu?"

### Scene 7A: Good Ending
- **Karakter:** Malin (kiri) + Istri (kanan)
- **Ekspresi:** Malin senang (left3), Istri anggun (1)
- **Dialog:** Istri menyambut ibu mertua dengan baik

### Scene 7B: Bad Ending
- **Karakter:** Malin (kiri) + Istri (kanan)
- **Ekspresi:** Malin marah (left4), Istri jijik (3)
- **Dialog:** Istri mendorong Malin untuk mengusir ibu

### Scene 7A Final: Good Ending Final
- **Karakter:** Malin (kiri) + Istri (kanan) + Ibu (tengah)
- **Ekspresi:** Semua bahagia
- **Narasi:** Keluarga hidup bahagia

---

## 🎨 Tips Desain Karakter Istri

### Pakaian & Aksesoris
- Gaun panjang dengan bordiran emas
- Kerudung/selendang sutra (opsional)
- Perhiasan: kalung, gelang, anting
- Warna: Merah marun, hijau zamrud, atau ungu kerajaan

### Rambut
- Rambut panjang terurai atau disanggul
- Hiasan rambut (bunga atau mahkota kecil)

### Warna Kulit
- Lebih terang dari Malin dan Ibu (menunjukkan status sosial)
- Atau sama, tapi dengan makeup lebih terawat

### Referensi Visual
- Putri bangsawan Melayu tradisional
- Pakaian adat Minangkabau untuk wanita kaya
- Kombinasi tradisional + elegan


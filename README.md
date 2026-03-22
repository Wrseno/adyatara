# Adyatara - FICPatch

**Adyatara** adalah sebuah platform _Visual Novel Engine_ berbasis web yang membawa pemain menjelajahi jejak legenda Nusantara dengan antarmuka interaktif dan mekanisme pengambilan keputusan (*branching storyline*). 

Dikembangkan dengan menggunakan **Next.js (App Router)** dan **Prisma ORM**.

## ✨ Fitur Utama
- 🗺️ **Interactive Geographic Dashboard**: Mengeksplorasi wilayah-wilayah Nusantara menggunakan peta interaktif (berbasis `Leaflet` + GeoJSON).
- 🎭 **Dynamic Visual Novel Engine**: Rendering adegan dan percakapan cerita yang mendukung Sprite karakter, Background Images, narasi, dan ekspresi.
- 🤔 **Branching Choices**: Sistem pilihan aksi yang mengubah alur cerita, mencatat skor yang didapatkan (Leveling), serta membuka Pengetahuan baru / ensiklopedia tersembunyi (Knowledges).
- 🔐 **Authentication**: Sistem Login yang terintegrasi penuh menggunakan **NextAuth.js**.
- 🗄️ **Seamless Database**: Manajemen relasional (User, Stories, Characters, Nodes, Choices, & Sessions) melalui **PostgreSQL** + Prisma.

## 🛠️ Stack Teknologi

- **Frontend**: Next.js 15+, React 19, Tailwind CSS v4, Framer Motion, Leaflet.
- **Backend**: Next.js Server Actions & Route Handlers, Node.js.
- **Database**: PostgreSQL
- **ORM**: Prisma Client + `@prisma/adapter-pg`

## 🚀 Cara Menjalankan Secara Lokal

**1. Clone dan Install Dependensi**
```bash
git clone <repository_url>
cd adyatara-ficpatch
npm install
```

**2. Siapkan File Environment `.env`**
Buat file `.env` dan tambahkan variabel wajib (kamu bisa menggunakan docker/local postgres kamu):
```ini
DATABASE_URL="postgresql://username:password@localhost:5432/adyatara?schema=public"
NEXTAUTH_SECRET="your-development-secret"
AUTH_SECRET="your-development-secret"
```

**3. Setup Database & Prisma**
Setelah memastikan PostgreSQL server sudah berjalan, sinkronkan skema database dan masukkan *dummy story* bawaan:
```bash
npx prisma generate
npx prisma db push
npm run prisma:seed  # atau npx prisma db seed
```

**4. Jalankan Development Server**
```bash
npm run dev
```

Platform dapat diakses pada `http://localhost:3000`.

## 📂 Struktur Penting
- `src/app/game/...`: Tampilan utama UI Engine Visual Novel (Scene Player, UI Pilihan, dan Result Screen).
- `src/app/api/...`: Titik Restful Endpoint yang mengatur State dari Sesi Game dan Progress Database.
- `src/lib/game-engine.ts`: Core class dan helper utama yang memproses Validasi Node, perpindahan transisi state Session, serta komputasi Game Over. 
- `prisma/schema.prisma`: Skema lengkap arsitektur Sistem Engine Cerita Interaktif, termasuk dukungan ekstensi BGM, karakter, dan *timing delay* auto-play.

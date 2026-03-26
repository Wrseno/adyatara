import Link from "next/link";
import {
  BookOpen,
  Play,
  ArrowRight,
  Wallpaper,
  ScrollText,
} from "lucide-react";

const features = [
  {
    title: "Naratif Interaktif",
    description:
      "Pilihan ada di tanganmu. Setiap keputusan membawa alur berbeda — akankah kamu menjadi pahlawan atau legenda baru?",
    icon: BookOpen,
  },
  {
    title: "Visual Nusantara",
    description:
      "Nikmati estetika budaya yang dikemas dengan visual modern, membawa keajaiban dongeng leluhur ke layar perangkatmu.",
    icon: Wallpaper,
  },
  {
    title: "Warisan Hidup",
    description:
      "Pelajari nilai moral, sejarah, dan fakta unik di balik setiap legenda sambil bermain dan mengumpulkan poin pengetahuan.",
    icon: ScrollText,
  },
];

const stories = [
  {
    tag: "SPIRITUAL",
    prov: "TANAH MINANG",
    title: "Sumatera Barat",
    subtitle: "Legenda Malin Kundang",
    image: "/images/sumatera-barat.webp",
    gradient:
      "linear-gradient(to bottom, rgba(13,10,8,0.1) 0%, rgba(13,10,8,0.3) 40%, rgba(13,10,8,0.95) 100%)",
  },
  {
    tag: "TRAGEDI",
    prov: "TANAH SUNDA",
    title: "Jawa Barat",
    subtitle: "Legenda Sangkuriang",
    image: "/images/jawa-barat.webp",
    gradient:
      "linear-gradient(to bottom, rgba(13,10,8,0.1) 0%, rgba(13,10,8,0.4) 40%, rgba(13,10,8,0.95) 100%)",
  },
  {
    tag: "MISTERI",
    prov: "JANTUNG JAWA",
    title: "Jawa Tengah",
    subtitle: "Legenda Timun Mas",
    image: "/images/jawa-tengah.webp",
    gradient:
      "linear-gradient(to bottom, rgba(13,10,8,0.1) 0%, rgba(13,10,8,0.5) 40%, rgba(13,10,8,0.95) 100%)",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0A0705] text-[#F5F0EB]">
      {/* Hero Section */}
      <section
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-cover bg-center pt-24"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(10, 7, 5, 0.3) 0%, rgba(10, 7, 5, 0.7) 30%, rgba(10, 7, 5, 1) 100%), url('/images/hero-background.webp')",
        }}
      >
        <div className="text-center z-10 px-4 max-w-4xl mx-auto flex flex-col items-center">
          <div className="mb-8 relative flex items-center justify-center px-4 py-1">
            {/* Brackets */}
            <div className="absolute left-0 top-0 w-2 h-2 border-l border-t border-[#D96B4A]/60"></div>
            <div className="absolute left-0 bottom-0 w-2 h-2 border-l border-b border-[#D96B4A]/60"></div>
            <div className="absolute right-0 top-0 w-2 h-2 border-r border-t border-[#D96B4A]/60"></div>
            <div className="absolute right-0 bottom-0 w-2 h-2 border-r border-b border-[#D96B4A]/60"></div>

            <span className="text-[10px] md:text-xs tracking-[0.4em] text-[#D96B4A] uppercase opacity-90 mx-3 drop-shadow-2xl">
              Platform Cerita Rakyat Indonesia Interaktif
            </span>
          </div>

          <h1 className="text-6xl md:text-[7rem] font-serif font-bold text-white mb-6 leading-none tracking-widest drop-shadow-2xl">
            ADYATARA
          </h1>
          <p className="text-sm md:text-base text-gray-300 mb-12 max-w-xl mx-auto font-light leading-relaxed">
            Jelajahi kekayaan budaya Indonesia melalui cerita interaktif yang
            memukau. Buat pilihan, temukan hikmah, dan lestarikan warisan
            leluhur bangsa.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center w-full max-w-md md:max-w-none">
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#E86B52] hover:bg-[#D96B4A] text-white text-xs font-semibold rounded-sm transition-all tracking-[0.2em]"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              MULAI PERJALANAN
            </Link>
            <Link
              href="#tentang"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-gray-600/50 text-gray-300 hover:bg-white/5 hover:text-white text-xs rounded-sm transition-all font-semibold tracking-[0.2em] relative overflow-hidden group"
            >
              SELENGKAPNYA
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#0A0705] relative py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 relative py-8">
            <div className="text-center flex flex-col items-center justify-center">
              <div className="text-4xl md:text-5xl font-serif text-[#D96B4A] mb-3">
                38
              </div>
              <p className="text-[9px] tracking-[0.3em] text-gray-500 uppercase">
                Provinsi
              </p>
            </div>
            <div className="text-center flex flex-col items-center justify-center">
              <div className="text-4xl md:text-5xl font-serif text-[#D96B4A] mb-3">
                12+
              </div>
              <p className="text-[9px] tracking-[0.3em] text-gray-500 uppercase">
                Cerita
              </p>
            </div>
            <div className="text-center flex flex-col items-center justify-center">
              <div className="text-4xl md:text-5xl font-serif text-[#D96B4A] mb-3">
                3
              </div>
              <p className="text-[9px] tracking-[0.3em] text-gray-500 uppercase">
                Ending
              </p>
            </div>
            <div className="text-center flex flex-col items-center justify-center">
              <div className="text-4xl md:text-5xl font-serif text-[#D96B4A] mb-3">
                ∞
              </div>
              <p className="text-[9px] tracking-[0.3em] text-gray-500 uppercase">
                Pilihan
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#0A0705] relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col items-center mb-16">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-12 bg-[#D96B4A]/30"></div>
              <p className="text-[9px] tracking-[0.3em] text-[#D96B4A] uppercase font-medium">
                ADYATARA
              </p>
              <div className="h-px w-12 bg-[#D96B4A]/30"></div>
            </div>
            <h2 className="text-4xl font-serif text-white text-center">
              Fitur Utama
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;

              return (
                <div
                  key={idx}
                  className="relative p-8 bg-[#0D0907] border border-transparent group min-h-[220px]"
                >
                  {/* Corner brackets */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-gray-800 group-hover:border-[#D96B4A]/60 transition-colors" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-gray-800 group-hover:border-[#D96B4A]/60 transition-colors" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-gray-800 group-hover:border-[#D96B4A]/60 transition-colors" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-gray-800 group-hover:border-[#D96B4A]/60 transition-colors" />

                  <div className="mb-6 inline-flex p-3 border border-gray-800/80 group-hover:border-[#D96B4A]/30 rounded-sm transition-colors relative">
                    <div className="absolute top-0 left-0 w-1 h-1 border-l border-t border-gray-600"></div>
                    <div className="absolute bottom-0 right-0 w-1 h-1 border-r border-b border-gray-600"></div>
                    <Icon className="w-5 h-5 text-[#D96B4A]" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-serif text-white mb-3 tracking-wide">
                    {feature.title}
                  </h3>
                  <p className="text-[13px] text-gray-400 leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <section className="py-24 bg-[#0A0705] relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col items-center mb-16">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-16 bg-gray-800"></div>
              <p className="text-[9px] tracking-[0.3em] text-[#D96B4A] uppercase font-medium">
                CERITA PILIHAN
              </p>
              <div className="h-px w-16 bg-gray-800"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-white text-center mb-6">
              Kisah Nusantara
            </h2>
            <p className="text-center text-[13px] text-gray-400 max-w-md leading-relaxed font-light">
              Setiap provinsi menyimpan mitologi yang hidup. Temukan
              kebijaksanaan leluhur melalui narasi yang kamu bentuk sendiri.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stories.map((story, idx) => (
              <Link
                key={idx}
                href="/dashboard"
                className="group cursor-pointer aspect-[3/4] overflow-hidden relative block"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                  style={{ backgroundImage: `url('${story.image}')` }}
                />

                <div
                  className="absolute inset-0 flex flex-col justify-between p-7 z-10"
                  style={{ background: story.gradient }}
                >
                  <div className="self-start">
                    <span className="text-[8px] font-medium tracking-[0.2em] bg-[#1a1310]/80 px-2 py-1 text-gray-400 shadow-sm backdrop-blur-sm">
                      {story.tag}
                    </span>
                  </div>

                  <div className="mt-auto transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-[9px] tracking-[0.3em] text-[#D96B4A] uppercase font-medium mb-2">
                      {story.prov}
                    </p>
                    <h3 className="text-3xl font-serif text-white mb-1 drop-shadow-md">
                      {story.title}
                    </h3>
                    <p className="text-xs text-gray-400 italic font-serif opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {story.subtitle}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-24 bg-[#0A0705] relative overflow-hidden flex items-center min-h-[500px]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(10, 7, 5, 1) 0%, rgba(10, 7, 5, 0.95) 40%, rgba(10, 7, 5, 0.6) 100%), url('/images/cta-background.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent opacity-50"></div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="max-w-md">
            <p className="text-[9px] tracking-[0.3em] text-[#D96B4A] uppercase font-medium mb-3">
              WARISAN BUDAYA
            </p>
            <h2 className="text-4xl md:text-[2.75rem] font-serif text-white mb-6 leading-[1.1]">
              Setiap Pilihan
              <br />
              Menulis Sejarah
            </h2>
            <p className="text-[13px] text-gray-300 mb-10 leading-relaxed font-light">
              Dalam ADYATARA, tidak ada jalan yang salah. Hanya jalur yang
              berbeda. Ikuti alur asli folklor atau bentuk timeline alternatifmu
              sendiri.
            </p>
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-[#E86B52] hover:bg-[#D96B4A] text-white text-xs font-semibold rounded-sm transition-all tracking-[0.2em] uppercase"
            >
              DAFTAR GRATIS
              <ArrowRight className="w-3.5 h-3.5 ml-1" strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { constructMetadata } from "@/lib/metadata";
import { ArrowLeft, Award, Trophy } from "lucide-react";
import Link from "next/link";
import MapWrapper from "@/components/dashboard/map-wrapper";

export const metadata = constructMetadata({
  title: "Peta Nusantara - Pilih Provinsi",
  description: "Jelajahi peta Indonesia dan mulai petualangan Anda",
  path: "/explore",
});

export default async function ExplorePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const userData = await db.user.findUnique({
    where: { id: session.user.id },
    select: { level: true, totalScore: true },
  });

  const level = userData?.level || 1;
  const score = userData?.totalScore || 0;

  return (
    <div className="h-screen w-full bg-[#0A0705] text-[#F5F0EB] relative overflow-hidden flex flex-col">
      {/* Background Particles/Stars effect */}
      <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
        <div className="absolute top-[20%] left-[10%] w-1 h-1 rounded-full bg-[#D96B4A] shadow-[0_0_8px_2px_#D96B4A]" />
        <div className="absolute top-[60%] left-[80%] w-1 h-1 rounded-full bg-[#D96B4A] shadow-[0_0_8px_2px_#D96B4A]" />
        <div className="absolute top-[80%] left-[20%] w-1.5 h-1.5 rounded-full bg-[#E86B52] shadow-[0_0_10px_3px_#E86B52] opacity-50" />
        <div className="absolute top-[30%] left-[70%] w-1 h-1 rounded-full bg-[#E86B52] shadow-[0_0_8px_2px_#D96B4A]" />
      </div>

      {/* Map Area */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <MapWrapper />
      </div>

      {/* UI overlay layer */}
      <div className="relative z-10 w-full h-full flex flex-col pointer-events-none">
        {/* Header */}
        <div className="flex items-center justify-between p-2 sm:p-4 lg:p-8 w-full mr-auto ml-auto lg:px-12">
          {/* Left - Back Button */}
          <div className="flex items-center pointer-events-auto">
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 px-2 py-1.5 lg:px-4 lg:py-2 border border-gray-800/80 bg-[#0D0907]/50 hover:bg-[#1A1410]/80 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400 group-hover:text-[#E8724A] transition-colors" />
              <span className="text-[10px] lg:text-xs tracking-[0.2em] text-gray-400 group-hover:text-[#F5F0EB] transition-colors">
                KEMBALI
              </span>
            </Link>
          </div>

          {/* Center - Stats - Hidden on mobile, shown on desktop */}
          <div className="hidden lg:flex items-center pointer-events-auto">
            {/* Stats Box */}
            <div className="relative border border-gray-800/80 bg-[#0D0907]/50 flex items-center py-3 px-8">
              <div className="absolute top-0 left-0 w-1.5 h-1.5 border-l border-t border-gray-600/50" />
              <div className="absolute top-0 right-0 w-1.5 h-1.5 border-r border-t border-gray-600/50" />
              <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-l border-b border-gray-600/50" />
              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b border-gray-600/50" />

              <div className="flex items-center gap-3 pr-8 border-r border-gray-800">
                <Award className="w-5 h-5 lg:w-6 lg:h-6 text-[#D96B4A]" strokeWidth={2} />
                <div>
                  <p className="text-[10px] lg:text-[11px] tracking-[0.2em] text-gray-500 uppercase mb-0.5">
                    LEVEL
                  </p>
                  <p className="text-lg lg:text-xl font-medium text-white">{level}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pl-8">
                <Trophy className="w-5 h-5 lg:w-6 lg:h-6 text-[#D96B4A]" strokeWidth={2} />
                <div>
                  <p className="text-[10px] lg:text-[11px] tracking-[0.2em] text-gray-500 uppercase mb-0.5">
                    SKOR TOTAL
                  </p>
                  <p className="text-lg lg:text-xl font-medium text-white">{score}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Logo */}
          <div className="flex items-center pointer-events-auto">
            <div className="flex items-center gap-2 lg:gap-4">
              <span className="text-[10px] lg:text-[12px] tracking-[0.3em] lg:tracking-[0.4em] font-serif text-gray-300 uppercase">
                ADYATARA
              </span>
              <div className="w-5 h-5 lg:w-8 lg:h-8 border border-gray-700/50 flex items-center justify-center relative">
                <div className="absolute top-0 left-0 w-1 h-1 border-l border-t border-gray-500" />
                <div className="absolute bottom-0 right-0 w-1 h-1 border-r border-b border-gray-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="flex flex-col items-center mt-0.5 sm:mt-1 lg:mt-2">
          <p className="text-[9px] sm:text-[10px] lg:text-[11px] tracking-[0.2em] lg:tracking-[0.4em] text-[#D96B4A] uppercase font-medium mb-0.5 sm:mb-1.5 lg:mb-3">
            PETA NUSANTARA
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-serif text-white">
            Pilih Provinsi
          </h1>
        </div>

        {/* Legend Bottom */}
        <div className="absolute bottom-2 sm:bottom-4 lg:bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 sm:gap-3 lg:gap-10 bg-[#0a0705]/80 px-2 sm:px-4 py-1 sm:py-2 lg:py-3 rounded-full border border-gray-800/50 backdrop-blur-md">
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-[#EAA87E]" />
            <span className="text-[8px] lg:text-[10px] tracking-[0.15em] lg:tracking-[0.2em] text-gray-500 uppercase font-medium">
              SELESAI
            </span>
          </div>
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-[#E86B52] shadow-[0_0_10px_2px_rgba(232,107,82,0.6)]" />
            <span className="text-[8px] lg:text-[10px] tracking-[0.15em] lg:tracking-[0.2em] text-gray-500 uppercase font-medium">
              AKTIF
            </span>
          </div>
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-[#8C3A2A]" />
            <span className="text-[8px] lg:text-[10px] tracking-[0.15em] lg:tracking-[0.2em] text-gray-500 uppercase font-medium">
              TERSEDIA
            </span>
          </div>
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-gray-700" />
            <span className="text-[8px] lg:text-[10px] tracking-[0.15em] lg:tracking-[0.2em] text-gray-500 uppercase font-medium">
              TERKUNCI
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

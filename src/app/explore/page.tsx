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
        <div className="flex items-center justify-between p-8 w-full mr-auto ml-auto md:px-12">
          {/* Left - Back Button */}
          <div className="flex items-center pointer-events-auto">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2 border border-gray-800/80 bg-[#0D0907]/50 hover:bg-[#1A1410]/80 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 text-gray-400 group-hover:text-[#E8724A] transition-colors" />
              <span className="text-sm tracking-[0.2em] text-gray-400 group-hover:text-[#F5F0EB] transition-colors">
                KEMBALI
              </span>
            </Link>
          </div>

          {/* Center - Stats */}
          <div className="flex items-center pointer-events-auto">
            {/* Stats Box */}
            <div className="relative border border-gray-800/80 bg-[#0D0907]/50 flex items-center py-3 px-8">
              <div className="absolute top-0 left-0 w-1.5 h-1.5 border-l border-t border-gray-600/50" />
              <div className="absolute top-0 right-0 w-1.5 h-1.5 border-r border-t border-gray-600/50" />
              <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-l border-b border-gray-600/50" />
              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b border-gray-600/50" />

              <div className="flex items-center gap-3 pr-8 border-r border-gray-800">
                <Award className="w-4 h-4 text-[#D96B4A]" strokeWidth={2} />
                <div>
                  <p className="text-[10px] tracking-[0.2em] text-gray-500 uppercase mb-0.5">
                    LEVEL
                  </p>
                  <p className="text-sm font-medium text-white">{level}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pl-8">
                <Trophy className="w-4 h-4 text-[#D96B4A]" strokeWidth={2} />
                <div>
                  <p className="text-[10px] tracking-[0.2em] text-gray-500 uppercase mb-0.5">
                    SKOR TOTAL
                  </p>
                  <p className="text-sm font-medium text-white">{score}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Logo */}
          <div className="flex items-center pointer-events-auto">
            <div className="flex items-center gap-4">
              <span className="text-xs tracking-[0.4em] font-serif text-gray-300 uppercase">
                ADYATARA
              </span>
              <div className="w-8 h-8 border border-gray-700/50 flex items-center justify-center relative">
                <div className="absolute top-0 left-0 w-1 h-1 border-l border-t border-gray-500" />
                <div className="absolute bottom-0 right-0 w-1 h-1 border-r border-b border-gray-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="flex flex-col items-center mt-2">
          <p className="text-xs tracking-[0.4em] text-[#D96B4A] uppercase font-medium mb-3">
            PETA NUSANTARA
          </p>
          <h1 className="text-5xl md:text-[2.5rem] font-serif text-white">
            Pilih Provinsi
          </h1>
        </div>

        {/* Legend Bottom */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center gap-10 bg-[#0a0705]/80 px-8 py-3 rounded-full border border-gray-800/50 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#EAA87E]" />
            <span className="text-[10px] tracking-[0.2em] text-gray-500 uppercase font-medium">
              SELESAI
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#E86B52] shadow-[0_0_10px_2px_rgba(232,107,82,0.6)]" />
            <span className="text-[10px] tracking-[0.2em] text-gray-500 uppercase font-medium">
              AKTIF
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#8C3A2A]" />
            <span className="text-[10px] tracking-[0.2em] text-gray-500 uppercase font-medium">
              TERSEDIA
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-gray-700" />
            <span className="text-[10px] tracking-[0.2em] text-gray-500 uppercase font-medium">
              TERKUNCI
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

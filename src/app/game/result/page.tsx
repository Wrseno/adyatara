"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Share2, Sparkles, BookOpen } from "lucide-react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { storyInfoMap, endingLabels } from "@/stories";

function ResultPageContent() {
  const searchParams = useSearchParams();
  const storySlug = searchParams.get("story") ?? "";
  const endingKey = searchParams.get("ending") || "neutral";
  const score = parseInt(searchParams.get("score") || "0", 10);

  const storyInfo = storyInfoMap[storySlug];
  const storyTitle = storyInfo?.title ?? storySlug.replace(/-/g, " ");
  const coverImage = storyInfo?.coverImage ?? "/images/jawa-tengah.webp";
  const endingInfo = endingLabels[endingKey] ?? endingLabels.neutral;

  const stats = [
    { label: "Skor Akhir", value: String(score), prefix: "", icon: Sparkles },
    { label: "Pengetahuan", value: "+1", prefix: "", icon: BookOpen },
    {
      label: "Ending",
      value: endingInfo.label,
      prefix: "",
      icon: MapPin,
      color: endingInfo.color,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0705] relative flex flex-col items-center justify-center py-12 px-6 overflow-hidden">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `url('${coverImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "grayscale(100%)",
        }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-[#0A0705] via-[#0A0705]/80 to-transparent z-0" />

      {/* Main Content */}
      <div className="w-full max-w-4xl z-10 flex flex-col items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-[#D96B4A]" />
            <h2 className="text-[#D96B4A] tracking-[0.3em] text-xs font-semibold uppercase">
              Permainan Selesai
            </h2>
            <div className="h-px w-12 bg-[#D96B4A]" />
          </div>

          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">
            Akhir Perjalanan
          </h1>
          <p className="text-gray-400 font-light max-w-xl mx-auto text-lg">
            Anda telah menyelesaikan kisah {storyTitle}. Keputusan yang Anda
            ambil telah mengubah takdir mereka selamanya.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="grid grid-cols-3 gap-4 w-full mb-16"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-[#120D0A]/80 border border-gray-800 p-6 flex flex-col items-center justify-center relative group hover:border-[#D96B4A]/50 transition-colors"
              >
                <Icon className="w-5 h-5 text-gray-500 mb-3 group-hover:text-[#D96B4A] transition-colors" />
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                  {stat.label}
                </p>
                <p
                  className="text-3xl font-serif"
                  style={{ color: stat.color ?? "#fff" }}
                >
                  {stat.prefix && (
                    <span className="text-sm text-[#D96B4A] mr-1">
                      {stat.prefix}
                    </span>
                  )}
                  {stat.value}
                </p>
              </div>
            );
          })}
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md"
        >
          <Link
            href="/dashboard"
            className="w-full text-center py-4 px-8 bg-[#D96B4A] text-white tracking-widest text-xs font-semibold hover:bg-[#E86B52] transition-colors"
          >
            KEMBALI KE PETA
          </Link>

          <button className="w-full sm:w-auto py-4 px-8 border border-gray-700 text-gray-300 flex justify-center items-center gap-2 hover:border-gray-500 hover:text-white transition-colors">
            <Share2 className="w-4 h-4" />
            <span className="text-xs tracking-widest font-semibold">
              BAGIKAN
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default function GameResultPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0705]" />}>
      <ResultPageContent />
    </Suspense>
  );
}

"use client";

import { useEffect, useState } from "react";

/**
 * Overlay that prompts mobile/tablet users to rotate to landscape mode.
 * Only triggers on touch devices with viewport width < 1024px in portrait.
 * Desktop/laptops are never affected.
 */
export function LandscapeOverlay() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const check = () => {
      const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 1024;
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;

      setShow(isTouchDevice && isSmallScreen && isPortrait);
    };

    check();

    window.addEventListener("resize", check);
    window.addEventListener("orientationchange", check);

    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("orientationchange", check);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[#0A0705] flex flex-col items-center justify-center text-center px-8">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-px h-32 bg-[#D96B4A]" />
        <div className="absolute top-1/4 left-1/4 w-32 h-px bg-[#D96B4A]" />
        <div className="absolute bottom-1/4 right-1/4 w-px h-32 bg-[#D96B4A]" />
        <div className="absolute bottom-1/4 right-1/4 w-32 h-px bg-[#D96B4A]" />
      </div>

      {/* Phone icon container with corner brackets */}
      <div className="relative p-8 mb-8">
        {/* Corner brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-gray-700" />
        <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-gray-700" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-gray-700" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-gray-700" />

        {/* Phone icon with portrait→landscape animation */}
        <svg
          width="48"
          height="72"
          viewBox="0 0 48 72"
          fill="none"
          className="text-gray-500 animate-[rotatePhone_3s_ease-in-out_infinite]"
        >
          <rect
            x="2"
            y="2"
            width="44"
            height="68"
            rx="8"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <line
            x1="16"
            y1="60"
            x2="32"
            y2="60"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="24" cy="10" r="2" fill="#D96B4A" />
        </svg>
      </div>

      {/* Label */}
      <p className="text-[9px] tracking-[0.3em] text-[#D96B4A] uppercase font-medium mb-4">
        ORIENTASI LANDSCAPE DIBUTUHKAN
      </p>

      {/* Heading */}
      <h2 className="text-xl sm:text-2xl font-serif text-white mb-4 tracking-wide">
        Putar Perangkat Anda
      </h2>

      {/* Description */}
      <p className="text-[13px] text-gray-400 font-light max-w-xs leading-relaxed">
        Halaman ini dioptimalkan untuk mode landscape.
        Silakan putar perangkat Anda ke orientasi mendatar.
      </p>

      {/* Bottom accent line */}
      <div className="mt-10 flex items-center gap-3">
        <div className="w-8 h-px bg-gray-800" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#D96B4A]/40" />
        <div className="w-8 h-px bg-gray-800" />
      </div>

      <style>{`
        @keyframes rotatePhone {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(90deg); }
          75% { transform: rotate(90deg); }
        }
      `}</style>
    </div>
  );
}

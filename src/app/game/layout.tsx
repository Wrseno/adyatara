import { LandscapeOverlay } from "@/components/shared/landscape-overlay";

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#0A0705]">
      <LandscapeOverlay />
      {children}
    </div>
  );
}

import { LandscapeOverlay } from "@/components/shared/landscape-overlay";

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LandscapeOverlay />
      {children}
    </>
  );
}

import { LandscapeOverlay } from "@/components/shared/landscape-overlay";

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Return children directly without the root layout's navbar/footer wrapper
  // The explore page has its own full-screen UI with navigation
  return (
    <div className="fixed inset-0 z-50">
      <LandscapeOverlay />
      {children}
    </div>
  );
}

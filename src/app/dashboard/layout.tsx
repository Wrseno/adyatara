import { Sidebar } from "@/components/dashboard/sidebar";
import { MobileNav } from "@/components/dashboard/mobile-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#0D0A08] relative">
      <Sidebar />
      <MobileNav />
      <main className="flex-1 overflow-auto relative z-0">
        {children}
      </main>
    </div>
  );
}

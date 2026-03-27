import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { constructMetadata } from "@/lib/metadata";
import { ChatInterface } from "@/components/dashboard/chat-interface";

export const metadata = constructMetadata({
  title: "Pamandu Kebudayaan",
  description: "Tanya jawab tentang kebudayaan Indonesia per provinsi",
  path: "/dashboard/chat",
});

export default async function ChatPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  return (
    <div className="min-h-screen bg-[#0A0705] text-[#F5F0EB] p-6 md:p-8">
      {/* Spacer for mobile nav */}
      <div className="md:hidden h-14" />

      {/* Header */}
      <div className="relative mb-8 md:mb-10 bg-[#0a0604] border border-[#2E2318] p-8 overflow-hidden group shadow-[inset_0_0_40px_rgba(217,107,74,0.05)]">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#D96B4A] opacity-[0.03] blur-[80px] rounded-full pointer-events-none" />

        {/* Corner frames */}
        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-[#D96B4A]/30" />
        <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-[#D96B4A]/30" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-[#D96B4A]/30" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-[#D96B4A]/30" />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#D96B4A]" />
            <p className="text-[10px] tracking-[0.3em] text-[#D96B4A] uppercase font-medium">
              Pemandu Budaya
            </p>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif text-[#F5F0EB] mb-2 drop-shadow-sm leading-tight">
            Kebudayaan Indonesia
          </h1>
          <p className="text-sm text-[#9A8A7A] font-light max-w-xl leading-relaxed">
            Tanya jawab tentang kebudayaan, tradisi, dan adat istiadat di setiap
            provinsi Indonesia
          </p>
        </div>
      </div>

      <ChatInterface userId={session.user.id} />
    </div>
  );
}

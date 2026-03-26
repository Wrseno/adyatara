import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { constructMetadata } from "@/lib/metadata";
import { ChatInterface } from "@/components/dashboard/chat-interface";

export const metadata = constructMetadata({
  title: "Chatbot Kebudayaan",
  description: "Tanya jawab tentang kebudayaan Indonesia per provinsi",
  path: "/dashboard/chat",
});

export default async function ChatPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  return (
    <div className="min-h-screen bg-[#0A0705] text-[#F5F0EB] p-8 md:p-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px w-12 bg-[#D96B4A]/30"></div>
          <p className="text-[10px] tracking-[0.3em] text-[#D96B4A] uppercase font-medium">
            CHATBOT
          </p>
        </div>
        <h1 className="text-5xl font-serif text-white mb-3">
          Kebudayaan Indonesia
        </h1>
        <p className="text-sm text-gray-400 font-light">
          Tanya jawab tentang kebudayaan, tradisi, dan adat istiadat di setiap
          provinsi Indonesia
        </p>
      </div>

      <ChatInterface userId={session.user.id} />
    </div>
  );
}

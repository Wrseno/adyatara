"use client";

import { useState, useRef, useEffect } from "react";
import { SendHorizontal, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/lib/validations/chat";
import { Button } from "@/components/ui/button";
import { Markdown } from "@/components/ui/markdown";

const PROVINCES = [
  "Aceh", "Sumatera Utara", "Sumatera Barat", "Riau", "Jambi",
  "Sumatera Selatan", "Bengkulu", "Lampung", "Kepulauan Bangka Belitung",
  "Kepulauan Riau", "DKI Jakarta", "Jawa Barat", "Jawa Tengah",
  "DI Yogyakarta", "Jawa Timur", "Banten", "Bali", "Nusa Tenggara Barat",
  "Nusa Tenggara Timur", "Kalimantan Barat", "Kalimantan Tengah",
  "Kalimantan Selatan", "Kalimantan Timur", "Kalimantan Utara",
  "Sulawesi Utara", "Sulawesi Tengah", "Sulawesi Selatan",
  "Sulawesi Tenggara", "Gorontalo", "Sulawesi Barat", "Maluku",
  "Maluku Utara", "Papua", "Papua Barat", "Papua Selatan",
  "Papua Tengah", "Papua Pegunungan", "Papua Barat Daya",
];

const SUGGESTIONS = [
  "Apa adat istiadat unik di Bali?",
  "Ceritakan tentang tradisi pernikahan di Jawa",
  "Makanan khas Sumatra Barat apa saja?",
  "Rumah adat Papua seperti apa?",
  "Festival apa yang terkenal di Kalimantan?",
  "Musik tradisional Sulawesi Selatan apa saja?",
];

interface ChatInterfaceProps {
  userId?: string;
}

export function ChatInterface({ userId }: ChatInterfaceProps) {
  void userId;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const stripMarkdown = (_text: string): string => {
    return _text;
  };

  const handleSend = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = { role: "user", content: trimmed };
    const allMessages = [...messages, userMsg];

    setMessages([...allMessages, { role: "assistant", content: "" }]);
    setInput("");
    setIsLoading(true);

    try {
      abortRef.current = new AbortController();

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: allMessages.map((m) => ({ role: m.role, content: m.content })),
          province: selectedProvince || undefined,
        }),
        signal: abortRef.current.signal,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      setMessages((prev) =>
        prev.map((m, i) =>
          i === prev.length - 1
            ? { ...m, content: stripMarkdown(data.content) || "Tidak ada respons." }
            : m
        )
      );
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        console.error("Chat error:", err);
        setMessages((prev) =>
          prev.map((m, i) =>
            i === prev.length - 1
              ? { ...m, content: `Maaf, terjadi kesalahan: ${(err as Error).message}` }
              : m
          )
        );
      }
    } finally {
      setIsLoading(false);
      abortRef.current = null;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-220px)]">
      {/* Province Selector */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#9A8A7A] font-medium">
          <Globe className="h-3.5 w-3.5" />
          <span>Provinsi</span>
        </div>
        <div className="relative">
          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className={cn(
              "bg-[#0D0907] border border-gray-800 text-[#F5F0EB] text-sm",
              "rounded-none px-3 py-1.5 pr-8 appearance-none cursor-pointer",
              "focus:outline-none focus:border-[#D96B4A]/60",
              "transition-colors duration-200"
            )}
          >
            <option value="">Semua Provinsi</option>
            {PROVINCES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#9A8A7A]">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        {selectedProvince && (
          <button
            onClick={() => setSelectedProvince("")}
            className="text-[10px] tracking-widest uppercase text-[#D96B4A] hover:text-[#E86B52] transition-colors"
          >
            Reset
          </button>
        )}
      </div>

      {/* Chat Area */}
      <div className="flex-1 relative rounded-lg border border-gray-800/60 bg-[#0D0907] overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4 py-8">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto mb-4 border border-gray-800 relative flex items-center justify-center">
                <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-[#D96B4A]" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-[#D96B4A]" />
                <span className="text-2xl font-serif text-[#D96B4A]">A</span>
              </div>
              <h3 className="text-xl font-serif text-[#F5F0EB] mb-2">
                Selamat Datang di Adyatara Chat
              </h3>
              <p className="text-sm text-[#9A8A7A] max-w-md">
                Tanyakan apa saja tentang kebudayaan Indonesia. Dari tradisi,
                makanan khas, hingga upacara adat di setiap provinsi.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  className={cn(
                    "text-left py-2.5 px-3 text-sm font-light",
                    "bg-[#0A0705] border border-gray-800 text-[#9A8A7A]",
                    "hover:border-[#D96B4A]/60 hover:text-[#F5F0EB]",
                    "rounded-none transition-all duration-200"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex gap-3 items-start",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {msg.role === "assistant" && (
                  <div className="h-8 w-8 shrink-0 rounded-full bg-[#D96B4A]/20 text-[#D96B4A] border border-[#D96B4A]/30 flex items-center justify-center text-sm font-medium">
                    A
                  </div>
                )}
                <div
                  className={cn(
                    "rounded-none px-3 py-2 max-w-[85%] text-sm",
                    msg.role === "user"
                      ? "bg-[#D96B4A]/10 border border-[#D96B4A]/30 text-[#F5F0EB] whitespace-pre-wrap"
                      : "bg-[#0A0705] border border-gray-800/60 text-[#F5F0EB]"
                  )}
                >
                  {msg.role === "user" ? (
                    msg.content || null
                  ) : msg.content ? (
                    <Markdown>{msg.content}</Markdown>
                  ) : (
                    <span className="flex items-center gap-1">
                      <span className="animate-bounce inline-block w-1.5 h-1.5 bg-[#D96B4A] rounded-full" style={{ animationDelay: "0ms" }} />
                      <span className="animate-bounce inline-block w-1.5 h-1.5 bg-[#D96B4A] rounded-full" style={{ animationDelay: "150ms" }} />
                      <span className="animate-bounce inline-block w-1.5 h-1.5 bg-[#D96B4A] rounded-full" style={{ animationDelay: "300ms" }} />
                      <span className="text-xs text-[#9A8A7A] ml-2">Berpikir...</span>
                    </span>
                  )}
                </div>
                {msg.role === "user" && (
                  <div className="h-8 w-8 shrink-0 rounded-full bg-gray-800 text-[#9A8A7A] border border-gray-700 flex items-center justify-center text-sm font-medium">
                    U
                  </div>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="mt-4 flex gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            selectedProvince
              ? `Tanyakan tentang kebudayaan ${selectedProvince}...`
              : "Tanyakan tentang kebudayaan Indonesia..."
          }
          rows={1}
          className={cn(
            "flex-1 bg-[#0D0907] border border-gray-800 text-[#F5F0EB] text-sm",
            "rounded-none px-3 py-2.5 resize-none",
            "placeholder:text-gray-600",
            "focus:outline-none focus:border-[#D96B4A]/60",
            "transition-colors duration-200"
          )}
        />
        <Button
          onClick={() => handleSend(input)}
          disabled={isLoading || !input.trim()}
          className={cn(
            "bg-[#E86B52] hover:bg-[#D96B4A] text-white",
            "rounded-none h-auto px-4",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          <SendHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

import { auth } from "@/lib/auth";
import { chatRequestSchema } from "@/lib/validations/chat";
import { NextResponse } from "next/server";

const SYSTEM_PROMPT_BASE = `
Jawab dengan jelas dan menggunakan bahasa indonesia,

Jika ada pertanyaan yang tidak berkaitan dengan kebudayaan Indonesia,
arahkan kembali percakapan ke topik kebudayaan Indonesia dengan sopan.`;

export async function POST(req: Request) {
  try {
    const sessionAuth = await auth();
    const user = sessionAuth?.user;

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validated = chatRequestSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: validated.error.issues[0]?.message ?? "Invalid request" },
        { status: 400 },
      );
    }

    const { messages, province } = validated.data;

    let systemPrompt = SYSTEM_PROMPT_BASE;
    if (province) {
      systemPrompt += `\n\nFokus khusus pada provinsi: ${province}.
Berikan informasi yang lebih detail dan spesifik tentang provinsi ini.`;
    }

    const formattedMessages = [
      { role: "system", content: systemPrompt },
      ...messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    const apiKey = process.env.OPENROUTER_API_KEY;
    const model = process.env.OPENROUTER_MODEL;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 },
      );
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer":
            process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
          "X-OpenRouter-Title": "Adyatara",
        },
        body: JSON.stringify({
          model,
          messages: formattedMessages,
          max_tokens: 1024,
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter API error:", response.status, errorText);
      return NextResponse.json(
        { error: `OpenRouter error: ${response.status}` },
        { status: 502 },
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content ?? "";

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

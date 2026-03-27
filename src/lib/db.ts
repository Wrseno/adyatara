import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma_v2: PrismaClient | undefined;
};

function buildConnectionString(rawUrl: string): string {
  try {
    const url = new URL(rawUrl);
    const host = url.hostname;
    const isSupabaseHost =
      host.includes("supabase.co") || host.includes("pooler.supabase.com");

    if (isSupabaseHost) {
      // Keep TLS enabled, but align behavior with libpq for Supabase pooled/direct URLs.
      if (!url.searchParams.get("sslmode")) {
        url.searchParams.set("sslmode", "require");
      }
      if (!url.searchParams.get("uselibpqcompat")) {
        url.searchParams.set("uselibpqcompat", "true");
      }
    }

    return url.toString();
  } catch {
    return rawUrl;
  }
}

function createPrismaClient(): PrismaClient {
  const runtimeUrl = process.env.DATABASE_URL ?? process.env.DIRECT_URL;

  if (!runtimeUrl) {
    throw new Error("DATABASE_URL or DIRECT_URL environment variable is not set");
  }

  const connectionString = buildConnectionString(runtimeUrl);
  const pool = new pg.Pool({ connectionString });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const adapter = new PrismaPg(pool as any);

  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
}

export const db = globalForPrisma.prisma_v2 ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma_v2 = db;

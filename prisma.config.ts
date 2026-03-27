// Prisma config for Prisma 7+
// Database URL is configured here instead of in the schema file
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "npx tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env["DIRECT_URL"] ?? process.env["DATABASE_URL"],
  },
});

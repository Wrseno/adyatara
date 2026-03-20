import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { authConfig } from "./auth.config";
import type { Role } from "@/generated/prisma/client";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string | null;
            email: string | null;
            image: string | null;
            role: Role;
        };
    }

    interface User {
        role: Role;
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    // @ts-expect-error -- adapter type mismatch between @auth/prisma-adapter and next-auth@beta
    adapter: PrismaAdapter(db),
    session: {
        strategy: "jwt",
    },
});

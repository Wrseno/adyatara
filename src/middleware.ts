import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

// Force NextAuth to use edge-compatible config here
export const { auth: middleware } = NextAuth(authConfig);

export const config = {
    matcher: ["/dashboard/:path*"],
};

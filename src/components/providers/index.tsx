"use client";

import { SessionProvider } from "./session-provider";
import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";
import { AudioPlayerProvider } from "@/components/audio-player";
import { Toaster } from "@/components/ui/sonner";

interface ProvidersProps {
    children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    return (
        <SessionProvider>
            <QueryProvider>
                <ThemeProvider>
                    <AudioPlayerProvider>
                        {children}
                        <Toaster richColors position="top-right" />
                    </AudioPlayerProvider>
                </ThemeProvider>
            </QueryProvider>
        </SessionProvider>
    );
}

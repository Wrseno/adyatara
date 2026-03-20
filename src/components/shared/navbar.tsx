"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { LogOut, LayoutDashboard, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
    const { data: session } = useSession();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        NextBoiler
                    </span>
                </Link>

                <nav className="flex items-center gap-2">
                    <ThemeToggle />

                    {session?.user ? (
                        <>
                            <Button variant="ghost" size="sm" render={<Link href="/dashboard" />} nativeButton={false}>
                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                Dashboard
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => signOut({ callbackUrl: "/" })}
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                Sign Out
                            </Button>
                        </>
                    ) : (
                        <Button variant="default" size="sm" render={<Link href="/auth/signin" />} nativeButton={false}>
                            <LogIn className="mr-2 h-4 w-4" />
                            Sign In
                        </Button>
                    )}
                </nav>
            </div>
        </header>
    );
}

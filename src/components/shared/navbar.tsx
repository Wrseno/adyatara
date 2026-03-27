"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
    { href: "/#beranda", label: "Home" },
    { href: "/#fitur", label: "Fitur" },
    { href: "/#cerita", label: "Cerita" },
    { href: "/#tentang", label: "Tentang" },
];

export function Navbar() {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("beranda");
    const pathname = usePathname();

    const hideNavbar = pathname?.startsWith("/dashboard") || pathname?.startsWith("/game");

    useEffect(() => {
        if (hideNavbar) return;

        const sectionIds = NAV_ITEMS.map((item) => item.href.replace("/#", ""));

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-20% 0px -60% 0px" }
        );

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        const handleScroll = () => {
            const scrollBottom = window.innerHeight + window.scrollY;
            const isAtBottom = scrollBottom >= document.documentElement.scrollHeight - 50;
            if (isAtBottom) {
                setActiveSection(sectionIds[sectionIds.length - 1]);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", handleScroll);
        };
    }, [hideNavbar]);

    if (hideNavbar) return null;

    const masukHref = session?.user ? "/dashboard" : "/auth/signin";

    return (
        <header className="fixed top-0 z-50 w-full backdrop-blur-xs transition-all duration-300">
            <div className="container mx-auto flex h-24 items-center justify-between px-4 max-w-6xl">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 font-bold text-2xl z-20">
                    <img src="/images/adyatara-logo.png" alt="Adyatara Logo" className="w-14 h-14 object-contain" />
                    <span className="text-white font-serif tracking-widest text-lg font-medium">Adyatara</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-12 flex-1 mx-12 justify-center">
                    {NAV_ITEMS.map((item) => {
                        const sectionId = item.href.replace("/#", "");
                        const isActive = activeSection === sectionId;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`transition-colors text-sm tracking-wide ${
                                    isActive
                                        ? "text-[#E86B52] font-semibold"
                                        : "text-gray-400 hover:text-white font-light"
                                }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right Actions - Tombol Masuk saja */}
                <div className="flex items-center gap-3">
                    <Link
                        href={masukHref}
                        className="hidden md:flex items-center justify-center px-10 py-2.5 bg-linear-to-b from-[#EAA87E] to-[#D96B4A] text-gray-900 hover:opacity-90 transition-opacity text-sm font-semibold rounded-md shadow-md shadow-[#D96B4A]/20"
                    >
                        Masuk
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden ml-4 text-foreground"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <Menu className="w-5 h-5" />
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-t border-border bg-card p-4 space-y-3">
                    {NAV_ITEMS.map((item) => {
                        const sectionId = item.href.replace("/#", "");
                        const isActive = activeSection === sectionId;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`block py-2 transition-colors ${
                                    isActive ? "text-[#E86B52] font-semibold" : "text-gray-400 hover:text-white"
                                }`}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label.toUpperCase()}
                            </Link>
                        );
                    })}

                    {/* Mobile menu - Tombol Masuk */}
                    <Link href={masukHref} className="block text-[#E86B52] hover:text-[#D96B4A] py-2 font-semibold" onClick={() => setIsOpen(false)}>
                        MASUK
                    </Link>
                </div>
            )}
        </header>
    );
}

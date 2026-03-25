"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import {
  LayoutDashboard,
  Map,
  BookMarked,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuItem {
  label: string;
  icon: React.ElementType;
  href: string;
}

const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Cerita Rakyat",
    icon: Map,
    href: "/explore",
  },
  {
    label: "Koleksi",
    icon: BookMarked,
    href: "/dashboard/collection",
  },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-[#0D0A08] border-b border-[#2E2318]">
        <div className="flex items-center justify-between px-4 h-14">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-7 h-7 border border-gray-600 relative flex items-center justify-center">
              <div className="absolute top-0 left-0 w-1 h-1 border-l border-t border-gray-500" />
              <div className="absolute bottom-0 right-0 w-1 h-1 border-r border-b border-gray-500" />
            </div>
            <span className="text-[10px] tracking-[0.3em] font-serif text-gray-300 uppercase">
              ADYATARA
            </span>
          </Link>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={cn(
          "md:hidden fixed top-14 right-0 bottom-0 z-30 w-72 bg-[#0D0A08] border-l border-[#2E2318]",
          "transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Menu Items */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                    "text-sm font-medium",
                    active
                      ? "bg-[#E8724A]/10 text-[#E8724A]"
                      : "text-[#9A8A7A] hover:bg-[#1A1410] hover:text-[#F5F0EB]"
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Profile Section */}
          <div className="border-t border-[#2E2318] p-4 space-y-2">
            {/* Profile Link */}
            <Link
              href="/dashboard/profile"
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                "text-sm font-medium",
                pathname.startsWith("/dashboard/profile")
                  ? "bg-[#E8724A]/10 text-[#E8724A]"
                  : "text-[#9A8A7A] hover:bg-[#1A1410] hover:text-[#F5F0EB]"
              )}
            >
              {session?.user?.avatarUrl || session?.user?.image ? (
                <img
                  src={session.user.avatarUrl || session.user.image || ""}
                  alt={session.user.name || "User"}
                  className="h-8 w-8 rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-gray-400" />
                </div>
              )}
              <div className="flex flex-col overflow-hidden">
                <span className="truncate text-white">
                  {session?.user?.name || "Profile"}
                </span>
                {session?.user?.email && (
                  <span className="text-xs text-[#9A8A7A] truncate">
                    {session.user.email}
                  </span>
                )}
              </div>
            </Link>

            {/* Logout Button */}
            <button
              onClick={() => {
                setIsOpen(false);
                signOut({ callbackUrl: "/" });
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                "text-sm font-medium",
                "text-[#9A8A7A] hover:bg-red-950/30 hover:text-red-400"
              )}
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

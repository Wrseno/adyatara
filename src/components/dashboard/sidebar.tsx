"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import {
  LayoutDashboard,
  Map,
  BookMarked,
  MessageCircle,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MenuItem {
  label: string;
  icon: React.ElementType;
  href: string;
}

const menuItems: MenuItem[] = [
  {
    label: "Beranda",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Kisah Nusantara",
    icon: Map,
    href: "/explore",
  },
  {
    label: "Peti Pusaka",
    icon: BookMarked,
    href: "/dashboard/collection",
  },  
  {
    label: "Uji Wawasan",
    icon: BookMarked,
    href: "/dashboard/quiz",
  },
  {
    label: "Pemandu Budaya",
    icon: MessageCircle,
    href: "/dashboard/chat",
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const toggleSidebar = () => setCollapsed(!collapsed);

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <TooltipProvider delay={0}>
      <div className="relative flex-shrink-0 hidden md:block">
        <aside
          className={cn(
            "sticky top-0 h-screen flex flex-col border-r",
            "bg-[#0a0604] border-[#2E2318] shadow-[5px_0_15px_rgba(0,0,0,0.5)]",
            "transition-[width] duration-300 ease-in-out",
            collapsed ? "w-16" : "w-64"
          )}
        >
          {/* Header with Logo */}
          <div className="flex items-center justify-center border-b border-[#2E2318] min-h-16.25 px-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#D96B4A]/5 blur-xl rounded-full" />
            <Link 
              href="/dashboard" 
              className="flex items-center gap-4 py-4 relative z-10 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 border border-[#D96B4A]/30 bg-[#1A1410] relative flex items-center justify-center shrink-0 rotate-45 group">
                <div className="absolute inset-1 border border-[#2E2318]" />
                <div className="w-2 h-2 bg-[#D96B4A] shadow-[0_0_8px_rgba(217,107,74,0.8)]" />
              </div>
              {!collapsed && (
                <span className="text-[12px] tracking-[0.4em] font-serif text-[#F5F0EB] uppercase whitespace-nowrap drop-shadow-md">
                  ADYATARA
                </span>
              )}
            </Link>
          </div>

          {/* Main Menu Items */}
          <nav className="flex-1 flex flex-col gap-3 overflow-y-auto overflow-x-hidden py-6 px-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              const menuLink = (
                <Link
                  href={item.href}
                  className={cn(
                    "relative flex items-center py-3 rounded-none transition-all duration-300 group",
                    "text-sm font-serif tracking-wider",
                    active
                      ? "text-[#D96B4A]"
                      : "text-[#9A8A7A] hover:text-[#F5F0EB]",
                    collapsed ? "justify-center" : "gap-4 px-4"
                  )}
                >
                  {/* Decorative line for active state */}
                  {active && !collapsed && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#D96B4A] shadow-[0_0_10px_rgba(217,107,74,0.6)]" />
                  )}
                  {/* Background hover effect */}
                  {!collapsed && (
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-r from-[#D96B4A]/10 to-transparent transition-opacity duration-300",
                      active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    )} />
                  )}
                  
                  <div className={cn(
                    "relative flex items-center justify-center shrink-0 z-10 transition-transform duration-300",
                    active && "scale-110"
                  )}>
                    <Icon className="h-5 w-5" strokeWidth={active ? 2 : 1.5} />
                    {active && collapsed && (
                      <div className="absolute inset-0 bg-[#D96B4A]/20 blur-md rounded-full" />
                    )}
                  </div>

                  {!collapsed && (
                    <span className="whitespace-nowrap relative z-10 drop-shadow-sm">
                      {item.label}
                    </span>
                  )}
                </Link>
              );

              if (collapsed) {
                return (
                  <Tooltip key={item.href}>
                    <TooltipTrigger render={menuLink} />
                    <TooltipContent 
                      side="right" 
                      className="bg-[#1A1410] text-[#F5F0EB] border border-[#2E2318]"
                    >
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return <div key={item.href}>{menuLink}</div>;
            })}
          </nav>

          {/* Profile Section */}
          <div className="border-t border-[#2E2318] p-3 space-y-2 bg-[#0D0907] relative z-20">
            {/* Profile Link */}
            {collapsed ? (
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Link
                      href="/dashboard/profile"
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 transition-all duration-200 border border-transparent",
                        "text-sm font-serif justify-center group",
                        pathname.startsWith("/dashboard/profile")
                          ? "bg-[#1A1410] border-[#D96B4A]/30 text-[#D96B4A]"
                          : "text-[#9A8A7A] hover:bg-[#1A1410] hover:border-[#2E2318] hover:text-[#F5F0EB]"
                      )}
                    >
                      {session?.user?.avatarUrl || session?.user?.image ? (
                        <img
                          src={session.user.avatarUrl || session.user.image || ""}
                          alt={session.user.name || "User"}
                          className="h-5 w-5 rounded-full object-cover shrink-0"
                        />
                      ) : (
                        <User className="h-5 w-5 shrink-0" />
                      )}
                    </Link>
                  }
                />
                <TooltipContent 
                  side="right" 
                  className="bg-[#1A1410] text-[#F5F0EB] border border-[#2E2318]"
                >
                  Profile
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link
                href="/dashboard/profile"
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 transition-all duration-200 border border-transparent group relative",
                  "text-sm",
                  pathname.startsWith("/dashboard/profile")
                    ? "bg-[#1A1410] border-[#D96B4A]/30 text-[#D96B4A]"
                    : "text-[#9A8A7A] hover:bg-[#1A1410] hover:border-[#2E2318] hover:text-[#F5F0EB]"
                )}
              >
                {/* Corner accents for active state */}
                {pathname.startsWith("/dashboard/profile") && (
                  <>
                    <div className="absolute top-0 left-0 w-1 h-1 border-l border-t border-[#D96B4A]" />
                    <div className="absolute bottom-0 right-0 w-1 h-1 border-r border-b border-[#D96B4A]" />
                  </>
                )}
                {session?.user?.avatarUrl || session?.user?.image ? (
                  <img
                    src={session.user.avatarUrl || session.user.image || ""}
                    alt={session.user.name || "User"}
                    className="h-6 w-6 rounded-none object-cover shrink-0 border border-[#D96B4A]/40"
                  />
                ) : (
                  <User className="h-5 w-5 shrink-0" />
                )}
                <div className="flex flex-col overflow-hidden">
                  <span className="truncate font-serif text-[#F5F0EB]">
                    {session?.user?.name || "Penjelajah"}
                  </span>
                  {session?.user?.email && (
                    <span className="text-[10px] text-[#D96B4A]/70 truncate tracking-wider">
                      TERDAFTAR
                    </span>
                  )}
                </div>
              </Link>
            )}

            {/* Logout Button */}
            {collapsed ? (
              <Tooltip>
                <TooltipTrigger
                  render={
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className={cn(
                        "w-full flex items-center justify-center gap-3 px-3 py-2.5 transition-all duration-300 border border-transparent rounded-none",
                        "text-sm font-serif",
                        "text-[#9A8A7A] hover:bg-[#1A1410] hover:border-red-900/30 hover:text-red-400 group"
                      )}
                    >
                      <LogOut className="h-5 w-5 shrink-0 group-hover:scale-110 transition-transform" />
                    </button>
                  }
                />
                <TooltipContent 
                  side="right" 
                  className="bg-[#1A1410] text-[#F5F0EB] border border-[#2E2318] font-serif"
                >
                  Keluar Petualangan
                </TooltipContent>
              </Tooltip>
            ) : (
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2.5 transition-all duration-300 border border-transparent rounded-none group",
                  "text-[11px] font-serif tracking-[0.2em] uppercase",
                  "text-[#9A8A7A] hover:bg-[#1A1410] hover:border-red-900/30 hover:text-red-400"
                )}
              >
                <span className="group-hover:pl-1 transition-all">Keluar Petualangan</span>
                <LogOut className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110" />
              </button>
            )}
          </div>
        </aside>

        {/* Toggle Button - positioned outside sidebar */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="hidden md:flex absolute top-5 -right-3 z-50 h-7 w-7 rounded-none border border-[#2E2318] bg-[#0a0604] text-[#9A8A7A] hover:text-[#D96B4A] hover:border-[#D96B4A]/50 hover:bg-[#1A1410] transition-all rotate-45 shadow-[0_0_10px_rgba(0,0,0,0.5)] group overflow-visible"
        >
          <div className="-rotate-45 flex items-center justify-center w-full h-full relative z-10">
            {collapsed ? (
              <ChevronRight className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
            ) : (
              <ChevronLeft className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
            )}
          </div>
        </Button>
      </div>
    </TooltipProvider>
  );
}

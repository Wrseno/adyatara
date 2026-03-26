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
      <div className="relative flex-shrink-0">
        <aside
          className={cn(
            "sticky top-0 h-screen flex flex-col border-r",
            "bg-[#0D0A08] border-[#2E2318]",
            "transition-[width] duration-300 ease-in-out",
            collapsed ? "w-16" : "w-64"
          )}
        >
          {/* Header with Logo */}
          <div className="flex items-center justify-center border-b border-[#2E2318] min-h-[65px] px-3">
            <Link 
              href="/dashboard" 
              className="flex items-center gap-4 py-4"
            >
              <div className="w-8 h-8 border border-gray-600 relative flex items-center justify-center flex-shrink-0">
                <div className="absolute top-0 left-0 w-1 h-1 border-l border-t border-gray-500" />
                <div className="absolute bottom-0 right-0 w-1 h-1 border-r border-b border-gray-500" />
              </div>
              {!collapsed && (
                <span className="text-[11px] tracking-[0.4em] font-serif text-gray-300 uppercase whitespace-nowrap">
                  ADYATARA
                </span>
              )}
            </Link>
          </div>

          {/* Main Menu Items */}
          <nav className="flex-1 flex flex-col gap-2 overflow-y-auto overflow-x-hidden py-3 px-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              const menuLink = (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center py-2.5 rounded-lg transition-all duration-200",
                    "text-sm font-medium",
                    active
                      ? "bg-[#E8724A]/10 text-[#E8724A] shadow-[0_0_12px_rgba(232,114,74,0.2)]"
                      : "text-[#9A8A7A] hover:bg-[#1A1410] hover:text-[#F5F0EB]",
                    collapsed ? "justify-center" : "gap-3 px-3"
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && (
                    <span className="whitespace-nowrap">
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
          <div className="border-t border-[#2E2318] p-3 space-y-2">
            {/* Profile Link */}
            {collapsed ? (
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Link
                      href="/dashboard/profile"
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                        "text-sm font-medium justify-center",
                        pathname.startsWith("/dashboard/profile")
                          ? "bg-[#E8724A]/10 text-[#E8724A]"
                          : "text-[#9A8A7A] hover:bg-[#1A1410] hover:text-[#F5F0EB]"
                      )}
                    >
                      {session?.user?.avatarUrl || session?.user?.image ? (
                        <img
                          src={session.user.avatarUrl || session.user.image || ""}
                          alt={session.user.name || "User"}
                          className="h-5 w-5 rounded-full object-cover flex-shrink-0"
                        />
                      ) : (
                        <User className="h-5 w-5 flex-shrink-0" />
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
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
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
                    className="h-5 w-5 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <User className="h-5 w-5 flex-shrink-0" />
                )}
                <div className="flex flex-col overflow-hidden">
                  <span className="truncate">
                    {session?.user?.name || "Profile"}
                  </span>
                  {session?.user?.email && (
                    <span className="text-xs text-[#9A8A7A] truncate">
                      {session.user.email}
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
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                        "text-sm font-medium justify-center",
                        "text-[#9A8A7A] hover:bg-red-950/30 hover:text-red-400"
                      )}
                    >
                      <LogOut className="h-5 w-5 flex-shrink-0" />
                    </button>
                  }
                />
                <TooltipContent 
                  side="right" 
                  className="bg-[#1A1410] text-[#F5F0EB] border border-[#2E2318]"
                >
                  Logout
                </TooltipContent>
              </Tooltip>
            ) : (
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                  "text-sm font-medium",
                  "text-[#9A8A7A] hover:bg-red-950/30 hover:text-red-400"
                )}
              >
                <LogOut className="h-5 w-5 flex-shrink-0" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </aside>

        {/* Toggle Button - positioned outside sidebar */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="absolute top-4 -right-3 z-50 h-6 w-6 rounded-full border border-[#2E2318] bg-[#0D0A08] text-[#9A8A7A] hover:text-[#F5F0EB] hover:bg-[#1A1410]"
        >
          {collapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-3 w-3" />
          )}
        </Button>
      </div>
    </TooltipProvider>
  );
}

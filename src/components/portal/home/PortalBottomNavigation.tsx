"use client";

import Link from "next/link";
import { BookOpen, GraduationCap, Home } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Turmas",
    href: "/portal/turmas",
    icon: GraduationCap,
  },
  {
    label: "Home",
    href: "/portal/home",
    icon: Home,
  },
  {
    label: "Aulas",
    href: "/portal/aulas",
    icon: BookOpen,
  },
];

export function PortalBottomNavigation() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => window.cancelAnimationFrame(id);
  }, []);

  const navContent = navItems.map((item) => {
    const Icon = item.icon;
    const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

    return (
      <Link
        key={item.href}
        href={item.href}
        className="relative flex h-12 flex-1 items-center justify-center rounded-full transition-all duration-300 active:scale-95"
      >
        <div
          className={cn(
            "flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-300",
            active ? "bg-sky-500/20 text-sky-400" : "text-gray-400 hover:text-white"
          )}
        >
          <Icon
            className={cn("transition-all", active ? "size-5" : "size-[19px]")}
          />

          <span
            className={cn(
              "text-sm font-medium transition-all",
              active ? "max-w-20 opacity-100" : "max-w-0 overflow-hidden opacity-0"
            )}
          >
            {item.label}
          </span>
        </div>
      </Link>
    );
  });

  if (!mounted) {
    return (
      <nav className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-[calc(env(safe-area-inset-bottom)+14px)]" aria-hidden="true">
        <div className="flex h-16 w-full max-w-sm items-center justify-between rounded-full border border-white/10 bg-slate-900/80 px-2 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-3xl">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.href}
                className="relative flex h-12 flex-1 items-center justify-center rounded-full"
              >
                <div className="flex items-center gap-2 rounded-full px-4 py-2 text-gray-400">
                  <Icon className="size-[19px]" />
                  <span className="max-w-0 overflow-hidden opacity-0 text-sm font-medium">
                    {item.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-[calc(env(safe-area-inset-bottom)+14px)]">
      <div className="flex h-16 w-full max-w-sm items-center justify-between rounded-full border border-white/10 bg-slate-900/80 px-2 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-3xl">
        {navContent}
      </div>
    </nav>
  );
}
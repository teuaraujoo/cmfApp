"use client";

import Link from "next/link";
import { BookOpen, GraduationCap, Home } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Turmas",
    href: "/portal/turmas",
    icon: GraduationCap,
    position: "side",
  },
  {
    label: "Home",
    href: "/portal/home",
    icon: Home,
    position: "center",
  },
  {
    label: "Aulas",
    href: "/portal/aulas",
    icon: BookOpen,
    position: "side",
  },
];

export function PortalBottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)]">
      <div className="mx-auto grid h-20 max-w-md grid-cols-3 items-center rounded-[2rem] border border-white/70 bg-white/85 px-3 shadow-2xl shadow-sky-950/10 backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/85 dark:shadow-black/30">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const center = item.position === "center";

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group flex min-w-0 flex-col items-center justify-center gap-1 rounded-full px-2 py-2 text-xs font-semibold text-gray-500 transition-all active:scale-95 dark:text-gray-400",
                "hover:bg-sky-50 hover:text-sky-700 dark:hover:bg-sky-500/10 dark:hover:text-sky-200",
                active && "text-sky-700 dark:text-sky-200",
              )}
            >
              <span
                className={cn(
                  "flex items-center justify-center rounded-full transition-all",
                  center ? "size-12" : "size-10",
                  active
                    ? "bg-sky-600 text-white shadow-lg shadow-sky-500/30"
                    : "bg-gray-100 text-gray-500 group-hover:bg-sky-100 group-hover:text-sky-700 dark:bg-white/10 dark:text-gray-300 dark:group-hover:bg-sky-500/15 dark:group-hover:text-sky-200",
                )}
              >
                <Icon className={cn(center ? "size-5" : "size-4")} />
              </span>
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

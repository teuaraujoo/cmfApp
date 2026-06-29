import Link from "next/link";
import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";

import { cn } from "@/lib/utils";

type QuickAccessItem = {
  label: string;
  href: string;
  icon: ComponentType<LucideProps>;
  description?: string;
  iconClassName: string;
  hoverClassName: string;
};

export function QuickAccessGrid({ items }: { items: QuickAccessItem[] }) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-950 dark:text-white">
          Acesso rápido
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex aspect-square min-h-24 min-w-0 flex-col items-center justify-center rounded-[1.25rem] border border-white/70 bg-white p-2.5 text-center shadow-lg shadow-sky-950/5 transition-all hover:-translate-y-1 active:scale-[0.97] dark:border-white/10 dark:bg-white/[0.06] dark:shadow-black/20 sm:min-h-32 sm:p-4",
                item.hoverClassName,
              )}
            >
              <span
                className={cn(
                  "flex size-10 items-center justify-center rounded-2xl transition-colors sm:size-12",
                  item.iconClassName,
                )}
              >
                <Icon className="size-5" />
              </span>
              <span className="mt-2 text-xs font-semibold text-gray-950 dark:text-white sm:mt-3 sm:text-sm">
                {item.label}
              </span>
              {item.description ? (
                <span className="mt-1 hidden text-xs text-gray-500 dark:text-gray-400 sm:line-clamp-2">
                  {item.description}
                </span>
              ) : null}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

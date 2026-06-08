import { CalendarX2 } from "lucide-react";

type AulasEmptyStateProps = {
  title: string;
  description: string;
};

export function AulasEmptyState({ title, description }: AulasEmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-sky-200 bg-sky-50/60 px-6 py-12 text-center shadow-sm dark:border-sky-500/20 dark:bg-sky-500/5">
      <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-sky-200 bg-white text-sky-600 shadow-sm dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-300">
        <CalendarX2 className="size-7" />
      </div>

      <h3 className="mt-5 text-base font-semibold text-gray-800 dark:text-white/90">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
        {description}
      </p>

      <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-sky-200 via-sky-400 to-sky-200 dark:from-sky-500/10 dark:via-sky-400/40 dark:to-sky-500/10" />
    </div>
  );
}

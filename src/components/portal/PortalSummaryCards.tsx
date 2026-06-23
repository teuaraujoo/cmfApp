type SummaryItem = {
  label: string;
  value: string | number;
  description?: string;
};

export function PortalSummaryCards({ items }: { items: SummaryItem[] }) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-950 dark:text-white">
        Resumo
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {items.map((item) => (
          <article
            key={item.label}
            className="min-w-0 rounded-[1.35rem] border border-white/70 bg-white p-4 shadow-lg shadow-sky-950/5 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-black/20"
          >
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
              {item.label}
            </p>
            <p className="mt-2 text-2xl font-bold tracking-tight text-gray-950 dark:text-white">
              {item.value}
            </p>
            {item.description ? (
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {item.description}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

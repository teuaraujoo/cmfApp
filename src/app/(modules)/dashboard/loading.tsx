function SkeletonCard() {
  return (
    <div className="relative h-36 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="space-y-4 p-5">
        <div className="h-4 w-24 rounded-full bg-white/10" />
        <div className="h-8 w-16 rounded-lg bg-white/10" />
        <div className="h-3 w-32 rounded-full bg-white/10" />
      </div>
    </div>
  );
}

export default function DashboardLoading() {
  return (
    <main className="p-3 sm:p-5 lg:p-6">
      <div className="space-y-6">
        <section className="flex items-center justify-between px-2 py-2 sm:px-3 sm:py-3">
          <div className="space-y-3">
            <div className="h-4 w-32 rounded-full bg-white/10" />
            <div className="h-9 w-64 rounded-xl bg-white/10" />
            <div className="h-4 w-full max-w-xl rounded-full bg-white/10" />
          </div>

          <div className="hidden h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white/70 sm:block" />
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div className="relative h-[420px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          <div className="relative h-[420px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </section>
      </div>
    </main>
  );
}
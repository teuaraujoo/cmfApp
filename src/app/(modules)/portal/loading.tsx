function SkeletonShimmer() {
    return (
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-gray-200/60 to-transparent dark:via-white/10" />
    );
};

function SkeletonUserCard() {
    return (
        <article className="relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-white p-4 dark:border-white/10 dark:bg-white/[0.06]">
            <SkeletonShimmer />

            <div className="relative flex items-center gap-4">
                <div className="size-20 rounded-2xl bg-gray-200 dark:bg-white/10" />

                <div className="flex flex-1 flex-col gap-3">
                    <div className="h-6 w-40 rounded-full bg-gray-200 dark:bg-white/10" />
                    <div className="h-3 w-32 rounded-full bg-gray-200 dark:bg-white/10" />
                    <div className="h-3 w-48 rounded-full bg-gray-200 dark:bg-white/10" />
                </div>

                <div className="size-10 rounded-full bg-gray-200 dark:bg-white/10" />
            </div>
        </article>
    );
};

function SkeletonNextClass() {
    return (
        <section className="space-y-3">
            <div className="h-5 w-44 rounded-full bg-gray-200 dark:bg-white/10" />

            <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 dark:border-white/10 dark:bg-white/[0.06]">
                <SkeletonShimmer />

                <div className="relative flex items-center gap-3">
                    <div className="size-11 rounded-2xl bg-gray-200 dark:bg-white/10" />

                    <div className="flex flex-1 flex-col gap-2">
                        <div className="h-4 w-36 rounded-full bg-gray-200 dark:bg-white/10" />
                        <div className="h-3 w-28 rounded-full bg-gray-200 dark:bg-white/10" />
                    </div>
                </div>
            </div>
        </section>
    );
};

function SkeletonQuickAccess() {
    return (
        <section className="space-y-3">
            <div className="h-5 w-32 rounded-full bg-gray-200 dark:bg-white/10" />

            <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 dark:border-white/10 dark:bg-white/[0.06]"
                    >
                        <SkeletonShimmer />

                        <div className="relative flex flex-col gap-4">
                            <div className="size-11 rounded-xl bg-gray-200 dark:bg-white/10" />

                            <div className="space-y-2">
                                <div className="h-4 w-20 rounded-full bg-gray-200 dark:bg-white/10" />
                                <div className="h-3 w-24 rounded-full bg-gray-200 dark:bg-white/10" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default function PortalLoading() {
    return (
        <main className="mx-auto w-full max-w-md px-4 py-5 md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
            <div className="space-y-8">
                <SkeletonUserCard />

                <SkeletonNextClass />

                <SkeletonQuickAccess />
            </div>
        </main>
    )
};
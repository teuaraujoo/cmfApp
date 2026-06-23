import Link from "next/link";

export function PortalPlaceholderPage({ title }: { title: string }) {
  return (
    <section className="flex min-h-[calc(100dvh-10rem)] flex-col items-center justify-center text-center">
      <div className="w-full max-w-sm rounded-[1.75rem] border border-white/70 bg-white p-6 shadow-xl shadow-sky-950/5 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-black/20">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-700 dark:text-sky-300">
          {title}
        </p>
        <h1 className="mt-3 text-2xl font-bold text-gray-950 dark:text-white">
          Ola mundo
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Pagina inicial criada apenas para validar a navegabilidade do portal.
        </p>
        <Link
          href="/portal/home"
          className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-sky-600 px-5 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition-colors hover:bg-sky-500"
        >
          Voltar para Home
        </Link>
      </div>
    </section>
  );
}

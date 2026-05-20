import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10 dark:bg-gray-900">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-4xl items-center justify-center">
        <section className="w-full rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-white/[0.03] md:p-10">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 inline-flex rounded-full border border-sky-100 bg-sky-50 px-4 py-1.5 text-sm font-medium text-sky-700 dark:border-sky-900/60 dark:bg-sky-500/10 dark:text-sky-300">
              Error 404
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Página não encontrada
            </h1>

            <p className="mt-4 text-base leading-7 text-gray-500 dark:text-gray-400 sm:text-lg">
              A URL acessada não existe ou foi movida. Verifique o endereço ou
              volte para uma área válida do sistema.
            </p>

            <div className="mt-10 grid gap-4 rounded-2xl border border-dashed border-gray-200 bg-gray-50/80 p-5 text-left dark:border-gray-800 dark:bg-gray-800/30 sm:grid-cols-3">
              <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-white/[0.03]">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  URL inválida
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Caminho digitado não corresponde a nenhuma rota atual.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-white/[0.03]">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Página movida
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Conteúdo pode ter sido reorganizado durante evolução do painel.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-white/[0.03]">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Acesso direto
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Algumas áreas dependem de autenticação e rota válida do módulo.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex w-full items-center justify-center rounded-xl bg-[#1FA2E1] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#178CC5] sm:w-auto"
              >
                Voltar ao início
              </Link>

              <Link
                href="/login"
                className="inline-flex w-full items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 sm:w-auto"
              >
                Ir para login
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

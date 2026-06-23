import Image from "next/image";
import { Phone, Mail } from "lucide-react";

import ThemeToggleButton from "@/components/common/ThemeToggleButton";

type PortalUser = {
  nome: string;
  telefone: string;
  email: string;
  role?: string;
};

export function PortalUserCard({ user }: { user: PortalUser }) {
  return (
    <article className="relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-white p-4 dark:border-white/10 dark:bg-white/[0.06]">
      <div className="relative flex min-h-24 items-stretch gap-4">
        <div className="flex w-20 shrink-0 items-center justify-center p-3 dark:bg-transparent sm:w-24">
          <Image
            src="/images/logocmf.png"
            alt="Logo CMF"
            width={64}
            height={64}
            priority
            className="h-auto w-full object-contain"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h1 className="truncate text-xl font-bold tracking-tight text-gray-950 dark:text-white">
                {user.nome}
              </h1>
              <div className="flex flex-col mt-1 gap-2">
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-sky-700 dark:text-gray-300">
                  <Phone className="size-3 text-sky-600 dark:text-sky-300" />
                  {user.telefone}
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-sky-700 dark:text-gray-300">
                  <Mail className="size-3 text-sky-600 dark:text-sky-300" />
                  {user.email}
                </span>
              </div>
            </div>

            <div className="shrink-0">
              <ThemeToggleButton />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

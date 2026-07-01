"use client"

import {
  AlertCircle,
  BookOpen,
  CalendarDays,
  Clock3,
  GraduationCap,
  History,
  UserRoundCog,
} from "lucide-react";

import { PortalUserCard } from "@/components/portal/home/PortalUserCard";
import { QuickAccessGrid } from "@/components/portal/home/QuickAccessGrid";
import { DIAS_SEMANAS, formatHorarioLocal } from "@/utils/date-utils";
import { Aula } from "@/@types/aulas/aulas.types";
import { TurmaNextEngagement } from "@/@types/turma/turma.types";

export type UserInfo = {
  nome: string
  email: string
  tel?: string | null
  role: string
};

const quickAccessItems = [
  {
    label: "Aulas",
    href: "/portal/aulas",
    icon: BookOpen,
    description: "Veja sua rotina",
    iconClassName:
      "bg-sky-50 text-sky-700 group-hover:bg-sky-600 group-hover:text-white dark:bg-sky-500/10 dark:text-sky-200",
    hoverClassName:
      "hover:border-sky-200 hover:bg-sky-50 dark:hover:border-sky-500/30 dark:hover:bg-sky-500/10",
  },
  {
    label: "Turmas",
    href: "/portal/turmas",
    icon: GraduationCap,
    description: "Acompanhe grupos",
    iconClassName:
      "bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white dark:bg-emerald-500/10 dark:text-emerald-200",
    hoverClassName:
      "hover:border-emerald-200 hover:bg-emerald-50 dark:hover:border-emerald-500/30 dark:hover:bg-emerald-500/10",
  },
  {
    label: "Calendário",
    href: "/portal/calendario",
    icon: CalendarDays,
    description: "Agenda completa",
    iconClassName:
      "bg-violet-50 text-violet-700 group-hover:bg-violet-600 group-hover:text-white dark:bg-violet-500/10 dark:text-violet-200",
    hoverClassName:
      "hover:border-violet-200 hover:bg-violet-50 dark:hover:border-violet-500/30 dark:hover:bg-violet-500/10",
  },
  {
    label: "Histórico",
    href: "/portal/historico",
    icon: History,
    description: "Registros antigos",
    iconClassName:
      "bg-amber-50 text-amber-700 group-hover:bg-amber-500 group-hover:text-white dark:bg-amber-500/10 dark:text-amber-200",
    hoverClassName:
      "hover:border-amber-200 hover:bg-amber-50 dark:hover:border-amber-500/30 dark:hover:bg-amber-500/10",
  },
  {
    label: "Pendências",
    href: "/portal/pendencias",
    icon: AlertCircle,
    description: "Itens em aberto",
    iconClassName:
      "bg-rose-50 text-rose-700 group-hover:bg-rose-600 group-hover:text-white dark:bg-rose-500/10 dark:text-rose-200",
    hoverClassName:
      "hover:border-rose-200 hover:bg-rose-50 dark:hover:border-rose-500/30 dark:hover:bg-rose-500/10",
  },
  {
    label: "Perfil",
    href: "/portal/perfil",
    icon: UserRoundCog,
    description: "Perfil e informações do usuário",
    iconClassName:
      "bg-gray-200 text-gray-700 group-hover:bg-gray-600 group-hover:text-white dark:bg-gray-500/10 dark:text-gray-200",
    hoverClassName:
      "hover:border-gray-200 hover:bg-gray-50 dark:hover:border-gray-500/30 dark:hover:bg-gray-500/10",
  },
];

export function PortalHomePage({ userInfo, aula, turma }: { userInfo: UserInfo, aula?: Aula | null, turma: TurmaNextEngagement | null }) {
  const hasCompromissos = aula || turma;
  const hoje = new Date().getDay();

  return (
    <div className="space-y-7">
      <PortalUserCard user={userInfo} />

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-950 dark:text-white">
            Próximo compromisso
          </h2>
        </div>

        {hasCompromissos ? (
          <div className="space-y-3">
            {aula && (
              <div className="flex items-center gap-3 px-1">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-200">
                  <Clock3 className="size-5" />
                </span>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-950 dark:text-white">
                    {`Aula de ${aula.professor.materia}`}
                  </p>

                  <p className="truncate text-xs font-medium text-gray-500 dark:text-gray-400">
                    {`${aula.inicio.getDay() === hoje ? "Hoje" : DIAS_SEMANAS[aula.inicio.getUTCDay()]}, ${formatHorarioLocal(aula.inicio)} - ${formatHorarioLocal(aula.fim)}`}
                  </p>
                </div>
              </div>
            )}

            {turma && (
              <div className="flex items-center gap-3 px-1">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
                  <GraduationCap className="size-5" />
                </span>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-950 dark:text-white">
                    {turma.nome}
                  </p>

                  <p className="truncate text-xs font-medium text-gray-500 dark:text-gray-400">
                    {`${turma.turma_agenda[0].dia_semana === hoje ? "Hoje" : DIAS_SEMANAS[turma.turma_agenda[0].dia_semana!]},   ${turma.turma_agenda[0].horario_inicio} - ${turma.turma_agenda[0].horario_fim}`}
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white/70 px-4 py-4 text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900/40 dark:text-gray-400">
            Nenhum compromisso próximo no momento.
          </div>
        )}
      </section>

      <QuickAccessGrid items={quickAccessItems} />
    </div>
  );
};

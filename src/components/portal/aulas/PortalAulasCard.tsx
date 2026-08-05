import {
  BookOpenText,
  CalendarDays,
  Clock3,
  UserRound,
  Eye
} from "lucide-react";
import type { AulaPortal } from "@/@types/aulas/aulas.types";
import { formatHorarioLocal } from "@/utils/date-utils";
import { Button } from "@/components/ui/button";

type Props = {
  aula: AulaPortal
};

export default function PortalAulaCard({ aula }: Props) {
  return (
    <article className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-white/[0.03] sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-300">
            Aula
          </p>

          <h2 className="mt-1 text-lg font-semibold text-gray-950 dark:text-white">
            {aula.modalidade}
          </h2>
        </div>

        <span className="rounded-full bg-sky-100 px-2.5 py-1 text-[10px] font-medium text-sky-700 dark:bg-sky-500/10 dark:text-sky-300">
          {aula.status}
        </span>
      </div>

      <div className="mt-5 space-y-3 text-sm">
        <InfoItem
          icon={<CalendarDays className="size-[18px]" />}
          label="Data e horário"
          value={`${aula.inicio.toLocaleDateString("pt-BR")} - ${formatHorarioLocal(aula.inicio)} às ${formatHorarioLocal(aula.fim)}`}
        />

        {aula.professor && (
          <InfoItem
            icon={<UserRound className="size-[18px]" />}
            label="Profesor"
            value={aula.professor?.nome ?? "—"}
          />
        )
        }

        {aula.professor && (
          <InfoItem
            icon={<BookOpenText className="size-[18px]" />}
            label="Matéria"
            value={aula.professor.materia ?? "—"}
          />
        )}

        {aula.aluno && (
          <InfoItem
            icon={<Clock3 className="size-[18px]" />}
            label="Aluno"
            value={`${aula.aluno.nome}${aula.aluno.serie ? ` • ${aula.aluno.serie}` : ""}`}
          />
        )}
      </div>
      <Button
        className="w-full gap-2 mt-6"
        variant="outline"
      >
        <Eye size={18} />
        Ver detalhes
      </Button>
    </article>
  );
};

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-sky-600 dark:text-sky-300">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400">
          {label}
        </p>
        <p className="mt-0.5 break-words font-medium text-gray-800 dark:text-white/90">
          {value}
        </p>
      </div>
    </div>
  );
};

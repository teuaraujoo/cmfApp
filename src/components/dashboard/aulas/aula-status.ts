import type { Aula, AulaStatus } from "@/@types/aulas/aulas.types";
import { LucideIcon } from "lucide-react";
import { CalendarCheck, Clock3, CheckCircle, OctagonAlert } from "lucide-react";



type StatusConfig = {
  label: string;
  shortLabel: string;
  className: string;
  icon: LucideIcon;
};

const AULA_STATUS_CONFIG: Record<AulaStatus, StatusConfig> = {
  AGENDADA: {
    label: "Agendada",
    shortLabel: "Agend.",
    className: "text-sky-700 dark:text-sky-400",
    icon: CalendarCheck,
  },
  EM_ANDAMENTO: {
    label: "Em andamento",
    shortLabel: "Em aula",
    className: "text-violet-700 dark:text-violet-400",
    icon: Clock3,
  },
  PENDENTE_FINALIZAÇÃO: {
    label: "Pendente de finalização",
    shortLabel: "Pendente",
    className: "text-amber-700 dark:text-amber-400",
    icon: OctagonAlert,
  },
  FINALIZADA: {
    label: "Finalizada",
    shortLabel: "Final.",
    className: "text-emerald-700 dark:text-emerald-400",
    icon: CheckCircle,
  },
};


export function getAulaStatusConfig(status: AulaStatus) {
  return AULA_STATUS_CONFIG[status];
}

export function canStartAula(status: AulaStatus) {
  return status === "AGENDADA";
}

export function canFinishAula(aula: Aula, now = new Date()) {
  if (aula.status === "FINALIZADA") return false;
  if (aula.status === "EM_ANDAMENTO") return true;

  return now >= new Date(aula.fim);
};

export function canDeleteAula(status: AulaStatus) {
  return status !== "FINALIZADA" && status !== "EM_ANDAMENTO";
};
import type { AulaStatus } from "@/@types/aulas/aulas.types";

type BadgeColor = "info" | "primary" | "success" | "warning";

const AULA_STATUS_CONFIG: Record<
  AulaStatus,
  { label: string; shortLabel: string; color: BadgeColor }
> = {
  AGENDADA: {
    label: "Agendada",
    shortLabel: "Agend.",
    color: "info",
  },
  EM_ANDAMENTO: {
    label: "Em andamento",
    shortLabel: "Em aula",
    color: "primary",
  },
  PENDENTE_FINALIZACAO: {
    label: "Pendente de finalização",
    shortLabel: "Pendente",
    color: "warning",
  },
  FINALIZADA: {
    label: "Finalizada",
    shortLabel: "Final.",
    color: "success",
  },
};

export function getAulaStatusConfig(status: AulaStatus) {
  return AULA_STATUS_CONFIG[status];
}

export function canStartAula(status: AulaStatus) {
  return status === "AGENDADA";
}

export function canFinishAula(status: AulaStatus) {
  return status === "PENDENTE_FINALIZACAO";
}

export function canDeleteAula(status: AulaStatus) {
  return status !== "FINALIZADA";
}

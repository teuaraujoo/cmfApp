import type { TurmaApiResponse, TurmaDashboardItem } from "./types";

export function toTurmaDashboardItems(
  turmas: TurmaApiResponse[],
): TurmaDashboardItem[] {
  return turmas.map(toTurmaDashboardItem);
}

export function toTurmaDashboardItem(turma: TurmaApiResponse): TurmaDashboardItem {
  const modalidade =
    typeof turma.modalidade === "string"
      ? turma.modalidade
      : turma.modalidade?.tipo ?? "Sem modalidade";

  return {
    id: turma.id,
    nome: turma.nome,
    horas_semana: Number(turma.horas_semana.toString()),
    status: turma.status,
    vigencia_inicio: toDateInputValue(turma.vigencia_inicio),
    vigencia_fim: toDateInputValue(turma.vigencia_fim),
    modalidade_id:
      typeof turma.modalidade === "object" && turma.modalidade
        ? turma.modalidade.id
        : undefined,
    modalidade,
    diasSemana: turma.turma_agenda.map((agenda) =>
      agenda.dia_semana
    ),
    agenda: turma.turma_agenda.map((item) => ({
      horario_inicio: item.horario_inicio,
      horario_fim: item.horario_fim,
    })),
    alunos: turma.turma_alunos.map((item) => ({
      id: item.alunos_id,
      nome: item.aluno.nome,
      serie: item.aluno.serie ?? "Série não informada",
    })),
    professores: turma.turma_professores.map((item) => ({
      id: item.professor_id,
      nome: item.professor.nome,
      materia: item.professor.materia,
    })),
  };
}

function toDateInputValue(value: string | Date | null) {
  if (!value) {
    return "";
  };

  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  };

  return value.slice(0, 10);
};
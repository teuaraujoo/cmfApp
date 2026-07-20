export type TurmaAgenda = {
  dia_semana?: number;
  horario_inicio: string;
  horario_fim: string;
}

export type TurmaAluno = {
  id: number;
  nome: string;
  serie: string | null;
};

export type TurmaProfessor = {
  id: number;
  nome: string;
  materia: string;
};

export type TurmaModalidade = {
  id: number;
  tipo: string;
};

export type TurmaApiResponse = {
  id: number;
  nome: string;
  horas_semana: number | string | { toString(): string };
  status: string;
  vigencia_inicio: string | Date | null;
  vigencia_fim: string | Date | null;
  modalidade: TurmaModalidade | string | null;
  turma_agenda: Array<{
    horario_inicio: string;
    horario_fim: string;
    dia_semana: string | number;
  }>;
  turma_alunos: Array<{
    id: number;
    turma_id: number;
    alunos_id: number;
    aluno: {
      nome: string;
      email: string;
      serie: string | null;
    };
  }>;
  turma_professores: Array<{
    id: number;
    turma_id: number;
    professor_id: number;
    professor: {
      nome: string;
      email: string;
      materia: string;
    };
  }>;
}

export type TurmaDashboardItem = {
  id: number;
  nome: string;
  horas_semana: number;
  status: string;
  vigencia_inicio: string;
  vigencia_fim: string;
  modalidade_id?: number;
  modalidade: string;
  diasSemana: (string | number)[];
  agenda: TurmaAgenda[];
  alunos: TurmaAluno[];
  professores: TurmaProfessor[];
};

export type TurmaApiPortalResponse = {
  id: number;
  nome: string;
  horas_semana: number | string | { toString(): string };
  status: string;
  vigencia_inicio: string | Date | null;
  vigencia_fim: string | Date | null;
  modalidade: TurmaModalidade | string | null;
  turma_agenda: Array<{
    horario_inicio: string;
    horario_fim: string;
    dia_semana: string | number;
  }>;
  turma_alunos?: Array<{
    id: number;
    turma_id: number;
    alunos_id: number;
    aluno: {
      nome: string;
      email: string;
      serie: string | null;
    };
  }>;
  turma_professores?: Array<{
    id: number;
    turma_id: number;
    professor_id: number;
    professor: {
      nome: string;
      email: string;
      materia: string;
    };
  }>;
  alunosCount?: number;
}

export type TurmaPortalItem = {
  id: number;
  nome: string;
  horas_semana: number;
  status: string;
  vigencia_inicio: string;
  vigencia_fim: string;
  modalidade_id?: number;
  modalidade: string;
  diasSemana: (string | number)[];
  agenda: TurmaAgenda[];
  alunos?: TurmaAluno[];
  professores?: TurmaProfessor[];
  alunosCount?: number;
}

export type TurmaNextEngagement = {
  id: number;
  nome: string;
  turma_agenda: TurmaAgenda[]
};
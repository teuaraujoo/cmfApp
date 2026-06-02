export type DiaSemana =
  | "Segunda"
  | "Terça"
  | "Quarta"
  | "Quinta"
  | "Sexta"
  | "Sábado";

export type Modalidade = {
  id: number;
  tipo: string;
};


export type TurmaAgenda = {
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
};

export type Aluno = {
  id?: number;
  user_id: number;
  nome: string;
  email: string;
  role: string;
  tel?: string | null;
  status?: string;
  data_nasc?: string | Date | null;
  serie?: string | null;
  resp_tel?: string | null;
  resp_nome?: string | null;
  modalidade_id?: number | null;
  modalidade?: unknown;
  tempo_aula?: unknown;
  horas_semana?: unknown;
  tempo_contrato?: unknown;
};

export type Professor = {
  id: number;
  user_id: number;
  nome: string;
  email: string;
  tel: string | null;
  role: string;
  status: string;
  materia: string;
  modalidade_id: number;
  modalidade: string;
};

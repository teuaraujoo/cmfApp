export type DiaSemana =
  | "Segunda"
  | "Terca"
  | "Quarta"
  | "Quinta"
  | "Sexta"
  | "Sabado";

export type TurmaAluno = {
  id: number;
  nome: string;
  email: string;
  serie: string;
};

export type TurmaProfessor = {
  id: number;
  nome: string;
  email: string;
  materia: string;
};

export type TurmaModalidade = {
  id: number;
  tipo: string;
};

export type Turma = {
  id: number;
  nome: string;
  horas_semana: number;
  vigencia_inicio: string;
  vigencia_fim: string;
  modalidade_id: number;
  modalidade: string;
  diasSemana: DiaSemana[];
  horario: string;
  alunos: TurmaAluno[];
  professores: TurmaProfessor[];
};

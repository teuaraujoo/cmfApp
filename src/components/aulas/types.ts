export type AulaSemana = {
  id: number;
  aluno_id: number;
  professor_id: number;
  modalidade_id: number;
  aluno: {
    id: number;
    nome: string;
    email: string;
    serie: string;
  };
  professor: {
    id: number;
    nome: string;
    materia: string;
  };
  modalidade: {
    id: number;
    tipo: string;
  };
  dia: string;
  data: string;
  horario_inicio: string;
  horario_fim: string;
  encerrada: boolean;
  anotacoes?: string;
};

export type AulaFormOption = {
  id: number;
  nome: string;
  extra?: string;
};

export type ModalidadeAulaOption = {
  id: number;
  tipo: string;
};

export type CreateAulaPayload = {
  aluno_id: number;
  professor_id: number;
  modalidade_id: number;
  started_at: string;
  ended_at: string;
  notas?: string;
};

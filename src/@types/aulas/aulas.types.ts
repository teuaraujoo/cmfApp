export type CreateAulaPayload = {
  aluno_id: number;
  professor_id: number;
  modalidade_id: number;
  started_at: string;
  ended_at: string;
  notas?: string;
};

export type Aula = {
  id: number;
  aluno_id: number;
  professor_id: number;
  modalidade: string;
  inicio: Date;
  fim: Date;
  encerrada: boolean;
  notas?: string | null;
  aluno: {
    nome: string;
    serie: string | null;
  };
  professor: {
    nome: string;
    materia: string;
  };
};

export type AulasPagination = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

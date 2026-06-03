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

export type CreateAlunoPayload = {
    nome: string;
    email: string;
    temporary_password: string;
    role: "ALUNO";
    tel: string;
    aluno: {
        data_nasc: string;
        serie: string;
        resp_tel: string;
        resp_nome: string;
        modalidade_id: number;
        tempo_aula: number;
        horas_semana: number;
        tempo_contrato: number;
    };
};
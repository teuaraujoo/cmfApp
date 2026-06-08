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
    escola?: string | null;
    resp_tel?: string | null;
    resp_nome?: string | null;
    tempo_aula?: unknown;
    horas_mensais?: unknown;
};

export type CreateAlunoPayload = {
    nome: string;
    email: string;
    role: "ALUNO";
    tel: string;
    aluno: {
        data_nasc: string;
        serie: string;
        escola: string;
        resp_tel: string;
        resp_nome: string;
        horas_mensais: number;
    };
};

import apiRoutes from "@/lib/api";

type CreateAlunoPayload = {
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

export async function createAluno(aluno: CreateAlunoPayload) {
    try {
        const response = await fetch(`${apiRoutes.users}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin",
            body: JSON.stringify(aluno),
        });

        const result = await response.json();

        if (!response.ok) return { err: result.message ?? "Não foi possível criar aluno." }

        return result;

    } catch {
        return { err: "Não foi possível conectar ao servidor." }
    };
};

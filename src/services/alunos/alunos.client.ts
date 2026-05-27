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

type UpdateAlunoPayload = Omit<CreateAlunoPayload, "temporary_password">;

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

        if (!response.ok) return { err: result.message ?? "Não foi possível criar aluno." };

        return result;

    } catch {
        return { err: "Nao foi possivel conectar ao servidor." };
    };
};

export async function updateAluno(aluno: UpdateAlunoPayload, userId: number) {
    try {
        const response = await fetch(`${apiRoutes.users}/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin",
            body: JSON.stringify(aluno)
        });

        const result = await response.json();

        if (!response.ok) return { err: result.message ?? "Não foi possível atualizar aluno." };

        return result;

    } catch {
        return { err: "Nao foi possivel conectar ao servidor." };
    };
};

export async function inactiveUser(userId: number) {
    try {
        const response = await fetch(`${apiRoutes.users}/${userId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin",
        });

        const result = await response.json();

        if (!response.ok) return { err: result.message ?? "Nao foi possivel inativar aluno." };

        return result;

    } catch {
        return { err: "Nao foi possivel conectar ao servidor." };
    };
};

export async function activeUser(userId: number) {
    try {
        const response = await fetch(`${apiRoutes.users}/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin",
        });

        const result = await response.json();

        if (!response.ok) return { err: result.message ?? "Nao foi possivel ativar aluno." };

        return result;

    } catch {
        return { err: "Nao foi possivel conectar ao servidor." };
    };
};

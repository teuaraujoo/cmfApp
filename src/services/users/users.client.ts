import apiRoutes from "@/lib/api";
import type { CreateProfessorPayload } from "@/@types/professor/professor.types";
import type { CreateAlunoPayload } from "@/@types/aluno/aluno.types";

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

export async function createProfessor(professor: CreateProfessorPayload) {

    try {
        const response = await fetch(`${apiRoutes.users}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin",
            body: JSON.stringify(professor)
        });

        const result = await response.json();

        if (!response.ok) return { err: result.message ?? "Nao foi possivel atualizar professor." };

        return result;

    } catch {
        return { err: "Nao foi possivel conectar ao servidor." };
    }

};

export async function updateProfessor(professor: CreateProfessorPayload, userId: number) {
    try {
        const response = await fetch(`${apiRoutes.users}/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin",
            body: JSON.stringify(professor)
        });

        const result = await response.json();

        if (!response.ok) return { err: result.message ?? "Nao foi possivel atualizar professor." };

        return result;
    } catch {
        return { err: "Nao foi possivel conectar ao servidor." };
    };
};
import apiRoutes from "@/lib/api";

type ProfessorPayload = {
    nome: string;
    email: string;
    role: "PROFESSOR";
    tel: string;
    professor: {
        materia: string;
        modalidade_id: number;
    };
};

export async function createProfessor(professor: ProfessorPayload) {

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

export async function updateProfessor(professor: ProfessorPayload, userId: number) {
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

export async function inactiveProfessor(userId: number) {
    try {
        const response = await fetch(`${apiRoutes.users}/${userId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin",
        });

        const result = await response.json();

        if (!response.ok) return { err: result.message ?? "Nao foi possivel inativar professor." };

        return result;
    } catch {
        return { err: "Nao foi possivel conectar ao servidor." };
    };
};

export async function activeProfessor(userId: number) {
    try {
        const response = await fetch(`${apiRoutes.users}/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin",
        });

        const result = await response.json();

        if (!response.ok) return { err: result.message ?? "Nao foi possivel ativar professor." };

        return result;
    } catch {
        return { err: "Nao foi possivel conectar ao servidor." };
    };
};

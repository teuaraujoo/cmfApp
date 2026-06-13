import apiRoutes from "@/lib/api";
import { CreateAulaPayload } from "@/@types/aulas/aulas.types";

export async function createAula(aula: CreateAulaPayload) {
    try {
        const response = await fetch(`${apiRoutes.aulas}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin",
            body: JSON.stringify(aula),
        });

        const result = await response.json();

        if (!response.ok) return { err: result.message ?? "Não foi possível criar aula." };

        return result;

    } catch {
        return { err: "Nao foi possivel conectar ao servidor." };
    };
};

export async function deleteAula(aulaId: number) {
    try {
        const response = await fetch(`${apiRoutes.aulas}/${aulaId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin",
        });

        const result = await response.json();

        if (!response.ok) return { err: result.message ?? "Não foi possível deletar aula." };

        return result;

    } catch {
        return { err: "Nao foi possivel conectar ao servidor." };
    };
};

export async function finalizarAula(aulaId: number, notas: string) {
    try {
        const response = await fetch(`${apiRoutes.aulas}/${aulaId}/finalizacao`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin",
            body: JSON.stringify({ notas }),
        });

        const result = await response.json();

        if (!response.ok) return { err: result.message ?? "Não foi possível finalziar aula." };

        return result;

    } catch {
        return { err: "Nao foi possivel conectar ao servidor." };
    };
};

export async function iniciarAula(aulaId: number) {
    try {
        const response = await fetch(`${apiRoutes.aulas}/${aulaId}/inicio`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin",
        });

        const result = await response.json();

        if (!response.ok) return { err: result.message ?? "Não foi possível iniciar aula." };

        return result;

    } catch {
        return { err: "Nao foi possivel conectar ao servidor." };
    };
};
import apiRoutes from "@/lib/api";
import { CreateAulaPayload } from "@/@types/aulas/aulas.types";
import { apiFetch } from "@/services/csrf/csrf.client";

async function aulasRequest(
    url: string,
    method: "POST" | "PATCH" | "DELETE",
    errMessage: string,
    body?: CreateAulaPayload | string,
) {

    try {

        const response = await apiFetch(url, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin",
            body: method === "DELETE" ? undefined : typeof body === "string" ? JSON.stringify({ body }) : JSON.stringify(body)
        });

        if (!response) {
            return;
        };

        const result = await response.json();

        if (!response.ok) return { err: result.message ?? errMessage };

        return result;
    } catch {
        return { err: "Nao foi possivel conectar ao servidor." };
    };
};

export async function createAula(aula: CreateAulaPayload) {
    return aulasRequest(`${apiRoutes.aulas}`, "POST", "Não foi possível criar aula.", aula);
};

export async function deleteAula(aulaId: number) {
    return aulasRequest(`${apiRoutes.aulas}/${aulaId}`, "DELETE", "Não foi possível excluir aula.");
};

export async function finalizarAula(aulaId: number, notas: string) {
    return aulasRequest(`${apiRoutes.aulas}/${aulaId}/finalizacao`, "PATCH", "Não foi possível finalizar aula", notas)
};

export async function iniciarAula(aulaId: number) {
    return aulasRequest(`${apiRoutes.aulas}/${aulaId}/inicio`, "PATCH", "Não foi possível iniciar aula");
};
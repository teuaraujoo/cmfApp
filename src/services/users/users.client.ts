import apiRoutes from "@/lib/api";
import type { CreateProfessorPayload } from "@/@types/professor/professor.types";
import type { CreateAlunoPayload } from "@/@types/aluno/aluno.types";
import { apiFetch } from "@/services/csrf/csrf.client";

type UpdateAlunoPayload = Omit<CreateAlunoPayload, "temporary_password">;

export type UpdateUserProfilePayload = {
    nome: string;
    email: string;
    role: "ADMIN" | "ALUNO" | "PROFESSOR";
    tel: string | null;
};

async function usersRequest(
    url: string,
    method: "POST" | "PATCH" | "DELETE" | "PUT",
    errMessage: string,
    body?: CreateAlunoPayload | CreateProfessorPayload | UpdateAlunoPayload | UpdateUserProfilePayload
) {

    try {
        const noBody = method === "DELETE" && body === undefined || method === "PATCH" && body === undefined;

        const response = await apiFetch(url, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin",
            body: noBody ? undefined : JSON.stringify(body)
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

export async function createAluno(aluno: CreateAlunoPayload) {
    return usersRequest(`${apiRoutes.users}`, "POST", "Não foi possível criar aluno.", aluno);
};

export async function updateAluno(aluno: UpdateAlunoPayload, userId: number) {
    return usersRequest(`${apiRoutes.users}/${userId}`, "PUT", "Não foi possível atualizar aluno.", aluno);
};

export async function inactiveUser(userId: number) {
    return usersRequest(`${apiRoutes.users}/${userId}`, "DELETE", "Não foi possível inativar usuário.");
};

export async function activeUser(userId: number) {
    return usersRequest(`${apiRoutes.users}/${userId}`, "PATCH", "Não foi possível ativar usuário.");
};

export async function createProfessor(professor: CreateProfessorPayload) {
    return usersRequest(`${apiRoutes.users}`, "POST", "Não foi possível criar professor", professor);
};

export async function updateProfessor(professor: CreateProfessorPayload, userId: number) {
    return usersRequest(`${apiRoutes.users}/${userId}`, "PUT", "Não foi possível atualizar professor", professor);
};

export async function updateUser(user: UpdateUserProfilePayload, userId: number) {
    return usersRequest(`${apiRoutes.users}/${userId}`, "PUT", "Não foi possível atualizar suas informações.", user);
};

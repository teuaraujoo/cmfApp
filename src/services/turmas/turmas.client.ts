import apiRoutes from "@/lib/api";
import { apiFetch } from "@/services/csrf/csrf.client";

type TurmaProfessor = {
    professor_id: number
}

type TurmaAluno = {
    aluno_id: number
};

type TurmaAgenda = {
    dia_semana: number
    horario_inicio: string
    horario_fim: string
};

type CreateTurmaPayload = {
    nome: string,
    horas_semana: number,
    vigencia_inicio: string,
    vigencia_fim: string,
    modalidade_id: number,
    turma_agenda: TurmaAgenda[],
    turma_alunos: TurmaAluno[]
    turma_professores: TurmaProfessor[]
};

async function turmasRequest(
    url: string,
    method: "POST" | "DELETE" | "PUT",
    errMessage: string,
    body?: CreateTurmaPayload,
) {

    try {
        const response = await apiFetch(url, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin",
            body: method === "DELETE" ? undefined : JSON.stringify(body)
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

export async function createTurma(turma: CreateTurmaPayload) {
    return turmasRequest(`${apiRoutes.turmas}`, "POST", "Não foi possível criar turma.", turma);
};

export async function updateTurma(turma: CreateTurmaPayload, turmaId: number) {
    return turmasRequest(`${apiRoutes.turmas}/${turmaId}`, "PUT", "Não foi possível atualizar turma.", turma);
};

export async function deleteTurma(turmaId: number) {
    return turmasRequest(`${apiRoutes.turmas}/${turmaId}`, "DELETE", "Não foi possível deletar turma.");
};
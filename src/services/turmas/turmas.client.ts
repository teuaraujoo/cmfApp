import apiRoutes from "@/lib/api";

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

export async function createTurma(turma: CreateTurmaPayload) {
    try {
        const response = await fetch(`${apiRoutes.turmas}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin",
            body: JSON.stringify(turma),
        });

        const result = await response.json();

        if (!response.ok) return { err: result.message ?? "Não foi possível criar turma." };

        return result;

    } catch {
        return { err: "Nao foi possivel conectar ao servidor." };
    };
};

export async function updateTurma(turma: CreateTurmaPayload, turmaId: number) {
    try {
        const response = await fetch(`${apiRoutes.turmas}/${turmaId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin",
            body: JSON.stringify(turma),
        });

        const result = await response.json();

        if (!response.ok) return { err: result.message ?? "Não foi possível atualizar turma." };

        return result;

    } catch {
        return { err: "Nao foi possivel conectar ao servidor." };
    };
};

export async function deleteTurma(turmaId: number) {
    try {
        const response = await fetch(`${apiRoutes.turmas}/${turmaId}`, {
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
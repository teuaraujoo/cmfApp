import { Prisma } from "@/generated/prisma/client"
import type { AulaStatus } from "@/@types/aulas/aulas.types";

export type Actor = {
    userId: number;
    professorId: number | null;
    role: string;
};

export type AulasWithRelations = Prisma.aulas_individuaisGetPayload<{
    include: {
        professores: {
            include: {
                users: true
            }
        },
        alunos: {
            include: {
                users: true
            }
        },
        modalidades: true,
        users: true
    }
}>;

type AulasByAlunoId = Prisma.aulas_individuaisGetPayload<{
    include: {
        modalidades: true,
        professores: {
            include: {
                users: true
            }
        };
    };
}>;

type AulasByProfessorId = Prisma.aulas_individuaisGetPayload<{
    include: {
        modalidades: true,
        alunos: {
            include: {
                users: true
            }
        };
    };
}>;

export class AulasMapper {

    static toPrismaCreate(aula: Prisma.aulas_individuaisUncheckedCreateInput) {
        return {
            aluno_id: aula.aluno_id,
            professor_id: aula.professor_id,
            modalidade_id: aula.modalidade_id,
            started_at: aula.started_at,
            ended_at: aula.ended_at,
            status: "AGENDADA"
        };
    };

    static toPrismaFinish(notas: string | undefined, now: Date, actor: Actor) {
        return {
            finished_by: actor.userId,
            finished_role: actor.role,
            finished_at: now,
            notas: notas ?? null,
            status: "FINALIZADA",
            encerrada: true
        };
    };

    static toResponseAulasGet(aula: AulasWithRelations) {
        return {
            id: aula.id,
            aluno_id: aula.aluno_id,
            professor_id: aula.professor_id,
            modalidade: aula.modalidades.tipo,
            inicio: aula.started_at,
            fim: aula.ended_at,
            encerrada: aula.encerrada,
            notas: aula.notas,
            finished_by: aula.finished_by,
            finished_at: aula.finished_at,
            finished_role: aula.finished_role,
            status: normalizeAulaStatus(aula.status, aula.encerrada),
            finalizado_por: aula.users
                ? {
                    id: aula.users.id,
                    nome: aula.users.nome,
                }
                : null,
            aluno: {
                nome: aula.alunos.users.nome,
                serie: aula.alunos.serie,
            },
            professor: {
                nome: aula.professores.users.nome,
                materia: aula.professores.materia
            }
        };
    };

    static toResponseAulasProfessorGet(aula: AulasByProfessorId) {
        return {
            id: aula.id,
            aluno_id: aula.aluno_id,
            professor_id: aula.professor_id,
            modalidade: aula.modalidades.tipo,
            inicio: aula.started_at,
            fim: aula.ended_at,
            encerrada: aula.encerrada,
            status: aula.status,
            finished_at: aula.finished_at,
            aluno: {
                nome: aula.alunos.users.nome,
                serie: aula.alunos.serie
            },
        };
    };

    static toResponseAulasAlunoGet(aula: AulasByAlunoId) {
        return {
            id: aula.id,
            aluno_id: aula.aluno_id,
            professor_id: aula.professor_id,
            modalidade: aula.modalidades.tipo,
            inicio: aula.started_at,
            fim: aula.ended_at,
            encerrada: aula.encerrada,
            status: aula.status,
            finished_at: aula.finished_at,
            professor: {
                nome: aula.professores.users.nome,
                materia: aula.professores.materia
            },
        };
    };
};

function normalizeAulaStatus(status: string, encerrada: boolean): AulaStatus {
    if (encerrada) return "FINALIZADA";

    if (
        status === "AGENDADA" ||
        status === "EM_ANDAMENTO" ||
        status === "PENDENTE_FINALIZACAO" ||
        status === "FINALIZADA"
    ) {
        return status;
    };

    return "AGENDADA";
};

import { Prisma } from "@/generated/prisma/client"

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
        modalidades: true
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
    static toResponseAulasGet(aula: AulasWithRelations) {
        return {
            id: aula.id,
            aluno_id: aula.aluno_id,
            professor_id: aula.professor_id,
            modalidade: aula.modalidades.tipo,
            inicio: aula.started_at,
            fim: aula.ended_at,
            encerrada: aula.encerrada,
            aluno: {
                nome: aula.alunos.users.nome,
                serie: aula.alunos.serie,
            },
            profesor: {
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
            profesor: {
                nome: aula.professores.users.nome,
                materia: aula.professores.materia
            },
        };
    };
};
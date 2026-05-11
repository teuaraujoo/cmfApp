import { CreateTurmaBody, CreateTurmaAlunoBody, CreateTurmaProfessorBody, CreateTurmaAgendaBody } from "./turmas.shema";
import { DateUtils } from "@/server/utils/date-utils";
import { Prisma } from "@/generated/prisma/client";

export type TurmaWithRelations = Prisma.turmasGetPayload<{
    include: {
        modalidades: true,
        turma_agenda: true;
        turma_alunos: {
            include: {
                alunos: {
                    include: {
                        users: true;
                    };
                };
            };
        };
        turma_professores: {
            include: {
                professores: {
                    include: {
                        users: true;
                    };
                };
            };
        };
    };
}>;

type TurmaProfessorWithRelations = TurmaWithRelations["turma_professores"][number];
type TurmaAlunoWithRelations = TurmaWithRelations["turma_alunos"][number];
type TurmaAgendaWithRelations = TurmaWithRelations["turma_agenda"][number];

const diasSemana = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
];

export type TurmaOfUsers = Prisma.turmasGetPayload<{
    include: {
        turma_agenda: true,
        modalidades: true
    }
}>;
export class TurmaMapper {

    static toPrisma(turma: CreateTurmaBody) {
        return {
            nome: turma.nome,
            horas_semana: turma.horas_semana,
            vigencia_inicio: new Date(turma.vigencia_inicio),
            vigencia_fim: new Date(turma.vigencia_fim),
            modalidade_id: turma.modalidade_id
        }
    };

    static toResponseTurmasGet(turma: TurmaWithRelations) {
        return {
            id: turma.id,
            nome: turma.nome,
            horas_semana: turma.horas_semana,
            status: turma.status,
            vigencia_inicio: turma.vigencia_inicio,
            vigencia_fim: turma.vigencia_fim,
            modalidade: turma.modalidades,
            turma_agenda: TurmaAgendaMapper.toResponseTurmaAgendaGet(turma.turma_agenda),
            turma_alunos: TurmaAlunosMapper.toResponseTurmaAlunosGet(turma.turma_alunos),
            turma_professores: TurmaProfessoresMapper.toResponseTurmaProfessoresGet(turma.turma_professores),
        };
    };

    static toResponseTurmasOfUsersGet(turma: TurmaOfUsers) {
        return {
            id: turma.id,
            nome: turma.nome,
            horas_semana: turma.horas_semana,
            vigencia_inicio: turma.vigencia_inicio,
            vigencia_fim: turma.vigencia_fim,
            modalidade: turma.modalidades?.tipo,
            turma_agenda: TurmaAgendaMapper.toResponseTurmaAgendaGet(turma.turma_agenda)
        };
    };
};

/* =================   TURMA ALUNO     =================*/

export class TurmaAlunosMapper {
    static toTurmaAlunosPrisma(turmaId: number, turmaAluno: CreateTurmaAlunoBody) {
        return {
            turma_id: turmaId,
            alunos_id: turmaAluno.aluno_id,
        };
    };
    
    static toResponseTurmaAlunosGet(turmaAluno: TurmaAlunoWithRelations[]) {
        return turmaAluno.map((aluno) => {
            return {
                id: aluno.id,
                turma_id: aluno.turma_id,
                alunos_id: aluno.alunos_id,
                aluno: {
                    nome: aluno.alunos.users.nome,
                    email: aluno.alunos.users.email,
                    tel: aluno.alunos.users.tel,
                    data_nasc: aluno.alunos.data_nasc,
                    serie: aluno.alunos.serie,
                    resp_nome: aluno.alunos.resp_nome,
                    resp_tel: aluno.alunos.resp_tel,
                    tempo_aula: aluno.alunos.tempo_aula,
                    horas_semana: aluno.alunos.horas_semana,
                    tempo_contrato: aluno.alunos.tempo_contrato,
                    status: aluno.alunos.status,
                },
            };
        });
    };
};

/* =================   TURMA PROFESSOR    =================*/

export class TurmaProfessoresMapper {
    
    static toTurmaProfessoresPrisma(turmaId: number, turmaProfessores: CreateTurmaProfessorBody) {
        return {
            turma_id: turmaId,
            professores_id: turmaProfessores.professor_id
        };
    };

    static toResponseTurmaProfessoresGet(turmaProfessores: TurmaProfessorWithRelations[]) {
        return turmaProfessores.map((professor) => ({
            id: professor.professores.id,
            turma_id: professor.professores.id,
            professor_id: professor.professores_id,
            professor: {
                nome: professor.professores.users.nome,
                email: professor.professores.users.email,
                tel: professor.professores.users.tel,
                materia: professor.professores.materia,
                status: professor.professores.status
            }
        }));
    };
};

/* =================    TURMA AGENDA   =================*/

export class TurmaAgendaMapper {
    static toTurmaAgenda(turmaId: number, turmaAgenda: CreateTurmaAgendaBody) {
        return {
            turma_id: turmaId,
            dia_semana: turmaAgenda.dia_semana,
            horario_inicio: DateUtils.toTimeUtc(turmaAgenda.horario_inicio),
            horario_fim: DateUtils.toTimeUtc(turmaAgenda.horario_fim),
        };
    };

    static toResponseTurmaAgendaGet(turmaAgenda: TurmaAgendaWithRelations[]) {
        return turmaAgenda.map((agenda) => ({
            horario_inicio: DateUtils.dateToTime(agenda.horario_inicio),
            horario_fim: DateUtils.dateToTime(agenda.horario_fim),
            dia_semana: diasSemana[agenda.dia_semana],
        }))
    };
};
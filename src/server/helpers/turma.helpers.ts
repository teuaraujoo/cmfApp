import { Prisma } from "@/generated/prisma/client";
import { CreateTurmaAgendaBody, CreateTurmaAlunoBody, CreateTurmaBody, CreateTurmaProfessorBody } from "../schemas/turmas.shema";
import { TurmaMapper } from "../mappers/turmas.mapper";
import { TurmaRepositories } from "../repositories/turmas.repositories";
import { checkCreateManyCount } from "./check-createmany";
import { TurmaRules } from "../rules/turma.rules";
export class TurmaHelpers {

    static async createAgendaIfProvided(tx: Prisma.TransactionClient, turmaId: number, data: CreateTurmaBody) {

        if (!data.turma_agenda?.length) return;
        
        const agenda = data.turma_agenda.map((item) => {
            return TurmaMapper.toTurmaAgenda(turmaId, item);
        });

        for (const agenda of data.turma_agenda) {
            await TurmaRules.validateAgendaItem(agenda);
        };

        await TurmaRules.validateAgenda(data.turma_agenda, data.vigencia_inicio, data.vigencia_fim, turmaId);
        
        const agendaResult = await TurmaRepositories.newTurmaAgenda(tx, agenda);
        checkCreateManyCount(agendaResult, agenda.length, "Agenda da turma");
    };
    
    static async createTurmaAlunoIfProvided(
        tx: Prisma.TransactionClient,
        turmaId: number,
        data: CreateTurmaAlunoBody[],
        agenda: CreateTurmaAgendaBody[]
    ) {
        const alunos = data.map((aluno) => {
            return TurmaMapper.toTurmaAlunosPrisma(turmaId, aluno);
        });

        await TurmaRules.validateTurmaAlunos(alunos, agenda, turmaId);

        const alunosResult = await TurmaRepositories.newTurmaAluno(tx, alunos);

        checkCreateManyCount(alunosResult, alunos.length, "Alunos da turma");
    };

    static async createTurmaProfessorIfProvided(
        tx: Prisma.TransactionClient,
        turmaId: number,
        data: CreateTurmaProfessorBody[],
        agenda: CreateTurmaAgendaBody[]
    ) {

        const professores = data.map((professor) => {
            return TurmaMapper.toTurmaProfessoresPrisma(turmaId, professor);
        });

        await TurmaRules.validateTurmaProfessores(professores, agenda, turmaId);

        const professorResult = await TurmaRepositories.newTurmaProfessor(tx, professores);

        checkCreateManyCount(professorResult, professores.length, "Professores da turma");
    };

    static toTimeUtc(time: string) {
        const [hours, minutes] = time.split(':').map(Number);

        return new Date(Date.UTC(1970, 0, 1, hours, minutes, 0));
    };

    static hasConflit(
        fresh: { dia_semana: number; inicio: number; fim: number },
        current: { dia_semana: number; inicio: number; fim: number }
    ) {
        return (
            fresh.dia_semana === current.dia_semana &&
            fresh.inicio < current.fim &&
            current.inicio < fresh.fim
        );
    };
};
import { Prisma } from "@/generated/prisma/client";
import { CreateTurmaAgendaBody, CreateTurmaAlunoBody, CreateTurmaBody, CreateTurmaProfessorBody } from "@/server/schemas/turmas/turmas.shema";
import { TurmaMapper } from "@/server/mappers/turmas/turmas.mapper";
import { checkCreateManyCount } from "./check-createmany";
import { TurmaRules } from "@/server/rules/turmas/turma.rules";
import { TurmaProfessoresRepositories } from "../repositories/turmas/turma-professores/turma-professores.repositories";
import { TurmaAlunosRepositories } from "../repositories/turmas/turma-alunos/turma-alunos.repositoriest";
import { TurmaAgendaRepositories } from "../repositories/turmas/turma-agenda/turma-agenda.repositories";
import { TurmaAlunosMapper } from "../mappers/turmas/turma-alunos/turma-alunos.mapper";
import { TurmaProfessoresMapper } from "../mappers/turmas/turma-professores/turma-professores.mapper";
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
        
        const agendaResult = await TurmaAgendaRepositories.newTurmaAgenda(tx, agenda);
        checkCreateManyCount(agendaResult, agenda.length, "Agenda da turma");
    };
    
    static async createTurmaAlunoIfProvided(
        tx: Prisma.TransactionClient,
        turmaId: number,
        data: CreateTurmaAlunoBody[],
        agenda: CreateTurmaAgendaBody[]
    ) {
        const alunos = data.map((aluno) => {
            return TurmaAlunosMapper.toTurmaAlunosPrisma(turmaId, aluno);
        });

        await TurmaRules.validateTurmaAlunos(alunos, agenda, turmaId);

        const alunosResult = await TurmaAlunosRepositories.newTurmaAluno(tx, alunos);

        checkCreateManyCount(alunosResult, alunos.length, "Alunos da turma");
    };

    static async createTurmaProfessorIfProvided(
        tx: Prisma.TransactionClient,
        turmaId: number,
        data: CreateTurmaProfessorBody[],
        agenda: CreateTurmaAgendaBody[]
    ) {

        const professores = data.map((professor) => {
            return TurmaProfessoresMapper.toTurmaProfessoresPrisma(turmaId, professor);
        });

        await TurmaRules.validateTurmaProfessores(professores, agenda, turmaId);

        const professorResult = await TurmaProfessoresRepositories.newTurmaProfessor(tx, professores);

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
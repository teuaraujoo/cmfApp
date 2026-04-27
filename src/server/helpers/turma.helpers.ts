import { Prisma } from "@/generated/prisma/client";
import { CreateTurmaAlunoBody, CreateTurmaBody, CreateTurmaProfessorBody } from "../schemas/turmas.shema";
import { TurmaMapper } from "../mappers/turmas.mapper";
import { newTurmaAgenda, newTurmaAluno, newTurmaProfessor } from "../repositories/turmas.repositories";
import { checkCreateManyCount } from "./check-createmany";
import { TurmaRules } from "../rules/turma.rules";



export class TurmaHelpers {

    static async createAgendaIfProvided(tx: Prisma.TransactionClient, turmaId: number, data: CreateTurmaBody) {

        if (!data.turma_agenda?.length) return;

        const agenda = data.turma_agenda.map((item) => {
            return TurmaMapper.toTurmaAgenda(turmaId, item);
        });

        console.log("agenda helper: ", agenda);
        
        const agendaResult = await newTurmaAgenda(tx, agenda);
        checkCreateManyCount(agendaResult, agenda.length, "Agenda da turma");
    };
    
    static async createTurmaAlunoIfProvided(tx: Prisma.TransactionClient, turmaId: number, data: CreateTurmaAlunoBody[]) {
        const alunos = data.map((aluno) => {
            return TurmaMapper.toTurmaAlunosPrisma(turmaId, aluno);
        });
        
        await TurmaRules.validateTurmaAlunos(alunos);
        console.log("alunos helper: ", alunos);
        
        const alunosResult = await newTurmaAluno(tx, alunos);
        
        checkCreateManyCount(alunosResult, alunos.length, "Alunos da turma");
    };
    
    static async createTurmaProfessorIfProvided(tx: Prisma.TransactionClient, turmaId: number, data: CreateTurmaProfessorBody[]) {
        
        const professores = data.map((professor) => {
            return TurmaMapper.toTurmaProfessoresPrisma(turmaId, professor);
        });
        
        console.log("professores helper: ", professores);
        await TurmaRules.validateTurmaProfessores(professores);

        const professorResult = await newTurmaProfessor(tx, professores);

        checkCreateManyCount(professorResult, professores.length, "Professores da turma");
    };

    static toTimeUtc(time: string) {
        const [hours, minutes] = time.split(':').map(Number);

        return new Date(Date.UTC(1970, 0, 1, hours, minutes, 0));
    };
};
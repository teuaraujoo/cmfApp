import { CreateTurmaProfessorBody } from "@/server/schemas/turmas/turmas.shema";
import { TurmaWithRelations } from "./turmas.mapper";

type TurmaProfessorWithRelations = TurmaWithRelations["turma_professores"][number];

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
import { CreateUserBody } from "../schemas/user.schema";

type getProfessor = {
    nome: string
    email: string
    role: string
    tel: string
    status: string
    materia: string
    modalidade: string
};

export class ProfessorMapper {
    // formata peayload de professor para o prisma
    static toPrismaProfessor(id: number, professor: CreateUserBody) {
        return {
            user_id: id,
            materia: professor.professor!.materia,
            modalidade_id: professor.professor!.modalidade_id,
        };
    };

    static toResponseProfessorGet(response: getProfessor) {
        return {
            ...response,
        }
    };
};
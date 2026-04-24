import { CreateUserBody, UpdateUserBody } from "../schemas/user.schema";
import { Prisma } from "@/generated/prisma/client";

export class ProfessorMapper {
    // formata peayload de professor para o prisma
    static toPrismaProfessor(id: number, professor: CreateUserBody | UpdateUserBody) {
        return {
            user_id: id,
            materia: professor.professor!.materia,
            modalidade_id: professor.professor!.modalidade_id,
        };
    };

    static toResponseProfessorGet(
        professor: Prisma.professoresUncheckedCreateInput,
        user: Prisma.public_usersUncheckedCreateInput,
        modalidade: Prisma.modalidadesUncheckedCreateInput
    ) {
        return {
            id: professor.id,
            user_id: user.id,
            nome: user.nome,
            email: user.email,
            tel: user.tel,
            role: user.role,
            status: user.status,
            materia: professor.materia,
            modalidade: modalidade.tipo,
        };
    };
};

import { CreateUserBody } from "../schemas/user.schema"
import { users } from "@/generated/prisma/client"

export class PrismaUserMapper {
    static toPrismaUser(user: CreateUserBody) {
        return {
            nome: user.nome,
            email: user.email,
            senha_hash: user.senha_hash,
            role: user.role,
            tel: user.tel
        }
    };

    static toPrismaAluno(id: number, aluno: CreateUserBody) {
        return {
            user_id: id,
            data_nasc: aluno.aluno!.data_nasc,
            serie: aluno.aluno!.serie,
            resp_tel: aluno.aluno!.resp_tel,
            resp_nome: aluno.aluno!.resp_nome,
            modalidade_id: aluno.aluno!.modalidade_id,
            tempo_aula: aluno.aluno!.tempo_aula,
            horas_semana: aluno.aluno!.horas_semana,
            tempo_contrato: aluno.aluno!.tempo_contrato
        }
    };

    static toPrismaProfessor(id: number, professor: CreateUserBody) {
        return {
            user_id: id,
            materia: professor.professor!.materia,
            modalidade_id: professor.professor!.modalidade_id,
        }
    };

    static toClienteResponse(response: users) {
        return {
            id: response.id,
            nome: response.nome,
            email: response.email,
            role: response.role,
            tel: response.tel,
        }
    };
};
import { CreateUserBody, UpdateUserBody } from "@/server/schemas/users/user.schema";
import { Prisma } from "@/generated/prisma/client";

export class AlunoMapper {

    // formata payload de aluno para o prisma
    static toPrismaAluno(id: number, aluno: CreateUserBody | UpdateUserBody) {
        return {
            user_id: id,
            data_nasc: aluno.aluno!.data_nasc,
            serie: aluno.aluno!.serie,
            resp_tel: aluno.aluno!.resp_tel,
            resp_nome: aluno.aluno!.resp_nome,
            modalidade_id: aluno.aluno!.modalidade_id,
            tempo_aula: aluno.aluno!.tempo_aula,
            horas_semana: aluno.aluno!.horas_semana,
            tempo_contrato: aluno.aluno!.tempo_contrato,
        };
    };

    static toResponseAlunoGet(aluno: Prisma.alunosUncheckedCreateInput, user: Prisma.public_usersUncheckedCreateInput) {
        return {
            id: aluno.id,
            user_id: aluno.user_id,
            nome: user.nome,
            email: user.email,
            role: user.role,
            tel: user.tel,
            status: aluno.status,
            data_nasc: aluno.data_nasc,
            serie: aluno.serie,
            resp_tel: aluno.resp_tel,
            resp_nome: aluno.resp_nome,
            modalidade: aluno.modalidade_id,
            tempo_aula: aluno.tempo_aula,
            horas_semana: aluno.horas_semana,
            tempo_contrato: aluno.tempo_contrato,
        };
    };
};

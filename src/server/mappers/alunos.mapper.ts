import { CreateUserBody, UpdateUserBody } from "../schemas/user.schema";

type getAluno = {
    nome: string
    email: string
    role: string
    tel: string
    status: string
    data_nasc: string
    serie: string
    resp_tel: string
    resp_nome: string
    modalidade: string
    tempo_aula: number
    horas_semana: number
    tempo_contrato: number
};


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

    static toResponseAlunoGet(response: getAluno) {
        return {
            ...response,
        };
    };
};

import { CreateTurmaAlunoBody } from "@/server/schemas/turmas/turmas.shema";
import { TurmaWithRelations } from "../turmas.mapper";

type TurmaAlunoWithRelations = TurmaWithRelations["turma_alunos"][number];

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
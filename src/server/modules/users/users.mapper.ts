import { CreateUserBody, UpdateUserBody } from "@/server/modules/users/user.schema";
import { public_users } from "@/generated/prisma/client";
import { Prisma } from "@/generated/prisma/client";
import { AppError } from "@/server/error/app-errors";

export type AlunosWithRelations = Prisma.alunosGetPayload<{
  include: {
    users: true,
  }
}>;

export type ProfessoresWithRelations = Prisma.professoresGetPayload<{
  include: {
    users: true,
    modalidades: true
  }
}>;

function calculateTempoAula(horasMensais: number) {
  const today = new Date();

  if (!horasMensais || horasMensais <= 0) {
    throw new AppError("Horas mensais é obrigatório");
  };

  const mesAtual = today.getMonth();
  const mesesAteFimDoAno = 12 - mesAtual;

  return horasMensais * mesesAteFimDoAno;
};

export class UserMapper {

  // formata payload de user para o prisma
  static toPrismaUser(user: CreateUserBody, authUserId: string) {
    return {
      nome: user.nome,
      email: user.email,
      role: user.role,
      tel: user.tel,
      auth_user_id: authUserId,
      must_change_password: user.role === "ADMIN" ? false : true,
    };
  };

  // formata payload de update para alterar somente campos da tabela public.users
  static toPrismaUserUpdate(user: UpdateUserBody) {
    return {
      nome: user.nome,
      email: user.email,
      role: user.role,
      tel: user.tel,
    };
  };

  // resposta específica para o cliente admin
  static toResponseAdmin(response: public_users) {
    return {
      id: response.id,
      nome: response.nome,
      email: response.email,
      role: response.role,
      tel: response.tel,
      status: response.status,
      auth_user_id: response.auth_user_id,
      must_change_password: response.must_change_password,
    };
  };

  // resposta específica para o login
  static toLoginResponse(response: public_users) {
    return {
      id: response.id,
      auth_user_id: response.auth_user_id,
      nome: response.nome,
      role: response.role,
      status: response.status,
      must_change_password: response.must_change_password,
    };
  };

  // resposta específica para a troca de senha
  static toChangePasswordResponse(response: public_users) {
    return {
      id: response.id,
      auth_user_id: response.auth_user_id,
      role: response.role,
      must_change_password: response.must_change_password,
    };
  };
};

/* =================    ALUNO     =================*/

export class AlunoMapper {

  // formata payload de aluno para o prisma
  static toPrismaAluno(id: number, aluno: CreateUserBody | UpdateUserBody) {
    return {
      user_id: id,
      data_nasc: aluno.aluno!.data_nasc,
      serie: aluno.aluno!.serie,
      escola: aluno.aluno!.escola,
      resp_tel: aluno.aluno!.resp_tel,
      resp_nome: aluno.aluno!.resp_nome,
      tempo_aula: calculateTempoAula(aluno.aluno!.horas_mensais),
      horas_mensais: aluno.aluno!.horas_mensais,
    };
  };

  static toResponseAlunoGet(aluno: AlunosWithRelations) {
    return {
      id: aluno.id,
      user_id: aluno.user_id,
      nome: aluno.users.nome,
      email: aluno.users.email,
      role: aluno.users.role,
      tel: aluno.users.tel,
      status: aluno.status,
      data_nasc: aluno.data_nasc,
      serie: aluno.serie,
      escola: aluno.escola,
      resp_tel: aluno.resp_tel,
      resp_nome: aluno.resp_nome,
      tempo_aula: Number(aluno.tempo_aula),
      horas_mensais: Number(aluno.horas_mensais),
    };
  };
};

/* =================    PROFESSOR     =================*/

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
    professor: ProfessoresWithRelations,
    user: ProfessoresWithRelations["users"],
    modalidade: ProfessoresWithRelations["modalidades"]
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
      modalidade_id: professor.modalidade_id,
      modalidade: modalidade.tipo,
    };
  };
};

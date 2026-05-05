import { CreateUserBody, UpdateUserBody } from "@/server/users/user.schema";
import { public_users } from "@/generated/prisma/client";
import { Prisma } from "@/generated/prisma/client";

export class UserMapper {

  // formata payload de user para o prisma
  static toPrismaUser(user: CreateUserBody, authUserId: string) {
    return {
      nome: user.nome,
      email: user.email,
      role: user.role,
      tel: user.tel,
      auth_user_id: authUserId,
      must_change_password: true,
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
      email: response.email,
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
      nome: response.nome,
      email: response.email,
      role: response.role,
      status: response.status,
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


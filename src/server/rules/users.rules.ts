import { CreateUserBody, UpdateUserBody } from "@/server/schemas/user.schema";
import { UsersRepositories } from "@/server/repositories/users.respositories";
import { AppError } from "@/server/error/app-errors";

export class UsersRules {

  static async validateUser(data: CreateUserBody) {
    const findEmail = await UsersRepositories.getByEmail(data.email);

    if (findEmail) {
      throw new AppError("Email já cadastrado!", 409);
    };

    if (data.role === "ALUNO" && !data.aluno) {
      throw new AppError("Dados do aluno são obrigatórios!", 400);
    };

    if (data.role === "PROFESSOR" && !data.professor) {
      throw new AppError("Dados do professor são obrigatórios!", 400);
    };
  };

  static async validateUpdateUser(data: UpdateUserBody, id: number) {
    const findEmail = await UsersRepositories.getByEmail(data.email);
    const findUser = await UsersRepositories.getById(id);

    if (!findUser) {
      throw new AppError("Usuário não encontrado!", 404);
    };

    if (findEmail && findEmail.id !== id) {
      throw new AppError("Email já cadastrado!", 409);
    };

    if (data.role !== findUser.role) {
      throw new AppError("Alteração de role ainda não é suportada nesta rota.", 400);
    };

    if (data.role === "ALUNO" && !data.aluno) {
      throw new AppError("Dados do aluno são obrigatórios!", 400);
    };

    if (data.role === "PROFESSOR" && !data.professor) {
      throw new AppError("Dados do professor são obrigatórios!", 400);
    };

    return findUser.auth_user_id;
  };
};
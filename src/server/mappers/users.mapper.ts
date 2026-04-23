import { CreateUserBody } from "../schemas/user.schema";
import { public_users } from "@/generated/prisma/client";

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

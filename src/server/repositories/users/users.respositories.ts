import { prisma } from "@/libs/prisma";
import { Prisma } from "@/generated/prisma/client";

export class UsersRepositories {

  static async getAll() {
    return prisma.public_users.findMany({
      orderBy: {
        created_at: "desc",
      },
    });
  };

  static async getById(id: number) {
    return prisma.public_users.findUnique({ where: { id } });
  };

  static async getByEmail(email: string) {
    return prisma.public_users.findUnique({ where: { email } });
  };

  static async getByAuthUserId(authUserId: string) {
    return prisma.public_users.findUnique({ where: { auth_user_id: authUserId } });
  };

  static async getWithProfilesByAuthUserId(authUserId: string) {
    return prisma.public_users.findUnique({
      where: { auth_user_id: authUserId },
      include: {
        alunos: true,
        professores: true,
      },
    });
  };

  static async newUser(tx: Prisma.TransactionClient, newUser: Prisma.public_usersCreateInput) {
    return tx.public_users.create({ data: newUser });
  };

  static async disableMustChangePassword(userId: number) {
    return prisma.public_users.update({
      where: { id: userId },
      data: { must_change_password: false },
    });
  };

  static async inactivePublicUser(tx: Prisma.TransactionClient, id: number) {
    return tx.public_users.update({ where: { id: id }, data: { status: "INATIVO" } });
  };

  static async activePublicUser(tx: Prisma.TransactionClient, id: number) {
    return tx.public_users.update({ where: { id: id }, data: { status: "ATIVO" } });
  };

  static async updateUserById(tx: Prisma.TransactionClient, data: Prisma.public_usersUpdateInput, id: number) {
    return tx.public_users.update({ where: { id }, data });
  };
};
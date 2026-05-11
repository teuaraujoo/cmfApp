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

/* =================    ALUNO     =================*/

export class AlunosRepositories {

  static async getAll() {
    return prisma.alunos.findMany({
      orderBy: {
        created_at: "desc"
      },
      include: {
        users: true
      }
    });
  };

  static async getTotal() {
    return prisma.alunos.count();
  };

  static async getByUserId(id: number) {
    return prisma.alunos.findUnique({
      where: {
        user_id: id
      },
      include: {
        users: true
      }
    });
  };

  static async getById(id: number) {
    return prisma.alunos.findUnique({ where: { id } });
  };

  static async findManyByIds(ids: number[]) {
    return prisma.alunos.findMany({ where: { id: { in: ids } } });
  };

  static async createAluno(tx: Prisma.TransactionClient, aluno: Prisma.alunosUncheckedCreateInput) {
    return tx.alunos.create({ data: aluno });
  };

  static async inactiveAluno(tx: Prisma.TransactionClient, userId: number) {
    return tx.alunos.update({ where: { user_id: userId }, data: { status: "INATIVO" } });
  };

  static async activeAluno(tx: Prisma.TransactionClient, userId: number) {
    return tx.alunos.update({ where: { user_id: userId }, data: { status: "ATIVO" } });
  };

  static async updateAluno(tx: Prisma.TransactionClient, data: Prisma.alunosUpdateInput, id: number) {
    return tx.alunos.update({ where: { user_id: id }, data })
  };
};

/* =================    PROFESSOR     =================*/

export class ProfessoresRepositories {

    static async getAll() {
        return prisma.professores.findMany({
            orderBy: {
                created_at: "desc"
            },
            include: {
                users: true,
                modalidades: true
            }
        });
    };

    static async getTotal() {
        return prisma.professores.count();
    };

    static async getById(id: number) {
      return prisma.professores.findUnique({ where: { id } });
    };

    static async getByUserId(id: number) {
        return prisma.professores.findUnique({
            where: {
                user_id: id
            },
            include: {
                users: true,
                modalidades: true
            }
        });
    };

    static async findManyByIds(ids: number[]) {
        return prisma.professores.findMany({ where: { id: { in: ids } } });
    };

    static async createProfessor(tx: Prisma.TransactionClient, professor: Prisma.professoresUncheckedCreateInput) {
        return tx.professores.create({ data: professor });
    };

    static async inactiveProfessor(tx: Prisma.TransactionClient, userId: number) {
        return tx.professores.update({ where: { user_id: userId }, data: { status: "INATIVO" } });
    };

    static async activeProfessor(tx: Prisma.TransactionClient, userId: number) {
        return tx.professores.update({ where: { user_id: userId }, data: { status: "ATIVO" } });
    };

    static async updateProfessor(tx: Prisma.TransactionClient, data: Prisma.professoresUpdateInput, id: number) {
        return tx.professores.update({ where: { user_id: id }, data })
    };
};
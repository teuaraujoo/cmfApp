import { prisma } from "@/libs/prisma";
import { Prisma } from "@/generated/prisma/client";

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

<<<<<<< HEAD
export async function findManyByIds(ids: number[]) {
  return prisma.alunos.findMany({ where: { id: { in: ids } } });
};

export async function createAluno(tx: Prisma.TransactionClient, aluno: Prisma.alunosUncheckedCreateInput) {
  return tx.alunos.create({ data: aluno });
};
=======
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
>>>>>>> e0d5404f8a00bf0df7ba30e1cb50c5511ac191a4

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
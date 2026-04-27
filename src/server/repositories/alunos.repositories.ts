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
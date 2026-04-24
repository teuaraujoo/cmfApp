import { prisma } from "@/libs/prisma";
import { Prisma } from "@/generated/prisma/client";

export async function getAll() {
  return prisma.alunos.findMany({
    orderBy: {
      created_at: "desc"
    },
    include: {
      users: true
    }
  });
};

export async function getTotal() {
  return prisma.alunos.count();
};

export async function getByUserId(id: number) {
  return prisma.alunos.findUnique({
    where: {
      user_id: id
    },
    include: {
      users: true
    }
  });
};

export async function createAluno(tx: Prisma.TransactionClient, aluno: Prisma.alunosUncheckedCreateInput) {
  return tx.alunos.create({ data: aluno });
};

export async function inactiveAluno(tx: Prisma.TransactionClient, userId: number) {
  return tx.alunos.update({ where: { user_id: userId }, data: { status: "INATIVO" } });
};

export async function activeAluno(tx: Prisma.TransactionClient, userId: number) {
  return tx.alunos.update({ where: { user_id: userId }, data: { status: "ATIVO" } });
};

export async function updateAluno(tx: Prisma.TransactionClient, data: Prisma.alunosUpdateInput, id: number) {
  return tx.alunos.update({ where: { user_id: id }, data })
};

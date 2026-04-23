import { prisma } from "@/libs/prisma";
import { Prisma } from "@/generated/prisma/client";

export async function createAluno(tx: Prisma.TransactionClient, aluno: Prisma.alunosUncheckedCreateInput) {
  return tx.alunos.create({ data: aluno });
};

export async function inactiveAluno(tx: Prisma.TransactionClient, userId: number) {
  return tx.alunos.update({ where: { user_id: userId }, data: { status: "INATIVO" } });
};

export async function activeAluno(tx: Prisma.TransactionClient, userId: number) {
  return tx.alunos.update({ where: { user_id: userId }, data: { status: "ATIVO" } });
};

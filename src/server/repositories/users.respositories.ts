import { prisma } from "@/libs/prisma";
import { Prisma } from "@/generated/prisma/client";

export async function getAll() {
  return prisma.public_users.findMany({
    orderBy: {
      created_at: "desc",
    },
  });
};

export async function getById(id: number) {
  return prisma.public_users.findUnique({ where: { id } });
};

export async function getByEmail(email: string) {
  return prisma.public_users.findUnique({ where: { email } });
};

export async function getByAuthUserId(authUserId: string) {
  return prisma.public_users.findUnique({ where: { auth_user_id: authUserId } });
};

export async function getWithProfilesByAuthUserId(authUserId: string) {
  return prisma.public_users.findUnique({
    where: { auth_user_id: authUserId },
    include: {
      alunos: true,
      professores: true,
    },
  });
};

export async function newUser(tx: Prisma.TransactionClient, newUser: Prisma.public_usersCreateInput) {
  return tx.public_users.create({ data: newUser });
};

export async function disableMustChangePassword(userId: number) {
  return prisma.public_users.update({
    where: { id: userId },
    data: { must_change_password: false },
  });
};

export async function inactivePublicUser(tx: Prisma.TransactionClient, id: number) {
  return tx.public_users.update({ where: { id: id }, data: { status: "INATIVO" } });
};

export async function activePublicUser(tx: Prisma.TransactionClient, id: number) {
  return tx.public_users.update({ where: { id: id }, data: { status: "ATIVO" } });
};

export async function updateUserById(tx: Prisma.TransactionClient, data: Prisma.public_usersUpdateInput, id: number) {
  return tx.public_users.update({ where: { id }, data });
};

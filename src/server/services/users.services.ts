import { prisma } from "@/libs/prisma";
import { createAdminClient } from "@/libs/supabase/admin";
import { Prisma } from "@/generated/prisma/client";
import { AppError } from "../error/app-errors";
import { UserMapper } from "../mappers/users.mapper";
import { AlunoMapper } from "../mappers/alunos.mapper";
import { ProfessorMapper } from "../mappers/professores.mapper";
import {
  getAll,
  newUser,
  getById,
  inactivePublicUser,
  activePublicUser,
} from "../repositories/users.respositories";
import { createAluno, inactiveAluno, activeAluno } from "../repositories/alunos.repositories";
import { createProfessor, inactiveProfessor, activeProfessor } from "../repositories/professores.repositories";
import { CreateUserBody, createUserSchema } from "../schemas/user.schema";
import { validateUser } from "../rules/users.rules";

export async function getAllUsers() {
  return getAll();
};

export async function getUserById(id: number) {
  return getById(id);
};

export async function createUser(body: CreateUserBody) {
  const data = createUserSchema.parse(body);

  await validateUser(data);

  const adminSupabase = createAdminClient();

  const { data: authData, error: authError } = await adminSupabase.auth.admin.createUser({
    email: data.email,
    password: data.temporary_password,
    email_confirm: true,
    user_metadata: {
      role: data.role,
      must_change_password: true,
    }
  });

  if (authError || !authData.user) {
    throw new AppError(authError?.message ?? "Não foi possível criar o usuário no Auth.", 400);
  };

  try {
    return await prisma.$transaction(
      async (tx) => {
        const user = await newUser(tx, UserMapper.toPrismaUser(data, authData.user.id));

        if (data.role === "ALUNO") {
          await createAluno(tx, AlunoMapper.toPrismaAluno(user.id, data));
        };

        if (data.role === "PROFESSOR") {
          await createProfessor(tx, ProfessorMapper.toPrismaProfessor(user.id, data));
        };

        return UserMapper.toResponseAdmin(user);
      },
      {
        maxWait: 5000,
        timeout: 10000,
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      }
    );
  } catch (err) {
    await adminSupabase.auth.admin.deleteUser(authData.user.id);

    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      throw new AppError("Email já cadastrado!", 409);
    };

    throw err;
  };
};

export async function updateUser(body: CreateUserBody, id: number) {
  try {

  } catch (err) {
    throw err;
  }
};

export async function inactiveUser(id: number) {
  try {

    const user = await getById(id);

    if (!user) {
      throw new AppError("Usuário não encontrado!", 404);
    };

    return prisma.$transaction(async (tx) => {
      const userDel = await inactivePublicUser(tx, id);

      if (user.role === "ALUNO") {
        await inactiveAluno(tx, id);
      };

      if (user.role === "PROFESSOR") {
        await inactiveProfessor(tx, id);
      };

      return UserMapper.toResponseAdmin(userDel);
    });

  } catch (err) {

    throw err;
  };
};

export async function activeUser(id: number) {
  try {

    const user = await getById(id);

    if (!user) {
      throw new AppError("Usuário não encontrado!", 404);
    };

    return prisma.$transaction(async (tx) => {
      const userAct = await activePublicUser(tx, id);

      if (user.role === "ALUNO") {
        await activeAluno(tx, id);
      };

      if (user.role === "PROFESSOR") {
        await activeProfessor(tx, id);
      };

      return UserMapper.toResponseAdmin(userAct);
    });

  } catch (err) {

    throw err;
  };
};

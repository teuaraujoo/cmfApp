import { prisma } from "@/libs/prisma";
import { createAdminClient } from "@/libs/supabase/admin";
import { Prisma } from "@/generated/prisma/client";
import { AppError } from "@/server/error/app-errors";
import { UserMapper } from "@/server/mappers/users/users.mapper";
import { AlunoMapper } from "@/server/mappers/users/alunos.mapper";
import { ProfessorMapper } from "@/server/mappers/users/professores.mapper";
import { UsersRepositories } from "@/server/repositories/users/users.respositories";
import { UsersRules } from "@/server/rules/users/users.rules";
import { AlunosRepositories } from "@/server/repositories/users/alunos.repositories";
import { ProfessoresRepositories } from "@/server/repositories/users/professores.repositories";
import { CreateUserBody, UpdateUserBody, createUserSchema, updateUserSchema } from "@/server/schemas/users/user.schema";

export async function getAllUsers() {
  return UsersRepositories.getAll();
};

export async function getUserById(id: number) {
  return UsersRepositories.getById(id);
};

export async function createUser(body: CreateUserBody) {
  const data = createUserSchema.parse(body);

  await UsersRules.validateUser(data);

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
        const user = await UsersRepositories.newUser(tx, UserMapper.toPrismaUser(data, authData.user.id));

        if (data.role === "ALUNO") {
          await AlunosRepositories.createAluno(tx, AlunoMapper.toPrismaAluno(user.id, data));
        };

        if (data.role === "PROFESSOR") {
          await ProfessoresRepositories.createProfessor(tx, ProfessorMapper.toPrismaProfessor(user.id, data));
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

export async function updateUser(body: UpdateUserBody, id: number) {
  try {
    const data = updateUserSchema.parse(body);

    const authUserId = await UsersRules.validateUpdateUser(data, id);

    const adminSupabase = createAdminClient();

    const { data: authData, error: authError } = await adminSupabase.auth.admin.updateUserById(
      authUserId,
      {
        email: data.email,
        user_metadata: {
          role: data.role,
        },
      }
    );

    if (authError || !authData.user) {
      throw new AppError(authError?.message ?? "Não foi possível atualizar o usuário no Auth.", 400);
    };

    return await prisma.$transaction(async (tx) => {
     const user = await UsersRepositories.updateUserById(tx, UserMapper.toPrismaUserUpdate(data), id);

      if (data.role === "PROFESSOR") {
        await ProfessoresRepositories.updateProfessor(tx, ProfessorMapper.toPrismaProfessor(id, data), id);
      };

      if (data.role === "ALUNO") {
        await AlunosRepositories.updateAluno(tx, AlunoMapper.toPrismaAluno(id, data), id);
      };

      return UserMapper.toResponseAdmin(user);
    });

  } catch (err) {
    throw err;
  }
};

export async function inactiveUser(id: number) {
  try {

    const user = await UsersRepositories.getById(id);

    if (!user) {
      throw new AppError("Usuário não encontrado!", 404);
    };

    return prisma.$transaction(async (tx) => {
      const userDel = await UsersRepositories.inactivePublicUser(tx, id);

      if (user.role === "ALUNO") {
        await AlunosRepositories.inactiveAluno(tx, id);
      };

      if (user.role === "PROFESSOR") {
        await ProfessoresRepositories.inactiveProfessor(tx, id);
      };

      return UserMapper.toResponseAdmin(userDel);
    });

  } catch (err) {

    throw err;
  };
};

export async function activeUser(id: number) {
  try {

    const user = await UsersRepositories.getById(id);

    if (!user) {
      throw new AppError("Usuário não encontrado!", 404);
    };

    return prisma.$transaction(async (tx) => {
      const userAct = await UsersRepositories.activePublicUser(tx, id);

      if (user.role === "ALUNO") {
        await AlunosRepositories.activeAluno(tx, id);
      };

      if (user.role === "PROFESSOR") {
        await ProfessoresRepositories.activeProfessor(tx, id);
      };

      return UserMapper.toResponseAdmin(userAct);
    });

  } catch (err) {

    throw err;
  };
};

import { prisma } from "@/libs/prisma";
import { createAdminClient } from "@/libs/supabase/admin";
import { Prisma } from "@/generated/prisma/client";
import { AppError } from "../error/app-errors";
import { PrismaUserMapper } from "../mappers/users.mapper";
import { createAluno, createProfessor, getAll, newUser } from "../repositories/users.respositories";
import { CreateUserBody, createUserSchema } from "../schemas/user.schema";
import { validateUser } from "../rules/users/users.rules";

export async function getAllUsers() {
  return getAll();
}

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
        const user = await newUser(tx, PrismaUserMapper.toPrismaUser(data, authData.user.id));

        if (data.role === "ALUNO") {
          await createAluno(tx, PrismaUserMapper.toPrismaAluno(user.id, data));
        };

        if (data.role === "PROFESSOR") {
          await createProfessor(tx, PrismaUserMapper.toPrismaProfessor(user.id, data));
        };

        return PrismaUserMapper.toUserCreationResponseAdmin(user);
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

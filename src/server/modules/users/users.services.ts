import { prisma } from "@/server/libs/prisma";
import { createAdminClient } from "@/server/libs/supabase/admin";
import { Prisma } from "@/generated/prisma/client";
import { AppError } from "@/server/error/app-errors";
import { UserMapper } from "@/server/modules/users/users.mapper";
import { AlunoMapper } from "@/server/modules/users/users.mapper";
import { ProfessorMapper } from "@/server/modules/users/users.mapper";
import { UsersRepositories } from "@/server/modules/users/users.respositories";
import { AlunosRepositories } from "@/server/modules/users/users.respositories";
import { ProfessoresRepositories } from "@/server/modules/users/users.respositories";
import { CreateUserBody, UpdateUserBody, createUserSchema, updateUserSchema } from "@/server/modules/users/user.schema";


/* =================    USERS     =================*/

export async function getAllUsers() {
  return UsersRepositories.getAll();
};

export async function getUserById(id: number) {
  return UsersRepositories.getById(id);
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

    const authUserId = await validateUpdateUser(data, id);

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

/* =================    ALUNO     =================*/

export async function getAllAlunos() {
  const alunos = await AlunosRepositories.getAll();

  if (!alunos) {
    throw new AppError("Error ao encontrar alunos!", 404);
  };

  return alunos.map((aluno) => AlunoMapper.toResponseAlunoGet(aluno, aluno.users));
};

export async function getTotalAlunos() {
  return AlunosRepositories.getTotal();
};

export async function getAlunoByUserId(userId: number) {
  const aluno = await AlunosRepositories.getByUserId(userId);

  if (!aluno) {
    throw new AppError("Error ao encontrar aluno!", 404);
  };

  return AlunoMapper.toResponseAlunoGet(aluno, aluno.users);
};

/* =================    PROFESSOR     =================*/

export async function getAllProfessores() {
  const professores = await ProfessoresRepositories.getAll();

  if (!professores) {
    throw new AppError("Error ao encontrar professores", 404);
  };

  return professores.map((professor) => ProfessorMapper.toResponseProfessorGet(professor, professor.users, professor.modalidades));
};

export async function getTotalProfessores() {
  return ProfessoresRepositories.getTotal();
};

export async function getProfessorByUserId(id: number) {
  const professor = await ProfessoresRepositories.getByUserId(id);

  if (!professor) {
    throw new AppError("Não foi possível encontrar professor!", 404);
  };

  return ProfessorMapper.toResponseProfessorGet(professor, professor.users, professor.modalidades);
};


// VALIDATIONS 

async function validateUser(data: CreateUserBody) {
  const findEmail = await UsersRepositories.getByEmail(data.email);

  if (findEmail) {
    throw new AppError("Email já cadastrado!", 409);
  };

  if (data.role === "ALUNO" && !data.aluno) {
    throw new AppError("Dados do aluno são obrigatórios!", 400);
  };

  if (data.role === "PROFESSOR" && !data.professor) {
    throw new AppError("Dados do professor são obrigatórios!", 400);
  };
};

async function validateUpdateUser(data: UpdateUserBody, id: number) {
  const findEmail = await UsersRepositories.getByEmail(data.email);
  const findUser = await UsersRepositories.getById(id);

  if (!findUser) {
    throw new AppError("Usuário não encontrado!", 404);
  };

  if (findEmail && findEmail.id !== id) {
    throw new AppError("Email já cadastrado!", 409);
  };

  if (data.role !== findUser.role) {
    throw new AppError("Alteração de role ainda não é suportada nesta rota.", 400);
  };

  if (data.role === "ALUNO" && !data.aluno) {
    throw new AppError("Dados do aluno são obrigatórios!", 400);
  };

  if (data.role === "PROFESSOR" && !data.professor) {
    throw new AppError("Dados do professor são obrigatórios!", 400);
  };

  return findUser.auth_user_id;
};
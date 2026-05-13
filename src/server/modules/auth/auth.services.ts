import { AppError } from "@/server/error/app-errors";
import { LoginBody, loginSchema, ChangePasswordBody, changePasswordSchema } from "@/server/modules/auth/auth.schema";
import { createClient } from "@/server/libs/supabase/server";
import { UserMapper } from "@/server/modules/users/users.mapper";
import { UsersRepositories } from "@/server/modules/users/users.respositories";
import { validateLogin } from "@/server/modules/auth/auth.validation";

export async function loginUser(body: LoginBody) {
  const data = loginSchema.parse(body);
  const supabase = await createClient();

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  const appUser = await validateLogin(error, authData.user, supabase);

  return UserMapper.toLoginResponse(appUser);
};

export async function logoutUser() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new AppError("Não foi possível encerrar a sessão.", 400);
  };
};

export async function changePassword(body: ChangePasswordBody) {
  const data = changePasswordSchema.parse(body);

  const { appUser, supabase } = await getCurrentAppUser();

  if (data.newPassword !== data.confirmPassword) {
    throw new AppError("A confirmação da senha não confere.", 400);
  };

  const { error } = await supabase.auth.updateUser({
    password: data.newPassword,
  });

  if (error) {
    throw new AppError(error.message, 400);
  };

  const updatedUser = await UsersRepositories.disableMustChangePassword(appUser.id);

  return UserMapper.toChangePasswordResponse(updatedUser);
};

// Garante que a operação atual está sendo executada por um admin ativo.
export async function requireAdminUser() {
  const session = await requireOnboardedUser();

  if (session.appUser.role !== "ADMIN") {
    throw new AppError("Apenas adiministradores podem executar esta ação.", 403);
  };

  return session;
};

// Busca o usuário autenticado no Supabase e o traduz para o perfil local da aplicação.
export async function getCurrentAppUser() {
  const supabase = await createClient();

  const { data: { user: authUser }, error } = await supabase.auth.getUser();
  if (error || !authUser) {
    throw new AppError("Usuário não autenticado.", 401);
  };

  const appUser = await UsersRepositories.getWithProfilesByAuthUserId(authUser.id);

  if (!appUser) {
    throw new AppError("Usuário autenticado sem perfil local vinculado.", 401);
  };

  if (appUser.status !== "ATIVO") {
    throw new AppError("Usuário inativo.", 403);
  };

  return {
    authUser,
    appUser,
    supabase
  };
};

// Retorna uma sessão válida já liberada para uso normal do sistema.
async function requireOnboardedUser() {
  const session = await getCurrentAppUser();

  checkPasswordAlreadyChange(session.appUser.must_change_password);

  return session;
};

// Usuários com senha provisória devem ficar limitados até concluir o primeiro acesso.
function checkPasswordAlreadyChange(mustChangePassword: boolean) {
  if (mustChangePassword) {
    throw new AppError("Você precisa alterar a senha provisória antes de acessar esta funcionalidade.", 403);
  };
};
import { AppError } from "@/server/error/app-errors";
import { LoginBody, loginSchema, ChangePasswordBody, changePasswordSchema } from "@/server/schemas/auth.schema";
import { createClient } from "@/libs/supabase/server";
import { PrismaUserMapper } from "@/server/mappers/users.mapper";
import { disableMustChangePassword, getByAuthUserId } from "@/server/repositories/users.respositories";
import { userHelpers } from "../helpers/users.helpers";

export async function loginUser(body: LoginBody) {
  const data = loginSchema.parse(body);
  const supabase = await createClient();

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error || !authData.user) {
    throw new AppError("Credenciais inválidas.", 401);
  };

  const appUser = await getByAuthUserId(authData.user.id);

  if (!appUser) {
    await supabase.auth.signOut();
    throw new AppError("Usuário autenticado sem cadastro local.", 401);
  };

  if (appUser.status !== "ATIVO") {
    await supabase.auth.signOut();
    throw new AppError("Usuário inativo.", 403);
  };

  return PrismaUserMapper.toLoginResponse(appUser);
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

  const { appUser, supabase } = await userHelpers.getCurrentAppUser();

  if (data.newPassword !== data.confirmPassword) {
    throw new AppError("A confirmação da senha não confere.", 400);
  };

  const { error } = await supabase.auth.updateUser({
    password: data.newPassword,
  });

  if (error) {
    throw new AppError(error.message, 400);
  };

  const updatedUser = await disableMustChangePassword(appUser.id);

  return PrismaUserMapper.toChangePasswordResponse(updatedUser);
};

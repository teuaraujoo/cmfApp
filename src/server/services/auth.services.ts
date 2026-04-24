import { AppError } from "@/server/error/app-errors";
import { LoginBody, loginSchema, ChangePasswordBody, changePasswordSchema } from "@/server/schemas/auth.schema";
import { createClient } from "@/libs/supabase/server";
import { UserMapper } from "@/server/mappers/users.mapper";
import { disableMustChangePassword } from "@/server/repositories/users.respositories";
import { userHelpers } from "../helpers/users.helpers";
import { validateLogin } from "../rules/auth.rules";

export async function loginUser(body: LoginBody) {
  const data = loginSchema.parse(body);
  const supabase = await createClient();

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  const appUser  = await validateLogin(error, authData.user, supabase);

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

  return UserMapper.toChangePasswordResponse(updatedUser);
};

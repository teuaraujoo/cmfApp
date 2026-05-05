import { AppError } from "@/server/error/app-errors";
import { UsersRepositories } from "@/server/users/users.respositories";
import { AuthError, User } from "@supabase/supabase-js";
import { createClient } from "@/libs/supabase/server";

export async function validateLogin(error: AuthError| null, authUser: User | null, supabase: Awaited<ReturnType<typeof createClient>>) {

    if (error || !authUser) {
        throw new AppError("Credenciais inválidas.", 401);
    };

    const appUser = await UsersRepositories.getByAuthUserId(authUser.id);

    if (!appUser) {
        await supabase.auth.signOut();
        throw new AppError("Usuário autenticado sem cadastro local.", 401);
    };

    if (appUser.status !== "ATIVO") {
        await supabase.auth.signOut();
        throw new AppError("Usuário inativo.", 403);
    };

    return appUser;
};
import { createClient } from "@/libs/supabase/server";
import { AppError } from "@/server/error/app-errors";
import { UsersRepositories } from "@/server/users/users.respositories";

export class userHelpers {
    
    // Garante que a operação atual está sendo executada por um admin ativo.
    static async requireAdminUser() {
        const session = await this.requireOnboardedUser();

        if (session.appUser.role !== "ADMIN") {
            throw new AppError("Apenas adiministradores podem executar esta ação.", 403);
        };

        return session;
    };

    // Retorna uma sessão válida já liberada para uso normal do sistema.
    static async requireOnboardedUser() {
        const session = await this.getCurrentAppUser();

        this.checkPasswordAlreadyChange(session.appUser.must_change_password);

        return session;
    };

    // Busca o usuário autenticado no Supabase e o traduz para o perfil local da aplicação.
    static async getCurrentAppUser() {
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

    // Usuários com senha provisória devem ficar limitados até concluir o primeiro acesso.
    static async checkPasswordAlreadyChange(mustChangePassword: boolean) {
        if (mustChangePassword) {
            throw new AppError("Você precisa alterar a senha provisória antes de acessar esta funcionalidade.", 403);
        };
    };
};
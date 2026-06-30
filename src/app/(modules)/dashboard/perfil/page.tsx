import PerfilDashboardPage from "@/components/dashboard/perfil/PerfilDashboardPage";
import { getCurrentAppUser } from "@/server/modules/auth/auth.services";

type AppUserRole = "ADMIN" | "ALUNO" | "PROFESSOR";

export default async function PerfilPage() {
  const { appUser } = await getCurrentAppUser();

  const userInfo = {
    id: appUser.id,
    nome: appUser.nome,
    email: appUser.email,
    tel: appUser.tel,
    role: appUser.role as AppUserRole,
    createdAt: appUser.created_at.toISOString(),
  };

  return <PerfilDashboardPage userInfo={userInfo} />;
}

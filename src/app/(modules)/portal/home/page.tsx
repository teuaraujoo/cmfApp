import { PortalHomePage } from "@/components/portal/PortalHomePage";
import { getCurrentAppUser } from "@/server/modules/auth/auth.services";
import { getNextEngagementForUser } from "@/server/modules/users/user.queries";

export default async function PortalHomeRoute() {

  const { appUser } = await getCurrentAppUser();

  const userInfo = {
    nome: appUser.nome,
    email: appUser.email,
    tel: appUser.tel,
    role: appUser.role,
  };

  const nextEngagement = await getNextEngagementForUser(appUser.id);
  const aula = nextEngagement?.aula ?? null;
  const turma = nextEngagement?.turma ?? null;
  
  return <PortalHomePage userInfo={userInfo} aula={aula} turma={turma} />;
};
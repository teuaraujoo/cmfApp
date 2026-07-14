import { PortalPlaceholderPage } from "@/components/portal/home/PortalPlaceholderPage";
import { getAulasByAlunoIdForAluno, getAulasByProfesorIdForProfessor } from "@/server/modules/aulas/aulas.queries";
import { getCurrentAppUser } from "@/server/modules/auth/auth.services";

export default async function PortalAulasPage() {
  const { appUser } = await getCurrentAppUser();
  let id;

  if (!appUser) return;

  if (appUser.alunos) {
    id = appUser.alunos.id;
  } else if (appUser.professores) {
    id = appUser.professores?.id;
  };

  if (!id) return;

  const aulas = appUser.role === "PROFESSOR"
    ? await getAulasByProfesorIdForProfessor(id)
    : await getAulasByAlunoIdForAluno(id)

  console.log("AULAS: ", aulas);

  return <PortalPlaceholderPage title="Aulas" />;
};

import { PortalPlaceholderPage } from "@/components/portal/home/PortalPlaceholderPage";
import { getAulasByAlunoIdForAluno, getAulasByProfesorIdForProfessor } from "@/server/modules/aulas/aulas.queries";
import { getPortalUserContext } from "@/server/modules/auth/auth.services";

export default async function PortalAulasPage() {
  const { role, id } = await getPortalUserContext();

  const aulas = role === "PROFESSOR"
    ? await getAulasByProfesorIdForProfessor(id)
    : await getAulasByAlunoIdForAluno(id)

  console.log("AULAS: ", aulas);

  return <PortalPlaceholderPage title="Aulas" />;
};

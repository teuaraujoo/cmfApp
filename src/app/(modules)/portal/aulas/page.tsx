import { AulaPortal } from "@/@types/aulas/aulas.types";
import PortalAulasPage from "@/components/portal/aulas/PortalAulasPage";
import { getAulasByAlunoIdForAluno, getAulasByProfesorIdForProfessor } from "@/server/modules/aulas/aulas.queries";
import { getPortalUserContext } from "@/server/modules/auth/auth.services";

export default async function PortalAulasRoute() {
  const { role, id } = await getPortalUserContext();

  const aulas = role === "PROFESSOR"
    ? await getAulasByProfesorIdForProfessor(id)
    : await getAulasByAlunoIdForAluno(id);

  return <PortalAulasPage aulas={aulas as AulaPortal[]} />;
};
import { TurmaApiPortalResponse } from "@/@types/turma/turma.types";
import { toTurmaPortalItem } from "@/components/portal/turmas/turmas-portal-view.mapper";
import PortalTurmasPage from "@/components/portal/turmas/PortalTurmasPage";
import { getPortalUserContext } from "@/server/modules/auth/auth.services";
import { getAllTurmasByProfessorIdForProfessor, getAllTurmasByAlunoIdForAluno } from "@/server/modules/turmas/turmas.queries";

export default async function PortalTurmasRoute() {
  const { role, id } = await getPortalUserContext();

  const turmas = role === "PROFESSOR"
    ? await getAllTurmasByProfessorIdForProfessor(id)
    : await getAllTurmasByAlunoIdForAluno(id);

  const turmasPortal = turmas.map((turma) => toTurmaPortalItem(turma as TurmaApiPortalResponse))

  return < PortalTurmasPage turmas={turmasPortal} />;
}

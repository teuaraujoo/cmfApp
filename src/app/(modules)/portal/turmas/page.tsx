import { TurmaApiPortalResponse } from "@/@types/turma/turma.types";
import { toTurmaPortalItem } from "@/components/portal/turmas/turmas-portal-view.mapper";
import PortalTurmasPage from "@/components/portal/turmas/PortalTurmasPage";
import { getCurrentAppUser } from "@/server/modules/auth/auth.services";
import { getAllTurmasByProfessorIdForProfessor, getAllTurmasByAlunoIdForAluno } from "@/server/modules/turmas/turmas.queries";

export default async function PortalTurmasRoute() {
  const { appUser } = await getCurrentAppUser();
  let id;

  if (!appUser) return;

  if (appUser.alunos) {
    id = appUser.alunos.id;
  } else if (appUser.professores) {
    id = appUser.professores?.id;
  };

  if (!id) return;

  const turmas = appUser.role === "PROFESSOR"
    ? await getAllTurmasByProfessorIdForProfessor(id)
    : await getAllTurmasByAlunoIdForAluno(id);

  const turmasPortal = turmas.map((turma) => toTurmaPortalItem(turma as TurmaApiPortalResponse))

  return < PortalTurmasPage turmas={turmasPortal} />;
}

import { TurmaApiResponse } from "@/@types/turma/turma.types";
import { toTurmaDashboardItems } from "@/components/dashboard/turmas/turmas-view.mapper";
import { PortalPlaceholderPage } from "@/components/portal/home/PortalPlaceholderPage";
import { getCurrentAppUser } from "@/server/modules/auth/auth.services";
import { getAllTurmasByProfessorIdForProfessor, getAllTurmasByAlunoIdForAluno } from "@/server/modules/turmas/turmas.queries";

export default async function PortalTurmasPage() {
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

  // const turmasF = toTurmaDashboardItems(turmas as TurmaApiResponse[]);
  console.log("turmas: ", turmas);

  return <PortalPlaceholderPage title="Turmas" />;
}

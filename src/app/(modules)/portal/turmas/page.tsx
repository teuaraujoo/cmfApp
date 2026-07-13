import { PortalPlaceholderPage } from "@/components/portal/home/PortalPlaceholderPage";
import { getCurrentAppUser } from "@/server/modules/auth/auth.services";
import { getTurmasByAlunoIdForUser, getTurmasByProfessorIdForUser } from "@/server/modules/turmas/turmas.queries";

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

  const turmas = appUser.role === "PROFESSOR" ? await getTurmasByProfessorIdForUser([id]) : await getTurmasByAlunoIdForUser([id]);

  console.log(turmas);


  return <PortalPlaceholderPage title="Turmas" />;
}

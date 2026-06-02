import TurmasDashboardPage from "@/components/turmas/TurmasDashboardPage";
import { toTurmaDashboardItems } from "@/components/turmas/turmas-view.mapper";
import type { TurmaApiResponse } from "@/components/turmas/types";
import { getAllModalidadesForAdmin } from "@/server/modules/modalidades/modalidades.queries";
import { getAllTurmasForAdmin } from "@/server/modules/turmas/turmas.queries";
import { getAllAlunosForAdmin, getAllProfessoresForAdmin } from "@/server/modules/users/user.queries";

export default async function TurmasPage() {

  const [alunos, modalidades, turmas, professores] = await Promise.all([
    getAllAlunosForAdmin(),
    getAllModalidadesForAdmin(),
    getAllTurmasForAdmin(),
    getAllProfessoresForAdmin(),
  ]);

  const turmasDashboard = toTurmaDashboardItems(turmas as TurmaApiResponse[]);

  return <TurmasDashboardPage turmas={turmasDashboard} modalidades={modalidades} alunos={alunos}  professores={professores}/>;
}

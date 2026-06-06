import TurmaDetailsPage from "@/components/dashboard/turmas/TurmaDetailsPage";
import { toTurmaDashboardItem } from "@/components/dashboard/turmas/turmas-view.mapper";
import { getAllModalidadesForAdmin } from "@/server/modules/modalidades/modalidades.queries";
import { getTurmaByIdForAdmin } from "@/server/modules/turmas/turmas.queries";
import { getAllAlunosForAdmin } from "@/server/modules/users/user.queries";
import { getAllProfessoresForAdmin } from "@/server/modules/users/user.queries";

type TurmaDetailsRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TurmaDetailsRoute({
  params,
}: TurmaDetailsRouteProps) {
  const { id } = await params;

  const [alunos, modalidades, turma, professores] = await Promise.all([
    getAllAlunosForAdmin(),
    getAllModalidadesForAdmin(),
    getTurmaByIdForAdmin(Number(id)),
    getAllProfessoresForAdmin(),
  ]);

  const turmaDashboard = toTurmaDashboardItem(turma);

  return <TurmaDetailsPage turma={turmaDashboard} modalidades={modalidades} alunos={alunos} professores={professores} />;
};
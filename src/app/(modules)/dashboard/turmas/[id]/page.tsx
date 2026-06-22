import TurmaDetailsPage from "@/components/dashboard/turmas/TurmaDetailsPage";
import { toTurmaDashboardItem } from "@/components/dashboard/turmas/turmas-view.mapper";
import { getTurmaByIdForAdmin } from "@/server/modules/turmas/turmas.queries";

type TurmaDetailsRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TurmaDetailsRoute({
  params,
}: TurmaDetailsRouteProps) {
  const { id } = await params;

  const turma = await getTurmaByIdForAdmin(Number(id));

  const turmaDashboard = toTurmaDashboardItem(turma);

  return <TurmaDetailsPage turma={turmaDashboard} />;
};

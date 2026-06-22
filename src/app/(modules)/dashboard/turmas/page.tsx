import TurmasDashboardPage from "@/components/dashboard/turmas/TurmasDashboardPage";
import { toTurmaDashboardItems } from "@/components/dashboard/turmas/turmas-view.mapper";
import type { TurmaApiResponse } from "@/@types/turma/turma.types";
import { getAllTurmasForAdmin } from "@/server/modules/turmas/turmas.queries";

export default async function TurmasPage() {
  const turmas = await getAllTurmasForAdmin();

  const turmasDashboard = toTurmaDashboardItems(turmas as TurmaApiResponse[]);

  return <TurmasDashboardPage turmas={turmasDashboard} />;
}

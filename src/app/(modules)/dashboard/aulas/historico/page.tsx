import AulasHistoricoDashboardPage from "@/components/dashboard/aulas/historico/AulasHistoricoDashboardPage";
import { getAllAulasForAdmin } from "@/server/modules/aulas/aulas.queries";

export default async function AulasHistoricoPage() {
  const aulas = await getAllAulasForAdmin();

  return <AulasHistoricoDashboardPage aulas={aulas} />;
};

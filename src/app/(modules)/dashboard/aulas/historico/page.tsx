import AulasHistoricoDashboardPage from "@/components/aulas/historico/AulasHistoricoDashboardPage";
import { getAllAulasForAdmin } from "@/server/modules/aulas/aulas.queries";

export default async function AulasHistoricoPage() {
  const aulas = await getAllAulasForAdmin();

  return <AulasHistoricoDashboardPage aulas={aulas} />;
};

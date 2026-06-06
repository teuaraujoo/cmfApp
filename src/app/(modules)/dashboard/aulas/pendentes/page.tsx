import AulasPendenciasDashboardPage from "@/components/dashboard/aulas/pendentes/AulasPendenciasDashboardPage";
import { getAulasNotFinishedForAdmin } from "@/server/modules/aulas/aulas.queries";

export default async function AulasPendentesPage() {
  const aulas = await getAulasNotFinishedForAdmin();

  return <AulasPendenciasDashboardPage aulas={aulas}/>;
};

import AulasSemanaDashboardPage from "@/components/dashboard/aulas/semana/AulasSemanaDashboardPage";
import { getAulasForAdmin } from "@/server/modules/aulas/aulas.queries";
import { getAlunosWithAulaIndividual } from "@/server/modules/users/user.queries";

export default async function AulasSemanaPage() {
  const [aulas, alunosWithAula] = await Promise.all([
    getAulasForAdmin(),
    getAlunosWithAulaIndividual(),
  ]);

  return <AulasSemanaDashboardPage aulas={aulas} alunosWithAula={alunosWithAula} />;
};

import AulasSemanaDashboardPage from "@/components/aulas/semana/AulasSemanaDashboardPage";
import { getAulasForAdmin } from "@/server/modules/aulas/aulas.queries";
import { getAllModalidadesForAdmin } from "@/server/modules/modalidades/modalidades.queries";
import { getAllAlunosForAdmin, getAllProfessoresForAdmin, getAlunosWithAulaIndividual } from "@/server/modules/users/user.queries";

export default async function AulasSemanaPage() {
  const aulas = await getAulasForAdmin();
  const alunosWithAula = await getAlunosWithAulaIndividual();
  const alunos = await getAllAlunosForAdmin();
  const professores = await getAllProfessoresForAdmin();
  const modalidades = await getAllModalidadesForAdmin();

  return <AulasSemanaDashboardPage aulas={aulas} alunosWithAula={alunosWithAula} alunos={alunos} professores={professores} modalidades={modalidades} />;
};

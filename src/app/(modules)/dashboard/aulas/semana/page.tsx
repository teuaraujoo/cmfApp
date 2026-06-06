import AulasSemanaDashboardPage from "@/components/dashboard/aulas/semana/AulasSemanaDashboardPage";
import { getAulasForAdmin } from "@/server/modules/aulas/aulas.queries";
import { getAllModalidadesForAdmin } from "@/server/modules/modalidades/modalidades.queries";
import { getAllAlunosForAdmin, getAllProfessoresForAdmin, getAlunosWithAulaIndividual } from "@/server/modules/users/user.queries";

export default async function AulasSemanaPage() {
  const [aulas, alunosWithAula, alunos, professores, modalidades] = await Promise.all([
    getAulasForAdmin(),
    getAlunosWithAulaIndividual(),
    getAllAlunosForAdmin(),
    getAllProfessoresForAdmin(),
    getAllModalidadesForAdmin()
  ]);

  return <AulasSemanaDashboardPage aulas={aulas} alunosWithAula={alunosWithAula} alunos={alunos} professores={professores} modalidades={modalidades} />;
};

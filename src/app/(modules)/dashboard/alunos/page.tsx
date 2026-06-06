import StudentsDashboardPage from "@/components/dashboard/alunos/AlunoDashboardPage";
import { getAllModalidadesForAdmin } from "@/server/modules/modalidades/modalidades.queries";
import { getAllAlunosForAdmin } from "@/server/modules/users/user.queries";

export default async function AlunosPage() {

  const [alunos, modalidades] = await Promise.all([
    getAllAlunosForAdmin(),
    getAllModalidadesForAdmin()
  ]);
  return <StudentsDashboardPage alunos={alunos} modalidades={modalidades} />;
};

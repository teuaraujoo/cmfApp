import StudentsDashboardPage from "@/components/alunos/AlunoDashboardPage";
import { getAllModalidadesForAdmin } from "@/server/modules/modalidades/modalidades.queries";
import { getAllAlunosForAdmin } from "@/server/modules/users/user.queries";

export default async function AlunosPage() {
  const alunos = await getAllAlunosForAdmin();
  const modalidades = await getAllModalidadesForAdmin();
  return <StudentsDashboardPage alunos={alunos} modalidades={modalidades}/>;
};

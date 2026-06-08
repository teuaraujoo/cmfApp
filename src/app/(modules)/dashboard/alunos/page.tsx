import StudentsDashboardPage from "@/components/dashboard/alunos/AlunoDashboardPage";
import { getAllAlunosForAdmin } from "@/server/modules/users/user.queries";

export default async function AlunosPage() {

  const alunos = await getAllAlunosForAdmin();

  return <StudentsDashboardPage alunos={alunos} />;
};

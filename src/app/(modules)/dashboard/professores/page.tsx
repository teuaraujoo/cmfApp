import ProfessorDashboardPage from "@/components/dashboard/professores/ProfessorDashboardPage";
import { getAllProfessoresForAdmin } from "@/server/modules/users/user.queries";

export default async function ProfessoresPage() {

  const professores = await getAllProfessoresForAdmin();

  return (
    <ProfessorDashboardPage
      professores={professores}
    />
  );
};

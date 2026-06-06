import ProfessorDashboardPage from "@/components/dashboard/professores/ProfessorDashboardPage";
import { getAllModalidadesForAdmin } from "@/server/modules/modalidades/modalidades.queries";
import { getAllProfessoresForAdmin } from "@/server/modules/users/user.queries";

export default async function ProfessoresPage() {

  const [professores, modalidades] = await Promise.all([
    getAllProfessoresForAdmin(),
    getAllModalidadesForAdmin()
  ]);

  return (
    <ProfessorDashboardPage
      professores={professores}
      modalidades={modalidades}
    />
  );
};

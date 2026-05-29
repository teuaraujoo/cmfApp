import ProfessorDashboardPage from "@/components/professores/ProfessorDashboardPage";
import { getAllModalidadesForAdmin } from "@/server/modules/modalidades/modalidades.queries";
import { getAllProfessoresForAdmin } from "@/server/modules/users/user.queries";

export default async function ProfessoresPage() {
  const professores = await getAllProfessoresForAdmin();
  const modalidades = await getAllModalidadesForAdmin();

  return (
    <ProfessorDashboardPage
      professores={professores}
      modalidades={modalidades}
    />
  );
};

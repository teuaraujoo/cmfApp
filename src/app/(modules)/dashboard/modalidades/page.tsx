import { getAllModalidadesForAdmin } from "@/server/modules/modalidades/modalidades.queries";
import ModalidadesDashboardPage from "@/components/dashboard/modalidades/ModalidadesDashboardPage";

export default async function ModalidadesPage() {
    const modalidades = await getAllModalidadesForAdmin();


    return <ModalidadesDashboardPage modalidades={modalidades} />;
};

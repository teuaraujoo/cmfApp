import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Calendar from "@/components/calendar/Calendar";
import { getAllModalidadesForAdmin } from "@/server/modules/modalidades/modalidades.queries";
import {
  getAllAlunosForAdmin,
  getAllProfessoresForAdmin,
} from "@/server/modules/users/user.queries";
import "./calendar-globals.css";

export default async function CalendarioPage() {
  const [alunos, professores, modalidades] = await Promise.all([
    getAllAlunosForAdmin(),
    getAllProfessoresForAdmin(),
    getAllModalidadesForAdmin(),
  ]);

  return (
    <main className="calendar-page p-3 sm:p-5 lg:p-6">
      <div className="space-y-6">
        <section className="px-2 py-2 sm:px-3 sm:py-3">
          <p className="text-sm font-medium text-sky-600 dark:text-sky-300">
            Gestão da agenda
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Calendário
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400">
            Vizualize toda sua agenda e verifique seus compromissos mensais, semanis e diários.
          </p>
        </section>

        <Calendar
          alunos={alunos}
          professores={professores}
          modalidades={modalidades}
        />

        <div className="calendar-breadcrumb rounded-2xl border border-gray-200 bg-white px-5 py-4 dark:border-gray-800 dark:bg-white/[0.03]">
          <PageBreadcrumb pageTitle="Calendário" />
        </div>
      </div>
    </main>
  );
};

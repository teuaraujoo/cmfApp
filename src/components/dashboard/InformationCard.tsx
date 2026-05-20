// import Badge from "@/components/ui/Badge";
import { CircleUserRound, GraduationCap, BookOpenText, ComponentIcon } from "lucide-react";
import { getTotalAulasForAdmin } from "@/server/modules/aulas/aulas.queries";
import { getTotalAlunosForAdimin, getTotalProfessoresForAdmin } from "@/server/modules/users/user.queries";
import Link from "next/link";
import { getTotalTurmasForAdmin } from "@/server/modules/turmas/turmas.queries";

type cardInfo = {
  name: string;
  icon: React.ReactNode;
  path: string;
  content: number
};
const [alunos, professores, aulas, turmas] = await Promise.all([
  getTotalAlunosForAdimin(),
  getTotalProfessoresForAdmin(),
  getTotalAulasForAdmin(),
  getTotalTurmasForAdmin()
]);

const cardsInfo: cardInfo[] = [
  {
    name: "Alunos",
    icon: <CircleUserRound />,
    path: "/dashboard/alunos",
    content: alunos
  },
  {
    name: "Professores",
    icon: <GraduationCap />,
    path: "/dashboard/professores",
    content: professores
  },
  {
    name: "Turmas",
    icon: <ComponentIcon />,
    path: "/dashboard/turmas",
    content: turmas
  },
  {
    name: "Aulas",
    icon: <BookOpenText />,
    path: "/dashboard/aulas/semana",
    content: aulas
  },
]

export default async function InformationCard() {

  const cardClassName =
    "group rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg dark:border-gray-800 dark:bg-white/[0.03] dark:hover:border-sky-900/60 dark:hover:bg-white/[0.05] md:p-6";
  const iconWrapperClassName =
    "flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 transition-colors duration-200 group-hover:bg-sky-50 dark:bg-gray-800 dark:group-hover:bg-sky-500/10";
  const iconClassName =
    "size-6 text-gray-800 transition-colors duration-200 group-hover:text-sky-600 dark:text-white/90 dark:group-hover:text-sky-400";

  return (

    <>
      {cardsInfo.map((info) => (
        <Link
          key={info.name}
          href={info.path}
        >
          <div className={cardClassName}>
            <div className={iconWrapperClassName}>
              <span className={iconClassName}>
                {info.icon}
              </span>
            </div>
            <div className="flex items-end justify-between mt-5">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {info.name}
                </span>
                <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                  {info.content}
                </h4>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  )
};
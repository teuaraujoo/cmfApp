import Link from "next/link";
import {
    CalendarClock,
    Clock3,
    Eye,
    Layers3,
    UserRound,
    Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TurmaPortalItem } from "@/@types/turma/turma.types";

type Props = {
    turma: TurmaPortalItem;
};

export default function PortalTurmaCard({
    turma,
}: Props) {
    return (
        <article className="rounded-3xl border bg-white p-5 shadow-sm dark:bg-white/[0.03]">

            <div className="flex items-start justify-between">

                <div>

                    <h2 className="text-lg font-semibold">

                        {turma.nome}

                    </h2>

                    <p className="text-sm text-gray-500">

                        {turma.modalidade}

                    </p>

                </div>

                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700 dark:bg-sky-500/10 dark:text-sky-300">

                    {turma.status}

                </span>

            </div>

            <div className="mt-5 space-y-3 text-sm">

                <Item
                    icon={<UserRound size={18} />}
                    label="Professor"
                    value={turma.professores!.map(p => p.nome).join(", ")}
                />

                <Item
                    icon={<Users size={18} />}
                    label="Alunos"
                    value={`${(turma.alunos?.length ?? turma.alunosCount ?? 0)} alunos`}
                />

                <Item
                    icon={<Layers3 size={18} />}
                    label="Modalidade"
                    value={turma.modalidade}
                />

                <Item
                    icon={<Clock3 size={18} />}
                    label="Carga horária"
                    value={`${turma.horas_semana}h/semana`}
                />

                <Item
                    icon={<CalendarClock size={18} />}
                    label="Horários"
                    value={formatAgenda(turma)}
                />

            </div>

            <Link
                href={`/portal/turmas/${turma.id}`}
                className="mt-6 block"
            >

                <Button
                    className="w-full gap-2"
                    variant="outline"
                >
                    <Eye size={18} />
                    Ver detalhes
                </Button>

            </Link>

        </article>
    );
};

function Item({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="flex gap-3">

            <div className="text-sky-600">

                {icon}

            </div>

            <div>

                <p className="text-xs text-gray-500">

                    {label}

                </p>

                <p className="font-medium">

                    {value}

                </p>

            </div>

        </div>
    );
};

function formatAgenda(turma: TurmaPortalItem) {

    return turma.agenda.map((agenda, index) =>

        `${turma.diasSemana[index]} • ${agenda.horario_inicio}-${agenda.horario_fim}`

    ).join(", ");
};
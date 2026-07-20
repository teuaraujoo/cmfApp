import type { TurmaPortalItem } from "@/@types/turma/turma.types";
import PortalTurmaCard from "./PortalTurmasCard";

type Props = {
    turmas: TurmaPortalItem[];
};

export default function PortalTurmasGrid({
    turmas,
}: Props) {
    return (
        <section className="grid gap-4">

            {turmas.map((turma) => (
                <PortalTurmaCard
                    key={turma.id}
                    turma={turma}
                />
            ))}

        </section>
    );
};
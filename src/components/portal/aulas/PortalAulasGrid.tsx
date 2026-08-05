import type { AulaPortal } from "@/@types/aulas/aulas.types";
import PortalAulaCard from "./PortalAulasCard";

type Props = {
  aulas: AulaPortal[]
};

export default function PortalAulasGrid({ aulas }: Props) {
  return (
    <section className="grid gap-4">
      {aulas.map((aula) => (
        <PortalAulaCard key={aula.id} aula={aula} />
      ))}
    </section>
  );
}

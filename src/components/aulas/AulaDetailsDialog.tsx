import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatAulaDate } from "@/components/aulas/aulas-formatters";
import type { AulaSemana } from "@/components/aulas/types";

type AulaDetailsDialogProps = {
  aula: AulaSemana | null;
  onClose: () => void;
};

export function AulaDetailsDialog({ aula, onClose }: AulaDetailsDialogProps) {
  return (
    <Dialog open={Boolean(aula)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[92vh] w-[calc(100vw-2rem)] max-w-[calc(100vw-2rem)] overflow-y-auto bg-white dark:bg-gray-950 sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl text-gray-900 dark:text-white">
            Detalhes da aula
          </DialogTitle>
          <DialogDescription>
            Informacoes completas da aula selecionada.
          </DialogDescription>
        </DialogHeader>

        {aula ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <DetailItem label="ID" value={`#${aula.id}`} />
            <DetailItem label="Aluno" value={aula.aluno.nome} />
            <DetailItem label="Professor" value={aula.professor.nome} />
            <DetailItem label="Disciplina" value={aula.professor.materia} />
            <DetailItem label="Modalidade" value={aula.modalidade.tipo} />
            <DetailItem label="Dia" value={aula.dia} />
            <DetailItem label="Data" value={formatAulaDate(aula.data)} />
            <DetailItem
              label="Horario"
              value={`${aula.horario_inicio} - ${aula.horario_fim}`}
            />
            <DetailItem
              label="Status"
              value={aula.encerrada ? "Finalizada" : "Pendente"}
            />
            <DetailItem
              label="Anotacoes"
              value={aula.anotacoes || "Sem anotacoes registradas."}
            />
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-900/50">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
        {label}
      </p>
      <p className="mt-1 break-words text-sm font-semibold text-gray-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}

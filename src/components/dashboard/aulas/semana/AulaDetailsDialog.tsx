import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DIAS_SEMANAS, formatHorarioLocal } from "@/utils/date-utils";
import { Aula } from "@/@types/aulas/aulas.types";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

type AulaDetailsDialogProps = {
  aula: Aula | null;
  onClose: () => void;
  onFinalize?: (aula: Aula) => void;
  onDelete?: (aula: Aula) => void;
};

export function AulaDetailsDialog({
  aula,
  onClose,
  onFinalize,
  onDelete,
}: AulaDetailsDialogProps) {
  return (
    <Dialog open={Boolean(aula)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[92vh] w-[calc(100vw-2rem)] max-w-[calc(100vw-2rem)] overflow-y-auto bg-white dark:bg-gray-950 sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl text-gray-900 dark:text-white">
            Detalhes da aula
          </DialogTitle>
          <DialogDescription>
            Informações completas da aula selecionada.
          </DialogDescription>
        </DialogHeader>

        {aula ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <DetailItem label="ID" value={`#${aula.id}`} />
            <DetailItem label="Aluno" value={aula.aluno.nome} />
            <DetailItem label="Série" value={aula.aluno.serie} />
            <DetailItem label="Professor" value={aula.professor.nome} />
            <DetailItem label="Disciplina" value={aula.professor.materia} />
            <DetailItem label="Modalidade" value={aula.modalidade} />
            <DetailItem label="Dia" value={DIAS_SEMANAS[aula.inicio.getUTCDay()]} />
            <DetailItem label="Data" value={aula.inicio.toLocaleDateString("pt-BR")} />
            <DetailItem
              label="Horário"
              value={`${formatHorarioLocal(aula.inicio)} - ${formatHorarioLocal(aula.fim)}`}
            />
            <DetailItem
              label="Status"
              value={aula.encerrada ? "Finalizada" : "Pendente"}
            />
            <DetailItem
              label="Anotações"
              value={aula.notas || "Sem anotações registradas."}
            />
          </div>
        ) : null}

        {aula && !aula.encerrada && (onFinalize || onDelete) ? (
          <DialogFooter className="gap-3 border-t border-gray-100 pt-4 dark:border-gray-800">
            {onDelete ? (
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer border-red-200 text-red-700 hover:bg-red-50 dark:border-red-500/30 dark:text-red-300 dark:hover:bg-red-500/10"
                onClick={() => onDelete(aula)}
              >
                Excluir aula
              </Button>
            ) : null}
            {onFinalize ? (
              <Button
                type="button"
                className="cursor-pointer bg-red-700 text-white hover:bg-red-600"
                onClick={() => onFinalize(aula)}
              >
                Finalizar aula
              </Button>
            ) : null}
          </DialogFooter>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function DetailItem({ label, value }: { label: string; value: string | null | number }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-900/50">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
        {label}
      </p>
      <p className="mt-1 break-words text-sm font-semibold text-gray-900 dark:text-white">
        {value ?? ""}
      </p>
    </div>
  );
}

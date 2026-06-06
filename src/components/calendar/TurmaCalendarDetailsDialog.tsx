import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDate, formatCalendarTime } from "@/utils/date-utils";

export type CalendarTurmaDetails = {
  id: number;
  nome: string;
  modalidade: string;
  professor: string;
  totalAlunos: number;
  status: string;
  vigenciaInicio: string;
  vigenciaFim: string;
  inicio: Date;
  fim: Date;
};

type TurmaCalendarDetailsDialogProps = {
  turma: CalendarTurmaDetails | null;
  onClose: () => void;
};

export function TurmaCalendarDetailsDialog({
  turma,
  onClose,
}: TurmaCalendarDetailsDialogProps) {
  return (
    <Dialog open={Boolean(turma)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="side-panel-scroll max-h-[92vh] w-[calc(100vw-2rem)] max-w-[calc(100vw-2rem)] overflow-y-auto bg-white dark:bg-gray-950 sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl text-gray-900 dark:text-white">
            Detalhes da turma
          </DialogTitle>
          <DialogDescription>
            A turma pode ser consultada pelo calendário, mas suas alterações
            devem ser feitas na página de turmas.
          </DialogDescription>
        </DialogHeader>

        {turma ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <DetailItem label="ID" value={`#${turma.id}`} />
            <DetailItem label="Turma" value={turma.nome} />
            <DetailItem label="Modalidade" value={turma.modalidade} />
            <DetailItem label="Professor(es)" value={turma.professor || "-"} />
            <DetailItem label="Total de alunos" value={turma.totalAlunos} />
            <DetailItem label="Status" value={turma.status} />
            <DetailItem
              label="Data da aula"
              value={turma.inicio.toLocaleDateString("pt-BR", {
                timeZone: "UTC",
              })}
            />
            <DetailItem
              label="Horario"
              value={`${formatCalendarTime(turma.inicio)} - ${formatCalendarTime(turma.fim)}`}
            />
            <DetailItem
              label="Vigencia"
              value={`${formatDate(turma.vigenciaInicio)} - ${formatDate(turma.vigenciaFim)}`}
            />
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
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
};
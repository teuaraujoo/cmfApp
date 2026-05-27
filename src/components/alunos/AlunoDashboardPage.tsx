"use client";

import { useMemo, useState } from "react";
import {
  CircleUserRound,
  Mail,
  Phone,
  UserRoundSearch,
  X,
  EllipsisVertical
} from "lucide-react";
import HeaderAlunosPage from "./HeaderAlunosPage";
import AlunosCard from "./AlunosCard";
import { useCreateAlunoForm } from "../../hooks/alunos/useCreateAlunoForm";
import { useUpdateAlunoForm } from "@/hooks/alunos/useUpdateAlunoForm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AlunosForm from "./AlunosForm";
import { inactiveUser, activeUser } from "@/services/alunos/alunos.client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Aluno = {
  id?: number;
  user_id: number;
  nome: string;
  email: string;
  role: string;
  tel?: string | null;
  status?: string;
  data_nasc?: string | Date | null;
  serie?: string | null;
  resp_tel?: string | null;
  resp_nome?: string | null;
  modalidade_id?: number | null;
  modalidade?: unknown;
  tempo_aula?: unknown;
  horas_semana?: unknown;
  tempo_contrato?: unknown;
};

type Modalidade = {
  id: number;
  tipo: string;
};

function getAge(value?: string | Date | null) {
  if (!value) {
    return "-";
  };

  const date = value instanceof Date ? value : new Date(value);

  return new Date().getFullYear() - date.getFullYear();
};

function formatBirthDay(value?: string | Date | null) {
  if (!value) {
    return "-";
  };

  const date = value instanceof Date ? value : new Date(value);

  return date.toLocaleDateString("pt-BR")
};


function AlunoStatusBadge({ status }: { status: Aluno["status"] }) {
  const statusClassName =
    status === "ATIVO"
      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
      : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";

  return (
    <span
      className={`inline-flex max-w-full shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${statusClassName}`}
    >
      {status}
    </span>
  );
};

function formatDisplayValue(value: unknown) {
  if (value === null || value === undefined || value === "") {
    return "-";
  };

  return String(value);
};

export default function StudentsDashboardPage({
  alunos,
  modalidades,
}: {
  alunos: Aluno[];
  modalidades: Modalidade[];
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedAluno, setSelectedStudent] = useState<Aluno | null>(null);
  const [editingAluno, setEditingAluno] = useState<Aluno | null>(null);
  const [isCreatePanelOpen, setIsCreatePanelOpen] = useState(false);
  const isFormPanelOpen = isCreatePanelOpen || Boolean(editingAluno);
  const {
    error: createError,
    loading: createLoading,
    tempPassword,
    handleCreateAluno,
    resetForm: resetCreateForm,
  } = useCreateAlunoForm({
    onSuccess: () => {
      setIsCreatePanelOpen(false);
      refreshAlunos();
    },
  });
  const {
    error: updateError,
    loading: updateLoading,
    handleUpdateAluno,
    resetForm: resetUpdateForm,
  } = useUpdateAlunoForm({
    onSuccess: () => {
      setEditingAluno(null);
      refreshAlunos();
    },
  });

  const filteredStudents = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    if (!searchValue) {
      return alunos;
    }

    return alunos.filter((aluno) =>
      [aluno.nome, aluno.email, aluno.serie, aluno.modalidade]
        .join(" ")
        .toLowerCase()
        .includes(searchValue)
    );
  }, [search, alunos]);

  function openCreatePanel() {
    setSelectedStudent(null);
    setEditingAluno(null);
    resetCreateForm();
    setIsCreatePanelOpen(true);
  };

  function openEditPanel() {
    if (!selectedAluno) {
      return;
    };

    resetUpdateForm();
    setIsCreatePanelOpen(false);
    setEditingAluno(selectedAluno);
    setSelectedStudent(null);
  };

  function openDetailsPanel(aluno: Aluno) {
    setEditingAluno(null);
    setIsCreatePanelOpen(false);
    setSelectedStudent(aluno);
  };

  function closeSidePanel() {
    setSelectedStudent(null);
    setEditingAluno(null);
    setIsCreatePanelOpen(false);
  };

  async function handleToggleAlunoStatus() {
    if (!selectedAluno) {
      return;
    };

    const isActive = selectedAluno.status === "ATIVO";
    const result = isActive
      ? await toast.promise(inactiveUser(selectedAluno.user_id), {
        loading: 'Carregando...',
        success: (response) => response?.message,
        error: (error) => error?.message || "Error ao conectar com o servidor!",
      })
      : await toast.promise(activeUser(selectedAluno.user_id), {
        loading: 'Carregando...',
        success: (response) => response?.message,
        error: (error) => error?.message || "Error ao conectar com o servidor!",
      });

    if (result?.err) {
      toast.error(result.err);
      return;
    };

    setSelectedStudent(null);
    refreshAlunos();
  };

  function refreshAlunos() {
    router.refresh();
  };

  return (
    <main className="p-6">
      <div className="space-y-6">
        <HeaderAlunosPage
          filteredCount={filteredStudents.length}
          search={search}
          onSearchChange={setSearch}
          onOpenCreatePanel={openCreatePanel}
        />
        <section className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
          {!filteredStudents.length ? (
            <div className="flex min-h-96 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/70 px-6 text-center dark:border-gray-800 dark:bg-gray-800/20">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm dark:bg-gray-800">
                <UserRoundSearch className="size-6 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                Nenhum aluno encontrado
              </h3>
              <p className="mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">
                Tente ajustar a busca para encontrar um aluno pelo nome, serie,
                modalidade ou responsavel.
              </p>
            </div>
          ) : (
            <AlunosCard
              alunos={filteredStudents}
              onOpenDetailsPanel={openDetailsPanel}
            />
          )}
        </section>
      </div>

      <div
        className={`fixed inset-0 z-[100000] transition ${selectedAluno || isFormPanelOpen
          ? "pointer-events-auto bg-gray-900/50 backdrop-blur-[1px]"
          : "pointer-events-none bg-transparent"
          }`}
        onClick={closeSidePanel}
      />

      <aside
        className={`fixed right-0 top-0 z-[100001] h-screen w-full max-w-md transform border-l border-gray-200 bg-white shadow-2xl transition-transform duration-300 dark:border-gray-800 dark:bg-gray-900 ${selectedAluno || isFormPanelOpen
          ? "translate-x-0"
          : "translate-x-full"
          }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-start justify-between border-b border-gray-200 px-5 py-5 dark:border-gray-800 sm:px-6">
            <div>
              <p className="text-sm font-medium text-sky-600 dark:text-sky-300">
                {isFormPanelOpen ? "Cadastro de aluno" : "Detalhes do aluno"}
              </p>
              <h2 className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
                {isCreatePanelOpen
                  ? "Novo aluno"
                  : editingAluno
                  ? "Editar aluno"
                  : selectedAluno?.nome ?? "Aluno"}
              </h2>
            </div>

            <button
              type="button"
              onClick={closeSidePanel}
              className="rounded-xl border border-gray-200 p-2 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
            >
              <X className="size-5" />
            </button>
          </div>

          {isFormPanelOpen ? (
            <div className="side-panel-scroll flex-1 overflow-y-auto px-5 py-5 sm:px-6">
              <AlunosForm
                key={editingAluno?.user_id ?? "create"}
                mode={editingAluno ? "update" : "create"}
                aluno={editingAluno}
                modalidades={modalidades}
                error={editingAluno ? updateError : createError}
                loading={editingAluno ? updateLoading : createLoading}
                tempPassword={tempPassword}
                onSubmit={(event) => {
                  if (editingAluno) {
                    void handleUpdateAluno(event, editingAluno.user_id);
                    return;
                  };

                  void handleCreateAluno(event);
                }}
                onCancel={closeSidePanel}
              />
            </div>
          ) : selectedAluno ? (
            <div className="side-panel-scroll flex-1 space-y-6 overflow-y-auto px-5 py-5 sm:px-6">

              <div className="rounded-2xl border border-gray-200 bg-gray-50/80 p-5 dark:border-gray-800 dark:bg-gray-800/20">
                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-sky-600 shadow-sm dark:bg-gray-800 dark:text-sky-300">
                      <CircleUserRound className="size-8" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-lg font-semibold text-gray-900 dark:text-white">
                        {selectedAluno.nome}
                      </p>

                      <div className="mt-3">
                        {getAge(selectedAluno.data_nasc)} anos
                      </div>

                      <div className="mt-3">
                        <AlunoStatusBadge
                          status={selectedAluno.status ?? "INATIVO"}
                        />
                      </div>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger className="cursor-pointer rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                      <EllipsisVertical className="size-5" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={openEditPanel}
                        className="cursor-pointer dark:hover:bg-gray-700"
                      >
                        Editar aluno
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => handleToggleAlunoStatus()}
                        className={`cursor-pointer dark:hover:bg-gray-700 
                        ${selectedAluno.status === "ATIVO" ? "text-red-500" : "text-green-500"}`}
                      >
                        {selectedAluno.status === "ATIVO" ? "Desativar" : "Ativar"}
                      </DropdownMenuItem>

                    </DropdownMenuContent>
                  </DropdownMenu>

                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-800/20">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
                    Contato
                  </p>
                  <div className="mt-3 space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                      <Mail className="size-4 text-gray-400 dark:text-gray-500" />
                      <span className="break-all sm:break-words">
                        {selectedAluno.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                      <Phone className="size-4 text-gray-400 dark:text-gray-500" />
                      <span>{selectedAluno.tel ?? "-"}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-800/20">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
                    Academico
                  </p>
                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-xl bg-gray-50 px-3 py-3 dark:bg-gray-900/70">
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        Serie
                      </p>
                      <p className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                        {selectedAluno.serie ?? "-"}
                      </p>
                    </div>
                    <div className="rounded-xl bg-gray-50 px-3 py-3 dark:bg-gray-900/70">
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        Tempo de aula
                      </p>
                      <p className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                        {formatDisplayValue(selectedAluno.tempo_aula)}
                      </p>
                    </div>
                    <div className="rounded-xl bg-gray-50 px-3 py-3 dark:bg-gray-900/70">
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        Horas semanais
                      </p>
                      <p className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                        {formatDisplayValue(selectedAluno.horas_semana)}
                      </p>
                    </div>
                    <div className="rounded-xl bg-gray-50 px-3 py-3 dark:bg-gray-900/70">
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        Tempo de contrato
                      </p>
                      <p className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                        {formatDisplayValue(selectedAluno.tempo_contrato)}
                      </p>
                    </div>
                    <div className="rounded-xl bg-gray-50 px-3 py-3 dark:bg-gray-900/70">
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        Modalidade
                      </p>
                      <p className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                        {formatDisplayValue(selectedAluno.modalidade)}
                      </p>
                    </div>
                    <div className="rounded-xl bg-gray-50 px-3 py-3 dark:bg-gray-900/70">
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        Data de Nascimento
                      </p>
                      <p className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                        {formatBirthDay(selectedAluno.data_nasc)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-800/20">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
                    Responsavel
                  </p>
                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-xl bg-gray-50 px-3 py-3 dark:bg-gray-900/70">
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        Nome
                      </p>
                      <p className="mt-1 break-words text-sm font-medium text-gray-700 dark:text-gray-200">
                        {selectedAluno.resp_nome ?? "-"}
                      </p>
                    </div>
                    <div className="rounded-xl bg-gray-50 px-3 py-3 dark:bg-gray-900/70">
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        Telefone
                      </p>
                      <p className="mt-1 break-words text-sm font-medium text-gray-700 dark:text-gray-200">
                        {selectedAluno.resp_tel ?? "-"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </aside>
    </main>
  );
}

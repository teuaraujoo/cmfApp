"use client";

import { useMemo, useState, useTransition } from "react";
import { UserRoundSearch } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import HeaderProfessoresPage from "./HeaderProfessoresPage";
import ProfessoresGrid from "./ProfessoresGrid";
import ProfessoresOverview from "./ProfessoresOverview";
import ProfessorDetailsPanel from "./ProfessorDetailsPanel";
import type { Professor } from "@/@types/professor/professor.types";
import type { Modalidade } from "@/@types/modalidade/modalidade.type";
import { useCreateProfessorForm } from "@/hooks/professores/useCreateProfessorForm";
import { useUpdateProfessorForm } from "@/hooks/professores/useUpdateProfessorForm";
import { inactiveUser, activeUser } from "@/services/users/users.client";

type ProfessorDashboardPageProps = {
  professores: Professor[];
  modalidades: Modalidade[];
};

export default function ProfessorDashboardPage({
  professores,
  modalidades,
}: ProfessorDashboardPageProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [search, setSearch] = useState("");
  const [selectedMateria, setSelectedMateria] = useState("Todas");
  const [selectedProfessor, setSelectedProfessor] = useState<Professor | null>(
    null,
  );
  const [panelMode, setPanelMode] = useState<"details" | "edit" | "create">("details");
  const [editingProfessor, setEditingProfessor] = useState<Professor | null>(null);
  const {
    error: updateError,
    loading: updateLoading,
    handleUpdateProfessor,
    resetForm: resetUpdateForm,
  } = useUpdateProfessorForm({
    onSuccess: () => {
      closeSidePanel();
      refreshProfessores();
    },
  });

  const {
    error: createError,
    loading: createLoading,
    handleCreateProfessor,
    resetForm: resetCreateForm,
  } = useCreateProfessorForm({
    onSuccess: () => {
      closeSidePanel();
      refreshProfessores();
    }
  });
  const materias = useMemo(() => {
    return [...new Set(professores.map((professor) => professor.materia))]
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
  }, [professores]);

  const filteredProfessores = useMemo(() => {
    const searchValue = search.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    return professores.filter((professor) => {
      const matchesMateria =
        selectedMateria === "Todas" || professor.materia === selectedMateria;

      const matchesSearch =
        !searchValue ||
        [
          professor.nome.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
          professor.email.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
          professor.materia.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
          professor.modalidade.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
        ]
          .join(" ")
          .toLowerCase()
          .includes(searchValue);

      return matchesMateria && matchesSearch;
    });
  }, [professores, search, selectedMateria]);

  async function handleToggleProfessorStatus(professor: Professor) {
    if (!professor) {
      return;
    };

    const isActive = professor.status === "ATIVO";
    const result = isActive ?
      await toast.promise(inactiveUser(professor.user_id), {
        loading: 'Carregando...',
        success: (response) => response?.message,
        error: (error) => error?.message || "Error ao conectar com o servidor!",
      })
      : await toast.promise(activeUser(professor.user_id), {
        loading: 'Carregando...',
        success: (response) => response?.message,
        error: (error) => error?.message || "Error ao conectar com o servidor!",
      });


    if (result?.err) {
      toast.error(result.err);
      return;
    };

    refreshProfessores();
  };

  function openDetailsPanel(professor: Professor) {
    setPanelMode("details");
    setEditingProfessor(null);
    setSelectedProfessor(professor);
  };

  function openEditPanel(professor: Professor) {
    resetUpdateForm();
    setEditingProfessor(professor);
    setPanelMode("edit");
    setSelectedProfessor(professor);
  };

  function openCreatePanel() {
    setSelectedProfessor(null);
    setEditingProfessor(null);
    setPanelMode("create");
    resetCreateForm();
  };

  function closeSidePanel() {
    setSelectedProfessor(null);
    setEditingProfessor(null);
    setPanelMode("details");
  };

  function refreshProfessores() {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <main className="p-6">
      <div className="space-y-6">
        <HeaderProfessoresPage
          filteredCount={filteredProfessores.length}
          search={search}
          materias={materias}
          selectedMateria={selectedMateria}
          onSelectMateria={setSelectedMateria}
          onSearchChange={setSearch}
          onOpenCreatePanel={openCreatePanel}
        />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <section className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
            {!filteredProfessores.length ? (
              <div className="flex min-h-96 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/70 px-6 text-center dark:border-gray-800 dark:bg-gray-800/20">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm dark:bg-gray-800">
                  <UserRoundSearch className="size-6 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                  Nenhum professor encontrado
                </h3>
                <p className="mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">
                  Ajuste a busca ou selecione outra materia para atualizar os
                  resultados.
                </p>
              </div>
            ) : (
              <ProfessoresGrid
                professores={filteredProfessores}
                onOpenDetailsPanel={openDetailsPanel}
                onEditProfessor={openEditPanel}
                toggleProfessorStatus={handleToggleProfessorStatus}
              />
            )}
          </section>

          <ProfessoresOverview professores={professores} />
        </div>
      </div>

      <ProfessorDetailsPanel
        professor={selectedProfessor}
        isOpen={panelMode === "create" || Boolean(selectedProfessor)}
        mode={panelMode}
        modalidades={modalidades}
        loading={editingProfessor ? updateLoading : createLoading}
        error={editingProfessor ? updateError : createError}
        onSubmit={(event) => {
          if (panelMode === "create") {
            void handleCreateProfessor(event);
            return;
          };

          if (!selectedProfessor) {
            return;
          };

          void handleUpdateProfessor(event, selectedProfessor.user_id);
        }}
        onClose={closeSidePanel}
      />
    </main>
  );
};

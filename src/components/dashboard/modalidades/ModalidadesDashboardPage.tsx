"use client";

import { startTransition, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import type { Modalidade } from "@/@types/modalidade/modalidade.type";
import {
  createModalidade,
  deleteModalidade,
  updateModalidade,
} from "@/services/modalidades/modalidades.client";
import ModalidadeDeleteDialog from "./ModalidadeDeleteDialog";
import ModalidadeFormDialog from "./ModalidadeFormDialog";
import ModalidadesGrid from "./ModalidadesGrid";
import ModalidadesHeader from "./ModalidadesHeader";

export default function ModalidadesDashboardPage({
  modalidades,
}: {
  modalidades: Modalidade[];
}) {
  const router = useRouter();
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedModalidade, setSelectedModalidade] = useState<Modalidade | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function refreshModalidades() {
    startTransition(() => router.refresh());
  }

  function openCreateDialog() {
    setSelectedModalidade(null);
    setError("");
    setFormOpen(true);
  }

  function openEditDialog(modalidade: Modalidade) {
    setSelectedModalidade(modalidade);
    setError("");
    setFormOpen(true);
  }

  function openDeleteDialog(modalidade: Modalidade) {
    setSelectedModalidade(modalidade);
    setDeleteOpen(true);
  }

  function handleFormOpenChange(open: boolean) {
    setFormOpen(open);
    if (!open) {
      setSelectedModalidade(null);
      setError("");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const tipo = String(formData.get("tipo") ?? "").trim();

    if (tipo.length < 4) {
      setError("O nome deve ter pelo menos 4 caracteres.");
      return;
    }

    setLoading(true);
    const result = selectedModalidade
      ? await updateModalidade(selectedModalidade.id, { tipo })
      : await createModalidade({ tipo });
    setLoading(false);

    if (result?.err) {
      setError(result.err);
      return;
    }

    refreshModalidades();
    toast.success(
      result.message ??
      (selectedModalidade
        ? "Modalidade atualizada com sucesso!"
        : "Modalidade criada com sucesso!"),
    );
    handleFormOpenChange(false);
  }

  async function handleDelete() {
    if (!selectedModalidade) return;

    setLoading(true);
    const result = await deleteModalidade(selectedModalidade.id);
    setLoading(false);

    if (result?.err) {
      toast.error(result.err);
      return;
    }

    refreshModalidades();
    toast.success(result.message ?? "Modalidade excluída com sucesso!");
    setDeleteOpen(false);
    setSelectedModalidade(null);
  }

  return (
    <main className="p-3 sm:p-5 lg:p-6">
      <div className="space-y-6">
        <ModalidadesHeader total={modalidades.length} onCreate={openCreateDialog} />
        <ModalidadesGrid
          modalidades={modalidades}
          onEdit={openEditDialog}
          onDelete={openDeleteDialog}
        />
      </div>

      {formOpen ? (
        <ModalidadeFormDialog
          key={selectedModalidade?.id ?? "create-modalidade"}
          open={formOpen}
          modalidade={selectedModalidade}
          loading={loading}
          error={error}
          onOpenChange={handleFormOpenChange}
          onSubmit={(event) => void handleSubmit(event)}
        />
      ) : null}

      <ModalidadeDeleteDialog
        modalidade={selectedModalidade}
        loading={loading}
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);
          if (!open) setSelectedModalidade(null);
        }}
        onConfirm={() => void handleDelete()}
      />
    </main>
  );
}

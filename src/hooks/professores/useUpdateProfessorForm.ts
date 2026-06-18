"use client";

import { updateProfessor } from "@/services/users/users.client";
import { getRequiredFormString } from "@/utils/forms-utils";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";

type UseUpdateProfessorFormParams = {
  onSuccess?: () => void;
};

export function useUpdateProfessorForm({
  onSuccess,
}: UseUpdateProfessorFormParams = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function resetForm() {
    setError("");
  };

  async function handleUpdateProfessor(
    event: FormEvent<HTMLFormElement>,
    userId: number,
  ) {
    event.preventDefault();
    setError("");

    try {
      setLoading(true);

      const formData = new FormData(event.currentTarget);
      const data = {
        nome: getRequiredFormString(formData, "nome", "Nome"),
        email: getRequiredFormString(formData, "email", "Email"),
        role: "PROFESSOR" as const,
        tel: getRequiredFormString(formData, "telefone", "Telefone").replace(/\D/g, ""),
        professor: {
          materia: getRequiredFormString(formData, "materia", "Materia"),
        },
      };

      const request = await updateProfessor(data, userId);

      if (request?.err) {
        setError(request.err);
        return;
      };

      toast.success(request?.message ?? "Professor atualizado com sucesso!");
      onSuccess?.();
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Erro inesperado ao atualizar professor. Tente novamente.";

      setError(message);
    } finally {
      setLoading(false);
    };
  };

  return {
    error,
    loading,
    handleUpdateProfessor,
    resetForm,
  };
};

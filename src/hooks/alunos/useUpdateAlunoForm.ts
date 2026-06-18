"use client";

import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";

import { updateAluno } from "@/services/users/users.client";
import {
  getPositiveNumber,
  getRequiredFormString,
  validateBirthDate,
} from "@/utils/forms-utils";

type UseUpdateAlunoFormParams = {
  onSuccess?: () => void;
};

export function useUpdateAlunoForm({
  onSuccess,
}: UseUpdateAlunoFormParams = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function resetForm() {
    setError("");
  }

  async function handleUpdateAluno(
    event: FormEvent<HTMLFormElement>,
    userId: number,
  ) {
    event.preventDefault();
    setError("");

    try {
      setLoading(true);

      const formData = new FormData(event.currentTarget);
      const dataNasc = validateBirthDate(
        getRequiredFormString(formData, "dataNasc", "Data de nascimento"),
      );

      const data = {
        nome: getRequiredFormString(formData, "nome", "Nome"),
        email: getRequiredFormString(formData, "email", "Email"),
        role: "ALUNO" as const,
        tel: getRequiredFormString(formData, "telefone", "Telefone").replace(/\D/g, ""),
        aluno: {
          data_nasc: dataNasc,
          serie: getRequiredFormString(formData, "serie", "Serie"),
          escola: getRequiredFormString(formData, "escola", "Escola"),
          resp_tel: getRequiredFormString(
            formData,
            "respTel",
            "Telefone do responsavel",
          ).replace(/\D/g, ""),
          resp_nome: getRequiredFormString(
            formData,
            "respNome",
            "Nome do responsavel",
          ),
          horas_mensais: getPositiveNumber(
            formData,
            "horasMensais",
            "Horas mensais",
          ),
        },
      };

      const request = await updateAluno(data, userId);

      if (request?.err) {
        setError(request.err);
        return;
      }

      toast.success(request?.message ?? "Aluno atualizado com sucesso!");
      onSuccess?.();
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Erro inesperado ao atualizar aluno. Tente novamente.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return {
    error,
    loading,
    handleUpdateAluno,
    resetForm,
  };
}

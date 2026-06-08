"use client";

import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";

import { createAluno } from "@/services/users/users.client";
import {
  getPositiveNumber,
  getRequiredFormString,
  validateBirthDate,
} from "@/utils/forms-utils";

type UseCreateAlunoFormParams = {
  onSuccess?: () => void;
};

export function useCreateAlunoForm({
  onSuccess,
}: UseCreateAlunoFormParams = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  function resetForm() {
    setError("");
  }

  async function handleCreateAluno(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    try {
      setLoading(true);

      const form = event.currentTarget;
      const formData = new FormData(form);
      const dataNasc = validateBirthDate(
        getRequiredFormString(formData, "dataNasc", "Data de nascimento"),
      );
      const respTel = getRequiredFormString(
        formData,
        "respTel",
        "Telefone do responsável",
      )
        .replace(/\D/g, "");

      const telefone = getRequiredFormString(
        formData,
        "telefone",
        "Telefone",
      )
        .replace(/\D/g, "");

      const data = {
        nome: getRequiredFormString(formData, "nome", "Nome"),
        email: getRequiredFormString(formData, "email", "Email"),
        role: "ALUNO" as const,
        tel: telefone,
        aluno: {
          data_nasc: dataNasc,
          serie: getRequiredFormString(formData, "serie", "Serie"),
          escola: getRequiredFormString(formData, "escola", "Escola"),
          resp_tel: respTel,
          resp_nome: getRequiredFormString(
            formData,
            "respNome",
            "Nome do responsável",
          ),
          horas_mensais: getPositiveNumber(
            formData,
            "horasMensais",
            "Horas mensais",
          ),
        },
      };

      const request = await createAluno(data);

      if (request?.err) {
        setError(request.err);
        return;
      }

      toast.success(request?.message ?? "Aluno salvo com sucesso!");
      form.reset();
      onSuccess?.();
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Erro inesperado ao criar aluno. Tente novamente.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return {
    error,
    loading,
    handleCreateAluno,
    resetForm,
  };
}

"use client";

import { createAluno } from "@/services/alunos/alunos.client";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { getPositiveNumber, getRequiredFormString, validateBirthDate } from "@/utils/forms-utils";

const TEMP_PASSWORD = "Temp1234";

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
  };

  async function handleCreateAluno(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    try {
      setLoading(true);

      const form = event.currentTarget;
      const formData = new FormData(form);
      const dataNasc = validateBirthDate(
        getRequiredFormString(formData, "dataNasc", "Data de nascimento")
      );

      const data = {
        nome: getRequiredFormString(formData, "nome", "Nome"),
        email: getRequiredFormString(formData, "email", "Email"),
        temporary_password: getRequiredFormString(
          formData,
          "tempPassword",
          "Senha temporária"
        ),
        role: "ALUNO" as const,
        tel: getRequiredFormString(formData, "telefone", "Telefone"),
        aluno: {
          data_nasc: dataNasc,
          serie: getRequiredFormString(formData, "serie", "Série"),
          resp_tel: getRequiredFormString(
            formData,
            "respTel",
            "Telefone do responsável"
          ),
          resp_nome: getRequiredFormString(
            formData,
            "respNome",
            "Nome do responsável"
          ),
          modalidade_id: getPositiveNumber(formData, "modalidade", "Modalidade"),
          tempo_aula: getPositiveNumber(formData, "tempoAula", "Tempo de aula"),
          horas_semana: getPositiveNumber(
            formData,
            "horasSemana",
            "Horas semanais"
          ),
          tempo_contrato: getPositiveNumber(
            formData,
            "tempoContrato",
            "Tempo de contrato"
          ),
        },
      };

      const request = await createAluno(data);

      if (request?.err) {
        setError(request.err);
        return;
      };

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
    };
  };

  return {
    error,
    loading,
    tempPassword: TEMP_PASSWORD,
    handleCreateAluno,
    resetForm,
  };
};

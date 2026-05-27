"use client";

import { createAluno } from "@/services/alunos/alunos.client";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";

type AlunoFormState = {
  nome: string;
  serie: string;
  email: string;
  modalidade: string;
  dataNasc: string;
  responsavel: string;
  telefone: string;
  horasSemana: string;
  tempoAula: string;
  tempoContrato: string;
  tempPassword: string;
  respNome: string;
  respTel: string;
  status: "ATIVO" | "INATIVO";
};

const INITIAL_STUDENT_FORM: AlunoFormState = {
  nome: "",
  email: "",
  serie: "",
  modalidade: "",
  dataNasc: "",
  responsavel: "",
  telefone: "",
  horasSemana: "",
  tempoAula: "",
  tempoContrato: "",
  tempPassword: "Temp12334",
  respNome: "",
  respTel: "",
  status: "ATIVO",
};

type UseCreateAlunoFormParams = {
  onSuccess?: () => void;
};

export function useCreateAlunoForm({
  onSuccess,
}: UseCreateAlunoFormParams = {}
) {
  const [loading, setLoading] = useState(false);
  const [alunoForm, setAlunoForm] = useState<AlunoFormState>(INITIAL_STUDENT_FORM);

  function handleFormFieldChange(
    field: keyof AlunoFormState,
    value: string
  ) {
    setAlunoForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function resetForm() {
    setAlunoForm(INITIAL_STUDENT_FORM);
  };

  async function handleCreateAluno(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setLoading(true);

      const data = {
        nome: alunoForm.nome,
        email: alunoForm.email,
        temporary_password: alunoForm.tempPassword,
        role: "ALUNO" as const,
        tel: alunoForm.telefone,
        aluno: {
          data_nasc: alunoForm.dataNasc,
          serie: alunoForm.serie,
          resp_tel: alunoForm.respTel,
          resp_nome: alunoForm.respNome,
          modalidade_id: Number(alunoForm.modalidade),
          tempo_aula: Number(alunoForm.tempoAula),
          horas_semana: Number(alunoForm.horasSemana),
          tempo_contrato: Number(alunoForm.tempoContrato),
        },
      };

      const request = await createAluno(data);

      if (request?.err) {
        toast.error(request.err);
        return;
      };

      toast.success(request?.message);

      resetForm();
      onSuccess?.();
    } finally {
      setLoading(false);
    };
  };

  return {
    loading,
    alunoForm,
    handleFormFieldChange,
    handleCreateAluno,
    resetForm,
  };
};

export type { AlunoFormState };

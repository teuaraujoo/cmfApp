"use client"

import toast from "react-hot-toast";
import { createTurma } from "@/services/turmas/turmas.client";
import { FormEvent } from "react";
import { useState } from "react";
import { getPositiveNumber, getRequiredFormString } from "@/utils/forms-utils";

type UseCreateTurmaFormParamas = {
    onSuccess?: () => void;
};

export function useCreateTurmaForm({ onSuccess, }: UseCreateTurmaFormParamas = {}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function resetForm() {
        setError("")
    };

    async function handleCreateTurma(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");

        try {
            setLoading(true);

            const form = event.currentTarget;
            const formData = new FormData(form);

            const data = buildPayload(formData);

            const request = await createTurma(data);

            if (request?.err) {
                setError(request.err);
                return;
            };

            toast.success(request.message ?? "Turma criada com sucesso!");
            form.reset();
            onSuccess?.();

        } catch (err) {
            const message =
                err instanceof Error
                    ? err.message
                    : "Erro ao validar formulário.";

            setError(message);
        } finally {
            setLoading(false);
        };
    };

    return {
        error,
        loading,
        handleCreateTurma,
        resetForm
    };
};

function buildPayload(data: FormData) {
    return {
        nome: getRequiredFormString(data, "nome", "Nome"),
        horas_semana: getPositiveNumber(data, "horasSemana", "Horas Semanais"),
        vigencia_inicio: getRequiredFormString(data, "vigenciaInicio", "Vigência Início"),
        vigencia_fim: getRequiredFormString(data, "vigenciaFim", "Vigência Fim"),
        modalidade_id: getPositiveNumber(data, "modalidade", "Modalidade"),
        turma_agenda: buildAgenda(data),
        turma_alunos: buildAluno(data),
        turma_professores: buildProfessor(data),
    };
};

function buildAgenda(data: FormData) {
    return [0, 1].map((index) => ({
        dia_semana: Number(data.get(`turma_agenda.${index}.dia_semana`)),
        horario_inicio: String(data.get(`turma_agenda.${index}.horario_inicio`) ?? ""),
        horario_fim: String(data.get(`turma_agenda.${index}.horario_fim`) ?? "")
    }))
        .filter((item) => item.dia_semana && item.horario_inicio && item.horario_fim);
};

function buildAluno(data: FormData) {
    return Array.from(data.entries())
        .filter(([key]) => key.startsWith("turma_alunos."))
        .map(([, value]) => ({
            aluno_id: Number(value)
        }))
        .filter((item) => item.aluno_id > 0);
};

function buildProfessor(data: FormData) {
    return Array.from(data.entries())
        .filter(([key]) => key.startsWith("turma_professores."))
        .map(([, value]) => ({
            professor_id: Number(value)
        }))
        .filter((item) => item.professor_id > 0)
};
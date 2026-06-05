import { useState } from "react";
import { FormEvent } from "react";
import { getPositiveNumber, getRequiredFormString } from "@/utils/forms-utils";
import { createAula } from "@/services/aulas/aulas.client";
import toast from "react-hot-toast";

type UseCreateAulaFormParamas = {
    onSuccess?: () => void;
};


export function useCreateAulaForm({ onSuccess, }: UseCreateAulaFormParamas = {}) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function resetForm() {
        setError("");
    };

    async function handleCreateAula(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");

        try {
            setLoading(true);

            const form = event.currentTarget;
            const formData = new FormData(form);

            const data = buildPayload(formData);

            const request = await createAula(data);

            if (request?.err) {
                setError(request.err);
                return;
            };

            toast.success(request?.message ?? "Professor criado com sucesso!");
            form.reset();
            onSuccess?.();

        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Nao foi possivel criar a aula.",
            );
        } finally {
            setLoading(false);
        };
    };

    return {
        error,
        loading,
        handleCreateAula,
        resetForm
    };
};
function buildPayload(data: FormData) {
    const aulaDate = getRequiredFormString(data, "data", "Data da aula");
    const horarioInicio = getRequiredFormString(data, "horario_inicio", "Horario inicial");
    const horarioFim = getRequiredFormString(data, "horario_fim", "Horario final");

    const startedAt = new Date(`${aulaDate}T${horarioInicio}:00`);
    const endedAt = new Date(`${aulaDate}T${horarioFim}:00`);
    const now = new Date();

    if (Number.isNaN(startedAt.getTime()) || Number.isNaN(endedAt.getTime())) {
        throw new Error("Data ou horario invalido(s).");
    };

    if (startedAt < now) {
        throw new Error("A aula não pode ser criada em uma data anterior.");
    };

    if (startedAt >= endedAt) {
        throw new Error("O horário inicial precisa ser menor que o horario final.");
    };

    return {
        aluno_id: getPositiveNumber(data, "aluno", "Aluno"),
        professor_id: getPositiveNumber(data, "professor", "Professor"),
        modalidade_id: getPositiveNumber(data, "modalidade", "Modalidade"),
        started_at: `${aulaDate}T${horarioInicio}:00`,
        ended_at: `${aulaDate}T${horarioFim}:00`
    };
};
"use client";

import { createProfessor } from "@/services/users/users.client";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { getRequiredFormString } from "@/utils/forms-utils";

const TEMP_PASSWORD = "Temp1234";

type UseCreateProfessorFormParamas = {
    onSuccess?: () => void;
};

export function useCreateProfessorForm({ onSuccess, }: UseCreateProfessorFormParamas = {}) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function resetForm() {
        setError("");
    };

    async function handleCreateProfessor(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");

        try {
            setLoading(true);

            const form = event.currentTarget;
            const formData = new FormData(form);
            
            const data = {
                nome: getRequiredFormString(formData, "nome", "Nome"),
                email: getRequiredFormString(formData, "email", "Email"),
                temporary_password: TEMP_PASSWORD,
                role: "PROFESSOR" as const,
                tel: getRequiredFormString(formData, "telefone", "Telefone").replace(/\D/g, ""),
                professor: {
                    materia: getRequiredFormString(formData, "materia", "Materia"),
                }
            };

            const request = await createProfessor(data);

            if (request?.err) {
                setError(request.err);
                return;
            };

            toast.success(request?.message ?? "Professor criado com sucesso!");
            form.reset();
            onSuccess?.();

        } finally {
            setLoading(false);
        };
    };

    return {
        error,
        loading,
        tempPassword: TEMP_PASSWORD,
        handleCreateProfessor,
        resetForm
    };
};

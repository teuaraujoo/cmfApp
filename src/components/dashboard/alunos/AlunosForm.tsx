"use client";

import { Plus } from "lucide-react";
import type { FormEvent } from "react";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { MaskedPhoneInput } from "@/components/ui/forms/MaskedPhoneInput";

type AlunoFormInitialData = {
    nome?: string;
    email?: string;
    tel?: string | null;
    data_nasc?: string | Date | null;
    serie?: string | null;
    escola?: string | null;
    resp_tel?: string | null;
    resp_nome?: string | null;
    tempo_aula?: unknown;
    horas_mensais?: unknown;
};

type AlunosFormProps = {
    mode: "create" | "update";
    aluno?: AlunoFormInitialData | null;
    loading: boolean;
    error: string;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    onCancel: () => void;
};

const series = [
    { id: 1, tipo: "6° Ano do Ensino Fundamental" },
    { id: 2, tipo: "7° Ano do Ensino Fundamental" },
    { id: 3, tipo: "8° Ano do Ensino Fundamental" },
    { id: 4, tipo: "9° Ano do Ensino Fundamental" },
    { id: 5, tipo: "1° Ano do Ensino Médio" },
    { id: 6, tipo: "2° Ano do Ensino Médio" },
    { id: 7, tipo: "3° Ano do Ensino Médio" },
];

const horasMensaisOptions = [
    { value: "6", label: "6 horas mensais" },
    { value: "8", label: "8 horas mensais" },
];

const inputClassName =
    "h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 outline-none transition-colors focus:border-sky-300 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:focus:border-sky-700";

const selectTriggerClassName =
    "h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 outline-none transition-colors focus:border-sky-300 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:focus:border-sky-700";

export default function AlunosForm({
    mode,
    aluno,
    loading,
    error,
    onSubmit,
    onCancel,
}: AlunosFormProps) {
    const isUpdate = mode === "update";
    const birthDateValue = toDateInputValue(aluno?.data_nasc);

    return (
        <form className="space-y-6" onSubmit={onSubmit}>
            <div className="rounded-2xl border border-gray-200 bg-gray-50/80 p-5 dark:border-gray-800 dark:bg-gray-800/20">
                <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-sky-600 shadow-sm dark:bg-gray-800 dark:text-sky-300">
                        <Plus className="size-8" />
                    </div>
                    <div>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                            {isUpdate ? "Editar aluno" : "Adicionar novo aluno"}
                        </p>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {isUpdate
                                ? "Atualize os dados abaixo para salvar as alteracoes."
                                : "Preencha os dados abaixo para criar um aluno."}
                        </p>
                    </div>
                </div>
            </div>

            <FormSection title="Dados do aluno">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <TextField
                        id="nome"
                        name="nome"
                        label="Nome"
                        defaultValue={aluno?.nome}
                        required
                    />
                    <TextField
                        id="email"
                        type="email"
                        name="email"
                        label="Email"
                        defaultValue={aluno?.email}
                        required
                    />
                    <MaskedPhoneInput
                        id="telefone"
                        name="telefone"
                        label="Telefone"
                        defaultValue={aluno?.tel}
                        required
                    />
                    <TextField
                        id="dataNasc"
                        type="date"
                        name="dataNasc"
                        label="Data de nascimento"
                        defaultValue={birthDateValue}
                        required
                    />
                    <Field className="space-y-2">
                        <FieldLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Série
                        </FieldLabel>
                        <Select name="serie" defaultValue={aluno?.serie ?? undefined} required>
                            <SelectTrigger id="serie" className={selectTriggerClassName}>
                                <SelectValue placeholder="Selecione uma serie" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Séries</SelectLabel>
                                    {series.map((serie) => (
                                        <SelectItem
                                            key={serie.id}
                                            value={serie.tipo}
                                            className="cursor-pointer"
                                        >
                                            {serie.tipo}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </Field>
                    <TextField
                        id="escola"
                        name="escola"
                        label="Escola"
                        defaultValue={aluno?.escola}
                        required
                    />
                </div>
            </FormSection>

            <FormSection title="Dados acadêmicos">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field className="space-y-2">
                        <FieldLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Horas mensais
                        </FieldLabel>
                        <Select
                            name="horasMensais"
                            defaultValue={
                                aluno?.horas_mensais ? String(aluno.horas_mensais) : undefined
                            }
                            required
                        >
                            <SelectTrigger id="horasMensais" className={selectTriggerClassName}>
                                <SelectValue placeholder="Selecione um pacote">
                                    {(value) =>
                                        horasMensaisOptions.find(
                                            (horas) => horas.value === String(value),
                                        )?.label ?? "Selecione um pacote"
                                    }
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Pacotes</SelectLabel>
                                    {horasMensaisOptions.map((horas) => (
                                        <SelectItem
                                            key={horas.value}
                                            value={horas.value}
                                            className="cursor-pointer"
                                        >
                                            {horas.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </Field>

                </div>

            </FormSection>

            <FormSection title="Responsável">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <TextField
                        id="respNome"
                        name="respNome"
                        label="Nome do responsavel"
                        defaultValue={aluno?.resp_nome}
                        required
                    />
                    <MaskedPhoneInput
                        id="respTel"
                        name="respTel"
                        label="Telefone do responsável"
                        defaultValue={aluno?.resp_tel}
                        required
                    />
                </div>
            </FormSection>

            {error ? (
                <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300">
                    {error}
                </p>
            ) : null}

            <div className="flex flex-col gap-3 border-t border-gray-200 pt-5 dark:border-gray-800 sm:flex-row sm:justify-end">
                <button
                    type="button"
                    onClick={onCancel}
                    className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#1FA2E1] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#178CC5] disabled:cursor-not-allowed disabled:opacity-70"
                    data-testid="aluno-submit"
                >
                    <Plus className="size-4" />
                    {loading
                        ? isUpdate
                            ? "Salvando..."
                            : "Criando..."
                        : isUpdate
                            ? "Salvar alteracoes"
                            : "Criar aluno"}
                </button>
            </div>
        </form>
    );
}

function FormSection({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
            <h3 className="mb-4 text-base font-semibold text-gray-900 dark:text-white">
                {title}
            </h3>
            {children}
        </section>
    );
}

function TextField({
    id,
    label,
    defaultValue,
    type = "text",
    ...props
}: {
    id: string;
    label: string;
    name: string;
    defaultValue?: string | number | null;
    type?: React.HTMLInputTypeAttribute;
    required?: boolean;
    min?: number;
}) {
    return (
        <Field className="space-y-2">
            <FieldLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
            </FieldLabel>
            <Input
                id={id}
                type={type}
                defaultValue={defaultValue ?? ""}
                className={inputClassName}
                {...props}
            />
        </Field>
    );
}

function toDateInputValue(value: string | Date | null | undefined) {
    if (!value) return "";
    if (value instanceof Date) return value.toISOString().slice(0, 10);

    return value.slice(0, 10);
}

"use client"

import {
    Plus,
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import type { FormEvent } from "react";
import type { AlunoFormState } from "@/hooks/alunos/useAlunoForm";

type Modalidade = {
    id: number;
    tipo: string;
};

type AlunosFormProps = {
    modalidades: Modalidade[];
    loading: boolean;
    alunoForm: AlunoFormState;
    onFieldChange: (field: keyof AlunoFormState, value: string) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    onCancel: () => void;
};

const series = [
    { id: 1, tipo: "6º Ano do Ensino Fundamental" },
    { id: 2, tipo: "7º Ano do Ensino Fundamental" },
    { id: 3, tipo: "8º Ano do Ensino Fundamental" },
    { id: 4, tipo: "9º Ano do Ensino Fundamental" },
    { id: 5, tipo: "1º Ano do Ensino Médio" },
    { id: 6, tipo: "2º Ano do Ensino Médio" },
    { id: 7, tipo: "3º Ano do Ensino Médio" },
];

export default function AlunosForm({ modalidades, loading, alunoForm, onFieldChange, onSubmit, onCancel }: AlunosFormProps) {

    return (

        <form className="space-y-6" onSubmit={onSubmit}>
            <div className="rounded-2xl border border-gray-200 bg-gray-50/80 p-5 dark:border-gray-800 dark:bg-gray-800/20">
                <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-sky-600 shadow-sm dark:bg-gray-800 dark:text-sky-300">
                        <Plus className="size-8" />
                    </div>
                    <div>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                            Adicionar novo aluno
                        </p>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Preencha os dados abaixo para criar um aluno.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field className="space-y-2">
                        <FieldLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Nome
                        </FieldLabel>
                        <Input
                            id="nome"
                            type="text"
                            name="nome"
                            value={alunoForm.nome}
                            onChange={(event) =>
                                onFieldChange("nome", event.target.value)
                            }
                            required
                            className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 outline-none transition-colors focus:border-sky-300 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:focus:border-sky-700"
                        />
                    </Field>


                    <Field className="space-y-2">
                        <FieldLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Série
                        </FieldLabel>
                        <Select
                            value={alunoForm.serie}
                            onValueChange={(value) =>
                                onFieldChange("serie", value ?? "")
                            }
                        >
                            <SelectTrigger
                                name="serie"
                                id="serie"
                                className="h-14 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 outline-none transition-colors focus:border-sky-300 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:focus:border-sky-700"
                            >

                                <SelectValue>
                                    {
                                        series.find(
                                            (serie) =>
                                                String(serie.id) === String(alunoForm.serie)
                                        )?.tipo
                                    }
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Series</SelectLabel>
                                    {series.map((serie) => (
                                        <SelectItem
                                            key={serie.id}
                                            value={serie.id}
                                            className="cursor-pointer"
                                        >
                                            {serie.tipo}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </Field>
                </div>

                <Field className="space-y-2">
                    <FieldLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email
                    </FieldLabel>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={alunoForm.email}
                        onChange={(event) =>
                            onFieldChange("email", event.target.value)
                        }
                        className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 outline-none transition-colors focus:border-sky-300 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:focus:border-sky-700"
                    />
                </Field>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field className="space-y-2">
                        <FieldLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Modalidade
                        </FieldLabel>
                        <Select
                            value={alunoForm.modalidade}
                            onValueChange={(value) =>
                                onFieldChange("modalidade", value ?? "")
                            }
                        >
                            <SelectTrigger
                                name="modalidade"
                                id="modalidade"
                                className="h-14 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 outline-none transition-colors focus:border-sky-300 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:focus:border-sky-700"
                            >
                                <SelectValue>
                                    {
                                        modalidades.find(
                                            (modalidade) =>
                                                String(modalidade.id) === String(alunoForm.modalidade)
                                        )?.tipo
                                    }
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Modalidades</SelectLabel>
                                    {modalidades.map((modalidade) => (
                                        <SelectItem
                                            key={modalidade.id}
                                            value={modalidade.id}
                                            className="cursor-pointer"
                                        >
                                            {modalidade.tipo}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </Field>

                    <Field className="space-y-2">
                        <FieldLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Data de Nascimento
                        </FieldLabel>
                        <Input
                            id="dataNasc"
                            type="date"
                            name="dataNasc"
                            value={alunoForm.dataNasc}
                            onChange={(event) =>
                                onFieldChange("dataNasc", event.target.value)
                            }
                            required
                            className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 outline-none transition-colors focus:border-sky-300 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:focus:border-sky-700"
                        />
                    </Field>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field className="space-y-2">
                        <FieldLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Telefone
                        </FieldLabel>
                        <Input
                            id="telefone"
                            type="tel"
                            name="telefone"
                            required
                            value={alunoForm.telefone}
                            onChange={(event) =>
                                onFieldChange("telefone", event.target.value)
                            }
                            className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 outline-none transition-colors focus:border-sky-300 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:focus:border-sky-700"
                        />
                    </Field>

                    <Field className="space-y-2">
                        <FieldLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Status
                        </FieldLabel>
                        <Input
                            id="status"
                            type="text"
                            name="status"
                            value={alunoForm.status}
                            readOnly
                            className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 outline-none transition-colors focus:border-sky-300 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:focus:border-sky-700"
                        />
                    </Field>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field className="space-y-2">
                        <FieldLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Horas semanais
                        </FieldLabel>
                        <Input
                            id="horasSemana"
                            type="number"
                            name="horasSemana"
                            value={alunoForm.horasSemana}
                            onChange={(event) =>
                                onFieldChange("horasSemana", event.target.value)
                            }
                            required
                            className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 outline-none transition-colors focus:border-sky-300 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:focus:border-sky-700"
                        />
                    </Field>

                    <Field className="space-y-2">
                        <FieldLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Tempo de aula
                        </FieldLabel>
                        <Input
                            id="tempoAula"
                            type="number"
                            name="tempoAula"
                            value={alunoForm.tempoAula}
                            onChange={(event) =>
                                onFieldChange("tempoAula", event.target.value)
                            }
                            required
                            className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 outline-none transition-colors focus:border-sky-300 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:focus:border-sky-700"
                        />
                    </Field>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field className="space-y-2">
                        <FieldLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Tempo de contrato
                        </FieldLabel>
                        <Input
                            id="tempoContrato"
                            type="number"
                            name="tempoContrato"
                            value={alunoForm.tempoContrato}
                            onChange={(event) =>
                                onFieldChange(
                                    "tempoContrato",
                                    event.target.value
                                )
                            }
                            required
                            className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 outline-none transition-colors focus:border-sky-300 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:focus:border-sky-700"
                        />
                    </Field>

                    <Field className="space-y-2">
                        <FieldLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Senha temporaria
                        </FieldLabel>
                        <Input
                            id="tempPassword"
                            type="password"
                            name="tempPassword"
                            value={alunoForm.tempPassword}
                            readOnly
                            className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 outline-none transition-colors focus:border-sky-300 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:focus:border-sky-700"
                        />
                    </Field>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field className="space-y-2">
                        <FieldLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Nome do Responsavel
                        </FieldLabel>
                        <Input
                            id="respNome"
                            type="text"
                            name="respNome"
                            value={alunoForm.respNome}
                            onChange={(event) =>
                                onFieldChange("respNome", event.target.value)
                            }
                            required
                            className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 outline-none transition-colors focus:border-sky-300 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:focus:border-sky-700"
                        />
                    </Field>

                    <Field className="space-y-2">
                        <FieldLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Telefone do Responsavel
                        </FieldLabel>
                        <Input
                            id="respTel"
                            type="tel"
                            name="respTel"
                            value={alunoForm.respTel}
                            onChange={(event) =>
                                onFieldChange("respTel", event.target.value)
                            }
                            required
                            className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 outline-none transition-colors focus:border-sky-300 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:focus:border-sky-700"
                        />
                    </Field>
                </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-gray-200 pt-5 dark:border-gray-800 sm:flex-row sm:justify-end">
                <button
                    type="button"
                    onClick={onCancel}
                    className="cursor-pointer inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-[#1FA2E1] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#178CC5]"
                >
                    <Plus className="size-4" />
                    {loading ? "Criando..." : "Criar aluno"}
                </button>
            </div>
        </form>
    )
}
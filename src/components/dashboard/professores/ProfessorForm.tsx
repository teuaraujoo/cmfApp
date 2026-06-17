"use client";

import { CircleUserRound } from "lucide-react";
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
import type { Professor } from "@/@types//professor/professor.types";
import { MaskedPhoneInput } from "@/components/ui/forms/MaskedPhoneInput";

const materias = [
  { id: 1, tipo: "Matemática" },
  { id: 2, tipo: "Física" },
  { id: 3, tipo: "Química" }
];

type ProfessorFormProps = {
  mode: "create" | "edit";
  professor?: Professor | null;
  loading: boolean;
  error: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
};

export default function ProfessorForm({
  mode,
  professor,
  loading,
  error,
  onSubmit,
  onCancel,
}: ProfessorFormProps) {
  const isCreate = mode === "create";

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div className="rounded-2xl border border-gray-200 bg-gray-50/80 p-5 dark:border-gray-800 dark:bg-gray-800/20">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-sky-600 shadow-sm dark:bg-gray-800 dark:text-sky-300">
            <CircleUserRound className="size-8" />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {isCreate ? "Adicionar novo professor" : "Editar professor"}
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {isCreate
                ? "Preencha os dados abaixo para criar um professor."
                : "Atualize os dados do professor selecionado."}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Field className="space-y-2">
          <FieldLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Nome
          </FieldLabel>
          <Input
            id="nome"
            type="text"
            name="nome"
            defaultValue={professor?.nome ?? ""}
            required
            className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 outline-none transition-colors focus:border-sky-300 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:focus:border-sky-700"
          />
        </Field>

        <Field className="space-y-2">
          <FieldLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </FieldLabel>
          <Input
            id="email"
            type="email"
            name="email"
            defaultValue={professor?.email ?? ""}
            required
            className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 outline-none transition-colors focus:border-sky-300 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:focus:border-sky-700"
          />
        </Field>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <MaskedPhoneInput
            id="telefone"
            name="telefone"
            label="Telefone"
            defaultValue={professor?.tel}
            required
          />

          <Field className="space-y-2">
            <FieldLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Matéria
            </FieldLabel>
            <Select
              name="materia"
              defaultValue={professor?.materia ?? ""}
              required
            >
              <SelectTrigger
                id="materia"
                className="h-14 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 outline-none transition-colors focus:border-sky-300 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:focus:border-sky-700"
              >
                <SelectValue placeholder="Selecione a matéria" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Matéria</SelectLabel>
                  {materias.map((materia) => (
                    <SelectItem
                      key={materia.id}
                      value={materia.tipo}
                      className="cursor-pointer"
                    >
                      {materia.tipo}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </div>
      </div>

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
          className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-[#1FA2E1] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#178CC5] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading
            ? isCreate ? "Criando..." : "Salvando..."
            : isCreate ? "Criar professor" : "Salvar alteracoes"}
        </button>
      </div>
    </form>
  );
};

"use client";

import { CircleUserRound, Mail, Phone, X } from "lucide-react";
import type { FormEvent } from "react";
import ProfessorForm from "./ProfessorForm";
import type { Modalidade, Professor } from "./types";

type ProfessorDetailsPanelProps = {
  professor: Professor | null;
  isOpen: boolean;
  mode: "details" | "edit" | "create";
  modalidades: Modalidade[];
  loading: boolean;
  error: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
};

function formatDisplayValue(value?: string | null) {
  if (!value) {
    return "-";
  };

  return value;
};

export default function ProfessorDetailsPanel({
  professor,
  isOpen,
  mode,
  modalidades,
  loading,
  error,
  onSubmit,
  onClose,
}: ProfessorDetailsPanelProps) {
  return (
    <>
      <div
        className={`fixed inset-0 z-[100000] transition ${
          isOpen
            ? "pointer-events-auto bg-gray-900/50 backdrop-blur-[1px]"
            : "pointer-events-none bg-transparent"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed right-0 top-0 z-[100001] h-screen w-full max-w-md transform border-l border-gray-200 bg-white shadow-2xl transition-transform duration-300 dark:border-gray-800 dark:bg-gray-900 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-start justify-between border-b border-gray-200 px-5 py-5 dark:border-gray-800 sm:px-6">
            <div>
              <p className="text-sm font-medium text-sky-600 dark:text-sky-300">
                {mode === "create"
                  ? "Cadastro de professor"
                  : mode === "edit"
                  ? "Editar professor"
                  : "Detalhes do professor"}
              </p>
              <h2 className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
                {mode === "create" ? "Novo professor" : professor?.nome ?? "Professor"}
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 p-2 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
            >
              <X className="size-5" />
            </button>
          </div>

          {mode === "create" || (professor && mode === "edit") ? (
            <div className="side-panel-scroll flex-1 overflow-y-auto px-5 py-5 sm:px-6">
              <ProfessorForm
                key={professor?.user_id ?? "create"}
                mode={mode === "create" ? "create" : "edit"}
                professor={professor}
                modalidades={modalidades}
                loading={loading}
                error={error}
                onSubmit={onSubmit}
                onCancel={onClose}
              />
            </div>
          ) : professor ? (
            <div className="side-panel-scroll flex-1 space-y-6 overflow-y-auto px-5 py-5 sm:px-6">
              <div className="rounded-2xl border border-gray-200 bg-gray-50/80 p-5 dark:border-gray-800 dark:bg-gray-800/20">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-sky-600 shadow-sm dark:bg-gray-800 dark:text-sky-300">
                    <CircleUserRound className="size-8" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-lg font-semibold text-gray-900 dark:text-white">
                      {professor.nome}
                    </p>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      {professor.status}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-800/20">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
                  Contato
                </p>
                <div className="mt-3 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <Mail className="size-4 text-gray-400 dark:text-gray-500" />
                    <span className="break-all sm:break-words">
                      {professor.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <Phone className="size-4 text-gray-400 dark:text-gray-500" />
                    <span>{formatDisplayValue(professor.tel)}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-800/20">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
                  Academico
                </p>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-xl bg-gray-50 px-3 py-3 dark:bg-gray-900/70">
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      Matéria
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                      {professor.materia}
                    </p>
                  </div>
                  <div className="rounded-xl bg-gray-50 px-3 py-3 dark:bg-gray-900/70">
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      Modalidade
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                      {professor.modalidade}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </aside>
    </>
  );
};

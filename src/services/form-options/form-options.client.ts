import type { Aluno } from "@/@types/aluno/aluno.types";
import type { Modalidade } from "@/@types/modalidade/modalidade.type";
import type { Professor } from "@/@types/professor/professor.types";
import apiRoutes from "@/lib/api";
import { apiFetch } from "@/services/csrf/csrf.client";

export type FormOptions = {
  alunos: Aluno[];
  professores: Professor[];
  modalidades: Modalidade[];
};

export async function getFormOptions() {
  try {
    const response = await apiFetch(apiRoutes.formOptions, {
      method: "GET",
    });

    if (!response) {
      return;
    }

    const result = await response.json();

    if (!response.ok) {
      return {
        err: result.message ?? "Não foi possível carregar dados do formulário.",
      };
    }

    return result as { message: string; data: FormOptions };
  } catch {
    return { err: "Nao foi possivel conectar ao servidor." };
  }
}

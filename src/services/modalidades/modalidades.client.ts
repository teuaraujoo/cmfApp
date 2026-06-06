import apiRoutes from "@/lib/api";

type ModalidadePayload = {
  tipo: string;
};

async function modalidadeRequest(
  url: string,
  method: "POST" | "PUT" | "DELETE",
  body?: ModalidadePayload,
) {
  try {
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: body ? JSON.stringify(body) : undefined,
    });
    const result = await response.json();

    if (!response.ok) {
      return { err: result.message ?? "Não foi possível concluir a operação." };
    }

    return result;
  } catch {
    return { err: "Não foi possível conectar ao servidor." };
  }
}

export function createModalidade(payload: ModalidadePayload) {
  return modalidadeRequest(apiRoutes.modalidades, "POST", payload);
}

export function updateModalidade(id: number, payload: ModalidadePayload) {
  return modalidadeRequest(`${apiRoutes.modalidades}/${id}`, "PUT", payload);
}

export function deleteModalidade(id: number) {
  return modalidadeRequest(`${apiRoutes.modalidades}/${id}`, "DELETE");
}

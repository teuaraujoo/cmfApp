import { apiRoutes } from "@/lib/api"

type LoginData = {
    email: string,
    password: string,
};

export async function loginUser(data: LoginData) {
    try {

        const response = await fetch(`${apiRoutes.login}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin",
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) return { err: result.message ?? "Não foi possível entrar." }

        return result;

    } catch {

        return { err: "Não foi possível conectar ao servidor." }
    };
};
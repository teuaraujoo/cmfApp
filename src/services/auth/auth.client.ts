import { apiRoutes } from "@/lib/api"

type LoginData = {
    email: string,
    password: string,
};

type ChangePasswordData = {
    newPassword: string,
    confirmPassword: string,
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

        localStorage.setItem("time", "14.400.000");
        return result;

    } catch {

        return { err: "Não foi possível conectar ao servidor." }
    };
};

export async function changePassword(data: ChangePasswordData) {

    try {

        const response = await fetch(`${apiRoutes.changePassword}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin",
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) return { err: result.message ?? "Não foi possível trocar a senha." }

        cookieStore.set("mustChangePassword", "false");
        return result;
    } catch (err) {
        return { err: "Não foi possível conectar ao sservidor." };
    };
};
import apiRoutes from "@/lib/api";

let csrfToken: string | null = null;

async function getCsrfToken() {
    if (csrfToken) return csrfToken;

    const response = await fetch(`${apiRoutes.csrf}`, {
        method: "GET",
        credentials: "same-origin",
        cache: "no-store"
    });

    const result = await response.json();

    if (!response.ok || !result.csrfToken) {
        throw new Error("Não foi possível gerar token CSRF.");
    };

    csrfToken = result.csrfToken;

    return csrfToken;
};

export async function apiFetch(input: RequestInfo | URL, init: RequestInit = {}) {
    const method = init.method?.toUpperCase() ?? "GET";
    const headers = new Headers(init.headers);

    if (!["GET", "HEAD", "OPTIONS"].includes(method)) {
        const token = await getCsrfToken();

        if (!token) {
            return;
        };

        headers.set("X-CSRF-Token", token);
    };

    return fetch(input, {
        ...init,
        headers,
        credentials: "same-origin"
    });
};
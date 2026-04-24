import { AppError } from "../error/app-errors";

export async function validateRequestOrigin(request: Request) {
    if (process.env.NODE_ENV !== "production") {
        return;
    };

    const origin = request.headers.get("origin");
    const appOrigin = process.env.APP_ORIGIN;

    if (!appOrigin) {
        throw new AppError("Origem da aplicação não configurada.", 500);
    };

    if (!origin || origin !== appOrigin) {
        throw new AppError("Origem da requisição não permitida.", 403);
    };
};

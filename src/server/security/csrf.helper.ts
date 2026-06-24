import "server-only"

import { cookies } from "next/headers";
import { AppError } from "@/server/error/app-errors";
import { createHmac, randomBytes, timingSafeEqual } from "crypto";

const CSRF_COOKIE = "cmf_csrf_token";
const CSRF_HEADER = "x-csrf-token";

function getCsrfToken() {
    const secret = process.env.CSRF_SECRET;

    if (!secret) {
        throw new AppError("CSRF_SECRET não configurado", 500);
    };

    return secret;
};

function signToken(token: string) {
    return createHmac("sha256", getCsrfToken()).update(token).digest("hex");
};

function createSignedToken() {
    const token = randomBytes(32).toString("hex");
    const signature = signToken(token);

    return `${token}.${signature}`;
};

function isValidSignedToken(signedToken: string) {
    const [token, signature] = signedToken.split(".");

    if (!token || !signature) {
        return false;
    };

    const expectedSignature = signToken(token);

    const signatureBuffer = Buffer.from(signature, "hex");
    const expectedBuffer = Buffer.from(expectedSignature, "hex");

    if (signatureBuffer.length !== expectedBuffer.length) {
        return false;
    };

    return timingSafeEqual(signatureBuffer, expectedBuffer);
};

export async function validateCsrfToken(request: Request) {
    const cookieStore = await cookies();

    const cookieToken = cookieStore.get(CSRF_COOKIE)?.value;
    const headerToken = request.headers.get(CSRF_HEADER);

    if (!cookieToken || !headerToken) {
        throw new AppError("Token CSRF ausente", 403);
    };

    if (cookieToken !== headerToken) {
        throw new AppError("Token CSRF inválido.", 403);
    };

    if (!isValidSignedToken(headerToken)) {
        throw new AppError("Assinatura CSRF inválida.", 403);
    };
};

export async function createCsrfToken() {
    const signedToken = createSignedToken();
    const cookieStore = await cookies();

    const existingToken = cookieStore.get(CSRF_COOKIE)?.value;

    if (existingToken && isValidSignedToken(existingToken)) return existingToken;

    cookieStore.set(CSRF_COOKIE, signedToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 2,
    });

    return signedToken;
};
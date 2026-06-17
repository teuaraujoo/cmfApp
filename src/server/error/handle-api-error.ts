import "server-only";

import { ZodError } from "zod";
import { AppError } from "@/server/error/app-errors";

const isProduction = process.env.NODE_ENV === "production";

function getErrorDetail(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  };

  return String(error);
};

export function handleApiError(
  error: unknown,
  fallbackMessage = "Erro interno do servidor!",
) {
  if (error instanceof AppError) {
    return Response.json(
      { message: error.message },
      { status: error.statusCode },
    );
  };

  if (error instanceof ZodError) {
    return Response.json(
      {
        message: error.issues?.[0]?.message ?? "Dados inválidos.",
        issues: error.issues,
      },
      { status: 400 },
    );
  };

  console.error(error);

  return Response.json(
    {
      message: fallbackMessage,
      ...(!isProduction ? { detail: getErrorDetail(error) } : {}),
    },
    { status: 500 },
  );
};

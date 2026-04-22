import { CreateUserBody } from "@/server/schemas/user.schema";
import { getByEmail } from "@/server/repositories/users.respositories";
import { AppError } from "@/server/error/app-errors";

export async function validateUser(data: CreateUserBody) {

    const findEmail = await getByEmail(data.email);
    if (findEmail) {
        throw new AppError('Email já cadastrado!', 409);
    };

    if (data.role === "ALUNO" && !data.aluno) {
        throw new AppError("Dados do aluno são obrigatórios!", 400);
    };

    if (data.role === "PROFESSOR" && !data.professor) {
        throw new AppError("Dados do professor são obrigatórios!", 400);
    };
};
import { CreateAluno, CreateProfessor, GET, POST } from "../repositories/users.respositories"
import { prisma } from "@/libs/prisma";
import { createUserSchema, CreateUserBody } from "../schemas/user.schema";
import { validateUser } from "../rules/users/users.rules";
import { PrismaUserMapper } from "../mappers/users.mapper";
import { Prisma } from "@/generated/prisma/client";
import { AppError } from "../error/app-errors";

export async function getAll() {
    return await GET();
};

export async function createUser(body: CreateUserBody) {
    const data = createUserSchema.parse(body);

    validateUser(body);

    // transaçoes interativcas 
    return prisma.$transaction(async (tx) => {
        try {

            const user = await POST(tx, PrismaUserMapper.toPrismaUser(data));

            // CASO ALUNO
            if (data.role === 'ALUNO') {
                await CreateAluno(tx, PrismaUserMapper.toPrismaAluno(user.id, data));
            };

            // CASO PROFESSOR
            if (data.role === 'PROFESSOR') {
                await CreateProfessor(tx, PrismaUserMapper.toPrismaProfessor(user.id, data));
            };

            return PrismaUserMapper.toClienteResponse(user);
        } catch (err) {

            if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
                throw new AppError("Email já cadastrado!", 409);
            };

            throw err;
        };
    }, {
        maxWait: 5000, 
        timeout: 10000,
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
    });
};

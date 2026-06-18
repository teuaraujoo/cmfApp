import "dotenv/config";

import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL nao encontrada. Configure o .env antes de rodar o reset.");
};

if (process.env.NODE_ENV === "production") {
  throw new Error("Reset bloqueado em producao.");
};

const adapter = new PrismaPg(databaseUrl);
const prisma = new PrismaClient({ adapter });

const seededAuthUserIds = [
  "11111111-1111-4111-8111-111111111111",
  "22222222-2222-4222-8222-222222222222",
  "33333333-3333-4333-8333-333333333333",
  "44444444-4444-4444-8444-444444444444",
  "55555555-5555-4555-8555-555555555555",
  "66666666-6666-4666-8666-666666666666",
];

async function resetAppTables() {
  await prisma.frequencia_aluno.deleteMany();
  await prisma.frequencia_professor.deleteMany();
  await prisma.aulas_individuais.deleteMany();

  await prisma.turma_alunos.deleteMany();
  await prisma.turma_professores.deleteMany();
  await prisma.turma_agenda.deleteMany();
  await prisma.turmas.deleteMany();

  await prisma.alunos.deleteMany();
  await prisma.professores.deleteMany();
  await prisma.public_users.deleteMany();

  await prisma.modalidades.deleteMany();
};

async function resetSeededAuthUsers() {
  await prisma.auth_users.deleteMany({
    where: {
      id: {
        in: seededAuthUserIds,
      },
    },
  });
};

async function main() {
  console.log("Iniciando reset do banco de desenvolvimento...");

  await resetAppTables();
  await resetSeededAuthUsers();

  console.log("Reset finalizado.");
};

main()
  .catch((error) => {
    console.error("Erro ao executar reset:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

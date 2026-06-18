import "dotenv/config";

import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const databaseUrl = process.env.DATABASE_URL_TEST;

if (!databaseUrl) {
  throw new Error("DATABASE_URL_TEST nao encontrada. Configure o .env antes de rodar o seed.");
}

const adapter = new PrismaPg(databaseUrl);
const prisma = new PrismaClient({ adapter });

const now = new Date();
const currentYear = now.getUTCFullYear();

const modalidadesSeed = ["Presencial Sede", "Presencial Escola", "Online", "Hibrido"];

const usersSeed = [
  {
    authId: "11111111-1111-4111-8111-111111111111",
    nome: "Cristiane Santos",
    email: "admin.seed@cmf.com",
    role: "ADMIN",
    tel: "11999990000",
    mustChangePassword: false,
  },
  {
    authId: "22222222-2222-4222-8222-222222222222",
    nome: "Ana Souza",
    email: "ana.souza.seed@cmf.com",
    role: "ALUNO",
    tel: "11988880001",
    mustChangePassword: true,
    aluno: {
      data_nasc: dateUtc(2010, 1, 12),
      serie: "6 Ano do Ensino Fundamental",
      escola: "Escola Modelo Sul",
      resp_tel: "11977770001",
      resp_nome: "Mariana Souza",
      tempo_aula: 72,
      horas_mensais: 6,
    },
  },
  {
    authId: "33333333-3333-4333-8333-333333333333",
    nome: "Pedro Oliveira",
    email: "pedro.oliveira.seed@cmf.com",
    role: "ALUNO",
    tel: "11988880002",
    mustChangePassword: true,
    aluno: {
      data_nasc: dateUtc(2009, 5, 21),
      serie: "7 Ano do Ensino Fundamental",
      escola: "Colegio Horizonte",
      resp_tel: "11977770002",
      resp_nome: "Carlos Oliveira",
      tempo_aula: 96,
      horas_mensais: 8,
    },
  },
  {
    authId: "44444444-4444-4444-8444-444444444444",
    nome: "Juliana Pereira",
    email: "juliana.pereira.seed@cmf.com",
    role: "ALUNO",
    tel: "11988880003",
    mustChangePassword: true,
    aluno: {
      data_nasc: dateUtc(2008, 9, 4),
      serie: "8 Ano do Ensino Fundamental",
      escola: "Escola Nova Geracao",
      resp_tel: "11977770003",
      resp_nome: "Roberto Pereira",
      tempo_aula: 72,
      horas_mensais: 6,
    },
  },
  {
    authId: "55555555-5555-4555-8555-555555555555",
    nome: "Rafael Lima",
    email: "rafael.lima.seed@cmf.com",
    role: "PROFESSOR",
    tel: "11966660001",
    mustChangePassword: true,
    professor: {
      materia: "Matematica",
    },
  },
  {
    authId: "66666666-6666-4666-8666-666666666666",
    nome: "Bianca Almeida",
    email: "bianca.almeida.seed@cmf.com",
    role: "PROFESSOR",
    tel: "11966660002",
    mustChangePassword: true,
    professor: {
      materia: "Fisica",
    },
  },
];

function dateUtc(year: number, month: number, day: number, hour = 0, minute = 0) {
  return new Date(Date.UTC(year, month - 1, day, hour, minute, 0));
}

function timeUtc(hour: number, minute = 0) {
  return new Date(Date.UTC(1970, 0, 1, hour, minute, 0));
}

function addDays(date: Date, days: number, hour: number, minute = 0) {
  const nextDate = new Date(date);
  nextDate.setUTCDate(nextDate.getUTCDate() + days);
  nextDate.setUTCHours(hour, minute, 0, 0);

  return nextDate;
}

function requireItem<T>(item: T | undefined, message: string) {
  if (!item) {
    throw new Error(message);
  }

  return item;
}

async function seedModalidades() {
  const result = await prisma.modalidades.createMany({
    data: modalidadesSeed.map((tipo) => ({ tipo })),
    skipDuplicates: true,
  });

  console.log(`Modalidades inseridas: ${result.count}`);
}

async function seedUsers() {
  const result = {
    admins: 0,
    alunos: 0,
    professores: 0,
  };

  for (const user of usersSeed) {
    await prisma.auth_users.upsert({
      where: { id: user.authId },
      update: {
        email: user.email,
        role: "authenticated",
        aud: "authenticated",
        updated_at: now,
      },
      create: {
        id: user.authId,
        email: user.email,
        role: "authenticated",
        aud: "authenticated",
      },
    });

    const publicUser = await prisma.public_users.upsert({
      where: { email: user.email },
      update: {
        nome: user.nome,
        role: user.role,
        tel: user.tel,
        status: "ATIVO",
        auth_user_id: user.authId,
        must_change_password: user.mustChangePassword,
      },
      create: {
        nome: user.nome,
        email: user.email,
        role: user.role,
        tel: user.tel,
        status: "ATIVO",
        auth_user_id: user.authId,
        must_change_password: user.mustChangePassword,
      },
    });

    if ("aluno" in user && user.aluno) {
      await prisma.alunos.upsert({
        where: { user_id: publicUser.id },
        update: {
          ...user.aluno,
          status: "ATIVO",
        },
        create: {
          user_id: publicUser.id,
          ...user.aluno,
          status: "ATIVO",
        },
      });

      result.alunos += 1;
      continue;
    }

    if ("professor" in user && user.professor) {
      await prisma.professores.upsert({
        where: { user_id: publicUser.id },
        update: {
          ...user.professor,
          status: "ATIVO",
        },
        create: {
          user_id: publicUser.id,
          ...user.professor,
          status: "ATIVO",
        },
      });

      result.professores += 1;
      continue;
    }

    result.admins += 1;
  }

  console.log(`Admins preparados: ${result.admins}`);
  console.log(`Alunos preparados: ${result.alunos}`);
  console.log(`Professores preparados: ${result.professores}`);
}

async function seedTurmas() {
  const modalidadePresencial = requireItem(
    await prisma.modalidades.findUnique({ where: { tipo: "Presencial Sede" } }),
    "Modalidade Presencial Sede nao encontrada.",
  );

  const turmasSeed = [
    {
      nome: "Turma Fundamentos 6 Ano",
      horas_semana: "2.00",
      vigencia_inicio: dateUtc(currentYear, 1, 15),
      vigencia_fim: dateUtc(currentYear, 12, 15),
      modalidade_id: modalidadePresencial.id,
      agenda: [
        { dia_semana: 1, horario_inicio: timeUtc(9), horario_fim: timeUtc(10) },
        { dia_semana: 3, horario_inicio: timeUtc(9), horario_fim: timeUtc(10) },
      ],
    },
    {
      nome: "Turma Reforco Matematica",
      horas_semana: "3.00",
      vigencia_inicio: dateUtc(currentYear, 2, 1),
      vigencia_fim: dateUtc(currentYear, 12, 15),
      modalidade_id: modalidadePresencial.id,
      agenda: [
        { dia_semana: 2, horario_inicio: timeUtc(14), horario_fim: timeUtc(15, 30) },
        { dia_semana: 4, horario_inicio: timeUtc(14), horario_fim: timeUtc(15, 30) },
      ],
    },
  ];

  for (const turmaSeed of turmasSeed) {
    const turma = await prisma.turmas.upsert({
      where: { nome: turmaSeed.nome },
      update: {
        horas_semana: turmaSeed.horas_semana,
        vigencia_inicio: turmaSeed.vigencia_inicio,
        vigencia_fim: turmaSeed.vigencia_fim,
        modalidade_id: turmaSeed.modalidade_id,
        status: "ATIVO",
      },
      create: {
        nome: turmaSeed.nome,
        horas_semana: turmaSeed.horas_semana,
        vigencia_inicio: turmaSeed.vigencia_inicio,
        vigencia_fim: turmaSeed.vigencia_fim,
        modalidade_id: turmaSeed.modalidade_id,
        status: "ATIVO",
      },
    });

    for (const agenda of turmaSeed.agenda) {
      const existingAgenda = await prisma.turma_agenda.findFirst({
        where: {
          turma_id: turma.id,
          dia_semana: agenda.dia_semana,
          horario_inicio: agenda.horario_inicio,
          horario_fim: agenda.horario_fim,
        },
      });

      if (!existingAgenda) {
        await prisma.turma_agenda.create({
          data: {
            turma_id: turma.id,
            ...agenda,
          },
        });
      }
    }
  }

  console.log(`Turmas preparadas: ${turmasSeed.length}`);
}

async function seedTurmaParticipantes() {
  const alunos = await prisma.alunos.findMany({
    orderBy: { id: "asc" },
    take: 3,
  });
  const professores = await prisma.professores.findMany({
    orderBy: { id: "asc" },
    take: 2,
  });
  const turmas = await prisma.turmas.findMany({
    orderBy: { id: "asc" },
    take: 2,
  });

  for (const turma of turmas) {
    for (const aluno of alunos) {
      const existingAluno = await prisma.turma_alunos.findFirst({
        where: {
          turma_id: turma.id,
          alunos_id: aluno.id,
        },
      });

      if (!existingAluno) {
        await prisma.turma_alunos.create({
          data: {
            turma_id: turma.id,
            alunos_id: aluno.id,
          },
        });
      }
    }

    for (const professor of professores) {
      const existingProfessor = await prisma.turma_professores.findFirst({
        where: {
          turma_id: turma.id,
          professores_id: professor.id,
        },
      });

      if (!existingProfessor) {
        await prisma.turma_professores.create({
          data: {
            turma_id: turma.id,
            professores_id: professor.id,
          },
        });
      }
    }
  }

  console.log("Participantes das turmas preparados.");
}

async function seedAulasIndividuais() {
  const modalidadeOnline = requireItem(
    await prisma.modalidades.findUnique({ where: { tipo: "Online" } }),
    "Modalidade Online nao encontrada.",
  );
  const adminUser = requireItem(
    await prisma.public_users.findUnique({ where: { email: "admin.seed@cmf.com" } }),
    "Usuario admin do seed nao encontrado para finalizar aula.",
  );
  const alunos = await prisma.alunos.findMany({
    orderBy: { id: "asc" },
    take: 3,
  });
  const professores = await prisma.professores.findMany({
    orderBy: { id: "asc" },
    take: 2,
  });

  const primeiroAluno = requireItem(alunos[0], "Nenhum aluno encontrado para criar aulas.");
  const segundoAluno = requireItem(alunos[1], "Segundo aluno nao encontrado para criar aulas.");
  const primeiroProfessor = requireItem(professores[0], "Nenhum professor encontrado para criar aulas.");
  const segundoProfessor = requireItem(professores[1], "Segundo professor nao encontrado para criar aulas.");

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const aulasSeed = [
    {
      aluno_id: primeiroAluno.id,
      professor_id: primeiroProfessor.id,
      modalidade_id: modalidadeOnline.id,
      started_at: addDays(today, 1, 10),
      ended_at: addDays(today, 1, 11),
      status: "AGENDADA",
      encerrada: false,
      notas: null,
      finished_at: null,
      finished_by: null,
      finished_role: null,
    },
    {
      aluno_id: segundoAluno.id,
      professor_id: segundoProfessor.id,
      modalidade_id: modalidadeOnline.id,
      started_at: addDays(today, 2, 15),
      ended_at: addDays(today, 2, 16),
      status: "AGENDADA",
      encerrada: false,
      notas: null,
      finished_at: null,
      finished_by: null,
      finished_role: null,
    },
    {
      aluno_id: segundoAluno.id,
      professor_id: primeiroProfessor.id,
      modalidade_id: modalidadeOnline.id,
      started_at: addDays(today, -1, 14),
      ended_at: addDays(today, -1, 15),
      status: "PENDENTE_FINALIZAÇÃO",
      encerrada: false,
      notas: null,
      finished_at: null,
      finished_by: null,
      finished_role: null,
    },
    {
      aluno_id: primeiroAluno.id,
      professor_id: segundoProfessor.id,
      modalidade_id: modalidadeOnline.id,
      started_at: addDays(today, -2, 9),
      ended_at: addDays(today, -2, 10),
      status: "FINALIZADA",
      encerrada: true,
      notas: "Aula concluida com revisao de equacoes.",
      finished_at: addDays(today, -2, 10, 5),
      finished_by: adminUser.id,
      finished_role: "ADMIN",
    },
  ];

  for (const aula of aulasSeed) {
    const existingAula = await prisma.aulas_individuais.findFirst({
      where: {
        aluno_id: aula.aluno_id,
        professor_id: aula.professor_id,
        started_at: aula.started_at,
        ended_at: aula.ended_at,
      },
    });

    if (existingAula) {
      await prisma.aulas_individuais.update({
        where: { id: existingAula.id },
        data: aula,
      });
    } else {
      await prisma.aulas_individuais.create({
        data: aula,
      });
    }
  }

  console.log(`Aulas individuais preparadas: ${aulasSeed.length}`);
}

async function main() {
  console.log("Iniciando seed...");

  await seedModalidades();
  await seedUsers();
  await seedTurmas();
  await seedTurmaParticipantes();
  await seedAulasIndividuais();

  console.log("Seed finalizado.");
}

main()
  .catch((error) => {
    console.error("Erro ao executar seed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

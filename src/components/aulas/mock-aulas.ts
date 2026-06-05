import type {
  AulaFormOption,
  AulaSemana,
  ModalidadeAulaOption,
} from "@/components/aulas/types";

export const mockAulasSemana: AulaSemana[] = [
  {
    id: 101,
    aluno_id: 21,
    professor_id: 7,
    modalidade_id: 1,
    aluno: {
      id: 21,
      nome: "Ana Souza",
      email: "ana.souza@email.com",
      serie: "2 Ano EM",
    },
    professor: {
      id: 7,
      nome: "Cristiane Santos",
      materia: "Matematica",
    },
    modalidade: {
      id: 1,
      tipo: "Presencial Sede",
    },
    dia: "Segunda-feira",
    data: "2026-06-01",
    horario_inicio: "08:00",
    horario_fim: "09:00",
    encerrada: true,
    anotacoes: "Aluno revisou funcoes de primeiro grau.",
  },
  {
    id: 102,
    aluno_id: 22,
    professor_id: 8,
    modalidade_id: 2,
    aluno: {
      id: 22,
      nome: "Pedro Oliveira",
      email: "pedro.oliveira@email.com",
      serie: "7 ano",
    },
    professor: {
      id: 8,
      nome: "Rafael Lima",
      materia: "Matematica",
    },
    modalidade: {
      id: 2,
      tipo: "Online",
    },
    dia: "Terca-feira",
    data: "2026-06-02",
    horario_inicio: "14:00",
    horario_fim: "15:00",
    encerrada: false,
  },
  {
    id: 103,
    aluno_id: 23,
    professor_id: 7,
    modalidade_id: 1,
    aluno: {
      id: 23,
      nome: "Juliana Pereira",
      email: "juliana.pereira@email.com",
      serie: "1 Ano EM",
    },
    professor: {
      id: 7,
      nome: "Cristiane Santos",
      materia: "Matematica",
    },
    modalidade: {
      id: 1,
      tipo: "Presencial Sede",
    },
    dia: "Quarta-feira",
    data: "2026-06-03",
    horario_inicio: "10:30",
    horario_fim: "11:30",
    encerrada: false,
  },
  {
    id: 104,
    aluno_id: 24,
    professor_id: 9,
    modalidade_id: 3,
    aluno: {
      id: 24,
      nome: "Jose Oliveira",
      email: "jose.oliveira@email.com",
      serie: "2 Ano",
    },
    professor: {
      id: 9,
      nome: "Marina Costa",
      materia: "Fisica",
    },
    modalidade: {
      id: 3,
      tipo: "Hibrido",
    },
    dia: "Sexta-feira",
    data: "2026-06-05",
    horario_inicio: "16:00",
    horario_fim: "17:00",
    encerrada: false,
  },
];

export const mockAlunosAula: AulaFormOption[] = [
  { id: 21, nome: "Ana Souza", extra: "2 Ano EM" },
  { id: 22, nome: "Pedro Oliveira", extra: "7 ano" },
  { id: 23, nome: "Juliana Pereira", extra: "1 Ano EM" },
  { id: 24, nome: "Jose Oliveira", extra: "2 Ano" },
  { id: 25, nome: "Augusto Oliveira", extra: "1 Ano EM" },
];

export const mockProfessoresAula: AulaFormOption[] = [
  { id: 7, nome: "Cristiane Santos", extra: "Matematica" },
  { id: 8, nome: "Rafael Lima", extra: "Matematica" },
  { id: 9, nome: "Marina Costa", extra: "Fisica" },
];

export const mockModalidadesAula: ModalidadeAulaOption[] = [
  { id: 1, tipo: "Presencial Sede" },
  { id: 2, tipo: "Online" },
  { id: 3, tipo: "Hibrido" },
];

import type { Turma, TurmaAluno, TurmaModalidade, TurmaProfessor } from "./types";

export const mockAlunos: TurmaAluno[] = [
  { id: 1, nome: "Junior Oliveira", email: "junior@email.com", serie: "1 ano EM" },
  { id: 2, nome: "Juliana Pereira", email: "juliana@email.com", serie: "2 ano EM" },
  { id: 3, nome: "Pedro Oliveira", email: "pedro@email.com", serie: "7 ano" },
  { id: 4, nome: "Ana Souza", email: "ana@email.com", serie: "8 ano" },
  { id: 5, nome: "Jose Oliveira", email: "jose@email.com", serie: "2 ano" },
];

export const mockProfessores: TurmaProfessor[] = [
  { id: 1, nome: "Cristiane Santos", email: "cris@email.com", materia: "Matematica" },
  { id: 2, nome: "Marcos Silva", email: "marcos@email.com", materia: "Algebra" },
  { id: 3, nome: "Fernanda Lima", email: "fernanda@email.com", materia: "Geometria" },
];

export const mockModalidades: TurmaModalidade[] = [
  { id: 1, tipo: "Presencial Sede" },
  { id: 2, tipo: "Online" },
  { id: 3, tipo: "Hibrido" },
];

export const mockTurmas: Turma[] = [
  {
    id: 1,
    nome: "Turma Intensiva ENEM",
    horas_semana: 4,
    vigencia_inicio: "2026-02-01",
    vigencia_fim: "2026-12-15",
    modalidade_id: 1,
    modalidade: "Presencial Sede",
    diasSemana: ["Segunda", "Quarta"],
    horario: "08:00 - 10:00",
    alunos: [mockAlunos[0], mockAlunos[1], mockAlunos[4]],
    professores: [mockProfessores[0]],
  },
  {
    id: 2,
    nome: "Fundamental Reforco",
    horas_semana: 3,
    vigencia_inicio: "2026-02-01",
    vigencia_fim: "2026-12-15",
    modalidade_id: 1,
    modalidade: "Presencial Sede",
    diasSemana: ["Terca", "Quinta"],
    horario: "14:00 - 15:30",
    alunos: [mockAlunos[2], mockAlunos[3]],
    professores: [mockProfessores[2]],
  },
  {
    id: 3,
    nome: "Pre-vestibular Algebra",
    horas_semana: 4,
    vigencia_inicio: "2026-03-01",
    vigencia_fim: "2026-11-30",
    modalidade_id: 2,
    modalidade: "Online",
    diasSemana: ["Segunda", "Quarta"],
    horario: "19:00 - 21:00",
    alunos: [mockAlunos[0], mockAlunos[1]],
    professores: [mockProfessores[1]],
  },
  {
    id: 4,
    nome: "Sabado Olimpico",
    horas_semana: 5,
    vigencia_inicio: "2026-02-15",
    vigencia_fim: "2026-10-30",
    modalidade_id: 3,
    modalidade: "Hibrido",
    diasSemana: ["Sexta", "Sabado"],
    horario: "09:00 - 11:30",
    alunos: [mockAlunos[2], mockAlunos[3], mockAlunos[4]],
    professores: [mockProfessores[0], mockProfessores[2]],
  },
];

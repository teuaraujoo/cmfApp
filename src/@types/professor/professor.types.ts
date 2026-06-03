export type Professor = {
    id: number;
    user_id: number;
    nome: string;
    email: string;
    tel: string | null;
    role: string;
    status: string;
    materia: string;
    modalidade_id: number;
    modalidade: string;
};

export type CreateProfessorPayload = {
    nome: string;
    email: string;
    role: "PROFESSOR";
    tel: string;
    professor: {
        materia: string;
        modalidade_id: number;
    };
};
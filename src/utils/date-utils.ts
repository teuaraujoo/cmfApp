export const DIAS_SEMANAS = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado"
];

export function formatHorarioLocal(date: Date) {
    return new Intl.DateTimeFormat("pt-BR", {
        timeZone: "America/Sao_Paulo",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(date));
};

export const diasSemanaOptions = [
    { id: 1, label: "Segunda", filterValue: "Segunda-feira" },
    { id: 2, label: "Terça", filterValue: "Terça-feira" },
    { id: 3, label: "Quarta", filterValue: "Quarta-feira" },
    { id: 4, label: "Quinta", filterValue: "Quinta-feira" },
    { id: 5, label: "Sexta", filterValue: "Sexta-feira" },
    { id: 6, label: "Sábado", filterValue: "Sábado" },
    { id: 0, label: "Domingo", filterValue: "Domingo" },
];
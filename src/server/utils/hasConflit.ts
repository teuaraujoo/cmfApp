export function hasConflit(
    fresh: { dia_semana: number; inicio: number; fim: number },
    current: { dia_semana: number; inicio: number; fim: number }
) {
    return (
        fresh.dia_semana === current.dia_semana &&
        fresh.inicio < current.fim &&
        current.inicio < fresh.fim
    );
};
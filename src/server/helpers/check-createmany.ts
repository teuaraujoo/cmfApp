import { AppError } from "../error/app-errors";

export function checkCreateManyCount(result: { count: number }, expected: number, entity: string) {
    
    if (result.count !== expected) {
        throw new AppError(`Error ao criar ${entity}!`, 500);
    };
};
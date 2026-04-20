import { GET } from "../repositories/users.respositories"

export async function getAll() {
    return await GET();
};
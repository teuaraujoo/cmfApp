import { requireAdminUser } from "../auth/auth.services";
import { getTotalTurmas } from "./turmas.services";

export async function getTotalTurmasForAdmin() {
    await requireAdminUser();
    return getTotalTurmas();
};
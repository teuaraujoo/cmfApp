import "server-only";

import { requireAdminUser } from "../auth/auth.services";
import { getAllModalidades } from "./modalidades.services";

export async function getAllModalidadesForAdmin() {
    await requireAdminUser();
    return getAllModalidades();  
};

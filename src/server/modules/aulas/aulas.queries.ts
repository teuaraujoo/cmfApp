import { requireAdminUser } from "@/server/modules/auth/auth.services";
import { getAllAulas, getAulas, getAulasNotFinished, getTotalAulas } from "./aulas.services";


export async function getAulasForAdmin() {
    await requireAdminUser();
    return getAulas();
};

export async function getAllAulasForAdmin() {
    await requireAdminUser();
    return getAllAulas();
};

export async function getAulasNotFinishedForAdmin() {
    await requireAdminUser();
    return getAulasNotFinished();
};

export async function getTotalAulasForAdmin() {
    await requireAdminUser();
    return getTotalAulas();
};

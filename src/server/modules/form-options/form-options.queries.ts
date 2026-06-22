import "server-only";

import { generalQueriesRateLimit } from "@/server/libs/ratelimit";
import { requireAdminUser } from "@/server/modules/auth/auth.services";
import { getAllModalidades } from "@/server/modules/modalidades/modalidades.services";
import {
  getAllActiveAlunos,
  getAllActiveProfessores,
} from "@/server/modules/users/users.services";
import { rateLimitByIdentifier } from "@/server/security/rate-limit.helper";

export async function getFormOptionsForAdmin() {
  const session = await requireAdminUser();

  await rateLimitByIdentifier(
    `form-options:get:admin:${session.appUser.id}`,
    generalQueriesRateLimit,
  );

  const [alunos, professores, modalidades] = await Promise.all([
    getAllActiveAlunos(),
    getAllActiveProfessores(),
    getAllModalidades(),
  ]);

  return {
    alunos,
    professores,
    modalidades,
  };
}

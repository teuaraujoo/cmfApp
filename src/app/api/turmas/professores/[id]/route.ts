import { findTurmaByProfessorId } from "@/server/repositories/turmas.repositories";
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    const {id} = await params;

    const turmas = await findTurmaByProfessorId(Number(id));
    return Response.json(turmas);
};
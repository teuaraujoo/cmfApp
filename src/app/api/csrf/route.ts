import { createCsrfToken } from "@/server/security/csrf.helper";


export async function GET() {

    const csrfToken = await createCsrfToken();

    return Response.json(
        { csrfToken },
        {
            status: 200,
            headers: {
                "Cache-Control": "no-store"
            },
        });
};

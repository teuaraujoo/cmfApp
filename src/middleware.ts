import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const publicRoutes = [
    { path: '/', whenAuthenticated: 'next' },
    { path: '/login', whenAuthenticated: 'redirect' },
    { path: '/dashboard/login', whenAuthenticated: 'redirect' },
] as const;

const publicAsset = (pathname: string) => {
    return (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/static') ||
        pathname === '/favicon.ico' ||
        /\.[^/]+$/.test(pathname)
    );
};

async function getPayload(token: string) {
    const secret = new TextEncoder().encode(
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { payload } = await jwtVerify(token, secret);

    return payload;
}

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const publicRoute = publicRoutes.find(route => route.path === pathname);
    const authToken = request.cookies.get("sb-nwzybohbhqhckshryqcf-auth-token");
    
    if (publicAsset(pathname)) {
        return NextResponse.next();
    };
    
    if (!authToken && publicRoute) {
        return NextResponse.next();
    };
    
    const parsed = JSON.parse(authToken!.value);
    const accessToken = parsed[0];
    const decodedToken = await getPayload(accessToken);
    console.log("decoded: ", decodedToken)
    // const role = decodedToken.user_metadata?.role;
    if (!authToken && !publicRoute) {
        const redirectUrl = request.nextUrl.clone();

        redirectUrl.pathname = "/";

        return NextResponse.redirect(redirectUrl);
    };

    if (authToken && publicRoute && publicRoute.whenAuthenticated === "redirect") {
        const redirectUrl = request.nextUrl.clone();

        if (pathname.startsWith("/dashboard")) {
            redirectUrl.pathname = "/dashboard/home";
        } else {
            redirectUrl.pathname = "/portal";
        };

        return NextResponse.redirect(redirectUrl);
    };

    if (authToken && !publicRoute) {
        // validacao de token (se esta expirado ou nao)
        return NextResponse.next();
    }

    return NextResponse.next();
};
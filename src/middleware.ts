import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";

const publicRoutes = [
    { path: '/', whenAuthenticated: 'next' },
    { path: '/choose-login', whenAuthenticated: 'next' },
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

function extractAccessToken(cookieValue: string): string | null {
    try {
        const base64 = cookieValue.replace("base64-", "");

        const decoded = atob(base64);

        const parsed = JSON.parse(decoded);

        return parsed?.access_token ?? null;
    } catch {
        return null;
    };
};

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const publicRoute = publicRoutes.find(route => route.path === pathname);
    const authToken = request.cookies.get("sb-nwzybohbhqhckshryqcf-auth-token");

    if (publicAsset(pathname)) {
        return NextResponse.next();
    };

    if (!authToken) {
        if (publicRoute) {
            return NextResponse.next();
        };

        const redirectUrl = request.nextUrl.clone();

        redirectUrl.pathname = "/";

        return NextResponse.redirect(redirectUrl);
    };

    const accessToken = extractAccessToken(authToken.value);
    if (!accessToken) return NextResponse.next();

    const decodedToken = decodeJwt(accessToken) as {
        user_metadata?: { role?: string, must_change_password: boolean };
        app_metadata?: { role?: string, must_change_password: boolean };
    };

    const role = decodedToken.user_metadata?.role ?? decodedToken.app_metadata?.role;
    const mustChangePassword = decodedToken.user_metadata?.must_change_password;
    const localmustChangePassword = request.cookies.get("mustChangePassword");


    if (mustChangePassword) {
        if (pathname !== "/change-password") {
            const redirectUrl = request.nextUrl.clone();

            redirectUrl.pathname = "/change-password";

            return NextResponse.redirect(redirectUrl);
        };

        return NextResponse.next();
    };

    if (!mustChangePassword && pathname === "/change-password") {
        const redirectUrl = request.nextUrl.clone();

        redirectUrl.pathname = role === "ADMIN" ? "/dashboard/home" : "/portal";

        return NextResponse.redirect(redirectUrl);
    };

    if (authToken && publicRoute && publicRoute.whenAuthenticated === "redirect") {
        const redirectUrl = request.nextUrl.clone();

        if (pathname.startsWith("/dashboard") && role === "ADMIN") {
            redirectUrl.pathname = "/dashboard/home";
        } else if (!mustChangePassword) {
            redirectUrl.pathname = "/portal";
        };

        return NextResponse.redirect(redirectUrl);
    };

    if (authToken && !publicRoute) {
        const redirectUrl = request.nextUrl.clone();

        if (mustChangePassword && pathname !== "/change-password") {
            redirectUrl.pathname = "/change-password";
            return NextResponse.redirect(redirectUrl);
        };

        if (pathname.startsWith("/dashboard") && role !== "ADMIN") {
            redirectUrl.pathname = "/portal";
            return NextResponse.redirect(redirectUrl);
        };
    };

    return NextResponse.next();
};
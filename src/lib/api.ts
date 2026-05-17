const API_URL = process.env.NEXT_PUBLIC_APP_ORIGIN;

export const apiRoutes = {
    url: API_URL,
    login: "/api/auth/login",
    logout: "/api/auth/logout",
    changePassword: "/api/auth/change-password"
};
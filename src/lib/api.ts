const API_URL = process.env.NEXT_PUBLIC_APP_ORIGIN;

const apiRoutes = {
    url: API_URL,
    login: "/api/auth/login",
    logout: "/api/auth/logout",
    changePassword: "/api/auth/change-password",
    totalAlunos: "/api/alunos/total",
    totalProfessores: "/api/professores/total"
};

export default apiRoutes;
const API_URL = process.env.NEXT_PUBLIC_APP_ORIGIN;

const apiRoutes = {
    url: API_URL,
    login: "/api/auth/login",
    logout: "/api/auth/logout",
    changePassword: "/api/auth/change-password",
    users: "/api/users",
    totalAlunos: "/api/alunos/total",
    totalProfessores: "/api/professores/total",
    turmas: "/api/turmas",
    aulas: "/api/aulas"
};

export default apiRoutes;
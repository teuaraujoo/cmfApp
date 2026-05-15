import AdminLoginForm from "@/components/admin-login-form"
import { BackgroundCircle } from "@/components/ui/circlebackground";

export default function LoginDashboardPage() {
    return (
        <section className="bg-foreground dark:bg-background min-h-screen flex items-center justify-center relative">
            <BackgroundCircle />
            <AdminLoginForm />
        </section>
    );
};

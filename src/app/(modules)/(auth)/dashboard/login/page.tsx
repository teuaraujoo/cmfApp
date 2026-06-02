import AdminLoginForm from "@/components/auth/AdminLoginForm"
import { BackgroundCircle } from "@/components/ui/circlebackground";

export default function LoginDashboardPage() {
    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#05070A] text-white">
            <BackgroundCircle />
            <AdminLoginForm />
        </section>
    );
};

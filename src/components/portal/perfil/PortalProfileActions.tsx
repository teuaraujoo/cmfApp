"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AlertCircle, ArrowRight, CalendarDays, History, LogOut } from "lucide-react";

import { logoutUser } from "@/services/auth/auth.client";
import toast from "react-hot-toast";

const quickActions = [
    {
        label: "Calendário",
        href: "/portal/calendario",
        icon: CalendarDays,
        description: "Próximos eventos",
    },
    {
        label: "Histórico",
        href: "/portal/historico",
        icon: History,
        description: "Registros das suas aulas",
    },
    {
        label: "Pendências",
        href: "/portal/pendencias",
        icon: AlertCircle,
        description: "Aulas em aberto",
    },
];

export function PortalProfileActions() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleLogout() {
        setLoading(true)
        const result = await logoutUser();

        if (result?.err) {
            toast.error(result.error);
            return;
        };

        router.push("/");
        setLoading(false);
        toast.success(result?.message);
    };

    return (
        <div className="space-y-3">
            <div className="grid gap-2 sm:grid-cols-2">
                {quickActions.map((item) => {
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="group flex items-center justify-between rounded-2xl border border-sky-100/80 bg-white/80 px-3 py-3 text-left shadow-sm shadow-sky-950/5 transition-all hover:-translate-y-0.5 hover:border-sky-200 hover:bg-sky-50 dark:border-white/10 dark:bg-white/[0.06] dark:hover:border-sky-500/30 dark:hover:bg-sky-500/10"
                        >
                            <div className="flex items-center gap-3">
                                <span className="flex size-10 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-200">
                                    <Icon className="size-4" />
                                </span>
                                <div>
                                    <p className="text-sm font-semibold text-gray-950 dark:text-white">{item.label}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
                                </div>
                            </div>
                            <ArrowRight className="size-4 text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-sky-600 dark:text-gray-500" />
                        </Link>
                    );
                })}
            </div>

            <button
                type="button"
                onClick={handleLogout}
                disabled={loading}
                className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-70 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-200 dark:hover:bg-rose-500/15"
            >
                <LogOut className="size-4" />
                {loading ? "Saindo..." : "Sair da conta"}
            </button>
        </div>
    );
}

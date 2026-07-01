import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

type Item = {
    icon: ReactNode;
    label: string;
    value: string | number;
}

export function ProfileSection({
    title,
    icon,
    itens,
}: { itens: Item[], title: string, icon: ReactNode }) {

    return (
        <Card className="rounded-[1.6rem] border border-sky-100/80 bg-white/90 p-5 dark:border-white/10 dark:bg-white/[0.06] sm:p-6">
            <div className="mb-5 flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-200">
                    {icon}
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-950 dark:text-white">
                        {title}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Informações salvas no seu perfil
                    </p>
                </div>
            </div>

            <div className="space-y-3">
                {itens.map((item) => (
                    <div
                        key={`${item.label}-${item.value}`}
                        className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50/80 px-3 py-3 dark:border-white/10 dark:bg-white/[0.04]"
                    >
                        <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-2xl bg-white text-sky-700 shadow-sm dark:bg-white/10 dark:text-sky-200">
                            {item.icon}
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                                {item.label}
                            </p>
                            <p className="mt-1 break-words text-sm font-medium text-gray-900 dark:text-gray-100">
                                {item.value || "—"}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
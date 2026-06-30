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
        <Card className="rounded-3xl p-6 shadow-sm">

            <div className="mb-6 flex items-center gap-3">

                <div className="rounded-full bg-blue-50 p-3 text-blue-600">
                    {icon}
                </div>

                <h2 className="text-xl font-semibold">
                    {title}
                </h2>

            </div>

            <div className="space-y-5">
                {itens.map((item) => (

                    <div
                        key={item.value}
                        className="flex items-center justify-between"
                    >

                        <div className="flex gap-4">

                            <div className="rounded-full bg-slate-100 p-3 text-blue-600">
                                {item.icon}
                            </div>

                            <div>

                                <p className="text-sm text-muted-foreground">
                                    {item.label}
                                </p>

                                <p className="font-medium">
                                    {item.value}
                                </p>

                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
import Link from "next/link";

import ButtonShineHoverDemo from "@/components/ui/button-03";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function HomePage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-zinc-100">
            <Card className="w-full max-w-xl border-zinc-800 bg-zinc-900 shadow-2xl shadow-black/30">
                <CardHeader className="space-y-6 text-center">
                    <div className="flex items-center justify-center">
                        <Image src="/images/logotipo-branca.png" width={200} height={200} alt="CMF logotipo" />
                    </div>

                    <div className="space-y-3">
                        <CardTitle className="text-3xl font-semibold tracking-tight text-white">
                            Bem-vindo ao sistema CMF
                        </CardTitle>

                        <CardDescription className="text-base leading-relaxed text-zinc-400">
                            Acompanhe suas aulas individuais e em turma, marque sua prença e aprenda matemática de um jeito mais fácil, aproveite essa experiência!
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="flex justify-center">
                    <Link href="/login">
                        <ButtonShineHoverDemo text={"Ir para o sistema"} />
                    </Link>
                </CardContent>
            </Card>
        </main>
    );
}
"use client"

import { useState, type ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { loginUser } from "@/services/auth/auth.client"
import { useRouter } from "next/navigation"

export default function AdminLoginForm({
    className,
    ...props
}: ComponentProps<"div">) {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        try {
            event.preventDefault();
            setLoading(true);

            const formData = new FormData(event.currentTarget);

            const email = formData.get("email") as string;
            const password = formData.get("password") as string;

            const result = await loginUser({ email, password });

            if (result?.err) {
                setError(result.err);
                setLoading(false);
                return;
            };

            if (!result?.data?.role) {
                setError("Erro ao processar login. Tente novamente.");
                setLoading(false);
                return;
            };

            if (result.data.role !== "ADMIN") {
                setError("Apenas administradores podem acessar!");
                setLoading(false);
                return;
            };

            router.replace("/dashboard/home");
            
        } catch (err) {
            console.error("Erro no login:", err);
            setError("Erro inesperado ao fazer login. Tente novamente.");
            setLoading(false);
        };
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">

                    {/* FORM */}

                    <form
                        className="p-6 md:p-8"
                        onSubmit={handleSubmit}
                    >
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <div className="mx-auto">
                                    <a href="">
                                        <Image src="/images/logocmf.png" width={100}
                                            height={100}
                                            alt="CMF logo"
                                            loading="eager"
                                        />
                                    </a>
                                </div>
                                <h1 className="text-2xl font-bold">Bem vindo(a)!</h1>
                                <p className="text-sm text-balance text-muted-foreground">
                                    Acesse a plataforma inserindo seu <br /> email e senha
                                </p>
                            </div>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="cmf@example.com"
                                    required
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="password">Senha</FieldLabel>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Digite sua senha"
                                    required
                                />
                            </Field>

                            {error && (
                                <p className="text-sm text-red-500">
                                    {error}
                                </p>
                            )}

                            <Field className="mb-4">
                                <Button
                                    className="h-10 cursor-pointer rounded-lg bg-[#1FA2E1] text-white hover:bg-[#178CC5] focus-visible:ring-[#1FA2E1]/35"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? "Entrando..." : "Entrar"}
                                </Button>
                            </Field>
                        </FieldGroup>
                        <FieldDescription className="text-center text-sm font-normal text-muted-foreground">
                            Esqueceu seu login e/ou senha?{" "}
                            <a
                                href="#"
                                className="font-medium text-card-foreground !no-underline"
                            >
                                Fale com o administrador
                            </a>
                        </FieldDescription>
                    </form>
                    <div className="relative hidden bg-muted md:block">
                        <Image
                            src="/images/estudo.jpeg"
                            alt="Foto sala da CMF"
                            width={0}
                            height={0}
                            sizes="100vw"
                            loading="eager"
                            className="absolute inset-0 h-full w-full object-cover brightness-50"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

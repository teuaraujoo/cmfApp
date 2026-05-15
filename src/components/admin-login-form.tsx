import type { ComponentProps } from "react"
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

export default function AdminLoginForm({
    className,
    ...props
}: ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">

                    <form className="p-6 md:p-8">
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
                                <h1 className="text-2xl font-bold">Entre no seu dashboard, Cristiane!</h1>
                                <p className="text-sm text-balance text-muted-foreground">
                                    Coloque seu email e senha
                                </p>
                            </div>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="cmf@example.com"
                                    required
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="password">Senha</FieldLabel>
                                <Input id="password" type="password" placeholder="Digite sua senha" required />
                            </Field>
                            <Field className="mb-4">
                                <Button className="rounded-lg h-10 hover:bg-primary/80 cursor-pointer" type="submit">Entrar</Button>
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

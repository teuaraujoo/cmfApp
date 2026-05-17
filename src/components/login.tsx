"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { BackgroundCircle } from "./ui/circlebackground";
import { loginUser } from "@/services/auth/auth.client";
import { useState } from "react";

export default function LoginForm() {

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {

    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await loginUser({ email, password });

    if (result?.err) {
      setError(result.err);
      setLoading(false);
    };
  };

  return (
    <section className="bg-foreground dark:bg-background min-h-screen flex items-center justify-center relative">
      <BackgroundCircle />

      <div className="py-10 md:py-20 max-w-lg px-4 sm:px-0 mx-auto w-full">
        <Card className="max-w-lg px-6 py-8 sm:p-12 relative gap-6">
          <CardHeader className="text-center gap-6 p-0">
            <div className="mx-auto">
              <a href="">
                <Image src="/images/logocmf.png" width={100}
                  height={100}
                  alt="CMF logo"
                  loading="eager"
                />
              </a>
            </div>
            <div className="flex flex-col gap-1">
              <CardTitle className="text-2xl font-medium text-card-foreground">
                Bem vindo a CMF!
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground font-normal">
                Entre na sua conta agora.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-0">

            <form
              onSubmit={handleSubmit}
            >
              <FieldGroup className="gap-6">
                <div className="flex flex-col gap-4">
                  <Field className="gap-1.5">
                    <FieldLabel
                      htmlFor="email"
                      className="text-sm text-muted-foreground font-normal"
                    >
                      Email
                    </FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="example@cmfapp.com"
                      required
                      className="dark:bg-background h-9 shadow-xs"
                    />
                  </Field>
                  <Field className="gap-1.5">
                    <FieldLabel
                      htmlFor="password"
                      className="text-sm text-muted-foreground font-normal"
                    >
                      Senha
                    </FieldLabel>

                    <Input
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Digite sua senha"
                      required
                      className="dark:bg-background h-9 shadow-xs"
                    />
                  </Field>

                  {error && (
                    <p className="text-sm text-red-500">
                      {error}
                    </p>
                  )}

                </div>
                <Field className="gap-4">

                  <FieldDescription className="text-center text-sm font-normal text-muted-foreground">
                    Ao entrar no sistema, você concorda com
                    <a href="/legal/termos" className="font-medium text-card-foreground !no-underline"> Termos de Uso </a>
                    e nossa
                    <a href="/legal/politica-privacidade" className="font-medium text-card-foreground !no-underline"> Política de Privacidade</a>
                  </FieldDescription>

                  <Button
                    type="submit"
                    size={"lg"}
                    disabled={loading}
                    className="h-10 cursor-pointer rounded-lg bg-[#1FA2E1] text-white hover:bg-[#178CC5] focus-visible:ring-[#1FA2E1]/35"
                  >
                    {loading ? "Entrando..." : "Entrar"}
                  </Button>

                  <FieldDescription className="text-center text-sm font-normal text-muted-foreground">
                    Esqueceu seu login e/ou senha?{" "}
                    <a
                      href="#"
                      className="font-medium text-card-foreground !no-underline"
                    >
                      Fale com o administrador
                    </a>
                  </FieldDescription>

                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

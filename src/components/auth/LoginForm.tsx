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
import { BackgroundCircle } from "../ui/circlebackground";
import { loginUser } from "@/services/auth/auth.client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginForm() {

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

      if (result.data.must_change_password) {
        router.replace("/change-password");
      } else {
        toast.success(`${result.message} Bem vindo(a)`);
        router.replace("/portal");
      };

    } catch {
      setError("Erro inesperado ao fazer login. Tente novamente.");
      setLoading(false);
    };
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#05070A] text-white">
      <BackgroundCircle />

      <div className="py-10 md:py-20 max-w-lg px-4 sm:px-0 mx-auto w-full">
        <Card className="relative max-w-lg gap-6 border border-white/10 bg-[#0E1117]/95 px-6 py-8 text-white shadow-2xl shadow-black/40 backdrop-blur sm:p-12">
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
              <CardTitle className="text-2xl font-medium text-white">
                Bem vindo a CMF!
              </CardTitle>
              <CardDescription className="text-sm font-normal text-white/60">
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
                      className="text-sm font-normal text-white/70"
                    >
                      Email
                    </FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="example@cmfapp.com"
                      required
                      className="h-9 border-white/10 bg-[#05070A] text-white shadow-xs placeholder:text-white/35 focus-visible:ring-[#1FA2E1]/35"
                    />
                  </Field>
                  <Field className="gap-1.5">
                    <FieldLabel
                      htmlFor="password"
                      className="text-sm font-normal text-white/70"
                    >
                      Senha
                    </FieldLabel>

                    <Input
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Digite sua senha"
                      required
                      className="h-9 border-white/10 bg-[#05070A] text-white shadow-xs placeholder:text-white/35 focus-visible:ring-[#1FA2E1]/35"
                    />
                  </Field>

                  {error && (
                    <p className="text-sm text-red-500">
                      {error}
                    </p>
                  )}

                </div>
                <Field className="gap-4">

                  <FieldDescription className="text-center text-sm font-normal text-white/60 [&>a:hover]:!text-sky-200">
                    Ao entrar no sistema, você concorda com
                    <a href="/legal/termos" className="font-medium text-white transition-colors hover:text-sky-200 !no-underline"> Termos de Uso </a>
                    e nossa
                    <a href="/legal/politica-privacidade" className="font-medium text-white transition-colors hover:text-sky-200 !no-underline"> Política de Privacidade</a>
                  </FieldDescription>

                  <Button
                    type="submit"
                    size={"lg"}
                    disabled={loading}
                    className="h-10 cursor-pointer rounded-lg bg-[#1FA2E1] text-white hover:bg-[#178CC5] focus-visible:ring-[#1FA2E1]/35"
                  >
                    {loading ? "Entrando..." : "Entrar"}
                  </Button>

                  <FieldDescription className="text-center text-sm font-normal text-white/60 [&>a:hover]:!text-sky-200">
                    Esqueceu seu login e/ou senha?{" "}
                    <a
                      href="#"
                      className="font-medium text-white transition-colors hover:text-sky-200 !no-underline"
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

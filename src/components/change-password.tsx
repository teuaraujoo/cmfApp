"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { BackgroundCircle } from "./ui/circlebackground";
import Image from "next/image";
import { changePassword, logoutUser } from "@/services/auth/auth.client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PasswordSecurityModal } from "./auth/PasswordSecurityModal";

export default function ChangePasswordForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [open, setOpen] = useState(true);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {

      event.preventDefault();
      setLoading(true);

      const formData = new FormData(event.currentTarget);

      const newPassword = formData.get("newPassword") as string;
      const confirmPassword = formData.get("confirmPassword") as string;

      const result = await changePassword({ newPassword, confirmPassword });

      if (result?.err) {
        setError(result.err);
        setLoading(false);
        return;
      };

      await logoutUser();

      router.replace("/login");

    } catch {
      setError("Erro inesperado ao fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-foreground dark:bg-background min-h-screen flex items-center justify-center relative">
      <PasswordSecurityModal
        open={open}
        onOpenChange={setOpen}
      />
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
                Primeiro acesso por aqui
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground font-normal">
                Troque sua senha agora
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
                      htmlFor="newPassword"
                      className="text-sm text-muted-foreground font-normal"
                    >
                      Nova senha
                    </FieldLabel>
                    <Input
                      id="newPassword"
                      type="password"
                      name="newPassword"
                      placeholder="Digite sua nova senha"
                      required
                      className="dark:bg-background h-9 shadow-xs"
                    />
                  </Field>
                  <Field className="gap-1.5">
                    <FieldLabel
                      htmlFor="confirmPassword"
                      className="text-sm text-muted-foreground font-normal"
                    >
                      Confirme Nova senha
                    </FieldLabel>

                    <Input
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      placeholder="Digite sua nova senha"
                      required
                      className="dark:bg-background h-9 shadow-xs"
                    />
                  </Field>
                </div>

                {error && (
                  <p className="text-sm text-red-500">
                    {error}
                  </p>
                )}

                <Field className="gap-4">
                  <Button
                    type="submit"
                    size={"lg"}
                    disabled={loading}
                    className="h-10 cursor-pointer rounded-lg bg-[#1FA2E1] text-white hover:bg-[#178CC5] focus-visible:ring-[#1FA2E1]/35"
                  >
                    {loading ? "Modificando..." : "Mudar senha"}
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

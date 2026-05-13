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

export default function LoginForm() {
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
            <form>
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
                      placeholder="Digite sua senha"
                      required
                      className="dark:bg-background h-9 shadow-xs"
                    />
                  </Field>
                </div>
                <Field className="gap-4">
                  <Button type="submit" size={"lg"} className="rounded-lg h-10 hover:bg-primary/80 cursor-pointer">
                    Entrar
                  </Button>
                  <FieldDescription className="text-center text-sm font-normal text-muted-foreground">
                    Esqueceu seu login e/ou senha?{" "}
                    <a
                      href="#"
                      className="font-medium text-card-foreground no-underline!"
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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function ChangePasswordForm() {
  return (
    <section className="bg-foreground dark:bg-background min-h-screen flex items-center justify-center relative">
      <div className="pointer-events-none absolute inset-0 right-0 overflow-hidden md:block hidden">
        {/* Outer big circle */}
        <div className="absolute left-1/1 top-0 h-650 w-650 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10" />
        {/* Inner circle */}
        <div className="absolute left-1/1 top-0 h-175 w-175 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground dark:bg-background" />
      </div>

      <div className="py-10 md:py-20 max-w-lg px-4 sm:px-0 mx-auto w-full">
        <Card className="max-w-lg px-6 py-8 sm:p-12 relative gap-6">
          <CardHeader className="text-center gap-6 p-0">
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
            <form>
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
                      placeholder="Digite sua nova senha"
                      required
                      className="dark:bg-background h-9 shadow-xs"
                    />
                  </Field>
                </div>
                <Field className="gap-4">
                  <Button type="submit" size={"lg"} className="rounded-lg h-10 hover:bg-primary/80 cursor-pointer">
                    Trocar senha
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
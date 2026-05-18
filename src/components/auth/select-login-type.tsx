"use client";

import Image from "next/image";
import Link from "next/link";
import { GraduationCap, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { BackgroundCircle } from "../ui/circlebackground";

export default function SelectLoginType() {
  return (
    <section className="bg-foreground dark:bg-background min-h-screen flex items-center justify-center relative overflow-hidden">
      <BackgroundCircle />

      <div className="w-full max-w-5xl px-4 py-10 md:py-20">
        <Card className="relative overflow-hidden border-0 shadow-2xl rounded-3xl">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col items-center text-center gap-4 mb-10">
              <Image
                src="/images/logocmf.png"
                width={100}
                height={100}
                alt="CMF logo"
                priority
              />

              <div className="space-y-1">
                <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-card-foreground">
                  Escolha seu acesso
                </h1>

                <p className="text-muted-foreground text-sm md:text-base">
                  Selecione o tipo de login para continuar no sistema.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <Link href="/login" className="group">
                <div className="h-full rounded-2xl border bg-background/70 backdrop-blur-sm p-8 transition-all duration-300 hover:border-[#1FA2E1]/40 hover:shadow-xl hover:-translate-y-1">
                  
                  <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#1FA2E1]/10 mb-6 mx-auto">
                    <GraduationCap className="size-8 text-[#1FA2E1]" />
                  </div>

                  <div className="space-y-2 text-center">
                    <h2 className="text-xl font-semibold text-card-foreground">
                      Usuário
                    </h2>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Acesso destinado para alunos e professores utilizarem
                      o portal acadêmico.
                    </p>
                  </div>

                  <div className="mt-8 flex justify-center">
                    <div className="inline-flex items-center justify-center rounded-lg bg-[#1FA2E1] px-5 py-2.5 text-sm font-medium text-white transition-colors group-hover:bg-[#178CC5]">
                      Entrar como usuário
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/dashboard/login" className="group">
                <div className="h-full rounded-2xl border bg-background/70 backdrop-blur-sm p-8 transition-all duration-300 hover:border-[#1FA2E1]/40 hover:shadow-xl hover:-translate-y-1">
                  
                  <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#1FA2E1]/10 mb-6 mx-auto">
                    <ShieldCheck className="size-8 text-[#1FA2E1]" />
                  </div>

                  <div className="space-y-2 text-center">
                    <h2 className="text-xl font-semibold text-card-foreground">
                      Administrador
                    </h2>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Área administrativa para gerenciamento da plataforma.
                    </p>
                  </div>

                  <div className="mt-8 flex justify-center">
                    <div className="inline-flex items-center justify-center rounded-lg bg-[#1FA2E1] px-5 py-2.5 text-sm font-medium text-white transition-colors group-hover:bg-[#178CC5]">
                      Entrar como administrador
                    </div>
                  </div>
                </div>
              </Link>

            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
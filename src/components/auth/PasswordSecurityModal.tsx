"use client";

import {
  ShieldCheck,
  LockKeyhole,
  CheckCircle2,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type PasswordSecurityModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function PasswordSecurityModal({
  open,
  onOpenChange,
}: PasswordSecurityModalProps) {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* ALTERAÇÕES DE RESPONSIVIDADE NO CONTAINER:
        - w-[calc(100%-2rem)]: Garante uma margem elegante nas laterais em telas mobile.
        - max-h-[90vh] e flex flex-col: Impede o modal de sumir para fora da tela em celulares deitados (landscape).
      */}
      <DialogContent className="flex max-h-[90vh] w-[calc(100%-2rem)] flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0E1117] p-0 text-white shadow-2xl shadow-black/50 sm:w-full sm:max-w-[600px]">

        {/* HEADER */}
        {/* shrink-0: impede o header de amassar caso o conteúdo precise de scroll. Padding reduzido no mobile (px-4 py-5) */}
        <div className="relative shrink-0 border-b border-white/10 bg-gradient-to-br from-[#1FA2E1]/15 to-transparent px-4 py-5 sm:px-8 sm:py-6 md:px-10">
          
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,162,225,0.08),transparent_45%)]" />

          <div className="relative flex items-start gap-3 sm:gap-4">
            
            {/* Ícone reduz para size-10 no mobile para poupar espaço horizontal */}
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#1FA2E1]/25 bg-[#1FA2E1]/10 sm:size-12">
              <ShieldCheck className="size-5 sm:size-6 text-[#1FA2E1]" />
            </div>

            <div className="space-y-0.5 sm:space-y-1">
              {/* Fonte responsiva: text-lg no celular, text-xl no computador */}
              <DialogTitle className="text-lg font-medium tracking-tight text-white sm:text-xl">
                Crie uma senha segura
              </DialogTitle>

              <DialogDescription className="text-xs font-normal leading-relaxed text-white/60 sm:text-sm">
                Para proteger sua conta, utilize uma senha forte e difícil de ser descoberta.
              </DialogDescription>
            </div>

          </div>
        </div>

        {/* CONTENT */}
        {/* overflow-y-auto: Se a tela for muito pequena, apenas essa parte interna ganha barra de rolagem, mantendo o cabeçalho fixo */}
        <div className="space-y-5 overflow-y-auto px-4 py-5 sm:space-y-6 sm:p-8 md:px-10">

          {/* Bloco de Requisitos */}
          <div className="rounded-xl border border-white/10 bg-[#05070A]/70 p-4 sm:p-5">

            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <LockKeyhole className="size-4 sm:size-5 text-[#1FA2E1]" />
              <h3 className="text-xs font-medium text-white sm:text-sm">
                Requisitos recomendados
              </h3>
            </div>

            <ul className="space-y-2.5 sm:space-y-3">
              <li className="flex items-start gap-2.5 text-xs font-normal text-white/65 sm:gap-3 sm:text-sm">
                <CheckCircle2 className="mt-0.5 size-3.5 sm:size-4 text-emerald-500 shrink-0" />
                <span>Pelo menos <span className="font-medium text-white">8 caracteres.</span></span>
              </li>

              <li className="flex items-start gap-2.5 text-xs font-normal text-white/65 sm:gap-3 sm:text-sm">
                <CheckCircle2 className="mt-0.5 size-3.5 sm:size-4 text-emerald-500 shrink-0" />
                <span>Misture letras maiúsculas e minúsculas.</span>
              </li>

              <li className="flex items-start gap-2.5 text-xs font-normal text-white/65 sm:gap-3 sm:text-sm">
                <CheckCircle2 className="mt-0.5 size-3.5 sm:size-4 text-emerald-500 shrink-0" />
                <span>Utilize pelo menos 2 números e 1 caractere especial.</span>
              </li>

              <li className="flex items-start gap-2.5 text-xs font-normal text-white/65 sm:gap-3 sm:text-sm">
                <CheckCircle2 className="mt-0.5 size-3.5 sm:size-4 text-emerald-500 shrink-0" />
                <span>Não utilize dados pessoais como seu nome, usuário ou data de nascimento.</span>
              </li>

              <li className="flex items-start gap-2.5 text-xs font-normal text-white/65 sm:gap-3 sm:text-sm">
                <CheckCircle2 className="mt-0.5 size-3.5 sm:size-4 text-emerald-500 shrink-0" />
                <span>Não compartilhe essa senha com terceiros.</span>
              </li>
            </ul>
          </div>

          {/* EXEMPLO */}
          <div className="rounded-xl border border-[#1FA2E1]/25 bg-[#1FA2E1]/10 p-4 sm:p-5">
            <p className="mb-1.5 text-xs font-medium text-white sm:text-sm">
              Exemplo de senha forte
            </p>
            <code className="block rounded-md border border-white/10 bg-black/20 p-2 text-center font-mono text-xs font-semibold tracking-wider text-[#7DD3FC] sm:inline-block sm:border-none sm:bg-transparent sm:p-0 sm:text-left sm:text-sm">
              oMi@1xLa2!
            </code>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}

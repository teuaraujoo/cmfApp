import Link from "next/link";
import Image from "next/image";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BackgroundCircle } from "@/components/ui/circlebackground";

type LegalSection = {
  title: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
};

type LegalDocumentProps = {
  title: string;
  description: string;
  updatedAt: string;
  sections: readonly LegalSection[];
};

export default function LegalDocument({
  title,
  description,
  updatedAt,
  sections,
}: LegalDocumentProps) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#05070A] px-4 py-10 text-white sm:px-6 md:py-16">
      <BackgroundCircle />

      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-sm font-medium text-white/70 transition-colors hover:text-sky-200"
          >
            Voltar para o inicio
          </Link>

          <Link
            href="/login"
            className="text-sm font-medium text-white/70 transition-colors hover:text-sky-200"
          >
            Ir para o login
          </Link>
        </div>

        <Card className="relative border border-white/10 bg-[#0E1117]/95 px-6 py-8 text-white shadow-2xl shadow-black/40 backdrop-blur sm:px-10 sm:py-10">
          <CardHeader className="gap-6 p-0 text-center">
            <div className="mx-auto">
              <Image
                src="/images/logocmf.png"
                width={88}
                height={88}
                alt="CMF logo"
                loading="eager"
              />
            </div>

            <div className="space-y-2">
              <CardTitle className="text-3xl font-medium text-white">
                {title}
              </CardTitle>
              <CardDescription className="mx-auto max-w-2xl text-sm leading-6 text-white/60">
                {description}
              </CardDescription>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-sky-300">
                Ultima atualizacao: {updatedAt}
              </p>
            </div>
          </CardHeader>

          <CardContent className="mt-8 p-0">
            <div className="space-y-8">
              {sections.map((section) => (
                <section
                  key={section.title}
                  className="rounded-2xl border border-white/10 bg-[#05070A]/70 p-5 shadow-sm shadow-black/20"
                >
                  <h2 className="text-lg font-semibold text-white">
                    {section.title}
                  </h2>

                  {section.paragraphs?.length ? (
                    <div className="mt-3 space-y-3 text-sm leading-7 text-white/65">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  ) : null}

                  {section.bullets?.length ? (
                    <ul className="mt-3 space-y-2 pl-5 text-sm leading-7 text-white/65 marker:text-sky-300">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

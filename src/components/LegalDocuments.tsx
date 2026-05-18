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
    <section className="bg-foreground dark:bg-background relative min-h-screen px-4 py-10 text-card-foreground sm:px-6 md:py-16">
      <BackgroundCircle />

      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-sm font-medium text-white/80 transition-colors hover:text-white dark:text-white/70 dark:hover:text-white"
          >
            Voltar para o inicio
          </Link>

          <Link
            href="/login"
            className="text-sm font-medium text-white/80 transition-colors hover:text-white dark:text-white/70 dark:hover:text-white"
          >
            Ir para o login
          </Link>
        </div>

        <Card className="relative border-white/10 bg-card/95 px-6 py-8 shadow-2xl shadow-black/20 backdrop-blur sm:px-10 sm:py-10">
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
              <CardTitle className="text-3xl font-medium text-card-foreground">
                {title}
              </CardTitle>
              <CardDescription className="mx-auto max-w-2xl text-sm leading-6 text-muted-foreground">
                {description}
              </CardDescription>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">
                Ultima atualizacao: {updatedAt}
              </p>
            </div>
          </CardHeader>

          <CardContent className="mt-8 p-0">
            <div className="space-y-8">
              {sections.map((section) => (
                <section
                  key={section.title}
                  className="rounded-2xl border border-foreground/8 bg-background/60 p-5 shadow-sm dark:border-white/8 dark:bg-white/[0.02]"
                >
                  <h2 className="text-lg font-semibold text-card-foreground">
                    {section.title}
                  </h2>

                  {section.paragraphs?.length ? (
                    <div className="mt-3 space-y-3 text-sm leading-7 text-muted-foreground">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  ) : null}

                  {section.bullets?.length ? (
                    <ul className="mt-3 space-y-2 pl-5 text-sm leading-7 text-muted-foreground marker:text-sky-600 dark:marker:text-sky-400">
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

import "./globals.css";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Toaster } from "react-hot-toast";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.APP_ORIGIN ?? "http://localhost:3000",
  ),
  title: {
    default: "CMF | Gestão Educacional em um só painel",
    template: "%s | CMF",
  },
  description:
    "Organize alunos, professores, turmas, aulas, agenda e modalidades em uma plataforma administrativa simples, segura e centralizada. Acompanhe suas aulas e registre sua presença!",
  applicationName: "CMF",
  authors: [{ name: "Curso Matemática Fácil" }],
  creator: "Curso Matemática Fácil",
  publisher: "Curso Matemática Fácil",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Curso CMF",
    title: "CMF | Gestão educacional em um só painel",
    description:
      "Controle aulas, turmas, alunos, professores, calendário, pendências e histórico acadêmico com uma experiência administrativa clara e segura. Acompanhe suas aulas e registre sua presença!",
    images: [
      {
        url: "/images/logotipo-branca.png",
        alt: "CMF - sistema de gestão educacional",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CMF | Gestão educacional em um só painel",
    description:
      "Gestão de aulas, alunos, professores, turmas e calendário em uma plataforma administrativa centralizada. Acompanhe suas aulas e registre sua presença!",
    images: ["/images/logotipo-branca.png"],
  },
  icons: {
    icon: "/images/logocmf.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className={`${spaceGrotesk.className} min-h-full flex flex-col`}>
        {children}

        <Toaster
          position="bottom-right"
          reverseOrder={false}
          containerStyle={{
            zIndex: 200000,
          }}
          toastOptions={{
            duration: 4000,

            style: {
              background: "#f3f0eb",
              color: "#1C1C1C",
              border: "1px solid #ffeecb",
            },

            success: {
              iconTheme: {
                primary: "#22c55e",
                secondary: "#fff",
              },
            },

            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}

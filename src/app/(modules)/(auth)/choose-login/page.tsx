import SelectLoginType from "@/components/auth/select-login-type";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Escolha seu login",
  description:
    "Acesse o sistema CMF para acompanhar sua agenda e informações acadêmica.",
  alternates: {
    canonical: "/choose-login",
  },
  openGraph: {
    title: "Escolha seu login",
    description:
      "Acesse o sistema CMF para acompanhar sua agenda e informações acadêmica.",
    url: "/choose-login",
  },
  twitter: {
    title: "Escolha seu login",
    description:
      "Acesse o sistema CMF para acompanhar sua agenda e informações acadêmica.",
  },
};

export default function SelectLoginTypePage() {
    return (
        <SelectLoginType />
    )
};
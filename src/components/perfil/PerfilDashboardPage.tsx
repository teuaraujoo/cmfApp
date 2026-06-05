"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BookOpenText,
  CircleUserRound,
  ComponentIcon,
  Home,
  LogOut,
  Mail,
  Pencil,
  Save,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { logoutUser } from "@/services/auth/auth.client";
import { updateUser } from "@/services/users/users.client";

type UserInfo = {
  id: number;
  nome: string;
  email: string;
  role: "ADMIN" | "ALUNO" | "PROFESSOR";
  tel: string | null;
  createdAt: string;
};

const quickLinks = [
  {
    label: "Home",
    description: "Voltar para a visão geral do dashboard.",
    href: "/dashboard/home",
    icon: <Home className="size-5" />,
  },
  {
    label: "Alunos",
    description: "Consultar e gerenciar alunos.",
    href: "/dashboard/alunos",
    icon: <BookOpenText className="size-5" />,
  },
  {
    label: "Turmas",
    description: "Acessar turmas cadastradas e detalhes.",
    href: "/dashboard/turmas",
    icon: <ComponentIcon className="size-5" />,
  },
];

export default function PerfilDashboardPage({
  userInfo,
}: {
  userInfo: UserInfo;
}) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState(userInfo);
  const [draftProfile, setDraftProfile] = useState(userInfo);

  function handleStartEditing() {
    setDraftProfile(profile);
    setIsEditing(true);
  };

  function handleDiscardChanges() {
    setDraftProfile(profile);
    setIsEditing(false);
  };

  async function handleSaveChanges() {
    try {
      setIsSaving(true);

      const data = {
        nome: draftProfile.nome,
        email: draftProfile.email,
        role: profile.role,
        tel: profile.tel,
      };

      const result = await updateUser(data, profile.id);

      if (result?.err) {
        toast.error(result.err);
        return;
      };

      const nextProfile = {
        ...profile,
        nome: draftProfile.nome,
        email: draftProfile.email,
      };

      setProfile(nextProfile);
      setDraftProfile(nextProfile);
      setIsEditing(false);
      toast.success(result?.message ?? "Perfil atualizado com sucesso!");
      router.refresh();

    } finally {
      setIsSaving(false);
    };
  };

  async function handleLogout() {
    const result = await logoutUser();

    if (result?.err) {
      toast.error(result.err);
      return;
    };

    router.replace("/dashboard/login");
    toast.success("Logout realizado com sucesso!");
  };

  return (
    <main className="p-6">
      <div className="space-y-6">
        <section className="px-5 py-5 sm:px-6">
          <p className="text-sm font-medium text-sky-600 dark:text-sky-300">
            Perfil do usuário
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Minha conta
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400">
            Consulte seus dados principais, edite informações básicas e navegue
            rapidamente pelas áreas mais usadas do sistema.
          </p>
        </section>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 items-start gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300">
                  <CircleUserRound className="size-7" />
                </div>

                <div className="min-w-0">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Dados do perfil
                  </h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Informações básicas usadas para identificação no dashboard.
                  </p>
                </div>
              </div>

              {!isEditing ? (
                <Button
                  type="button"
                  onClick={handleStartEditing}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#1FA2E1] text-white hover:bg-[#178CC5]"
                >
                  <Pencil className="size-4" />
                  Editar perfil
                </Button>
              ) : null}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <ProfileField
                icon={<UserRound className="size-4" />}
                label="Nome"
                value={profile.nome}
                editable={isEditing}
              >
                <Input
                  value={draftProfile.nome}
                  onChange={(event) =>
                    setDraftProfile((current) => ({
                      ...current,
                      nome: event.target.value,
                    }))
                  }
                  className="h-11 rounded-xl"
                />
              </ProfileField>

              <ProfileField
                icon={<Mail className="size-4" />}
                label="Email"
                value={profile.email}
                editable={isEditing}
              >
                <Input
                  type="email"
                  value={draftProfile.email}
                  onChange={(event) =>
                    setDraftProfile((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  className="h-11 rounded-xl"
                />
              </ProfileField>

              <ProfileField
                icon={<ShieldCheck className="size-4" />}
                label="Cargo"
                value={profile.role ? "Administrador" : ""}
              />

              <ProfileField
                icon={<CircleUserRound className="size-4" />}
                label="Criado em"
                value={formatDate(profile.createdAt)}
              />
            </div>

            {isEditing ? (
              <div className="mt-6 flex flex-col gap-3 border-t border-gray-200 pt-5 dark:border-gray-800 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleDiscardChanges}
                  disabled={isSaving}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-lg"
                >
                  <X className="size-4" />
                  Descartar alterações
                </Button>
                <Button
                  type="button"
                  onClick={handleSaveChanges}
                  disabled={isSaving}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#1FA2E1] text-white hover:bg-[#178CC5]"
                >
                  <Save className="size-4" />
                  {isSaving ? "Salvando..." : "Salvar alterações"}
                </Button>
              </div>
            ) : null}
          </section>

          <aside className="space-y-6">
            <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Navegação rápida
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Atalhos para páginas importantes do dashboard.
              </p>

              <div className="mt-5 space-y-3">
                {quickLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-start gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4 transition-all hover:-translate-y-0.5 hover:border-sky-200 hover:bg-sky-50/70 dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-sky-500/30 dark:hover:bg-sky-500/10"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-sky-700 shadow-sm transition-colors group-hover:bg-sky-100 dark:bg-gray-950 dark:text-sky-300 dark:group-hover:bg-sky-500/20">
                      {item.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                        {item.label}
                      </span>
                      <span className="mt-1 block text-sm text-gray-500 dark:text-gray-400">
                        {item.description}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-red-100 bg-red-50/70 p-5 dark:border-red-900/50 dark:bg-red-950/20">
              <h2 className="text-lg font-semibold text-red-700 dark:text-red-300">
                Sair da conta
              </h2>
              <p className="mt-1 text-sm text-red-600/80 dark:text-red-300/80">
                Encerre a sessão atual neste dispositivo.
              </p>

              <Button
                type="button"
                variant="outline"
                className="mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-red-200 bg-white text-red-700 hover:bg-red-50 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-950/70"
                onClick={handleLogout}
              >
                <LogOut className="size-4" />
                Logout
              </Button>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}

function ProfileField({
  icon,
  label,
  value,
  editable,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  editable?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
        <span className="text-sky-700 dark:text-sky-300">{icon}</span>
        {label}
      </div>
      {editable && children ? (
        children
      ) : (
        <p className="break-words text-base font-semibold text-gray-900 dark:text-white">
          {value}
        </p>
      )}
    </div>
  );
}

function formatDate(date: string) {
  const [year, month, day] = date.slice(0, 10).split("-");

  return `${day}/${month}/${year}`;
}

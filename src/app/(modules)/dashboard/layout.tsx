import { ThemeProvider } from "@/context/ThemeContext";
import { SidebarProvider } from "@/context/SidebarContext";
import SidebarLayout from "@/layout/SidebarLayout";
import { getCurrentAppUser } from "@/server/modules/auth/auth.services";
import type { Metadata } from "next";
import { connection } from "next/server";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  await connection();

  const { appUser } = await getCurrentAppUser();

  const userInfo = {
    nome: appUser.nome,
    email: appUser.email,
    tel: appUser.tel,
    role: appUser.role,
  };

  return (
    <ThemeProvider>
      <SidebarProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <SidebarLayout
            userInfo={userInfo}
          >
            {children}
          </SidebarLayout>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}

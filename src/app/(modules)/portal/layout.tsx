import type { Metadata } from "next";
import type { ReactNode } from "react";

import { PortalBottomNavigation } from "@/components/portal/PortalBottomNavigation";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function PortalLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ThemeProvider>
      <div className="min-h-dvh bg-[#F7F5F2] text-gray-950 dark:bg-gray-950 dark:text-white">
        <div className="pointer-events-none fixed inset-x-0 top-0 h-64 opacity-20 blur-3xl dark:opacity-25" />
        <main className="relative mx-auto min-h-dvh w-full max-w-3xl px-4 pb-32 pt-5 sm:px-6 sm:pt-8 lg:max-w-4xl">
          {children}
        </main>
        <PortalBottomNavigation />
      </div>
    </ThemeProvider>
  );
}

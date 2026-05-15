import "./sidebar-globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { SidebarProvider } from "@/context/SidebarContext";
import SidebarLayout from "@/layout/SidebarLayout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <SidebarLayout>{children}</SidebarLayout>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}

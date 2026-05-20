"use client";
/* Sidebar migration marker: reusable layout shell for the sidebar */

import React from "react";
import { useSidebar } from "../context/SidebarContext";
import AppSidebar from "./AppSidebar";
import Backdrop from "./Backdrop";
import AppHeader from "./AppHeader";

type HeaderUserInfo = {
  nome: string;
  email: string;
  tel: string | null;
  role: string | null;
};

export default function SidebarLayout({
  children,
  userInfo
}: {
  children: React.ReactNode;
  userInfo: HeaderUserInfo;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
      ? "lg:ml-[290px]"
      : "lg:ml-[90px]";

  return (
    <div className="min-h-screen xl:flex">
      <AppSidebar />
      <Backdrop />

      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        <AppHeader 
          userInfo={userInfo}
        />
        {children}
      </div>
    </div>
  );
}

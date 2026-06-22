"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link, { useLinkStatus } from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
import {
  LayoutDashboard,
  CircleUserRound,
  GraduationCap,
  CalendarDays,
  ChevronDown,
  Component,
  BookOpenText,
  Ellipsis,
  FileUser,
  Shapes,
  MessageCircleQuestionMark
} from "lucide-react";

const supportWhatsappUrl =
  process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP_URL ?? "https://wa.me/";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: <LayoutDashboard />,
    name: "Dashboard",
    path: '/dashboard/home'
  },
  {
    name: "Alunos",
    icon: <CircleUserRound />,
    path: "/dashboard/alunos",
  },
  {
    name: "Professores",
    icon: <GraduationCap />,
    path: "/dashboard/professores",
  },
  {
    name: "Turmas",
    icon: <Component />,
    path: "/dashboard/turmas",
  },
  {
    name: "Aulas",
    icon: <BookOpenText />,
    subItems: [{ name: "Semana", path: "/dashboard/aulas/semana" }, { name: "Pendentes", path: "/dashboard/aulas/pendentes" }, { name: "Histórico", path: "/dashboard/aulas/historico" }],
  },

  {
    icon: <CalendarDays />,
    name: "Calendário",
    path: "/dashboard/calendario",
  },
  // {
  //   icon: <Settings />,
  //   name: "Configurações",
  //   path: "/dashboard/configuracoes",
  // },
  {
    icon: <Shapes />,
    name: "Modalidades",
    path: "/dashboard/modalidades",
  },
  {
    icon: <FileUser />,
    name: "Perfil",
    path: "/dashboard/perfil",
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const getSubmenuKey = (menuType: "main", index: number) =>
    `${menuType}-${index}`;

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "main"
  ) => (
    <ul className="flex flex-col gap-4">
      {navItems.map((nav, index) => {
        const submenuKey = getSubmenuKey(menuType, index);

        return (
          <li key={nav.name}>
            {nav.subItems ? (
              <button
                onClick={() => handleSubmenuToggle(index, menuType)}
                className={`menu-item group  ${openSubmenu?.type === menuType &&
                  openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
                  } cursor-pointer ${!isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "lg:justify-start"
                  }`}
              >
                <span
                  className={` ${openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                    }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className={`menu-item-text`}>{nav.name}</span>
                )}
                {(isExpanded || isHovered || isMobileOpen) && (
                  <ChevronDown
                    className={`ml-auto w-5 h-5 transition-transform duration-200  ${openSubmenu?.type === menuType &&
                      openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                      }`}
                  />
                )}
              </button>
            ) : (
              nav.path && (
                <Link
                  href={nav.path}
                  className={`menu-item group ${isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                    }`}
                >
                  <span
                    className={`${isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                      }`}
                  >
                    {nav.icon}
                  </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className={`menu-item-text`}>{nav.name}</span>
                )}
                {(isExpanded || isHovered || isMobileOpen) && (
                  <LinkPendingIndicator />
                )}
              </Link>
            )
          )}
            {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
              <div
                ref={(el) => {
                  subMenuRefs.current[submenuKey] = el;
                }}
                className="overflow-hidden transition-all duration-300"
                style={{
                  height:
                    openSubmenu?.type === menuType &&
                      openSubmenu?.index === index
                      ? `${subMenuHeight[submenuKey] ?? 0}px`
                      : "0px",
                }}
              >
                <ul className="mt-2 space-y-1 ml-9">
                  {nav.subItems.map((subItem) => (
                    <li key={subItem.name}>
                      <Link
                        href={subItem.path}
                        className={`menu-dropdown-item ${isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                          }`}
                      >
                        {subItem.name}
                        <span className="flex items-center gap-2 ml-auto">
                          <LinkPendingIndicator />
                          {subItem.new && (
                            <span
                              className={`ml-auto ${isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                                } menu-dropdown-badge `}
                            >
                              new
                            </span>
                          )}
                          {subItem.pro && (
                            <span
                              className={`ml-auto ${isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                                } menu-dropdown-badge `}
                            >
                              pro
                            </span>
                          )}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  const matchedSubmenu = (
    [
      { type: "main" as const, items: navItems },
    ] as const
  ).reduce<{ type: "main"; index: number } | null>(
    (found, menu) => {
      if (found) return found;

      const matchedIndex = menu.items.findIndex((nav) =>
        nav.subItems?.some((subItem) => isActive(subItem.path))
      );

      return matchedIndex >= 0 ? { type: menu.type, index: matchedIndex } : null;
    },
    null
  );

  useEffect(() => {
    // Quando a rota atual pertence a um subitem, abrimos automaticamente
    // o submenu correspondente. Isso evita o estado "travado" após navegação
    // para uma rota inexistente e retorno pelo histórico do navegador.
    if (!matchedSubmenu) return;

    setOpenSubmenu((currentOpenSubmenu) => {
      if (
        currentOpenSubmenu?.type === matchedSubmenu.type &&
        currentOpenSubmenu.index === matchedSubmenu.index
      ) {
        return currentOpenSubmenu;
      }

      return matchedSubmenu;
    });
  }, [matchedSubmenu]);

  useEffect(() => {
    // A altura do submenu precisa ser recalculada quando:
    // - o submenu abre/fecha
    // - a rota muda
    // - o layout muda entre expandido/hover/mobile
    //
    // Antes isso escutava só `openSubmenu`, então depois de navegação + back
    // o submenu podia continuar "aberto" no estado, mas com altura errada.
    const nextSubMenuHeights: Record<string, number> = {};

    for (const [key, element] of Object.entries(subMenuRefs.current)) {
      nextSubMenuHeights[key] = element?.scrollHeight ?? 0;
    }

    setSubMenuHeight(nextSubMenuHeights);
  }, [openSubmenu, pathname, isExpanded, isHovered, isMobileOpen]);

  const handleSubmenuToggle = (index: number, menuType: "main") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  return (
    <aside
      className={`fixed top-0 flex flex-col px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${isExpanded || isMobileOpen
          ? "w-[290px]"
          : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex  ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
          }`}
      >
        <Link href="/dashboard/home">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image
                src="/images/logotipo-preta.png"
                className="dark:hidden"
                alt="Logo"
                width={150}
                height={40}
              />
              <Image
                src="/images/logotipo-branca.png"
                className="hidden h-auto dark:block"
                alt="Logo"
                width={150}
                height={36}
              />
            </>
          ) : (
            <>
              <Image
                src="/images/logocmf.png"
                alt="Logo"
                width={90}
                height={40}
              />
            </>
          )}
        </Link>
      </div>
      <div className="no-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "justify-start"
                  }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <>
                    <Ellipsis />
                  </>
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>
          </div>
        </nav>

        {(isExpanded || isHovered || isMobileOpen) && (
          <aside className="mt-auto mb-5 rounded-2xl border border-sky-200 bg-sky-50/80 p-4 shadow-sm dark:border-sky-500/20 dark:bg-sky-500/10">
            <div className="flex size-10 items-center justify-center rounded-xl bg-white text-sky-700 shadow-sm dark:bg-gray-900 dark:text-sky-300">
              <MessageCircleQuestionMark className="size-5" />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">
              Precisa de ajuda?
            </h3>
            <p className="mt-1 text-xs leading-5 text-gray-600 dark:text-gray-300">
              Pensou em alguma melhoria do sistema?
            </p>
            <p className="mt-3 text-xs leading-5 text-gray-500 dark:text-gray-400">
              Entre em contato com o administrador do sistema.
            </p>

            <a
              href={supportWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#1FA2E1] px-3 text-sm font-medium text-white transition-colors hover:bg-[#178CC5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
            >
              <Image
                src="/whatsapp.svg"
                // className="size-4"
                alt="Logo WhatsApp"
                width={15}
                height={15}
              />
              WhatsApp
            </a>
          </aside>
        )}
      </div>
    </aside>
  );
};

function LinkPendingIndicator() {
  const { pending } = useLinkStatus();

  if (!pending) {
    return null;
  };

  return (
    <span
      className="size-2 shrink-0 animate-pulse rounded-full bg-sky-500 shadow-sm shadow-sky-500/40"
      aria-hidden="true"
    />
  );
};

export default AppSidebar;

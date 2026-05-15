"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import {
  LayoutDashboard,
  CircleUserRound,
  Users,
  GraduationCap,
  CalendarDays,
  Settings,
  ChevronDown,
  Component,
  BookOpenText,
  Ellipsis
} from "lucide-react";

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
    name: "Turmas",
    icon: <Users />,
  },
  {
    icon: <CalendarDays />,
    name: "Calendário",
    path: "/dashboard/calendario",
  },
  {
    icon: <Settings />,
    name: "Configurações",
    path: "/dashboard/configuracoes",
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
                        <span className="flex items-center gap-1 ml-auto">
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
                className="hidden dark:block"
                alt="Logo"
                width={150}
                height={40}
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
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
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
      </div>
    </aside>
  );
};

export default AppSidebar;

"use client";

import { TbSlash } from "react-icons/tb";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FiBell, FiSidebar } from "react-icons/fi";
import { SidebarTrigger } from "../ui/sidebar";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Input } from "../ui/input";

const routeMap: Record<string, string> = {
  dashboard: "/dashboard/overview",
  overview: "/dashboard/overview",
};

type RouteType = keyof typeof routeMap;

export const DashboardNavbar = () => {
  const pathname = usePathname();
  const routeArray = pathname?.split("/").slice(1) || [];

  return (
    <nav className="flex flex-row p-4 items-center justify-between border-b-[1px]">
      <SidebarTrigger className="flex md:hidden" />
      <div className="flex md:hidden gap-4 items-center">
        <button className="flex md:hidden">
          <FiBell size={20} />
        </button>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="hidden md:flex items-center gap-4">
        <SidebarTrigger Icon={FiSidebar} />
        <Breadcrumb>
          <BreadcrumbList>
            {routeArray?.map((item, i) => (
              <div className="flex items-center gap-2" key={i}>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={routeMap[item as RouteType] || "/dashboard/overview"}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {i !== routeArray.length - 1 && (
                  <BreadcrumbSeparator>
                    <TbSlash />
                  </BreadcrumbSeparator>
                )}
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="hidden md:flex items-center gap-4">
        <Input className="bg-gray-100" placeholder="Pesquisar ⌘/" />
      </div>
    </nav>
  );
};

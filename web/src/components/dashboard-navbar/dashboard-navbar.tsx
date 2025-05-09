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
import { Button } from "../ui/button";

const routeMap: Record<string, string> = {
  dashboard: "/dashboard/overview",
  overview: "/dashboard/overview",
};

type RouteType = keyof typeof routeMap;

const DashboardNavbar = () => {
  const pathname = usePathname();
  const routeArray = pathname?.split("/").slice(1) || [];

  return (
    <nav className="flex flex-row p-4 items-center justify-between border-b-[1px]">
      <SidebarTrigger className="flex md:hidden" />
      <div className="flex md:hidden gap-4 items-center">
        <Button variant="ghost" className="flex md:hidden">
          <FiBell size={20} />
        </Button>
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
        <p className="text-sm text-muted-foreground">
          Pesquise com{" "}
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </p>
        <Button variant="ghost" className="hidden md:flex">
          <FiBell size={24} />
        </Button>
      </div>
    </nav>
  );
};

export default DashboardNavbar;

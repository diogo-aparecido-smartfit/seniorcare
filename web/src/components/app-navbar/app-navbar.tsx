"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { Home, Sparkles, BarChart2, HelpCircle, MailIcon } from "lucide-react";

const items = [
  {
    title: "Início",
    url: "#",
    icon: Home,
  },
  {
    title: "Diferenciais",
    url: "#",
    icon: Sparkles,
  },
  {
    title: "Estatísticas",
    url: "#",
    icon: BarChart2,
  },
  {
    title: "FAQ",
    url: "#",
    icon: HelpCircle,
  },
  {
    title: "Contato",
    url: "#",
    icon: MailIcon,
  },
];

export const AppNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="w-full h-16">
      <SidebarProvider>
        <div
          className={`fixed top-0 left-0 w-full z-50 transition-all  bg-white ${
            isScrolled && "shadow-md border-b-[1px]"
          }`}
        >
          <div className="p-4  flex items-center justify-between max-w-[1440px] mx-auto">
            <button className="cursor-pointer">
              <p className="flex items-center">
                Senior<strong className="text-blue-600">Care</strong>
              </p>
            </button>
            <ul className="hidden lg:flex flex-row items-center gap-6">
              <li className="text-gray-500 font-medium hover:text-gray-400 transition-all">
                <Link href="">Início</Link>
              </li>
              <li className="text-gray-500 font-medium hover:text-gray-400 transition-all">
                <Link href="">Diferenciais</Link>
              </li>
              <li className="text-gray-500 font-medium hover:text-gray-400 transition-all">
                <Link href="">Estatísticas</Link>
              </li>
              <li className="text-gray-500 font-medium hover:text-gray-400 transition-all">
                <Link href="">FAQ</Link>
              </li>
              <li className="text-gray-500 font-medium hover:text-gray-400 transition-all">
                <Link href="">Contato</Link>
              </li>
              <div className="w-[1px] h-5 bg-gray-200 flex" />
              <li className="text-gray-500 font-medium hover:text-gray-400 transition-all">
                <Link href="">Entrar</Link>
              </li>
              <Button className="cursor-pointer bg-blue-600 hover:bg-blue-800">
                Comece agora
              </Button>
            </ul>
            <div className="  flex lg:hidden ">
              <SidebarTrigger />
            </div>
          </div>
          <div className="flex md:hidden">
            <Sidebar side="right">
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <a href={item.url}>
                              <item.icon />
                              <span>{item.title}</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
          </div>
        </div>
      </SidebarProvider>
    </nav>
  );
};

"use client";

import { GrOverview } from "react-icons/gr";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Calendar,
  DollarSign,
  Folder,
  FolderHeart,
  LogOut,
  Settings,
  Shield,
  User,
  Users,
} from "lucide-react";

const DashboardCommand = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const navigateTo = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <Command className="rounded-lg border shadow-md md:min-w-[450px]">
        <CommandInput placeholder="Digite um comando ou pesquise..." />
        <CommandList>
          <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>

          <CommandGroup heading="Dashboard">
            <CommandItem onSelect={() => navigateTo("/dashboard/overview")}>
              <GrOverview />

              <span>Visão Geral</span>
            </CommandItem>
            <CommandItem onSelect={() => navigateTo("/dashboard/elderly")}>
              <Users />
              <span>Idosos</span>
            </CommandItem>
            <CommandItem onSelect={() => navigateTo("/dashboard/schedules")}>
              <Calendar />
              <span>Agendamentos</span>
            </CommandItem>
            <CommandItem onSelect={() => navigateTo("/dashboard/schedules")}>
              <FolderHeart />
              <span>Histórico Médico</span>
            </CommandItem>
            <CommandItem onSelect={() => navigateTo("/dashboard/schedules")}>
              <Folder />
              <span>Documentos</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Administração">
            <CommandItem onSelect={() => navigateTo("/dashboard/schedules")}>
              <DollarSign />
              <span>Receita</span>
            </CommandItem>
            <CommandItem onSelect={() => navigateTo("/dashboard/schedules")}>
              <Shield />
              <span>Auditoria</span>
            </CommandItem>
            <CommandItem onSelect={() => navigateTo("/dashboard/schedules")}>
              <User />
              <span>Usuários</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Configurações">
            <CommandItem onSelect={() => navigateTo("/dashboard/profile")}>
              <User />
              <span>Perfil</span>
            </CommandItem>
            <CommandItem onSelect={() => navigateTo("/dashboard/settings")}>
              <Settings />
              <span>Configurações</span>
            </CommandItem>
            <CommandItem onSelect={() => navigateTo("/dashboard/logout")}>
              <LogOut />
              <span>Sair</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
};

export default DashboardCommand;

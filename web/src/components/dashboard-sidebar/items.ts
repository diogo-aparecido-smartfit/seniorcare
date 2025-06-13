import {
  BarChartBig,
  Clock,
  FileText,
  Home,
  LogOut,
  Settings,
  User,
  Users,
  Wallet,
  History,
} from "lucide-react";
import { IconType } from "react-icons/lib";

interface MenuItem {
  title: string;
  url: string;
  icon: IconType;
}

/**
 * Main navigation items for the dashboard
 */
export const mainItems: MenuItem[] = [
  {
    title: "Visão Geral",
    url: "/dashboard/overview",
    icon: Home,
  },
  {
    title: "Idosos",
    url: "/dashboard/elderly",
    icon: Users,
  },
  {
    title: "Agendamentos",
    url: "/dashboard/schedules",
    icon: Clock,
  },
  {
    title: "Histórico Médico",
    url: "/dashboard/medical-history",
    icon: History,
  },
];

/**
 * Management and operations items
 */
export const managementItems: MenuItem[] = [
  {
    title: "Documentos",
    url: "/dashboard/documents",
    icon: FileText,
  },
  {
    title: "Financeiro",
    url: "/dashboard/revenue",
    icon: Wallet,
  },
  {
    title: "Relatórios",
    url: "/dashboard/audit",
    icon: BarChartBig,
  },
  {
    title: "Usuários",
    url: "/dashboard/users",
    icon: User,
  },
];

/**
 * Settings and utility items
 */
export const settingsItems: MenuItem[] = [
  {
    title: "Configurações",
    url: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Sair",
    url: "/auth/signin",
    icon: LogOut,
  },
];

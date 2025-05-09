import {
  Calendar,
  Home,
  Users,
  FolderHeart,
  Folder,
  DollarSign,
  Shield,
  User,
  Settings,
  LogOut,
} from "lucide-react";

export const mainItems = [
  {
    title: "Início",
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
    icon: Calendar,
  },
  {
    title: "Histórico médico",
    url: "/dashboard/medical-history",
    icon: FolderHeart,
  },
  {
    title: "Documentos",
    url: "/dashboard/documents",
    icon: Folder,
  },
];

export const managementItems = [
  {
    title: "Receita",
    url: "/dashboard/revenue",
    icon: DollarSign,
  },

  {
    title: "Auditoria",
    url: "/dashboard/audit",
    icon: Shield,
  },
  {
    title: "Usuários",
    url: "/dashboard/users",
    icon: User,
  },
];

export const settingsItems = [
  {
    title: "Settings",
    url: "/dashboard/documents",
    icon: Settings,
  },
  {
    title: "Sair",
    url: "/dashboard/logout",
    icon: LogOut,
  },
];

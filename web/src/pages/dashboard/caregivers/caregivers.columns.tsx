"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Caregiver } from "@/services/services";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface DataTableColumnProps {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const columns = ({
  onEdit,
  onDelete,
}: DataTableColumnProps): ColumnDef<Caregiver>[] => {
  return [
    {
      accessorKey: "user.name",
      header: "Nome",
      cell: ({ row }) => {
        const caregiver = row.original;
        const initials = caregiver.user.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase();

        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="font-medium">{caregiver.user.name}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "user.email",
      header: "Email",
    },
    {
      accessorKey: "specialty",
      header: "Especialidade",
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const caregiver = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onEdit(caregiver.id)}>
                <Edit className="mr-2 h-4 w-4" /> Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(caregiver.id)}>
                <Trash className="mr-2 h-4 w-4" /> Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};

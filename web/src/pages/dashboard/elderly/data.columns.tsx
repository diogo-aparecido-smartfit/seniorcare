"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Elderly } from "@/services/elderly";

interface DataColumnsProps {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const columns = ({ onEdit, onDelete }: DataColumnsProps) => {
  const columns: ColumnDef<Elderly>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          className="cursor-pointer"
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          className="cursor-pointer"
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "avatar",
      header: () => null,
      cell: ({ row }) => {
        const elderly = row.original;
        return (
          <Avatar>
            <AvatarImage src={elderly.photo} />
            <AvatarFallback>
              {elderly.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </AvatarFallback>
          </Avatar>
        );
      },
      enableSorting: false,
    },
    {
      id: "name",
      accessorKey: "name",
      header: "Nome",
    },
    {
      id: "age",
      accessorKey: "age",
      header: "Idade",
    },
    {
      id: "gender",
      accessorKey: "gender",
      header: "Gênero",
    },
    {
      id: "roomNumber",
      accessorKey: "roomNumber",
      header: "Quarto",
    },
    {
      id: "healthStatus",
      accessorKey: "healthStatus",
      header: "Status de Saúde",
      cell: ({ row }) => {
        const status = row.getValue("healthStatus") as string;
        let color = "default";

        switch (status.toLowerCase()) {
          case "estável":
          case "stable":
            color = "green";
            break;
          case "crítico":
          case "critical":
            color = "red";
            break;
          case "melhorando":
          case "improving":
            color = "blue";
            break;
          case "piorando":
          case "declining":
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            color = "yellow";
            break;
        }

        return <Badge variant="outline">{status}</Badge>;
      },
    },
    {
      id: "contactInfo",
      accessorKey: "contactInfo.primaryContact",
      header: "Contato Principal",
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const elderly = row.original;

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
              <DropdownMenuItem onClick={() => onEdit(elderly.id)}>
                <Pencil className="mr-2 h-4 w-4" /> Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(elderly.id)}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" /> Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns;
};

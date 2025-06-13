"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2, UserRound, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Elderly } from "@/services/services";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DataColumnsProps {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

// Helper function to calculate age from birthdate
const calculateAge = (birthDate: string): number => {
  const today = new Date();
  const birthDateObj = new Date(birthDate);
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDiff = today.getMonth() - birthDateObj.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
  ) {
    age--;
  }

  return age;
};

export const columns = ({
  onEdit,
  onDelete,
  onViewDetails,
}: DataColumnsProps) => {
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
            <AvatarFallback className="bg-blue-100 text-blue-600">
              {elderly.name
                ?.split(" ")
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
      header: "Idade",
      cell: ({ row }) => {
        const birthDate = row.original.birthDate;
        if (!birthDate) return "-";
        return `${calculateAge(birthDate)} anos`;
      },
    },
    {
      id: "emergencyContact",
      accessorKey: "emergencyContact",
      header: "Contato de Emergência",
    },
    {
      id: "address",
      accessorKey: "address",
      header: "Endereço",
      cell: ({ row }) => {
        const address = row.original.address;
        if (!address) return "-";

        // Truncate long addresses for display
        return address.length > 30 ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>{address.substring(0, 30)}...</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{address}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          address
        );
      },
    },
    {
      id: "caregivers",
      header: "Cuidadores",
      cell: ({ row }) => {
        const caregivers = row.original.caregivers || [];

        if (caregivers.length === 0) return "-";

        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center">
                  <UserRound className="h-4 w-4 mr-1" />
                  <span>{caregivers.length}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <ul className="list-disc pl-4">
                  {caregivers.map((caregiver) => (
                    <li key={caregiver.id}>{caregiver.user?.name}</li>
                  ))}
                </ul>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
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
              {onViewDetails && (
                <DropdownMenuItem onClick={() => onViewDetails(elderly.id)}>
                  <Users className="mr-2 h-4 w-4" /> Ver detalhes
                </DropdownMenuItem>
              )}
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

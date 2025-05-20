"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export type DataType = {
  id: string;
  full_name: string;
  birthdate: string;
  address: string;
  responsible_caregiver: string;
  emergency_contact: string;
  status: "pending" | "processing" | "success" | "failed";
};

export const columns: ColumnDef<DataType>[] = [
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
  },
  {
    id: "avatar",
    header: () => null,
    cell: () => (
      <Avatar>
        <AvatarImage src="https://images.pexels.com/photos/11495979/pexels-photo-11495979.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
  },
  {
    id: "full_name",
    accessorKey: "full_name",
    header: "Nome",
  },
  {
    id: "birthdate",
    accessorKey: "birthdate",
    header: "Data de nascimento",
  },
  {
    id: "address",
    accessorKey: "address",
    header: "Endereço",
  },
  {
    id: "responsible_caregiver",
    accessorKey: "responsible_caregiver",
    header: "Cuidador responsável",
  },
  {
    id: "emergency_contact",
    accessorKey: "emergency_contact",
    header: "Contato de emergência",
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="secondary">{row.getValue("status")}</Badge>
    ),
  },
];

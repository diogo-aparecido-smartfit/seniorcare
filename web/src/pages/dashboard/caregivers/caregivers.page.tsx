"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { columns } from "./caregivers.columns";
import { DataTable } from "@/components/data-table/data-table";
import { FiPlus } from "react-icons/fi";
import { CaregiverDialog } from "@/components/caregiver-dialog/caregiver-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useCaregiverList } from "@/hooks/useCaregiverList";
import { useDeleteCaregiver } from "@/hooks/useDeleteCaregiver";

export default function CaregiversPage() {
  const [open, setOpen] = useState(false);
  const [selectedCaregiver, setSelectedCaregiver] = useState<string | null>(
    null
  );

  const { data: caregivers = [], isLoading, error } = useCaregiverList();
  const deleteCaregiverMutation = useDeleteCaregiver();

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este cuidador?")) {
      try {
        await deleteCaregiverMutation.mutateAsync(id);
      } catch (error) {
        console.error("Error deleting caregiver:", error);
      }
    }
  };

  const handleEdit = (id: string) => {
    setSelectedCaregiver(id);
    setOpen(true);
  };

  const handleAddNew = () => {
    setSelectedCaregiver(null);
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
    setSelectedCaregiver(null);
  };

  if (error) {
    return (
      <section className="flex flex-col p-7 gap-7">
        <div className="p-4 bg-red-100 text-red-800 rounded-md">
          Erro ao carregar dados: {(error as Error).message}
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col p-7 gap-7">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gerenciamento de Cuidadores</h1>
        <Button
          onClick={handleAddNew}
          className="bg-blue-600 hover:bg-blue-800"
        >
          <FiPlus className="mr-2" />
          Adicionar Cuidador
        </Button>
      </div>

      {isLoading ? (
        <Skeleton className="h-[600px] w-full" />
      ) : (
        <DataTable
          columns={columns({ onDelete: handleDelete, onEdit: handleEdit })}
          data={caregivers}
        />
      )}

      <CaregiverDialog
        open={open}
        onOpenChange={setOpen}
        caregiverId={selectedCaregiver}
        onClose={handleDialogClose}
      />
    </section>
  );
}

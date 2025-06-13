"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { columns } from "./data.columns";
import { DataTable } from "@/components/data-table/data-table";
import { FiPlus } from "react-icons/fi";
import { ElderlyDialog } from "@/components/elderly-dialog/elderly-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useElderlyList } from "@/hooks/useElderlyList";
import { useDeleteElderly } from "@/hooks/useDeleteElderly";
import { toast } from "sonner";

export default function ElderlyPage() {
  const [open, setOpen] = useState(false);
  const [selectedElderly, setSelectedElderly] = useState<string | null>(null);

  const { data: elderly = [], isLoading, error } = useElderlyList();
  const deleteElderlyMutation = useDeleteElderly();

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este idoso?")) {
      try {
        await deleteElderlyMutation.mutateAsync(id);
      } catch (error) {
        console.error("Error deleting elderly:", error);
        toast("Erro ao deletar idoso, tente novamente mais tarde.");
      }
    }
  };

  const handleEdit = (id: string) => {
    setSelectedElderly(id);
    setOpen(true);
  };

  const handleAddNew = () => {
    setSelectedElderly(null);
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
    setSelectedElderly(null);
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
        <h1 className="text-2xl font-bold">Gerenciamento de Idosos</h1>
        <Button
          onClick={handleAddNew}
          className="bg-blue-600 hover:bg-blue-800"
        >
          <FiPlus className="mr-2" />
          Adicionar Idoso
        </Button>
      </div>

      {isLoading ? (
        <Skeleton className="h-[600px] w-full" />
      ) : (
        <DataTable
          columns={columns({ onDelete: handleDelete, onEdit: handleEdit })}
          data={elderly}
        />
      )}

      <ElderlyDialog
        open={open}
        onOpenChange={setOpen}
        elderlyId={selectedElderly}
        onClose={handleDialogClose}
      />
    </section>
  );
}

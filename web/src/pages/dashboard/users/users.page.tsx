"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { columns } from "./users.columns";
import { DataTable } from "@/components/data-table/data-table";
import { FiPlus } from "react-icons/fi";
import { UserDialog } from "@/components/user-dialog/user-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserList } from "@/hooks/useUserList";
import { useDeleteUser } from "@/hooks/useDeleteUser";
import { useAuth } from "@/contexts/AuthContext";

export default function UsersPage() {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const { user: currentUser } = useAuth();

  // Use React Query hooks
  const { data: users = [], isLoading, error } = useUserList();
  const deleteUserMutation = useDeleteUser();

  const handleDelete = async (id: string) => {
    // Prevent deleting yourself
    if (id === currentUser?.id) {
      alert("Você não pode excluir sua própria conta.");
      return;
    }

    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      try {
        await deleteUserMutation.mutateAsync(id);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleEdit = (id: string) => {
    setSelectedUser(id);
    setOpen(true);
  };

  const handleAddNew = () => {
    setSelectedUser(null);
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
    setSelectedUser(null);
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
        <h1 className="text-2xl font-bold">Gerenciamento de Usuários</h1>
        <Button
          onClick={handleAddNew}
          className="bg-blue-600 hover:bg-blue-800"
        >
          <FiPlus className="mr-2" />
          Adicionar Usuário
        </Button>
      </div>

      {isLoading ? (
        <Skeleton className="h-[600px] w-full" />
      ) : (
        <DataTable
          columns={columns({ onDelete: handleDelete, onEdit: handleEdit })}
          data={users}
        />
      )}

      <UserDialog
        open={open}
        onOpenChange={setOpen}
        userId={selectedUser}
        onClose={handleDialogClose}
      />
    </section>
  );
}

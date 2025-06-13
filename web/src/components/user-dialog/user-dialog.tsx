"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/services/services";
import { useUserDetails } from "@/hooks/useUserDetails";
import { useCreateUser } from "@/hooks/useCreateUser";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { ApiSelect } from "@/components/ui/api-select";

interface UserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string | null;
  onClose: () => void;
}

// Role options for the dropdown
const roleOptions = [
  { id: "ADMIN", name: "Administrador" },
  { id: "CAREGIVER", name: "Cuidador" },
  { id: "FAMILY", name: "Família" },
];

export function UserDialog({
  open,
  onOpenChange,
  userId,
  onClose,
}: UserDialogProps) {
  const { user: currentUser } = useAuth();
  const { data: userDetails, isLoading: detailsLoading } = useUserDetails(
    userId || ""
  );
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const [selectedRole, setSelectedRole] = useState<string | null>("CAREGIVER");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Partial<User>>();

  useEffect(() => {
    if (open && userDetails) {
      reset(userDetails);
      setSelectedRole(userDetails.role || "CAREGIVER");
    } else if (open) {
      reset({
        name: "",
        email: "",
        organizationId: currentUser?.organizationId || "",
      });
      setSelectedRole("CAREGIVER");
    }
  }, [open, userDetails, reset, currentUser]);

  const onSubmit = async (data: Partial<User>) => {
    try {
      const formData = {
        ...data,
        role: selectedRole,
      };

      if (userId) {
        await updateUser.mutateAsync({
          id: userId,
          data: { ...formData, role: selectedRole || undefined },
        });
      } else {
        await createUser.mutateAsync({
          ...formData,
          role: selectedRole || undefined,
        });
      }
      toast.success(
        userId
          ? "Usuário atualizado com sucesso!"
          : "Usuário criado com sucesso!"
      );
      onClose();
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
      toast.error("Erro ao salvar usuário");
    }
  };

  const isLoading =
    detailsLoading ||
    isSubmitting ||
    createUser.isPending ||
    updateUser.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {userId ? "Editar Usuário" : "Adicionar Usuário"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input
                id="name"
                {...register("name", { required: "Nome é obrigatório" })}
                className="col-span-3"
                disabled={isLoading}
              />
              {errors.name && (
                <p className="text-red-500 text-sm col-span-3 col-start-2">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email", { required: "Email é obrigatório" })}
                className="col-span-3"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-red-500 text-sm col-span-3 col-start-2">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                {...register("password", { required: "Senha é obrigatório" })}
                className="col-span-3"
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-red-500 text-sm col-span-3 col-start-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Função
              </Label>
              <div className="col-span-3">
                <ApiSelect
                  items={roleOptions}
                  value={selectedRole}
                  onChange={(value) => {
                    setSelectedRole(value);
                    setValue("role", value as string);
                  }}
                  displayField="name"
                  placeholder="Selecione uma função"
                  emptyMessage="Nenhuma função encontrada"
                  disabled={isLoading}
                />
              </div>
              {errors.role && (
                <p className="text-red-500 text-sm col-span-3 col-start-2">
                  {errors.role.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-800"
              disabled={isLoading}
            >
              {isLoading ? "Salvando..." : userId ? "Salvar" : "Adicionar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

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
import { useCreateCaregiver } from "@/hooks/useCreateCaregiver";
import { useCreateFamilyMember } from "@/hooks/useCreateFamilyMember";
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
  const createCaregiver = useCreateCaregiver();
  const createFamilyMember = useCreateFamilyMember();
  const [selectedRole, setSelectedRole] = useState<string | null>("CAREGIVER");

  // Add state for specialty/relationship fields
  const [specialty, setSpecialty] = useState<string>("");
  const [relationship, setRelationship] = useState<string>("");

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

      // Reset specialty/relationship fields
      setSpecialty("");
      setRelationship("");
    } else if (open) {
      reset({
        name: "",
        email: "",
        organizationId: currentUser?.organizationId || "",
      });
      setSelectedRole("CAREGIVER");

      // Reset specialty/relationship fields
      setSpecialty("");
      setRelationship("");
    }
  }, [open, userDetails, reset, currentUser]);

  const onSubmit = async (data: Partial<User>) => {
    try {
      const formData = {
        ...data,
        role: selectedRole,
      };

      if (userId) {
        // Update existing user
        await updateUser.mutateAsync({
          id: userId,
          data: { ...formData, role: selectedRole || undefined },
        });

        toast.success("Usuário atualizado com sucesso!");
      } else {
        const createdUser = await createUser.mutateAsync({
          ...formData,
          role: selectedRole || undefined,
        });

        if (createdUser.id) {
          if (selectedRole === "CAREGIVER") {
            await createCaregiver.mutateAsync({
              userId: createdUser.id,
              organizationId: createdUser.organizationId,
              specialty: specialty || "Geral",
            });
          } else if (selectedRole === "FAMILY") {
            await createFamilyMember.mutateAsync({
              userId: createdUser.id,
              relationship: relationship || "Familiar",
              organizationId: createdUser.organizationId,
            });
          }
        }

        toast.success("Usuário criado com sucesso!");
      }
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
    updateUser.isPending ||
    createCaregiver.isPending ||
    createFamilyMember.isPending;

  const showSpecialtyField = !userId && selectedRole === "CAREGIVER";

  const showRelationshipField = !userId && selectedRole === "FAMILY";

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
            <div className="flex flex-col w-full gap-4">
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

            <div className="flex flex-col w-full gap-4">
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

            <div className="flex flex-col w-full gap-4">
              <Label htmlFor="password" className="text-right">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                {...register("password", {
                  required: userId ? false : "Senha é obrigatória",
                })}
                className="col-span-3"
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-red-500 text-sm col-span-3 col-start-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex flex-col w-full gap-4">
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
                  disabled={isLoading || !!userId} // Disable role change for existing users
                />
              </div>
              {errors.role && (
                <p className="text-red-500 text-sm col-span-3 col-start-2">
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* Show specialty field for caregivers */}
            {showSpecialtyField && (
              <div className="flex flex-col w-full gap-4">
                <Label htmlFor="specialty" className="text-right">
                  Especialidade
                </Label>
                <Input
                  id="specialty"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="col-span-3"
                  disabled={isLoading}
                  placeholder="Ex: Enfermagem, Fisioterapia"
                />
              </div>
            )}

            {/* Show relationship field for family members */}
            {showRelationshipField && (
              <div className="flex flex-col w-full gap-4">
                <Label htmlFor="relationship" className="text-right">
                  Parentesco
                </Label>
                <Input
                  id="relationship"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="col-span-3"
                  disabled={isLoading}
                  placeholder="Ex: Filho(a), Cônjuge, Neto(a)"
                />
              </div>
            )}
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

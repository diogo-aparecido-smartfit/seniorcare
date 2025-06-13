"use client";

import { useEffect } from "react";
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
import { Caregiver } from "@/services/services";
import { useCaregiverDetails } from "@/hooks/useCaregiverDetails";
import { useCreateCaregiver } from "@/hooks/useCreateCaregiver";
import { useUpdateCaregiver } from "@/hooks/useUpdateCaregiver";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface CaregiverDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  caregiverId: string | null;
  onClose: () => void;
}

export function CaregiverDialog({
  open,
  onOpenChange,
  caregiverId,
  onClose,
}: CaregiverDialogProps) {
  const { user } = useAuth();
  const { data: caregiverDetails } = useCaregiverDetails(caregiverId || "");
  const createCaregiver = useCreateCaregiver();
  const updateCaregiver = useUpdateCaregiver();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<Caregiver>>();

  useEffect(() => {
    if (open && caregiverDetails) {
      reset({
        specialty: caregiverDetails.specialty,
        user: caregiverDetails.user,
      });
    } else if (open) {
      reset({
        specialty: "",
        user: {
          id: "",
          name: "",
          email: "",
        },
      });
    }
  }, [open, caregiverDetails, reset]);

  const onSubmit = async (data: Partial<Caregiver>) => {
    try {
      const formattedData = {
        ...data,
        organization: {
          id: user?.organizationId || "",
          name: user?.organizationId || "Default Name",
          domain: user?.organizationId || "default.domain",
        },
      };

      if (caregiverId) {
        await updateCaregiver.mutateAsync({
          id: caregiverId,
          data: formattedData,
        });
      } else {
        await createCaregiver.mutateAsync({
          userId: data.user?.id || "",
          organizationId: user?.organizationId || "",
          specialty: data.specialty || "",
        });
      }
      onClose();
    } catch (error) {
      console.error("Erro ao salvar cuidador:", error);
      toast.error("Erro ao salvar cuidador");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {caregiverId ? "Editar Cuidador" : "Adicionar Cuidador"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="userName" className="text-right">
                Nome
              </Label>
              <Input
                id="userName"
                {...register("user.name", { required: "Nome é obrigatório" })}
                className="col-span-3"
              />
              {errors.user?.name && (
                <p className="text-red-500 text-sm col-span-3 col-start-2">
                  {errors.user.name.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="userEmail" className="text-right">
                Email
              </Label>
              <Input
                id="userEmail"
                type="email"
                {...register("user.email", { required: "Email é obrigatório" })}
                className="col-span-3"
              />
              {errors.user?.email && (
                <p className="text-red-500 text-sm col-span-3 col-start-2">
                  {errors.user.email.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="specialty" className="text-right">
                Especialidade
              </Label>
              <Input
                id="specialty"
                {...register("specialty", {
                  required: "Especialidade é obrigatória",
                })}
                className="col-span-3"
              />
              {errors.specialty && (
                <p className="text-red-500 text-sm col-span-3 col-start-2">
                  {errors.specialty.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-800"
              disabled={createCaregiver.isPending || updateCaregiver.isPending}
            >
              {createCaregiver.isPending || updateCaregiver.isPending
                ? "Salvando..."
                : caregiverId
                ? "Salvar"
                : "Adicionar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

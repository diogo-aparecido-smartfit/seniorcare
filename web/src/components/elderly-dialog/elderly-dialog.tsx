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
import { Textarea } from "@/components/ui/textarea";
import { Elderly } from "@/services/services";
import { useElderlyDetails } from "@/hooks/useElderlyDetails";
import { useCreateElderly } from "@/hooks/useCreateElderly";
import { useUpdateElderly } from "@/hooks/useUpdateElderly";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { ApiSelect } from "../ui/api-select";
import { useCaregiverList } from "@/hooks/useCaregiverList";
import { useUnlinkCaregiver } from "@/hooks/useUnlinkCaregiver";
import { useLinkCaregiver } from "@/hooks/useLinkCaregiver";

interface ElderlyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  elderlyId: string | null;
  onClose: () => void;
}

export function ElderlyDialog({
  open,
  onOpenChange,
  elderlyId,
  onClose,
}: ElderlyDialogProps) {
  const { data: elderlyDetails, isLoading: detailsLoading } = useElderlyDetails(
    elderlyId || ""
  );
  const createElderly = useCreateElderly();
  const updateElderly = useUpdateElderly();
  const linkCaregiver = useLinkCaregiver();
  const unlinkCaregiver = useUnlinkCaregiver();
  const { user } = useAuth();
  const { data: caregivers = [], isLoading: caregiversLoading } =
    useCaregiverList();

  const [selectedCaregiver, setSelectedCaregiver] = useState<string | null>(
    null
  );
  const [initialCaregiver, setInitialCaregiver] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Omit<Elderly, "id" | "caregivers" | "familyMembers">>();

  useEffect(() => {
    if (open && elderlyDetails) {
      reset({
        name: elderlyDetails.name,
        birthDate: elderlyDetails.birthDate,
        emergencyContact: elderlyDetails.emergencyContact,
        address: elderlyDetails.address,
        organizationId: elderlyDetails.organizationId,
      });

      // Set selected caregiver if any
      if (elderlyDetails.caregivers && elderlyDetails.caregivers.length > 0) {
        const currentCaregiverId = elderlyDetails.caregivers[0].id;
        setSelectedCaregiver(currentCaregiverId);
        setInitialCaregiver(currentCaregiverId);
      } else {
        setSelectedCaregiver(null);
        setInitialCaregiver(null);
      }
    } else if (open && user) {
      reset({
        name: "",
        birthDate: new Date().toISOString().split("T")[0],
        emergencyContact: "",
        address: "",
        organizationId: user.organizationId,
      });
      setSelectedCaregiver(null);
      setInitialCaregiver(null);
    }
  }, [open, elderlyDetails, reset, user]);

  const onSubmit = async (
    data: Omit<Elderly, "id" | "caregivers" | "familyMembers">
  ) => {
    try {
      const formData = {
        ...data,
      };

      if (elderlyId) {
        await updateElderly.mutateAsync({ id: elderlyId, data: formData });

        if (selectedCaregiver !== initialCaregiver) {
          if (initialCaregiver) {
            await unlinkCaregiver.mutateAsync({
              elderlyId,
              caregiverId: initialCaregiver,
            });
          }

          if (selectedCaregiver) {
            await linkCaregiver.mutateAsync({
              elderlyId,
              caregiverId: selectedCaregiver,
            });
          }
        }

        toast.success("Idoso atualizado com sucesso!");
      } else {
        const newElderly = await createElderly.mutateAsync(formData);

        if (selectedCaregiver && newElderly.id) {
          await linkCaregiver.mutateAsync({
            elderlyId: newElderly.id,
            caregiverId: selectedCaregiver,
          });
        }

        toast.success("Idoso criado com sucesso!");
      }
      onClose();
    } catch (error) {
      console.error("Erro ao salvar idoso:", error);
      toast.error("Erro ao salvar idoso");
    }
  };

  const isLoading =
    detailsLoading ||
    caregiversLoading ||
    isSubmitting ||
    linkCaregiver.isPending ||
    unlinkCaregiver.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {elderlyId ? "Editar Idoso" : "Adicionar Idoso"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-start gap-4 py-4">
            <div className="flex flex-col w-full gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                {...register("name", { required: "Nome é obrigatório" })}
                disabled={isLoading}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="flex flex-col w-full gap-2">
              <Label htmlFor="birthDate">Data de Nascimento</Label>
              <Input
                id="birthDate"
                type="date"
                {...register("birthDate", {
                  required: "Data de nascimento é obrigatória",
                })}
                disabled={isLoading}
              />
              {errors.birthDate && (
                <p className="text-sm text-red-500">
                  {errors.birthDate.message}
                </p>
              )}
            </div>

            <div className="flex flex-col w-full gap-2">
              <Label htmlFor="emergencyContact">Contato de Emergência</Label>
              <Input
                id="emergencyContact"
                {...register("emergencyContact", {
                  required: "Contato de emergência é obrigatório",
                })}
                disabled={isLoading}
              />
              {errors.emergencyContact && (
                <p className="text-sm text-red-500">
                  {errors.emergencyContact.message}
                </p>
              )}
            </div>

            <div className="flex flex-col w-full gap-2">
              <Label htmlFor="address">Endereço</Label>
              <Textarea
                id="address"
                {...register("address", { required: "Endereço é obrigatório" })}
                disabled={isLoading}
              />
              {errors.address && (
                <p className="text-sm text-red-500">{errors.address.message}</p>
              )}
            </div>

            <div className="flex flex-col w-full gap-2">
              <Label htmlFor="caregiver">Cuidador Principal</Label>
              <ApiSelect
                items={caregivers}
                value={selectedCaregiver}
                onChange={setSelectedCaregiver}
                displayField="user.name"
                placeholder="Selecione um cuidador"
                emptyMessage="Nenhum cuidador encontrado"
                loading={caregiversLoading}
                disabled={isLoading}
              />
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
              {isLoading ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                  Salvando...
                </>
              ) : (
                "Salvar"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

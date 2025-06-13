import { useMutation, useQueryClient } from "@tanstack/react-query";
import { caregiverService, Caregiver } from "@/services/services";
import { toast } from "sonner";

export function useCreateCaregiver() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Caregiver>) => caregiverService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["caregivers"] });
      toast.success("Cuidador adicionado com sucesso!");
    },
    onError: (error) => {
      toast.error(`Erro ao criar cuidador: ${error.message}`);
    },
  });
}

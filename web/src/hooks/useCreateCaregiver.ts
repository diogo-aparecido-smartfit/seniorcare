import { useMutation, useQueryClient } from "@tanstack/react-query";
import { caregiverService } from "@/services/services";
import { toast } from "sonner";

interface CreateCaregiverData {
  userId: string;
  organizationId: string;
  specialty?: string;
}

export function useCreateCaregiver() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCaregiverData) => caregiverService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["caregivers"] });
      toast.success("Cuidador adicionado com sucesso!");
    },
    onError: (error) => {
      toast.error(`Erro ao criar cuidador: ${error.message}`);
    },
  });
}

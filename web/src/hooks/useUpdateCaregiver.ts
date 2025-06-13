import { useMutation, useQueryClient } from "@tanstack/react-query";
import { caregiverService, Caregiver } from "@/services/services";
import { toast } from "sonner";

interface UpdateCaregiverParams {
  id: string;
  data: Partial<Caregiver>;
}

export function useUpdateCaregiver() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateCaregiverParams) =>
      caregiverService.update(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["caregivers"] });
      queryClient.invalidateQueries({ queryKey: ["caregivers", variables.id] });
      toast.success("Cuidador atualizado com sucesso!");
    },
    onError: (error) => {
      toast.error(`Erro ao atualizar cuidador: ${error.message}`);
    },
  });
}

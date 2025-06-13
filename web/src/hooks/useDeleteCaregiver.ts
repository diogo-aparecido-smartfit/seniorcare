import { useMutation, useQueryClient } from "@tanstack/react-query";
import { caregiverService } from "@/services/services";
import { toast } from "sonner";

export function useDeleteCaregiver() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => caregiverService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["caregivers"] });
      toast.success("Cuidador removido com sucesso!");
    },
    onError: (error) => {
      toast.error(`Erro ao remover cuidador: ${error.message}`);
    },
  });
}

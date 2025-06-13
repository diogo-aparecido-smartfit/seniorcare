import { useMutation, useQueryClient } from "@tanstack/react-query";
import { elderlyService } from "@/services/services";
import { toast } from "sonner";

export function useDeleteElderly() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => elderlyService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["elderly"] });
      toast.success("Idoso removido com sucesso!");
    },
    onError: (error) => {
      toast.error(`Erro ao remover idoso: ${error.message}`);
    },
  });
}

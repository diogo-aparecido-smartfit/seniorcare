import { useMutation, useQueryClient } from "@tanstack/react-query";
import { elderlyService, Elderly } from "@/services/services";
import { toast } from "sonner";

export function useCreateElderly() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Elderly>) => elderlyService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["elderly"] });
      toast.success("Idoso adicionado com sucesso!");
    },
    onError: (error) => {
      toast.error(`Erro ao criar idoso: ${error.message}`);
    },
  });
}

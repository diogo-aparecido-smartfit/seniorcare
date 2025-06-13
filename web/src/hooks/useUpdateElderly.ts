import { useMutation, useQueryClient } from "@tanstack/react-query";
import { elderlyService, Elderly } from "@/services/services";
import { toast } from "sonner";

interface UpdateElderlyParams {
  id: string;
  data: Partial<Elderly>;
}

export function useUpdateElderly() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateElderlyParams) =>
      elderlyService.update(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["elderly"] });
      queryClient.invalidateQueries({ queryKey: ["elderly", variables.id] });
      toast.success("Idoso atualizado com sucesso!");
    },
    onError: (error) => {
      toast.error(`Erro ao atualizar idoso: ${error.message}`);
    },
  });
}

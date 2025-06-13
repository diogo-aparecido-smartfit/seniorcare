import { useMutation, useQueryClient } from "@tanstack/react-query";
import { elderlyService } from "@/services/services";
import { toast } from "sonner";

interface LinkCaregiverParams {
  elderlyId: string;
  caregiverId: string;
}

export function useLinkCaregiver() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ elderlyId, caregiverId }: LinkCaregiverParams) =>
      elderlyService.linkCaregiver(elderlyId, caregiverId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["elderly"] });
      queryClient.invalidateQueries({
        queryKey: ["elderly", variables.elderlyId],
      });
      toast.success("Cuidador vinculado com sucesso");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Erro ao vincular cuidador");
    },
  });
}

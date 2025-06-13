import { useMutation, useQueryClient } from "@tanstack/react-query";
import { elderlyService } from "@/services/services";
import { toast } from "sonner";

interface UnlinkCaregiverParams {
  elderlyId: string;
  caregiverId: string;
}

export function useUnlinkCaregiver() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ elderlyId, caregiverId }: UnlinkCaregiverParams) =>
      elderlyService.unlinkCaregiver(elderlyId, caregiverId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["elderly"] });
      queryClient.invalidateQueries({
        queryKey: ["elderly", variables.elderlyId],
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Erro ao desvincular cuidador"
      );
    },
  });
}

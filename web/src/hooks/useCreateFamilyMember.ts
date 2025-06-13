import { useMutation, useQueryClient } from "@tanstack/react-query";
import { familyMemberService } from "@/services/services";
import { toast } from "sonner";

interface CreateFamilyMemberData {
  userId: string;
  relationship: string;
  elderlyId?: string;
  organizationId: string;
}

export function useCreateFamilyMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateFamilyMemberData) =>
      familyMemberService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["familyMembers"] });
    },
    onError: (error) => {
      toast.error(`Erro ao criar vínculo familiar: ${error.message}`);
    },
  });
}

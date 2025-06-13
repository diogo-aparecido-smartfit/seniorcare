import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService, User } from "@/services/services";
import { toast } from "sonner";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<User>) => userService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Usuário adicionado com sucesso!");
    },
    onError: (error) => {
      toast.error(`Erro ao criar usuário: ${error.message}`);
    },
  });
}

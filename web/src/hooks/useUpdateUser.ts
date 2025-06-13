import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService, User } from "@/services/services";
import { toast } from "sonner";

interface UpdateUserParams {
  id: string;
  data: Partial<User>;
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateUserParams) =>
      userService.update(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["users", variables.id] });
      toast.success("Usuário atualizado com sucesso!");
    },
    onError: (error) => {
      toast.error(`Erro ao atualizar usuário: ${error.message}`);
    },
  });
}

import { useQuery } from "@tanstack/react-query";
import { userService, User } from "@/services/services";

export function useUserDetails(id: string) {
  return useQuery<User, Error>({
    queryKey: ["users", id],
    queryFn: () => userService.getById(id),
    enabled: !!id,
  });
}

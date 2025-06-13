import { useQuery } from "@tanstack/react-query";
import { userService, User } from "@/services/services";

export function useUserList() {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: userService.getAll,
  });
}

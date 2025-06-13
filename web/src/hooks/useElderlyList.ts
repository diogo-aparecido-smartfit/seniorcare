import { useQuery } from "@tanstack/react-query";
import { elderlyService, Elderly } from "@/services/services";

export function useElderlyList() {
  return useQuery<Elderly[], Error>({
    queryKey: ["elderly"],
    queryFn: elderlyService.getAll,
  });
}

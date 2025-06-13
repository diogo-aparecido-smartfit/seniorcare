import { useQuery } from "@tanstack/react-query";
import { elderlyService } from "@/services/services";

export function useElderlyDetails(id: string) {
  return useQuery({
    queryKey: ["elderly", id],
    queryFn: () => elderlyService.getById(id),
    enabled: !!id,
  });
}

import { useQuery } from "@tanstack/react-query";
import { caregiverService, Caregiver } from "@/services/services";

export function useCaregiverDetails(id: string) {
  return useQuery<Caregiver, Error>({
    queryKey: ["caregivers", id],
    queryFn: () => caregiverService.getById(id),
    enabled: !!id,
  });
}

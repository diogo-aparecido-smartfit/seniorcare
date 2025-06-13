import { useQuery } from "@tanstack/react-query";
import { caregiverService, Caregiver } from "@/services/services";

export function useCaregiverList() {
  return useQuery<Caregiver[], Error>({
    queryKey: ["caregivers"],
    queryFn: caregiverService.getAll,
  });
}

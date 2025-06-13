"use client";

import { useQuery } from "@tanstack/react-query";
import { getStatistics } from "@/services/statistics";

export function useStatistics() {
  return useQuery({
    queryKey: ["statistics"],
    queryFn: getStatistics,
  });
}

import { useQuery } from "@tanstack/react-query";
import { fetchServiceName } from "../services/api";

export const useServiceName = (serviceNumber) => {
  return useQuery({
    queryKey: ["serviceName", serviceNumber],
    queryFn: () => fetchServiceName(serviceNumber),
    enabled: Boolean(serviceNumber),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  });
};

import { useQuery } from "@tanstack/react-query";
import { fetchServiceName } from "../services/api";

export const useServiceNames = (serviceIds = []) =>
  useQuery({
    queryKey: ["serviceNames", serviceIds],
    enabled: serviceIds.length > 0,
    staleTime: 5 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    queryFn: async () => {
      const names = await Promise.all(
        serviceIds.map((id) => fetchServiceName(id))
      );
      return serviceIds.map((id, i) => ({ id, name: names[i] }));
    },
  });

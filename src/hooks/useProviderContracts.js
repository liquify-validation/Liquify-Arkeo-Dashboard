import { useQuery } from "@tanstack/react-query";
import { fetchProviderContracts } from "../services/api";

export const useProviderContracts = (providerId) => {
  return useQuery({
    queryKey: ["providerContracts", providerId],
    queryFn: () => fetchProviderContracts(providerId),
    enabled: !!providerId,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  });
};

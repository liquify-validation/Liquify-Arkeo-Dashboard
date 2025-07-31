import { useQuery } from "@tanstack/react-query";
import { fetchProviderContracts } from "../services/api";

export const useProviderContracts = (providerId) => {
  return useQuery({
    queryKey: ["providerContracts", providerId],
    queryFn: () => fetchProviderContracts(providerId),
    enabled: !!providerId,
    staleTime: 0,
    refetchInterval: 2000,
    refetchIntervalInBackground: true,
    cacheTime: 1000 * 60 * 5,
  });
};

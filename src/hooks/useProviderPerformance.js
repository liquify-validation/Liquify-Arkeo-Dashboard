import { useQuery } from "@tanstack/react-query";
import { fetchProviderPerformance } from "../services/api";

export const useProviderPerformance = (providerId) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["providerPerformance", providerId],
    queryFn: () => fetchProviderPerformance(providerId),
    enabled: !!providerId,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  });

  return { data, error, isLoading, isError };
};

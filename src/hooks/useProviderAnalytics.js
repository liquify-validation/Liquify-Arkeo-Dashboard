import { useQuery } from "@tanstack/react-query";
import { fetchProvidersAnalytics } from "../services/api";

export const useProvidersAnalytics = (offsetDays) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["providersAnalytics", offsetDays],
    queryFn: () => fetchProvidersAnalytics(offsetDays),
    staleTime: 0,
    refetchInterval: 2000,
    refetchIntervalInBackground: true,
    cacheTime: 1000 * 60 * 5,
  });

  return { data, error, isLoading, isError };
};

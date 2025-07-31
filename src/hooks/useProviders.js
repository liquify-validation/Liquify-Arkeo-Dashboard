import { useQuery } from "@tanstack/react-query";
import { fetchProviders } from "../services/api";

export const useProviders = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["providers"],
    queryFn: fetchProviders,
    staleTime: 0,
    refetchInterval: 2000,
    refetchIntervalInBackground: true,
    cacheTime: 1000 * 60 * 5,
  });

  return { data, error, isLoading, isError };
};

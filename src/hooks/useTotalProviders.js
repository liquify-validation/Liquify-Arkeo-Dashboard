import { useQuery } from "@tanstack/react-query";
import { fetchTotalProviders } from "../services/api";

// TO DO - adjust cache and stale times

export const useTotalProviders = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["totalProviders"],
    queryFn: fetchTotalProviders,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  });

  return { data, error, isLoading, isError };
};

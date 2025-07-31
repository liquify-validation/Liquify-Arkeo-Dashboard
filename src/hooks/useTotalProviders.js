import { useQuery } from "@tanstack/react-query";
import { fetchTotalProviders } from "../services/api";

export const useTotalProviders = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["totalProviders"],
    queryFn: fetchTotalProviders,
    staleTime: 1000 * 60 * 1,
    cacheTime: 1000 * 60 * 1,
  });

  return { data, error, isLoading, isError };
};

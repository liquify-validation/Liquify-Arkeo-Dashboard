import { useQuery } from "@tanstack/react-query";
import { fetchTotalServices } from "../services/api";

// TO DO - adjust cache and stale times

export const useTotalServices = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["totalServices"],
    queryFn: fetchTotalServices,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  });

  return { data, error, isLoading, isError };
};

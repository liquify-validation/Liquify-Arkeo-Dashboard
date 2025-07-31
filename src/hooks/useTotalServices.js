import { useQuery } from "@tanstack/react-query";
import { fetchTotalServices } from "../services/api";

export const useTotalServices = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["totalServices"],
    queryFn: fetchTotalServices,
    staleTime: 1000 * 60 * 1,
    cacheTime: 1000 * 60 * 1,
  });

  return { data, error, isLoading, isError };
};

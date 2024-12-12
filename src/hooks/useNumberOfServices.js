import { useQuery } from "@tanstack/react-query";
import { fetchNumberOfServices } from "../services/api";

export const useNumberOfServices = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["numberOfServices"],
    queryFn: fetchNumberOfServices,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  });

  return { data, error, isLoading, isError };
};

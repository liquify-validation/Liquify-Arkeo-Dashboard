import { useQuery } from "@tanstack/react-query";
import { fetchCompletedContracts } from "../services/api";

export const useCompletedContracts = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["completedContracts"],
    queryFn: fetchCompletedContracts,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  });

  return { data, error, isLoading, isError };
};

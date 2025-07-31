import { useQuery } from "@tanstack/react-query";
import { fetchActiveContracts } from "../services/api";

export const useActiveContracts = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["activeContracts"],
    queryFn: fetchActiveContracts,
    staleTime: 0,
    refetchInterval: 2000,
    refetchIntervalInBackground: true,
    cacheTime: 1000 * 60 * 5,
  });

  return { data, error, isLoading, isError };
};

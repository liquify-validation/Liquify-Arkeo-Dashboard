import { useQuery } from "@tanstack/react-query";
import { fetchAllContracts } from "../services/api";

export const useAllContracts = () => {
  return useQuery({
    queryKey: ["allContracts"],
    queryFn: fetchAllContracts,
    staleTime: 0,
    refetchInterval: 2000,
    refetchIntervalInBackground: true,
    cacheTime: 1000 * 60 * 5,
  });
};

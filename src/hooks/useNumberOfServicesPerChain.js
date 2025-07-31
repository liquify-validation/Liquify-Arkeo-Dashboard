import { useQuery } from "@tanstack/react-query";
import { fetchNumberOfServicesPerChain } from "../services/api";

export const useNumberOfServicesPerChain = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["numberOfServicesPerChain"],
    queryFn: fetchNumberOfServicesPerChain,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  });

  return { data, error, isLoading, isError };
};

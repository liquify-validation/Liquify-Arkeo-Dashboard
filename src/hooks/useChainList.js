import { useQuery } from "@tanstack/react-query";
import { fetchChainList } from "../services/api";

export const useChainList = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["chainList"],
    queryFn: fetchChainList,
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60,
  });

  return { data, error, isLoading, isError };
};

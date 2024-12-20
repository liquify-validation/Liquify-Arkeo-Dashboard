import { useQuery } from "@tanstack/react-query";
import { fetchCurrentHeight } from "../services/api";

export const useCurrentHeight = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["currentHeight"],
    queryFn: fetchCurrentHeight,
    staleTime: 1000 * 60 * 1,
    cacheTime: 1000 * 60 * 1,
  });

  return { data, error, isLoading, isError };
};

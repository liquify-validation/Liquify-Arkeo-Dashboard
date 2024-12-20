import { useQuery } from "@tanstack/react-query";
import { fetchSecondsPerBlock } from "../services/api";

export const useSecondsPerBlock = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["secondsPerBlock"],
    queryFn: fetchSecondsPerBlock,
    staleTime: 1000 * 60 * 1,
    cacheTime: 1000 * 60 * 1,
  });

  return { data, error, isLoading, isError };
};

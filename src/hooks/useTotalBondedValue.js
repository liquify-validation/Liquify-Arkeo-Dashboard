import { useQuery } from "@tanstack/react-query";
import { fetchTotalBondedValue } from "../services/api";
import { useMemo } from "react";

// TO DO - look at stale and cache times

export const useTotalBondedValue = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["totalBondedValue"],
    queryFn: fetchTotalBondedValue,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  });

  const formattedValue = useMemo(() => {
    if (data == null) return null;
    return (data / 1e6).toFixed(2);
  }, [data]);

  return { data: formattedValue, error, isLoading, isError };
};

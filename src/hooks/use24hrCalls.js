import { useQuery } from "@tanstack/react-query";
import { fetch24hrCalls } from "../services/api";

export const use24hrCalls = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["24hrCalls"],
    queryFn: fetch24hrCalls,
    staleTime: 1000 * 60 * 1,
    cacheTime: 1000 * 60 * 1,
  });

  const calls = data ? data.total_nonce : 0;

  return { data: calls, error, isLoading, isError };
};

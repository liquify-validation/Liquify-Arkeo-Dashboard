import { useQuery } from "@tanstack/react-query";
import { fetchChainAnalytics } from "../services/api";

export const useChainAnalytics = (offsetDays, chainListData) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["chainAnalytics", offsetDays],
    queryFn: () => fetchChainAnalytics(offsetDays),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
    enabled: !!chainListData,
  });

  let transformedData = [];
  if (data && chainListData) {
    const { chains } = data;
    if (chains && chains.length > 0) {
      const totalNonceSum = chains.reduce(
        (sum, c) => sum + Number(c.total_nonce),
        0
      );

      const colorPalette = [
        "#176BF8",
        "#46ECBC",
        "#1e5be0",
        "#FF8C00",
        "#FF69B4",
        "#ADFF2F",
        "#ffd700",
        "#00fa9a",
        "#ff4500",
        "#9400d3",
      ];
      let colorIndex = 0;

      transformedData = chains.map((c) => {
        const chainId = c.service;
        const chainName = chainListData[chainId] || "unknown";
        const value = Number(c.total_nonce);

        let percentage = 0;
        if (totalNonceSum > 0) {
          percentage = (value / totalNonceSum) * 100;
        }

        const color = colorPalette[colorIndex % colorPalette.length];
        colorIndex++;

        return {
          id: chainName,
          value: value,
          color: color,
        };
      });
    }
  }

  return { data: transformedData, error, isLoading, isError };
};

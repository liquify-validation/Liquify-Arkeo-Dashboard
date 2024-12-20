import { useQuery } from "@tanstack/react-query";
import { fetchProviderLocations } from "../services/api";

export const useProviderLocations = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["providerLocations"],
    queryFn: fetchProviderLocations,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  });

  let transformedData = [];
  if (data) {
    const colorPalette = [
      "#176BF8",
      "#46ECBC",
      "#1e5be0",
      "#FF8C00",
      "#FF69B4",
      "#ADFF2F",
    ];
    let colorIndex = 0;
    transformedData = Object.entries(data).map(([key, value]) => {
      const color = colorPalette[colorIndex % colorPalette.length];
      colorIndex++;
      return {
        id: key,
        value: value,
        color: color,
      };
    });
  }

  return { data: transformedData, error, isLoading, isError };
};

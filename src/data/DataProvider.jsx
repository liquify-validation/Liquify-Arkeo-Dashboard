import { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const apiURLs = [
          "https://arkeo-api.liquify.com/arkeo/api/providers",
          "https://arkeo-api.liquify.com/arkeo/api/chains",
          "https://arkeo-api.liquify.com/arkeo/api/network",
        ];

        const responses = await Promise.all(apiURLs.map((url) => fetch(url)));

        const jsonData = await Promise.all(
          responses.map((response) => response.json())
        );

        const fetchedData = {
          grabProviders: jsonData[0],
          numberOfServices: jsonData[1],
          grabNetworkData: jsonData[2],
        };

        console.log(fetchedData);
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, []);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export { DataContext };

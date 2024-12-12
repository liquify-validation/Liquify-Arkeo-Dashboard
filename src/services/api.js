// TO DO - Swap out API Url for variable

export const fetchTotalProviders = async () => {
  const response = await fetch(
    "https://arkeo-api.liquify.com/network/number-of-providers"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch total providers");
  }
  const data = await response.json();
  return data[0];
};

export const fetchTotalBondedValue = async () => {
  const response = await fetch("https://arkeo-api.liquify.com/network/bond");
  if (!response.ok) {
    throw new Error("Failed to fetch total bonded value");
  }
  const data = await response.json();
  return data[0];
};

export const fetchNumberOfServices = async () => {
  const response = await fetch(
    "https://arkeo-api.liquify.com/network/number-of-services"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch number of services");
  }
  const data = await response.json();
  return data[0];
};

export const fetchProviders = async () => {
  const response = await fetch(
    "https://arkeo-api.liquify.com/providers/providers"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch providers");
  }
  const data = await response.json();
  return data;
};

export const fetchProviderContracts = async (providerId) => {
  const url = `https://arkeo-api.liquify.com/contracts/provider?provider=${providerId}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch provider contracts");
  }
  const data = await response.json();

  return data;
};

export const fetchAllContracts = async () => {
  const response = await fetch(
    "https://arkeo-api.liquify.com/contracts/contracts"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch all contracts");
  }
  const data = await response.json();
  return data;
};

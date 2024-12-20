const ApiUrl = import.meta.env.VITE_API_URL;

export const fetchTotalProviders = async () => {
  const response = await fetch(`${ApiUrl}/network/number-of-providers`);
  if (!response.ok) {
    throw new Error("Failed to fetch total providers");
  }
  const data = await response.json();
  return data[0];
};

export const fetchTotalServices = async () => {
  const response = await fetch(`${ApiUrl}/network/number-of-services`);
  if (!response.ok) {
    throw new Error("Failed to fetch total providers");
  }
  const data = await response.json();
  return data[0];
};

export const fetchTotalBondedValue = async () => {
  const response = await fetch(`${ApiUrl}/network/bond`);
  if (!response.ok) {
    throw new Error("Failed to fetch total bonded value");
  }
  const data = await response.json();
  return data[0];
};

export const fetchNumberOfServices = async () => {
  const response = await fetch(`${ApiUrl}/network/number-of-services`);
  if (!response.ok) {
    throw new Error("Failed to fetch number of services");
  }
  const data = await response.json();
  return data[0];
};

export const fetchProviders = async () => {
  const response = await fetch(`${ApiUrl}/providers/providers`);
  if (!response.ok) {
    throw new Error("Failed to fetch providers");
  }
  const data = await response.json();
  return data;
};

export const fetchProviderContracts = async (providerId) => {
  const url = `${ApiUrl}/contracts/provider?provider=${providerId}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch provider contracts");
  }
  const data = await response.json();

  return data;
};

export const fetchAllContracts = async () => {
  const response = await fetch(`${ApiUrl}/contracts/contracts`);
  if (!response.ok) {
    throw new Error("Failed to fetch all contracts");
  }
  const data = await response.json();
  return data;
};

export const fetchServiceName = async (serviceNumber) => {
  const response = await fetch(
    `${ApiUrl}/network/cahin-id-decode?chain=${serviceNumber}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch service name for ${serviceNumber}`);
  }
  const data = await response.text();
  return data;
};

export const fetchCurrentHeight = async () => {
  const response = await fetch(`${ApiUrl}/network/height`);
  if (!response.ok) {
    throw new Error("Failed to fetch current height");
  }
  const data = await response.json();
  return data[0];
};

export const fetchSecondsPerBlock = async () => {
  const response = await fetch(`${ApiUrl}/network/block-time`);
  if (!response.ok) {
    throw new Error("Failed to fetch seconds per block");
  }
  const data = await response.json();
  return data[0];
};

export const fetchProviderLocations = async () => {
  const response = await fetch(`${ApiUrl}/providers/locations`);
  if (!response.ok) {
    throw new Error("Failed to fetch provider locations");
  }
  const data = await response.json();
  return data;
};

export const fetchProvidersAnalytics = async (offsetDays) => {
  const response = await fetch(
    `${ApiUrl}/analytics/providers?offset_days=${offsetDays}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch providers analytics");
  }
  const data = await response.json();
  return data;
};

export const fetchChainAnalytics = async (offsetDays) => {
  const response = await fetch(
    `${ApiUrl}/analytics/chains?offset_days=${offsetDays}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch chains analytics");
  }
  const data = await response.json();
  return data;
};

export const fetchChainList = async () => {
  const response = await fetch(`${ApiUrl}/network/chain-list`);
  if (!response.ok) {
    throw new Error("Failed to fetch chain list");
  }
  const data = await response.json();
  return data;
};

export const fetchActiveContracts = async () => {
  const response = await fetch(`${ApiUrl}/contracts/active`);
  if (!response.ok) {
    throw new Error("Failed to fetch active contracts");
  }
  const data = await response.json();
  return data;
};

export const fetchCompletedContracts = async () => {
  const response = await fetch(`${ApiUrl}/contracts/completed`);
  if (!response.ok) {
    throw new Error("Failed to fetch completed contracts");
  }
  const data = await response.json();
  return data;
};

export const fetch24hrCalls = async () => {
  const response = await fetch(`${ApiUrl}/analytics/total?offset_days=1`);
  if (!response.ok) {
    throw new Error("Failed to fetch 24hr calls");
  }
  const data = await response.json();
  return data;
};

export const fetchProviderPerformance = async (providerId) => {
  const response = await fetch(
    `${ApiUrl}/analytics/providers?offset_days=7&provider=${providerId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch provider performance data");
  }
  const data = await response.json();
  return data;
};

import {
  CosmosIconDark,
  CosmosIconLight,
  LiteCoinIcon,
  BinanceIcon,
  AvaxIcon,
  BCHIcon,
  ArkeoIcon,
  OptimismIcon,
  PolygonIcon,
  DogeCoinIcon,
  EthereumIcon,
  BitcoinIcon,
  OsmosisIcon,
  ThorchainIcon,
  DefaultIcon,
} from "../assets";

export const getServiceIconPath = (serviceName) => {
  const lowerName = serviceName.toLowerCase();

  if (lowerName.includes("optimism")) {
    return OptimismIcon;
  } else if (lowerName.includes("polygon")) {
    return PolygonIcon;
  } else if (lowerName.includes("dogecoin")) {
    return DogeCoinIcon;
  } else if (lowerName.includes("ethereum")) {
    return EthereumIcon;
  } else if (lowerName.includes("bitcoin")) {
    return BitcoinIcon;
  } else if (lowerName.includes("osmosis")) {
    return OsmosisIcon;
  } else if (lowerName.includes("thorchain")) {
    return ThorchainIcon;
  }

  return DefaultIcon;
};

export const secondsToTimeObject = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return { hours, minutes, seconds };
};

// export const iconMapping = {
//   "arkeo-mainnet-fullnode": ArkeoIcon,
//   "avax-mainnet-fullnode": AvaxIcon,
//   "bch-mainnet-fullnode": BCHIcon,
//   "bnb-mainnet-fullnode": BinanceIcon,
//   "bsc-mainnet-fullnode": BinanceIcon,
//   "btc-mainnet-fullnode": BitcoinIcon,
//   "gaia-mainnet-rpc": isDarkMode ? CosmosIconDark : CosmosIconLight,
//   "doge-mainnet-fullnode": DogeCoinIcon,
//   "eth-mainnet-archivenode": EthereumIcon,
//   "eth-mainnet-fullnode": EthereumIcon,
//   "ltc-mainnet-fullnode": LiteCoinIcon,
//   "optimism-mainnet-fullnode": OptimismIcon,
//   "osmosis-mainnet-fullnode": OsmosisIcon,
//   "polygon-mainnet-fullnode": PolygonIcon,
//   "polygon-mainnet-archivenode": PolygonIcon,
//   "thorchain-mainnet-fullnode": ThorchainIcon,
//   "btc-mainnet-unchained": BitcoinIcon,
//   "eth-mainnet-unchained": EthereumIcon,
//   "optimism-mainnet-unchained": OptimismIcon,
//   "gaia-mainnet-grpc": isDarkMode ? CosmosIconDark : CosmosIconLight,
// };

// export const getIconSrc = (name) => {
//   let iconName = name.toLowerCase().replace(/ /g, "-");

//   if (iconName === "gaia") {
//     return isDarkMode ? CosmosIconDark : CosmosIconLight;
//   }
//   return iconMapping[iconName];
// };

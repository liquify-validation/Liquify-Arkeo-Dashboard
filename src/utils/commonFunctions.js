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
  PolkadotIcon,
  SolIcon,
  EthereumClassicIcon,
  CardanoIcon,
} from "../assets";

// TO DO - Replace Osmosis logo

export const getServiceIconPath = (serviceName = "", isDarkMode = false) => {
  const lowerName = serviceName.toLowerCase();

  if (lowerName.includes("gaia-mainnet")) {
    return isDarkMode ? CosmosIconDark : CosmosIconLight;
  }

  if (lowerName.includes("arkeo")) {
    return ArkeoIcon;
  } else if (lowerName.includes("avax")) {
    return AvaxIcon;
  } else if (lowerName.includes("bch")) {
    return BCHIcon;
  } else if (lowerName.includes("bnb") || lowerName.includes("bsc")) {
    return BinanceIcon;
  } else if (lowerName.includes("btc") || lowerName.includes("bitcoin")) {
    return BitcoinIcon;
  } else if (lowerName.includes("cardano")) {
    return CardanoIcon;
  } else if (lowerName.includes("doge")) {
    return DogeCoinIcon;
  } else if (lowerName.includes("etc")) {
    return EthereumClassicIcon;
  } else if (lowerName.includes("eth")) {
    return EthereumIcon;
  } else if (lowerName.includes("ltc")) {
    return LiteCoinIcon;
  } else if (lowerName.includes("optimism")) {
    return OptimismIcon;
  } else if (lowerName.includes("osmosis")) {
    return OsmosisIcon;
  } else if (lowerName.includes("polkadot")) {
    return PolkadotIcon;
  } else if (lowerName.includes("polygon")) {
    return PolygonIcon;
  } else if (lowerName.includes("sol")) {
    return SolIcon;
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

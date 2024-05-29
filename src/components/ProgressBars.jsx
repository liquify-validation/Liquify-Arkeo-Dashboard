import { useContext, useMemo, useState } from "react";
import {
  Box,
  Typography,
  LinearProgress,
  Stack,
  useTheme,
} from "@mui/material";
import { tokens } from "../theme";
import { DataContext } from "../data/DataProvider";
import {
  BitcoinIcon,
  EthereumIcon,
  CosmosIconDark,
  CosmosIconLight,
  ThorchainIcon,
  OptimismIcon,
  OsmosisIcon,
  LiteCoinIcon,
  PolygonIcon,
  DogeCoinIcon,
  BinanceIcon,
  AvaxIcon,
  BCHIcon,
  ArkeoIcon,
} from "../assets";

const ProgressBars = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { numberOfServices } = useContext(DataContext);
  const isDarkMode = theme.palette.mode === "dark";
  const [showAll, setShowAll] = useState(false);

  const iconMapping = {
    "arkeo-mainnet-fullnode": ArkeoIcon,
    "avax-mainnet-fullnode": AvaxIcon,
    "bch-mainnet-fullnode": BCHIcon,
    "bnb-mainnet-fullnode": BinanceIcon,
    "bsc-mainnet-fullnode": BinanceIcon,
    "btc-mainnet-fullnode": BitcoinIcon,
    "gaia-mainnet-rpc": isDarkMode ? CosmosIconDark : CosmosIconLight,
    "doge-mainnet-fullnode": DogeCoinIcon,
    "eth-mainnet-archivenode": EthereumIcon,
    "eth-mainnet-fullnode": EthereumIcon,
    "ltc-mainnet-fullnode": LiteCoinIcon,
    "optimism-mainnet-fullnode": OptimismIcon,
    "osmosis-mainnet-fullnode": OsmosisIcon,
    "polygon-mainnet-fullnode": PolygonIcon,
    "polygon-mainnet-archivenode": PolygonIcon,
    "thorchain-mainnet-fullnode": ThorchainIcon,
    "btc-mainnet-unchained": BitcoinIcon,
    "eth-mainnet-unchained": EthereumIcon,
    "optimism-mainnet-unchained": OptimismIcon,
    "gaia-mainnet-grpc": isDarkMode ? CosmosIconDark : CosmosIconLight,
  };

  const processedData = useMemo(() => {
    const services = Object.values(numberOfServices || {});
    const maxCount = Math.max(...services.map((s) => s.count));

    const mappedServices = services.map((service) => ({
      title: service.name
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      count: service.count,
      maxCount,
      percentage: Math.round((service.count / maxCount) * 100),
    }));

    return mappedServices.sort((a, b) => b.percentage - a.percentage);
  }, [numberOfServices, isDarkMode]);

  const getIconSrc = (name) => {
    let iconName = name.toLowerCase().replace(/ /g, "-");

    if (iconName === "gaia") {
      return isDarkMode ? CosmosIconDark : CosmosIconLight;
    }
    return iconMapping[iconName];
  };

  const displayedData = showAll ? processedData : processedData.slice(0, 5);

  const toggleShowAll = () => setShowAll(!showAll);

  return (
    <Box width="100%" sx={{ zIndex: 1000 }}>
      {displayedData.map((item, index) => (
        <Stack
          key={index}
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ mb: 2, width: "100%" }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "fit-content",
              minWidth: "275px",
              padding: "1px",
            }}
          >
            <img
              src={getIconSrc(item.title)}
              alt={`${item.title} Icon`}
              style={{ width: 30, height: 30 }}
            />
            <Typography
              fontSize="14px"
              fontWeight="600"
              color={colors.text[100]}
              sx={{ ml: 1 }}
            >
              {item.title}
            </Typography>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              border: "2px solid white",
              borderRadius: 10,
            }}
          >
            <LinearProgress
              variant="determinate"
              value={item.percentage}
              sx={{
                width: "100%",
                height: 15,
                borderRadius: 25,
                backgroundColor: "#D9D9D9",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#176BF8",
                  borderRadius: 10,
                },
              }}
            />
          </Box>
          <Typography
            fontSize="16px"
            fontWeight="700"
            color={colors.text[100]}
            sx={{ minWidth: "50px", textAlign: "right" }}
          >
            {`${item.count}`}
          </Typography>
        </Stack>
      ))}
      {processedData.length > 5 && (
        <Typography
          onClick={toggleShowAll}
          sx={{
            cursor: "pointer",
            color: theme.palette.primary.main,
            mt: 2,
            textAlign: "center",
            textDecoration: "underline",
          }}
        >
          {showAll ? "View Less" : "View All"}
        </Typography>
      )}
    </Box>
  );
};

export default ProgressBars;

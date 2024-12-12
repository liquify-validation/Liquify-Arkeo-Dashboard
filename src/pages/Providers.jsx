import { useState, useMemo } from "react";
import {
  Box,
  useTheme,
  Pagination,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { tokens } from "../theme";
import { ProviderCard, Header, ProvidersBar, CircleIcon } from "../components";
import { HexMap, HexMapLight } from "../assets";
import { useProviders } from "../hooks/useProviders";

const Providers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: providerData, isLoading, error } = useProviders();

  const [cardsPerPage, setCardsPerPage] = useState(8);

  const hexmapClassName = `hexmap-bg ${
    theme.palette.mode === "dark" ? "hexmap-dark" : "hexmap-light"
  }`;

  const backgroundImageUrl =
    theme.palette.mode === "dark" ? HexMap : HexMapLight;

  if (isLoading) {
    return (
      <Box
        className={hexmapClassName}
        sx={{
          position: "relative",
          width: "100%",
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "70%",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        <Box m="40px">
          <Header title="Providers" />
          <Box mt={4}>Loading providers...</Box>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        className={hexmapClassName}
        sx={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center 70%",
          width: "100%",
          height: "100%",
          position: "relative",
          zIndex: 0,
        }}
      >
        <Box m="40px">
          <Header title="Providers" />
          <Box mt={4} color="red">
            Error loading providers!
          </Box>
        </Box>
      </Box>
    );
  }

  const providerKeys = Object.keys(providerData);
  const totalProviders = providerKeys.length;

  const providersArray = providerKeys.map((key) => {
    const p = providerData[key];
    const name = p.provider_name || key;
    return { key, name };
  });

  const ipRegex = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
  const namedProviders = providersArray.filter((p) => !ipRegex.test(p.name));
  const ipProviders = providersArray.filter((p) => ipRegex.test(p.name));

  namedProviders.sort((a, b) => a.name.localeCompare(b.name));
  ipProviders.sort((a, b) => a.name.localeCompare(b.name));

  const sortedProviders = [...namedProviders, ...ipProviders];

  const increments = [];
  for (let i = 8; i <= 48; i += 4) {
    increments.push(i);
  }

  let displayOptions = [];
  if (totalProviders < 8) {
    displayOptions = ["All"];
  } else {
    displayOptions = increments.filter((num) => num <= totalProviders);

    if (displayOptions.length === 0) {
      displayOptions = [8];
    }

    if (displayOptions.includes(totalProviders)) {
      displayOptions = displayOptions.filter((num) => num < totalProviders);
      displayOptions.push("All");
    } else {
      const largestIncrement = displayOptions[displayOptions.length - 1];
      if (totalProviders > largestIncrement || totalProviders > 48) {
        displayOptions.push("All");
      }
    }
  }

  const handleCardsPerPageChange = (event) => {
    const value = event.target.value;
    if (value === "All") {
      setCardsPerPage(totalProviders);
    } else {
      setCardsPerPage(value);
    }
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalProviders / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  const currentProviders =
    cardsPerPage === totalProviders
      ? sortedProviders
      : sortedProviders.slice(indexOfFirstCard, indexOfLastCard);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const colorPalette = [
    "#ffadad",
    "#ffd6a5",
    "#fdffb6",
    "#caffbf",
    "#9bf6ff",
    "#a0c4ff",
    "#bdb2ff",
    "#ffc6ff",
  ];

  return (
    <Box
      className={hexmapClassName}
      sx={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center 70%",
        width: "100%",
        height: "100%",
        position: "relative",
        zIndex: 0,
      }}
    >
      <Box m="40px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="Providers" />
        </Box>
        <Box
          marginTop="35px"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <ProvidersBar />
          <Box display="flex" alignItems="center" sx={{ gap: "20px" }}>
            <Typography>Show:</Typography>
            <Select
              value={cardsPerPage === totalProviders ? "All" : cardsPerPage}
              onChange={handleCardsPerPageChange}
              size="small"
              sx={{ backgroundColor: colors.primary[300] }}
            >
              {displayOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option === "All" ? "All" : `${option}`}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="minmax(100px, auto)"
          gap="2rem"
          mt={5}
        >
          {currentProviders.map((p, index) => {
            const provider = providerData[p.key];
            const endpoints = JSON.parse(provider.endpoints || "{}");
            const isOnline = !Object.values(endpoints).some(
              (endpoint) => endpoint.status === "OFFLINE"
            );

            const contracts = JSON.parse(provider.contracts || "{}");
            const openContracts = Object.keys(contracts).length;
            const age = provider.last_update ? provider.last_update : "N/A";
            const uptime = provider.uptime ? provider.uptime : "N/A";

            return (
              <Box
                key={p.key}
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  gridColumn: "span 3",
                  pointerEvents: "auto",
                }}
              >
                <ProviderCard
                  provider={provider.provider_name || p.key}
                  companyIcon={
                    <CircleIcon
                      color={colorPalette[index % colorPalette.length]}
                    />
                  }
                  validationDate={provider.description || "N/A"}
                  website={provider.website}
                  freeUsageLimit={provider.free_tier_rate_limit || "N/A"}
                  openContracts={openContracts}
                  endpoints={provider.endpoints}
                  age={age}
                  uptime={uptime}
                  amountTaxed={provider.amountTaxed || "N/A"}
                  location={provider.location || "N/A"}
                  renewedContracts={"0"}
                  cloudBaremetal={provider.isp || "N/A"}
                  priced={provider.priced}
                  open={provider.open}
                  active={provider.active}
                  status={isOnline ? "ONLINE" : "OFFLINE"}
                  providerData={provider}
                />
              </Box>
            );
          })}
        </Box>

        <Box display="flex" justifyContent="center" mt={6} pb={4}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChangePage}
            variant="outlined"
            shape="rounded"
            sx={{
              "& .MuiPaginationItem-root": {
                borderColor: "grey",
              },
              "& .MuiPaginationItem-root.Mui-selected": {
                color: "#176BF8",
                borderColor: "#176BF8",
                backgroundColor: "transparent",
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Providers;

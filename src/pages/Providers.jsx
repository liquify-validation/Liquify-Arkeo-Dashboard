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
  const [searchQuery, setSearchQuery] = useState("");
  const [cardsPerPage, setCardsPerPage] = useState(8);

  const { data: providerData, isLoading, error } = useProviders();

  const providerKeys = providerData ? Object.keys(providerData) : [];
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

  const filteredProviders = useMemo(() => {
    if (!searchQuery || !providerData) return sortedProviders;

    const lowerQuery = searchQuery.toLowerCase();
    return sortedProviders.filter((pObj) => {
      const provider = providerData[pObj.key];
      if (!provider) return false;
      const fields = [
        provider.provider_name,
        provider.description,
        provider.website,
        provider.location,
        provider.isp,
        provider.uptime,
        provider.free_tier_rate_limit,
        provider.completed_contracts,
        provider.last_update,
        provider.amountTaxed,
      ];

      const combined = fields.filter(Boolean).join(" ").toLowerCase();
      return combined.includes(lowerQuery);
    });
  }, [searchQuery, sortedProviders, providerData]);

  const filteredCount = filteredProviders.length;
  const increments = [];
  for (let i = 8; i <= 48; i += 4) {
    increments.push(i);
  }

  let displayOptions = [];
  if (filteredCount < 8) {
    displayOptions = ["All"];
  } else {
    const validIncrements = increments.filter((num) => num <= filteredCount);
    displayOptions = validIncrements.length ? validIncrements : [8];

    if (displayOptions.includes(filteredCount)) {
      displayOptions = displayOptions.filter((num) => num < filteredCount);
      displayOptions.push("All");
    } else {
      const largestIncrement = displayOptions[displayOptions.length - 1];
      if (filteredCount > largestIncrement || filteredCount > 48) {
        displayOptions.push("All");
      }
    }
  }

  const handleCardsPerPageChange = (event) => {
    const value = event.target.value;
    if (value === "All") {
      setCardsPerPage(filteredCount);
    } else {
      setCardsPerPage(value);
    }
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredCount / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  const currentProviders =
    cardsPerPage === filteredCount
      ? filteredProviders
      : filteredProviders.slice(indexOfFirstCard, indexOfLastCard);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const hexmapClassName = `hexmap-bg ${
    theme.palette.mode === "dark" ? "hexmap-dark" : "hexmap-light"
  }`;
  const backgroundImageUrl =
    theme.palette.mode === "dark" ? HexMap : HexMapLight;

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
          <ProvidersBar onSearchChange={(val) => setSearchQuery(val)} />
          <Box display="flex" alignItems="center" sx={{ gap: "20px", ml: 4 }}>
            <Typography>Show:</Typography>
            <Select
              value={cardsPerPage === filteredCount ? "All" : cardsPerPage}
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
            const endpointKeys = Object.keys(endpoints);

            let status = "OFFLINE";
            if (endpointKeys.length > 0) {
              const singleEndpoint = endpoints[endpointKeys[0]];
              status =
                singleEndpoint.status === "ONLINE" ? "ONLINE" : "OFFLINE";
            }

            const contracts = JSON.parse(provider.contracts || "{}");
            const openContracts = Object.keys(contracts).length;
            const age = provider.last_update ? provider.last_update : "N/A";
            const displayUptime = status === "OFFLINE" ? "0 %" : "100 %";

            return (
              <Box
                key={p.key}
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  pointerEvents: "auto",

                  gridColumn: {
                    xs: "span 12",
                    md: "span 6",
                    lg: "span 4",
                    xl: "span 3",
                  },
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
                  numberOfServices={provider.number_of_services}
                  completedContracts={provider.completed_contracts || "0"}
                  uptime={displayUptime}
                  amountTaxed={provider.amountTaxed || "N/A"}
                  location={provider.location || "N/A"}
                  renewedContracts={"0"}
                  cloudBaremetal={provider.isp || "N/A"}
                  priced={provider.priced}
                  open={provider.open}
                  active={provider.active}
                  status={status}
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

import { useMemo, useState } from "react";
import Header from "../components/Header";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useTotalProviders } from "../hooks/useTotalProviders";
import { useTotalServices } from "../hooks/useTotalServices";
import { useTotalBondedValue } from "../hooks/useTotalBondedValue";
import { useProviderLocations } from "../hooks/useProviderLocations";
import { useChainList } from "../hooks/useChainList";
import { useChainAnalytics } from "../hooks/useChainAnalytics";
import { useAllContracts } from "../hooks/useAllContracts";

import {
  TimeIcon,
  ProviderIcon,
  BondedIcon,
  HexMap,
  HexMapLight,
} from "../assets";

import {
  Doughnut,
  StatBox,
  ProgressBars,
  ContractsFilterButtonGroup,
  OffsetButtonGroup,
  PieChart,
  ProgressBarsServices,
} from "../components";
import { useNumberOfServicesPerChain } from "../hooks/useNumberOfServicesPerChain";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [offsetProviders, setOffsetProviders] = useState("24");
  const [offsetRequests, setOffsetRequests] = useState("24");

  const {
    data: totalProviders,
    isLoading: loadingProviders,
    error: errorProviders,
  } = useTotalProviders();

  const {
    data: totalServices,
    isLoading: loadingServices,
    error: errorServices,
  } = useTotalServices();

  const {
    data: totalBondedValue,
    isLoading: loadingBonded,
    error: errorBonded,
  } = useTotalBondedValue();

  const {
    data: providerLocationsData,
    isLoading: locationsLoading,
    error: locationsError,
  } = useProviderLocations();

  const {
    data: servicesPerChain,
    isLoading: servicesPerChainLoading,
    error: servicesPerChainError,
  } = useNumberOfServicesPerChain();

  const {
    data: chainListData,
    isLoading: chainListLoading,
    error: chainListError,
  } = useChainList();

  const {
    data: chainAnalyticsData,
    isLoading: chainAnalyticsLoading,
    error: chainAnalyticsError,
  } = useChainAnalytics(offsetRequests, chainListData);

  const {
    data: allContractsData,
    isLoading: allContractsLoading,
    error: allContractsError,
  } = useAllContracts();

  const [filterType, setFilterType] = useState("ALL");

  const filteredContracts = useMemo(() => {
    if (!allContractsData) return [];
    const contractsArray = Object.values(allContractsData);
    if (filterType === "ALL") {
      return contractsArray;
    } else if (filterType === "ACTIVE") {
      return contractsArray.filter((c) => c.completed === false);
    } else {
      return contractsArray.filter((c) => c.completed === true);
    }
  }, [allContractsData, filterType]);

  const contractDistributionData = useMemo(() => {
    const providerMap = {};
    filteredContracts.forEach((c) => {
      const name = c.provider_name || c.provider || "Unknown";
      providerMap[name] = (providerMap[name] || 0) + 1;
    });

    const colorPalette = [
      "#176BF8",
      "#46ECBC",
      "#1e5be0",
      "#FF8C00",
      "#FF69B4",
      "#ADFF2F",
    ];
    let colorIndex = 0;
    return Object.entries(providerMap).map(([provider, count]) => {
      const color = colorPalette[colorIndex % colorPalette.length];
      colorIndex++;
      return {
        id: provider,
        value: count,
        color: color,
      };
    });
  }, [filteredContracts]);

  const hexmapClassName = `hexmap-bg ${
    theme.palette.mode === "dark" ? "hexmap-dark" : "hexmap-light"
  }`;

  const backgroundImageUrl =
    theme.palette.mode === "dark" ? HexMap : HexMapLight;

  const totalServicesAcrossChains = useMemo(() => {
    if (!servicesPerChain) return 0;
    return servicesPerChain.reduce((sum, c) => sum + c.count, 0);
  }, [servicesPerChain]);

  return (
    <Box
      className={hexmapClassName}
      sx={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center 70%",
        width: "100%",
        position: "relative",
        zIndex: 0,
      }}
    >
      <Box m="40px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="Dashboard" />
        </Box>

        {/* Top Stat Boxes Row */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gap="2rem"
          mt={5}
          alignItems="stretch"
        >
          <Box
            gridColumn="span 4"
            className="gradient-border-mask"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              p: 2,
            }}
          >
            <StatBox
              number={
                loadingProviders
                  ? "Loading..."
                  : errorProviders
                  ? "Error"
                  : totalProviders
              }
              title="TOTAL PROVIDERS"
              progress=""
              increase="+12%"
              icon={<img src={ProviderIcon} alt="Provider Icon" />}
            />
          </Box>

          <Box
            gridColumn="span 4"
            className="gradient-border-mask"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              p: 2,
            }}
          >
            <StatBox
              number={
                loadingBonded
                  ? "Loading..."
                  : errorBonded
                  ? "Error"
                  : totalBondedValue
              }
              title="TOTAL BONDED VALUE"
              icon={<img src={BondedIcon} alt="Bonded Icon" />}
            />
          </Box>

          <Box
            gridColumn="span 4"
            className="gradient-border-mask"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              p: 2,
            }}
          >
            <StatBox
              number={
                loadingServices
                  ? "Loading..."
                  : errorServices
                  ? "Error"
                  : totalServices
              }
              title="NUMBER OF SERVICES"
              icon={<img src={TimeIcon} alt="Time Icon" />}
            />
          </Box>
        </Box>

        <Box mt={8}>
          <Typography fontSize="20px" fontWeight="700" color={colors.text[100]}>
            Stats Overview
          </Typography>
          <Box
            borderColor={colors.primary[100]}
            sx={{ borderBottom: "1px solid", my: 2 }}
          ></Box>
        </Box>

        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gap="2rem"
          mt={5}
          alignItems="stretch"
        >
          <Box
            gridColumn="span 6"
            className="gradient-border-mask"
            sx={{ display: "flex", flexDirection: "column", p: 2 }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Typography
                fontSize="26px"
                fontWeight="700"
                color={colors.text[100]}
              >
                Number of Services per Chain
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1, p: 1, mt: 2, overflow: "auto" }}>
              <ProgressBarsServices />
            </Box>
          </Box>

          <Box
            gridColumn="span 6"
            className="gradient-border-mask"
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 2,
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ flexShrink: 0, mb: 2 }}
            >
              <Typography
                fontSize="26px"
                fontWeight="700"
                color={colors.text[100]}
              >
                Contract Distribution by Providers
              </Typography>
              <ContractsFilterButtonGroup
                filterType={filterType}
                setFilterType={setFilterType}
              />
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                p: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "auto",
              }}
            >
              {allContractsLoading ? (
                <Typography color={colors.text[100]}>Loading...</Typography>
              ) : allContractsError ? (
                <Typography color="red">Error loading contracts</Typography>
              ) : filteredContracts.length === 0 ? (
                <Typography color={colors.text[100]}>
                  {filterType === "ALL"
                    ? "No contracts to show"
                    : filterType === "ACTIVE"
                    ? "No active contracts to show"
                    : "No completed contracts to show"}
                </Typography>
              ) : (
                <Box sx={{ width: "100%", height: "300px" }}>
                  <PieChart data={contractDistributionData} />
                </Box>
              )}
            </Box>
          </Box>
        </Box>

        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gap="2rem"
          mt={4}
          pb={4}
          alignItems="stretch"
        >
          <Box
            gridColumn="span 12"
            className="gradient-border-mask"
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 2,
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ flexShrink: 0, mb: 2 }}
            >
              <Typography
                fontSize="26px"
                fontWeight="700"
                color={colors.text[100]}
              >
                Location of Providers
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                p: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "auto",
              }}
            >
              {locationsLoading ? (
                <Typography color={colors.text[100]}>Loading...</Typography>
              ) : locationsError ? (
                <Typography color="red">Error loading locations</Typography>
              ) : (
                <Box sx={{ width: "100%", height: "300px" }}>
                  <PieChart data={providerLocationsData || []} />
                </Box>
              )}
            </Box>
          </Box>
        </Box>

        {/* ────────────────────────────────
            COMMENTED‑OUT PANELS (to be reintroduced later)
           ─────────────────────────────── */}
        {/* <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gap="2rem"
          mt={5}
          alignItems="stretch"
        >
          <Box
            gridColumn="span 6"
            className="gradient-border-mask"
            sx={{ display: "flex", flexDirection: "column", p: 2 }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ flexShrink: 0, mb: 2 }}
            >
              <Typography
                fontSize="26px"
                fontWeight="700"
                color={colors.text[100]}
              >
                Distribution of Network Providers
              </Typography>
              <OffsetButtonGroup
                offset={offsetProviders}
                setOffset={setOffsetProviders}
              />
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                p: 1,
                display: "flex",
                overflow: "auto",
                mt: 6,
              }}
            >
              <ProgressBars offset={offsetProviders} />
            </Box>
          </Box>

          <Box
            gridColumn="span 6"
            className="gradient-border-mask"
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 2,
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ flexShrink: 0, mb: 2 }}
            >
              <Typography
                fontSize="26px"
                fontWeight="700"
                color={colors.text[100]}
              >
                Request Distribution by Network
              </Typography>
              <OffsetButtonGroup
                offset={offsetRequests}
                setOffset={setOffsetRequests}
              />
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                p: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "auto",
              }}
            >
              {chainListLoading || chainAnalyticsLoading ? (
                <Typography color={colors.text[100]}>Loading...</Typography>
              ) : chainListError || chainAnalyticsError ? (
                <Typography color="red">Error loading chain data</Typography>
              ) : (
                <Box sx={{ width: "100%", height: "300px" }}>
                  <PieChart data={chainAnalyticsData || []} />
                </Box>
              )}
            </Box>
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
};

export default Dashboard;

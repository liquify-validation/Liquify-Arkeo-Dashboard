import React, { useState, useContext } from "react";
import { Box, useTheme, Pagination } from "@mui/material";
import { tokens } from "../theme";
import { ProviderCard, Header, ProvidersBar, CircleIcon } from "../components";
import { DataContext } from "../data/DataProvider.jsx";
import { HexMap, HexMapLight } from "../assets";
import { Link } from "react-router-dom";
import { providersMockData } from "../data/mockData.js";

const Providers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;

  const data = useContext(DataContext);

  // Assuming your data object has a grabProviders property containing the providers data
  const providerData = data.grabProviders || {};
  const providerKeys = Object.keys(providerData);

  // Calculate total pages
  const totalPages = Math.ceil(providersMockData.length / cardsPerPage);

  // Adjust the slicing to work with providerKeys
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentProviderKeys = providerKeys.slice(
    indexOfFirstCard,
    indexOfLastCard
  );

  // Change page handler
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

  // Function to assign an SVG icon based on the provider's name
  // const getProviderIcon = (providerName) => {
  //   switch (providerName) {
  //     // case "Provider_1":
  //     //   return <Provider1Icon />;
  //     // case "Provider_2":
  //     //   return <Provider2Icon />;
  //     // case "Provider_3":
  //     //   return <Provider3Icon />;

  //     default:
  //       return <LiquifyIcon />;
  //   }
  // };

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
          justifyContent="space-between"
          alignItems="center"
          marginTop="35px"
        >
          <ProvidersBar />
        </Box>

        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="minmax(100px, auto)"
          gap="2rem"
          mt={5}
        >
          {/* <Link
              to={{
                pathname: "/provider",
                state: { providerName: provider.provider },
              }}
              key={index}
              style={{
                textDecoration: "none",
                color: "inherit",
                gridColumn: "span 3",
              }}
            >  */}
          {currentProviderKeys.map((key, index) => {
            const provider = providerData[key];
            const endpoints = JSON.parse(provider.endpoints || "{}");
            const isOnline = !Object.values(endpoints).some(
              (endpoint) => endpoint.status === "OFFLINE"
            );

            return (
              <Box
                key={key}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  gridColumn: "span 3",
                }}
              >
                <ProviderCard
                  provider={provider.provider_name || key}
                  companyIcon={
                    <CircleIcon
                      color={colorPalette[index % colorPalette.length]}
                    />
                  }
                  validationDate={provider.description}
                  website={provider.website}
                  freeUsageLimit={provider.free_tier_rate_limit}
                  openContracts={"0"}
                  endpoints={provider.endpoints}
                  age={"0"}
                  uptime={"0"}
                  amountTaxed={provider.amountTaxed}
                  location={provider.location}
                  renewedContracts={"0"}
                  cloudBaremetal={provider.isp}
                  priced={provider.priced}
                  open={provider.open}
                  active={provider.active}
                  status={isOnline ? "ONLINE" : "OFFLINE"}
                />
              </Box>
            );
          })}
        </Box>

        {/* Pagination (Assuming static for simplicity, adjust according to data size/dynamic needs) */}
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

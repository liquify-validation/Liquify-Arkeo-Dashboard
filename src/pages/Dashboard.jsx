import Header from "../components/Header";
import { useContext } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { DataContext } from "../data/DataProvider";

import {
  TimeIcon,
  ProviderIcon,
  BondedIcon,
  HexMap,
  HexMapLight,
} from "../assets";

import { Pie2, StatBox, ProgressBars } from "../components";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const data = useContext(DataContext);

  const networkData = data.grabNetworkData?.[0] || {};
  const numberOfProviders = networkData.number_of_providers || "Loading...";
  const numberOfServices = networkData.number_of_services || "Loading...";
  const totalBondedValue = (networkData.bond / 1e6).toFixed(2) || "Loading...";

  const hexmapClassName = `hexmap-bg ${
    theme.palette.mode === "dark" ? "hexmap-dark" : "hexmap-light"
  }`;

  const backgroundImageUrl =
    theme.palette.mode === "dark" ? HexMap : HexMapLight;

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
          <Header title="Dashboard" />
        </Box>

        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="2rem"
          mt={5}
        >
          <Box
            gridColumn="span 4"
            display="flex"
            alignItems="center"
            justifyContent="left"
            className="gradient-border-mask"
          >
            <Box>
              <StatBox
                number={numberOfProviders}
                title="TOTAL PROVIDERS"
                progress=""
                increase="+12%"
                icon={<img src={ProviderIcon} alt="Provider Icon" />}
              />
            </Box>
          </Box>
          <Box
            gridColumn="span 4"
            display="flex"
            alignItems="center"
            justifyContent="left"
            className="gradient-border-mask"
          >
            <Box>
              <StatBox
                number={`${totalBondedValue}`}
                title="TOTAL BONDED VALUE"
                icon={<img src={BondedIcon} alt="Bonded Icon" />}
              />
            </Box>
          </Box>

          <Box
            gridColumn="span 4"
            display="flex"
            alignItems="center"
            justifyContent="left"
            className="gradient-border-mask"
          >
            <Box>
              <StatBox
                number={numberOfServices}
                title="NUMBER OF SERVICES"
                icon={<img src={TimeIcon} alt="Time Icon" />}
              />
            </Box>
          </Box>
          {/*ROW 2*/}
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
          gridAutoRows="auto"
          gap="2rem"
          mt={5}
        >
          <Box
            gridColumn="span 6"
            display="flex"
            flexDirection="column"
            className="gradient-border-mask"
          >
            <Box>
              <Typography
                fontSize="26px"
                fontWeight="700"
                color={colors.text[100]}
                margin="30px"
              >
                Distribution of Network Providers
              </Typography>
              <Box
                display="flex"
                sx={{ ml: "30px", mr: "30px" }}
                alignItems="center"
                justifyContent="center"
                marginLeft="30px"
              >
                <ProgressBars />
              </Box>
            </Box>
          </Box>
          <Box
            gridColumn="span 6"
            display="flex"
            height="400px"
            flexDirection="column"
            className="gradient-border-mask"
          >
            <Typography
              fontSize="26px"
              fontWeight="700"
              color={colors.text[100]}
              margin="30px"
            >
              Request Distribution by networks
            </Typography>
            <Box
              sx={{ maxWidth: "600px", height: "300px" }}
              alignItems="center"
              justifyContent="center"
              margin="5px"
            >
              <Pie2 />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;

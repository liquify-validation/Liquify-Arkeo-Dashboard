import React from "react";
import Header from "../components/Header";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

import { TimeIcon, ProviderIcon, BondedIcon } from "../assets";

import { Pie, StatBox, ProgressBars } from "../components";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box className="hexmap-bg">
      <Box m="40px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="Dashboard" />
        </Box>

        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="7rem"
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
                number="84"
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
                number="440000"
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
                number="12,100"
                title="24 HR VOLUME "
                icon={<img src={TimeIcon} alt="Time Icon" />}
              />
            </Box>
          </Box>
          {/*ROW 2*/}
        </Box>
        <Box mt={8}>
          <Typography variant="h4">Stats Overview</Typography>
          <Box
            borderColor={colors.primary[100]}
            sx={{ borderBottom: "1px solid", my: 2 }}
          ></Box>
        </Box>
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="7rem"
          mt={5}
        >
          <Box
            gridColumn="span 6"
            display="flex"
            height="400px"
            flexDirection="column"
            className="gradient-border-mask"
          >
            <Box>
              <Typography variant="h3" margin="30px">
                Distribution of Network Providers
              </Typography>
              <Box
                sx={{ maxWidth: "400px" }}
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
            <Typography variant="h3" margin="30px">
              Request Distribution by networks
            </Typography>
            <Box
              sx={{ maxWidth: "400px" }}
              alignItems="center"
              justifyContent="center"
              margin="10px"
              marginLeft="150px"
            >
              <Pie />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;

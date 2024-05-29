import React from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { ProviderOverview, Header, Table } from "../components";
import { LiquifyIcon, LiquifyIconDark, HexMap, HexMapLight } from "../assets";
import { useLocation } from "react-router-dom";

const Provider = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const location = useLocation();
  const providerName = location.state?.providerName;

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
      <Box m="20px" pb={4}>
        <Box m="20px" display="flex" alignItems="center" gap="15px">
          <Header title={providerName || "Provider"} />
          {
            <img
              src={
                theme.palette.mode === "dark" ? LiquifyIcon : LiquifyIconDark
              }
              alt="Provider Icon"
            />
          }
        </Box>

        <Box gap="1rem" mt={7} ml={3}>
          <Box span="10" pb={4}>
            <ProviderOverview
              currentBlock={23897943}
              totalTaxed={23452}
              calls={388404}
              totalProviders={78}
              bondedContract={45745}
              arkeoPrice={25.78}
              contribution={24000}
            />
          </Box>
        </Box>
        <Table />
        {/* Pagination */}
      </Box>
    </Box>
  );
};

export default Provider;

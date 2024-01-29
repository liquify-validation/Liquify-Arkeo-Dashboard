import React from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  Pagination,
} from "@mui/material";
import { tokens } from "../theme";
import { ProviderOverview, Header, ProvidersBar, Table } from "../components";
import { LiquifyIcon } from "../assets";

const Providers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <div className="hexmap-bg">
      <Box m="40px" paddingTop="0px">
        <Box display="flex">
          <Header title="Provider" />
          {<img src={LiquifyIcon} alt="Provider Icon" />}
        </Box>

        <Box gap="1rem" mt={5}>
          <Box span="10">
            <ProviderOverview
              currentBlock={23897943}
              totalTaxed={23452}
              calls={388404}
              totalProviders={78}
              bondedContract={45745}
              arkeoPrice={25.78}
            />
          </Box>
        </Box>
        <Table />
        {/* Pagination */}
      </Box>
    </div>
  );
};

export default Providers;

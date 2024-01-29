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
import { ProviderCard, Header, ProvidersBar } from "../components";
import { LiquifyIcon } from "../assets";

const Providers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <div className="hexmap-bg">
      <Box m="40px" paddingTop="0px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="Providers" />
        </Box>
        <Box justifyContent="space-between" alignItems="center">
          {" "}
          <ProvidersBar />
        </Box>

        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="7rem"
          mt={5}
        >
          <Box span="3">
            <ProviderCard
              companyIcon={<img src={LiquifyIcon} alt="Provider Icon" />}
              validationDate={"Validating Since 01/01/2024"}
              openContracts={100}
              uptime={"100%"}
              amountTaxed={"$0"}
              location={"New York"}
              renewedContracts={100}
              cloudBaremetal={"AWS"}
              priced={"$0"}
            />
          </Box>
        </Box>
        {/* Pagination */}
        <Box display="flex" fixed="bottom" justifyContent="center" mt={25}>
          <Pagination
            count={10}
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
    </div>
  );
};

export default Providers;

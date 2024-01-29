import React from "react";
import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { tokens } from "../theme";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const ProviderCard = ({
  companyIcon,
  validationDate,
  openContracts,
  uptime,
  amountTaxed,
  location,
  renewedContracts,
  cloudBaremetal,
  priced,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      width="200%"
      padding="25px"
      height="auto"
      className="gradient-border-mask"
    >
      <Box display="inline-block" justifyContent="center">
        {companyIcon}
      </Box>

      <Box
        sx={{ fontSize: "10px" }}
        display="flex"
        justifyContent="left"
        ml={4.5}
        mt={-1.5}
      >
        {validationDate}
      </Box>

      <Box
        mt={4}
        width="100%"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Typography variant="p">Open Contracts:</Typography>
        <Typography variant="p">{openContracts}</Typography>
      </Box>
      <Box
        mt={1.5}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Typography variant="p">Uptime:</Typography>
        <Typography variant="p">{uptime}</Typography>
      </Box>
      <Box
        mt={1.5}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Typography variant="p">Total Amount Taxed:</Typography>
        <Typography variant="p">{amountTaxed}</Typography>
      </Box>
      <Box
        mt={1.5}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Typography variant="p">Location:</Typography>
        <Typography variant="p">{location}</Typography>
      </Box>
      <Box
        mt={1.5}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Typography variant="p">Renewed Contracts:</Typography>
        <Typography variant="p">{renewedContracts}</Typography>
      </Box>
      <Box
        mt={1.5}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Typography variant="p">Cloud/Bare Metal:</Typography>
        <Typography variant="p">{cloudBaremetal}</Typography>
      </Box>
      <Box
        mt={1.5}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Typography variant="p">Priced:</Typography>
        <Typography variant="p">{priced}</Typography>
      </Box>
      <Box
        display="flex"
        gap="15px"
        justifyContent="flex-start"
        flexDirection="row"
      >
        <Box
          p="4px"
          mt="20px"
          px="7px"
          color="black"
          display="inline-block"
          justifyContent="center"
          backgroundColor={colors.greenAccent[600]}
          borderRadius="25px"
        >
          Open
        </Box>
        <Box
          p="4px"
          mt="20px"
          px="7px"
          color="black"
          display="inline-block"
          justifyContent="center"
          backgroundColor={colors.greenAccent[600]}
          borderRadius="25px"
        >
          Active
        </Box>
      </Box>
    </Box>
  );
};

export default ProviderCard;

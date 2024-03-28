import React from "react";
import { Grid, Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import BlockIcon from "../assets/currentblock_icon.svg"; // Import your SVGs like this
import TaxIcon from "../assets/amtTaxed_icon.svg";
import TimeIcon from "../assets/timeicon.svg";
import ProviderIcon from "../assets/totalprovidericon.svg";
import BondedIcon from "../assets/bondedicon.svg";
import PriceIcon from "../assets/price_icon.svg";

const ProviderOverview = ({
  currentBlock,
  totalTaxed,
  calls,
  totalProviders,
  bondedContract,
  arkeoPrice,
  contribution,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const Item = ({ icon, title, value }) => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <img
        src={icon}
        alt={`${title} icon`}
        style={{ width: "80px", height: "50px" }}
      />
      <Box>
        <Typography
          variant="5"
          fontWeight="700"
          fontSize="16px"
          color={colors.primary[500]}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          color={colors.primary[800]}
          fontWeight="600"
          fontSize="14px"
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box
      paddingTop="30px"
      paddingBottom="30px"
      paddingLeft="70px"
      width="90vw"
      className="gradient-border-mask"
    >
      <Grid container spacing={8}>
        <Grid item xs={12} sm={3}>
          <Item icon={BlockIcon} title="CURRENT BLOCK" value={currentBlock} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Item icon={TaxIcon} title="TOTAL AMOUNT TAXED" value={totalTaxed} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Item icon={TimeIcon} title="24 HOUR CALLS" value={calls} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Item
            icon={ProviderIcon}
            title="TOTAL PROVIDERS"
            value={totalProviders}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Item
            icon={BondedIcon}
            title="BONDED CONTRACT AMOUNT"
            value={bondedContract}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Item icon={PriceIcon} title="ARKEO PRICE" value={arkeoPrice} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Item
            icon={PriceIcon}
            title="CONTRIBUTION TO RESERVE"
            value={contribution}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProviderOverview;

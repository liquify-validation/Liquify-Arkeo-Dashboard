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
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const Item = ({ icon, title, value }) => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <img
        src={icon}
        alt={`${title} icon`}
        style={{ width: "70px", height: "50px" }}
      />
      <Box>
        <Typography variant="subtitle1">{title}</Typography>
        <Typography variant="body1">{value}</Typography>
      </Box>
    </Box>
  );

  return (
    <Box
      paddingTop="30px"
      paddingBottom="30px"
      paddingLeft="50px"
      width="60vw"
      className="gradient-border-mask"
    >
      <Grid container spacing={8}>
        <Grid item xs={12} sm={4}>
          <Item icon={BlockIcon} title="Current Block" value={currentBlock} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Item icon={TaxIcon} title="Total Amount Taxed" value={totalTaxed} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Item icon={TimeIcon} title="24 Hour Calls" value={calls} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Item
            icon={ProviderIcon}
            title="Total Providers"
            value={totalProviders}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Item
            icon={BondedIcon}
            title="Bonded Contact Amount"
            value={bondedContract}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Item icon={PriceIcon} title="Arkeo Price" value={arkeoPrice} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProviderOverview;

import React from "react";
import { Box } from "@mui/material";
import StatBox from "./StatBox";
import {
  PriceIcon,
  BlockIcon,
  ProviderIcon,
  BondedIcon,
  TaxIcon,
  TimeIcon,
  ReserveIcon,
} from "../assets";
import { useCurrentHeight } from "../hooks/useCurrentHeight";
import { useTotalProviders } from "../hooks/useTotalProviders";
import { useActiveContracts } from "../hooks/useActiveContracts";
import { useCompletedContracts } from "../hooks/useCompletedContracts";
import { use24hrCalls } from "../hooks/use24hrCalls";
import { useTotalServices } from "../hooks/useTotalServices";

// TO DO - Bring in Loading states
// TO DO - Line up icons

const ScrollableStatsCardSection = () => {
  const { data: currentHeight, isLoading: heightLoading } = useCurrentHeight();
  const { data: totalProviders, isLoading: providersLoading } =
    useTotalProviders();
  const { data: totalServices, isLoading: servicesLoading } =
    useTotalServices();
  const { data: activeContractsData } = useActiveContracts();
  const { data: completedContractsData } = useCompletedContracts();
  const { data: last24hrCalls } = use24hrCalls();

  const openContractsCount = activeContractsData
    ? Object.keys(activeContractsData).length
    : 0;

  const closedContractsCount = completedContractsData
    ? Object.keys(completedContractsData).length
    : 0;

  const statsItems = [
    {
      title: "Current Block",
      number: currentHeight,
      icon: (
        <Box
          component="img"
          src={BlockIcon}
          alt="Current Block"
          width={50}
          height={50}
        />
      ),
    },
    // {
    //   title: "Total Amount Taxed",
    //   number: `$${(12345.67).toLocaleString()}`,
    //   icon: (
    //     <Box
    //       component="img"
    //       src={TaxIcon}
    //       alt="Total Amount Taxed"
    //       width={50}
    //       height={50}
    //     />
    //   ),
    // },
    {
      title: "24hr Calls",
      number: last24hrCalls.toLocaleString(),
      icon: (
        <Box
          component="img"
          src={TimeIcon}
          alt="24hr Calls"
          width={50}
          height={50}
        />
      ),
    },
    {
      title: "Open Contracts",
      number: openContractsCount.toLocaleString(),
      icon: (
        <Box
          component="img"
          src={ReserveIcon}
          alt="Open Contracts"
          width={50}
          height={50}
        />
      ),
    },
    {
      title: "Closed Contracts",
      number: closedContractsCount.toLocaleString(),
      icon: (
        <Box
          component="img"
          src={ReserveIcon}
          alt="Closed Contracts"
          width={50}
          height={50}
        />
      ),
    },
    {
      title: "Total Providers",
      number: totalProviders,
      icon: (
        <Box
          component="img"
          src={ProviderIcon}
          alt="Total Providers"
          width={50}
          height={50}
        />
      ),
    },
    {
      title: "Total Services",
      number: totalServices,
      icon: (
        <Box
          component="img"
          src={TimeIcon}
          alt="Total Providers"
          width={50}
          height={50}
        />
      ),
    },
    // {
    //   title: "Bonded Contract Amount",
    //   number: `$${(1500000).toLocaleString()}`,
    //   icon: (
    //     <Box
    //       component="img"
    //       src={BondedIcon}
    //       alt="Bonded Contract Amount"
    //       width={50}
    //       height={50}
    //     />
    //   ),
    // },
    // {
    //   title: "Arkeo Price",
    //   number: `MOON`,
    //   icon: (
    //     <Box
    //       component="img"
    //       src={PriceIcon}
    //       alt="Arkeo Price"
    //       width={50}
    //       height={50}
    //     />
    //   ),
    // },
  ];

  return (
    <Box
      className="gradient-border-mask"
      sx={{
        width: "98%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 1,
        p: 1,
        mb: 6,
        mt: 4,
        mx: "auto",
        alignItems: "center",
        gridAutoRows: "150px",
      }}
    >
      {statsItems.map((item, index) => (
        <Box key={index}>
          <StatBox title={item.title} number={item.number} icon={item.icon} />
        </Box>
      ))}
    </Box>
  );
};

export default ScrollableStatsCardSection;

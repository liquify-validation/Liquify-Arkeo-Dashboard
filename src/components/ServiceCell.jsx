import React from "react";
import { Typography } from "@mui/material";
import { useServiceName } from "../hooks/useServiceName";

const ServiceCell = ({ serviceNumber }) => {
  const { data: serviceName, isLoading, error } = useServiceName(serviceNumber);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error</Typography>;
  if (!serviceName) return <Typography>-</Typography>;

  const cleanedServiceName = serviceName.trim().replace(/^"|"$/g, "");

  return <Typography>{cleanedServiceName}</Typography>;
};

export default ServiceCell;

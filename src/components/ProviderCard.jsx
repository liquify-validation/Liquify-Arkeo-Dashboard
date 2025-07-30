import React, { useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tooltip,
} from "@mui/material";
import { tokens } from "../theme";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { useProviderPerformance } from "../hooks/useProviderPerformance";
import ProviderPerformanceChart from "./ProviderPerformanceChart";
import { useProviderContracts } from "../hooks/useProviderContracts";
import { useServiceNames } from "../hooks/useServiceNames";

import { useNavigate } from "react-router-dom";
import { useServiceName } from "../hooks/useServiceName";
import ServicesTooltip from "./ServiceTooltip";

// TO DO - Swap out any mock data and logic for open and online
// TO DO - Look at OFFLINE/Online logic
//TODO - Swap in uptime stats

const isValidHttpUrl = (string) => {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
};

const ProviderCard = ({
  provider,
  companyIcon,
  validationDate,
  openContracts,
  age,
  endpoints,
  uptime,
  amountTaxed,
  location,
  renewedContracts,
  cloudBaremetal,
  website,
  priced,
  open,
  active,
  freeUsageLimit,
  status,
  providerData,
  numberOfServices,
  completedContracts,
  services,
}) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const colors = tokens(theme.palette.mode);
  const [openDialog, setOpenDialog] = useState(false);
  const [endpointsOpen, setEndpointsOpen] = useState(false);
  const navigate = useNavigate();
  const [performanceDialogOpen, setPerformanceDialogOpen] = useState(false);

  const parsedEndpoints = providerData?.endpoints
    ? JSON.parse(providerData.endpoints)
    : {};
  const firstEndpoint = parsedEndpoints ? Object.keys(parsedEndpoints)[0] : "";

  const offlineReason = providerData?.offline_reason;
  const statusColor = status === "ONLINE" ? "#0BDA51" : "red";
  const statusTooltip =
    status === "ONLINE"
      ? "Online"
      : (offlineReason === "N/A" ? "Unknown" : offlineReason) ||
        "No offline reason provided";

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handlePerformanceDialogOpen = () => {
    setPerformanceDialogOpen(true);
  };

  const handlePerformanceDialogClose = () => {
    setPerformanceDialogOpen(false);
  };

  const displayedEndpoint =
    firstEndpoint && firstEndpoint.length > 50
      ? `${firstEndpoint.substring(0, 50)}...`
      : firstEndpoint;

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const capitalizedProvider = /^[A-Za-z]/.test(provider)
    ? capitalizeFirstLetter(provider)
    : provider;

  const isWebsiteValid = isValidHttpUrl(website);

  const providerId = providerData?.provider_pubkey;

  const handleContractsClick = () => {
    navigate(
      `/contracts/${providerId}?location=${encodeURIComponent(
        location
      )}&isp=${encodeURIComponent(
        cloudBaremetal
      )}&providerName=${encodeURIComponent(capitalizedProvider)}`
    );
  };

  const rawServices = providerData?.services;
  const serviceIds = React.useMemo(() => {
    if (!rawServices) return [];
    if (Array.isArray(rawServices)) return rawServices;
    if (typeof rawServices === "string") {
      try {
        const parsed = JSON.parse(rawServices);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        /* ignore */
      }
      return rawServices
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
    return [];
  }, [rawServices]);

  const {
    data: serviceList,
    isLoading: serviceLoading,
    error: serviceError,
  } = useServiceNames(serviceIds);

  const {
    data: performanceData,
    isLoading: performanceLoading,
    error: performanceError,
  } = useProviderPerformance(performanceDialogOpen ? providerId : null);

  const servicesTooltipContent = () => {
    if (serviceLoading) return "Loading...";
    if (serviceError) return "Error loading service name";
    if (!serviceName) return "No service name found";

    return (
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="body2">{serviceName}</Typography>
      </Box>
    );
  };

  const { data: contractsData, isLoading: contractsLoading } =
    useProviderContracts(providerId);

  const closedContracts = (() => {
    if (!contractsData) return 0;
    const list = Object.values(contractsData);
    return list.filter((c) => c.completed === true).length;
  })();

  return (
    <Box
      width="100%"
      padding="25px"
      height="auto"
      minHeight="600px"
      className="gradient-border-mask"
      sx={{ userSelect: "text" }}
    >
      <Box display="flex" alignItems="center" gap="12px">
        <Box mt="1.5px">{companyIcon}</Box>
        <Typography variant="h4" fontWeight="bold">
          {capitalizedProvider}
        </Typography>
      </Box>

      <Box
        sx={{ fontSize: "10px" }}
        display="flex"
        justifyContent="left"
        ml={6.5}
        mt={-1}
      >
        <Typography variant="p" fontSize="12px">
          {validationDate}
        </Typography>
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
        width="100%"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Typography variant="p">Completed Contracts:</Typography>
        <Typography variant="p">
          {contractsLoading ? "…" : closedContracts}
        </Typography>
      </Box>
      <Box
        mt={1.5}
        width="100%"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="p">Number of Services:</Typography>
        <Box display="flex" alignItems="center">
          <Typography variant="p">{numberOfServices}</Typography>
          {numberOfServices > 0 && (
            <ServicesTooltip
              services={serviceList || []}
              isDarkMode={isDarkMode}
            />
          )}
        </Box>
      </Box>
      <Box
        mt={1.5}
        width="100%"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Typography variant="p">Age(blocks):</Typography>
        <Typography variant="p">{age}</Typography>
      </Box>

      <Box
        mt={1.5}
        width="100%"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Typography variant="p">Performance:</Typography>
        <IconButton
          onClick={(event) => {
            event.stopPropagation();
            handlePerformanceDialogOpen();
          }}
          size="small"
          sx={{ padding: 0 }}
        >
          <ShowChartIcon />
        </IconButton>
      </Box>

      {/* Performance Dialog */}
      <Dialog
        open={performanceDialogOpen}
        onClose={handlePerformanceDialogClose}
        fullWidth={true}
        maxWidth="md"
      >
        <Box
          className="gradient-border-mask"
          backgroundColor={colors.primary[200]}
          width="100%"
          sx={{ pt: 2, pb: 4 }}
        >
          <DialogTitle
            sx={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "white",
              ml: 2,
            }}
          >
            Provider Performance
          </DialogTitle>
          <DialogContent>
            {performanceLoading ? (
              <Typography>Loading chart...</Typography>
            ) : performanceError ? (
              <Typography color="red">
                Error loading performance data
              </Typography>
            ) : performanceData ? (
              <ProviderPerformanceChart data={performanceData} />
            ) : (
              <Typography>No data available</Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handlePerformanceDialogClose}>Close</Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Box
        mt={1.5}
        width="100%"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Typography variant="p">Endpoints:</Typography>
        <IconButton
          onClick={(event) => {
            event.stopPropagation();
            handleDialogOpen();
          }}
          size="small"
          sx={{ padding: 0 }}
        >
          <AnalyticsIcon />
        </IconButton>
      </Box>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <Box
          className="gradient-border-mask"
          backgroundColor={colors.primary[200]}
        >
          <DialogTitle>Endpoints</DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Typography>Endpoint:</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography>{displayedEndpoint}</Typography>
                  {firstEndpoint && (
                    <Tooltip title="Copy to clipboard">
                      <IconButton
                        onClick={() => {
                          navigator.clipboard
                            .writeText(firstEndpoint)
                            .catch((err) => {
                              console.error("Could not copy text: ", err);
                            });
                        }}
                        size="small"
                      >
                        <ContentCopyIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Free Usage Limit:</Typography>
                <Typography>{freeUsageLimit}</Typography>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Close</Button>
          </DialogActions>
        </Box>
      </Dialog>
      <Box
        mt={1.5}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Typography variant="p">Uptime:</Typography>
        <Typography variant="p">100%</Typography>
      </Box>
      <Box
        mt={1.5}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Typography variant="p">Total Amount Taxed:</Typography>
        <Typography variant="p">${amountTaxed}</Typography>
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
        <Typography variant="p">ISP:</Typography>
        <Typography
          variant="p"
          sx={{ width: "100%", textAlign: "right", maxWidth: "200px" }}
        >
          {cloudBaremetal}
        </Typography>
      </Box>
      <Box
        mt={1.5}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Typography variant="p">Website:</Typography>
        {isWebsiteValid ? (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "#1d8aed", zIndex: 1000 }}
          >
            <Typography
              variant="p"
              style={{ color: theme.palette.primary.main }}
            >
              {website}
            </Typography>
          </a>
        ) : (
          <Typography variant="p">{website || "N/A"}</Typography>
        )}
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: "15px",
          left: "25px",
          right: "25px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          p="8px"
          mt="20px"
          px="15px"
          color="black"
          display="inline-block"
          justifyContent="center"
          backgroundColor={colors.greenAccent[600]}
          borderRadius="25px"
        >
          Open
        </Box>
        <Tooltip title={statusTooltip}>
          <Box
            p="8px"
            marginLeft="10px"
            mt="20px"
            px="20px"
            display="inline-block"
            justifyContent="center"
            color={statusColor}
            backgroundColor="transparent"
            borderRadius="25px"
            sx={{
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: statusColor,
              position: "relative",
              zIndex: 1300,
              cursor: "pointer",
            }}
          >
            {status}
          </Box>
        </Tooltip>
        <Box sx={{ marginLeft: "auto", mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleContractsClick}
            sx={{
              userSelect: "none",
              backgroundColor: "#166cf9",
              borderRadius: "20px",
              textTransform: "uppercase",
              fontWeight: "semibold",
              color: "white",
              ml: 1,
            }}
          >
            Contracts
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProviderCard;

import { useState } from "react";
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
import { useNavigate } from "react-router-dom";

// TO DO - Make text so can be copied
// TO DO - Swap out any mock data and logic for open and online

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
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openDialog, setOpenDialog] = useState(false);
  const [endpointsOpen, setEndpointsOpen] = useState(false);
  const navigate = useNavigate();

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

  return (
    <Box
      width="100%"
      padding="25px"
      height="auto"
      minHeight="525px"
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
        <Typography variant="p">{uptime}%</Typography>
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
          bottom: "20px",
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
            marginLeft="20px"
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

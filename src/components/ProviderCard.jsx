import { useState, useContext } from "react";
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
import { DataContext } from "../data/DataProvider";
import { tokens } from "../theme";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

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
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openDialog, setOpenDialog] = useState(false);
  const { grabProviders } = useContext(DataContext);
  const statusColor = status === "ONLINE" ? "#0BDA51" : "red";

  const providerData = grabProviders?.[provider];
  const firstEndpoint = providerData?.endpoints
    ? Object.keys(JSON.parse(providerData.endpoints))[0]
    : "";

  const offlineReason = providerData?.offline_reason;
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
    firstEndpoint.length > 50
      ? `${firstEndpoint.substring(0, 50)}...`
      : firstEndpoint;

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const capitalizedProvider = /^[A-Za-z]/.test(provider)
    ? capitalizeFirstLetter(provider)
    : provider;

  const isWebsiteValid = isValidHttpUrl(website);

  return (
    <Box
      width="100%"
      padding="25px"
      height="auto"
      minHeight="525px"
      className="gradient-border-mask"
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
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
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
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
      {/* <Box
        mt={1.5}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Typography variant="p">Priced:</Typography>
        <Typography variant="p">${priced}</Typography>
      </Box> */}
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
            style={{
              textDecoration: "none",
              color: "#1d8aed",
              zIndex: 1000,
            }}
          >
            <Typography
              variant="p"
              style={{ color: theme.palette.primary.main }}
            >
              {website}
            </Typography>
          </a>
        ) : (
          <Typography variant="p" s>
            {website || "N/A"}
          </Typography>
        )}
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
        <Tooltip title={statusTooltip}>
          <Box
            p="4px"
            mt="20px"
            px="6px"
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
      </Box>
    </Box>
  );
};

export default ProviderCard;

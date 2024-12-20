import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import { Box, Typography, useTheme, Tooltip, IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useProviderContracts } from "../hooks/useProviderContracts";
import ContractTable from "../components/ContractTable";
import { tokens } from "../theme";
import { HexMap, HexMapLight } from "../assets";
import {
  ScrollableStatsCardSection,
  ColumnVisibilityToggle,
  ContractsFilterButtonGroup,
} from "../components";
import React, { useState, useMemo } from "react";

const Contract = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { providerId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = searchParams.get("location") || "N/A";
  const isp = searchParams.get("isp") || "N/A";
  const providerName = searchParams.get("providerName") || "Provider";

  const {
    data: contractsData,
    isLoading,
    error,
  } = useProviderContracts(providerId);
  const [filterType, setFilterType] = useState("ALL");

  const initialColumns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "serviceNumber", headerName: "Service", flex: 1 },
    { field: "providerName", headerName: "Provider Name", flex: 1 },
    { field: "duration", headerName: "Duration (blocks)", flex: 1 },
    { field: "isp", headerName: "ISP", flex: 1 },
    { field: "location", headerName: "Location", flex: 1 },
    { field: "contractCost", headerName: "Contract Cost", flex: 1 },
    { field: "callsSubmitted", headerName: "# of Calls Submitted", flex: 1 },
    { field: "timeRemaining", headerName: "Time Remaining", flex: 1 },
    { field: "queries", headerName: "Queries Per Minute", flex: 1 },
    { field: "type", headerName: "Type", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
  ];

  const [visibleColumns, setVisibleColumns] = useState(
    initialColumns.reduce((acc, col) => {
      acc[col.field] = true;
      return acc;
    }, {})
  );

  const filteredColumns = useMemo(() => {
    return initialColumns.filter((col) => visibleColumns[col.field] !== false);
  }, [initialColumns, visibleColumns]);

  const contractsArray = contractsData ? Object.values(contractsData) : [];

  const filteredContracts = useMemo(() => {
    if (!contractsArray) return [];
    if (filterType === "ALL") {
      return contractsArray;
    } else if (filterType === "ACTIVE") {
      return contractsArray.filter((c) => c.completed === false);
    } else {
      return contractsArray.filter((c) => c.completed === true);
    }
  }, [contractsArray, filterType]);

  const hexmapClassName = `hexmap-bg ${
    theme.palette.mode === "dark" ? "hexmap-dark" : "hexmap-light"
  }`;
  const backgroundImageUrl =
    theme.palette.mode === "dark" ? HexMap : HexMapLight;

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  if (isLoading) {
    return <Typography>Loading Contracts...</Typography>;
  }

  if (error) {
    return <Typography>Error loading contracts!</Typography>;
  }

  return (
    <Box
      className={hexmapClassName}
      sx={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center 30%",
        width: "100%",
        height: "100%",
        position: "relative",
        zIndex: 0,
        mt: "40px",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        ml={4}
        mb={2}
        sx={{ cursor: "pointer" }}
        onClick={() => navigate(-1)}
      >
        <ArrowBackIcon sx={{ color: colors.text[100], mr: 1 }} />
        <Typography
          variant="body1"
          fontWeight="bold"
          sx={{ color: colors.text[100] }}
        >
          Back
        </Typography>
      </Box>

      <Box display="flex" alignItems="center" ml={4} mb={2}>
        <Typography variant="h2" sx={{ fontWeight: 600, mr: 2 }}>
          Provider - {providerName}
        </Typography>
        <Box display="flex" alignItems="center">
          <Typography
            variant="body2"
            sx={{ color: colors.text[200], mr: 1, cursor: "pointer" }}
          >
            {providerId}
          </Typography>
          <Tooltip title="Copy ID">
            <IconButton
              size="small"
              onClick={() => copyToClipboard(providerId)}
              sx={{ color: colors.text[200], ml: 0.5 }}
            >
              <ContentCopyIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box>
        <ScrollableStatsCardSection />
      </Box>

      <Box sx={{ mx: "auto", ml: 3 }}>
        <ContractsFilterButtonGroup
          filterType={filterType}
          setFilterType={setFilterType}
        />
      </Box>

      <Box display="flex" justifyContent="flex-end" mb={2} mr={2}>
        <ColumnVisibilityToggle
          columns={initialColumns}
          visibleColumns={visibleColumns}
          onVisibilityChange={setVisibleColumns}
        />
      </Box>

      <ContractTable
        contracts={filteredContracts}
        isp={isp}
        location={location}
        columns={filteredColumns}
      />
      <Box height={40} />
    </Box>
  );
};

export default Contract;

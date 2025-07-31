import React, { useState, useMemo } from "react";
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
  PillFilterButtonGroup,
} from "../components";
import { autoHideCallsColumn, last4 } from "../utils/commonFunctions";

const Contract = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { providerId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = searchParams.get("location") || "N/A";
  const isp = searchParams.get("isp") || "N/A";
  const providerName = searchParams.get("providerName") || "Provider";
  const [statusFilter, setStatusFilter] = useState("ALL"); // ALL / ACTIVE / COMPLETED
  const [typeFilter, setTypeFilter] = useState("ALL"); // ALL / PAY_AS_YOU_GO / SUBSCRIPTION

  const statusOptions = [
    { value: "ALL", label: "ALL" },
    { value: "ACTIVE", label: "ACTIVE" },
    { value: "COMPLETED", label: "COMPLETED" },
  ];

  const typeOptions = [
    { value: "ALL", label: "ALL" },
    { value: "PAY_AS_YOU_GO", label: "PAY AS YOU GO" },
    { value: "SUBSCRIPTION", label: "SUBSCRIPTION" },
  ];

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
    { field: "settlementHeight", headerName: "Settlement Height", flex: 1 },
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
    const userVisible = initialColumns.filter(
      (col) => visibleColumns[col.field] !== false
    );
    return autoHideCallsColumn(userVisible, typeFilter);
  }, [initialColumns, visibleColumns, typeFilter]);
  const contractsArray = useMemo(
    () => (contractsData ? Object.values(contractsData) : []),
    [contractsData]
  );

  const typeFilteredContracts = useMemo(() => {
    if (typeFilter === "ALL") return contractsArray;
    return contractsArray.filter(
      (c) => (c.type || "").toUpperCase() === typeFilter
    );
  }, [contractsArray, typeFilter]);

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
            {last4(providerId)}
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
        <PillFilterButtonGroup
          value={statusFilter}
          options={statusOptions}
          onChange={setStatusFilter}
        />
        <Box mt={2}>
          <PillFilterButtonGroup
            value={typeFilter}
            options={typeOptions}
            onChange={setTypeFilter}
          />
        </Box>
      </Box>

      <Box display="flex" justifyContent="flex-end" mb={2} mr={2}>
        <ColumnVisibilityToggle
          columns={autoHideCallsColumn(initialColumns, typeFilter)}
          visibleColumns={visibleColumns}
          onVisibilityChange={setVisibleColumns}
        />
      </Box>

      <ContractTable
        contracts={typeFilteredContracts}
        filterType={statusFilter}
        isp={isp}
        location={location}
        columns={filteredColumns}
      />
      <Box height={40} />
    </Box>
  );
};

export default Contract;

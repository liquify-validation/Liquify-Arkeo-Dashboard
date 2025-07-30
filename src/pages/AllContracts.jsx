import React, { useState, useMemo } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useAllContracts } from "../hooks/useAllContracts";
import { useActiveContracts } from "../hooks/useActiveContracts";
import { useCompletedContracts } from "../hooks/useCompletedContracts";
import {
  AllContractsTable,
  ScrollableStatsCardSection,
  ColumnVisibilityToggle,
} from "../components";

import { HexMap, HexMapLight } from "../assets";
import PillFilterButtonGroup from "../components/PillFilterButtonGroup";
import { autoHideCallsColumn } from "../utils/commonFunctions";

const AllContracts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [typeFilter, setTypeFilter] = useState("ALL");

  const {
    data: allData,
    isLoading: allLoading,
    error: allError,
  } = useAllContracts();

  const {
    data: activeData,
    isLoading: activeLoading,
    error: activeError,
  } = useActiveContracts();

  const {
    data: completedData,
    isLoading: completedLoading,
    error: completedError,
  } = useCompletedContracts();

  const [filterType, setFilterType] = useState("ALL");

  const { contractsData, isLoading, error } = useMemo(() => {
    if (filterType === "ALL") {
      return {
        contractsData: allData,
        isLoading: allLoading,
        error: allError,
      };
    } else if (filterType === "ACTIVE") {
      return {
        contractsData: activeData,
        isLoading: activeLoading,
        error: activeError,
      };
    } else {
      return {
        contractsData: completedData,
        isLoading: completedLoading,
        error: completedError,
      };
    }
  }, [
    filterType,
    allData,
    allLoading,
    allError,
    activeData,
    activeLoading,
    activeError,
    completedData,
    completedLoading,
    completedError,
  ]);

  const contractsArray = useMemo(
    () => (contractsData ? Object.values(contractsData) : []),
    [contractsData]
  );

  const contractsByType = useMemo(() => {
    if (typeFilter === "ALL") return contractsArray;
    const canon = typeFilter.toUpperCase(); // "PAY AS YOU GO" | "SUBSCRIPTION"
    return contractsArray.filter((c) => (c.type || "").toUpperCase() === canon);
  }, [contractsArray, typeFilter]);

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

  const initialColumns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "serviceNumber", headerName: "Service", flex: 1 },
    { field: "providerShort", headerName: "Provider ID", flex: 1 },
    { field: "providerName", headerName: "Provider Name", flex: 1 },
    { field: "duration", headerName: "Duration (blocks)", flex: 1 },
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

  if (isLoading) return <Typography>Loading contracts...</Typography>;
  if (error) return <Typography>Error loading contracts!</Typography>;

  const hexmapClassName = `hexmap-bg ${
    theme.palette.mode === "dark" ? "hexmap-dark" : "hexmap-light"
  }`;

  const backgroundImageUrl =
    theme.palette.mode === "dark" ? HexMap : HexMapLight;

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
      <Typography variant="h2" mb={2} sx={{ fontWeight: 600, ml: 4 }}>
        All Contracts
      </Typography>
      <Box>
        <ScrollableStatsCardSection />
      </Box>
      <Box sx={{ mx: "auto", ml: 3 }}>
        <PillFilterButtonGroup
          value={filterType}
          options={statusOptions}
          onChange={setFilterType}
        />
        <Box mt={3}>
          <PillFilterButtonGroup
            value={typeFilter}
            options={typeOptions}
            onChange={setTypeFilter}
          />
        </Box>
      </Box>
      <Box sx={{ mx: "auto", pb: 4 }}>
        <Box display="flex" justifyContent="flex-end" mb={2} mr={2}>
          <ColumnVisibilityToggle
            columns={autoHideCallsColumn(initialColumns, typeFilter)}
            visibleColumns={visibleColumns}
            onVisibilityChange={setVisibleColumns}
          />
        </Box>

        <AllContractsTable
          contracts={contractsByType}
          filterType={filterType}
          columns={filteredColumns}
        />
      </Box>
    </Box>
  );
};

export default AllContracts;

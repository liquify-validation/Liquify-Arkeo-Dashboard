import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import ServiceCell from "./ServiceCell";

import { useCurrentHeight } from "../hooks/useCurrentHeight";
import { useSecondsPerBlock } from "../hooks/useSecondsPerBlock";
import { secondsToTimeObject } from "../utils/commonFunctions";

const ContractTable = ({
  contracts,
  filterType = "ALL",
  isp,
  location,
  columns,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { data: currentHeight, isLoading: heightLoading } = useCurrentHeight();
  const { data: secondsPerBlock, isLoading: spbLoading } = useSecondsPerBlock();

  const visibleContracts = React.useMemo(() => {
    switch (filterType) {
      case "ACTIVE":
        return contracts?.filter((c) => c.completed === null);
      case "COMPLETED":
        return contracts?.filter((c) => c.completed !== null);
      default:
        return contracts;
    }
  }, [contracts, filterType]);

  const rows = (visibleContracts || []).map((contract) => {
    const rateObj = contract.rate
      ? JSON.parse(contract.rate.replace(/'/g, '"'))
      : { denom: "", amount: "" };

    const status = contract.completed === null ? "In Progress" : "Completed";
    const serviceNumber = contract.service;
    const type = contract.type || "-";
    const settlementHeight = contract.settlement_height ?? "-";

    const providerNameFull = contract.provider_name || "-";
    const providerNameShort =
      providerNameFull.length > 18
        ? providerNameFull.slice(0, 18) + "…"
        : providerNameFull;

    const providerId = contract.provider || "";

    const queries = contract.queries_per_minute
      ? contract.queries_per_minute
      : "-";

    let timeRemaining = "-";
    if (
      !heightLoading &&
      !spbLoading &&
      currentHeight &&
      secondsPerBlock &&
      contract.settlement_height
    ) {
      const blocksRemaining = contract.settlement_height - currentHeight;
      if (blocksRemaining > 0) {
        const secondsUntilSettlement =
          blocksRemaining * parseFloat(secondsPerBlock);
        const timeObj = secondsToTimeObject(secondsUntilSettlement);
        timeRemaining = `${timeObj.hours}h ${timeObj.minutes}m ${timeObj.seconds}s`;
      } else {
        timeRemaining = "Expired";
      }
    }

    return {
      id: contract.id,
      serviceNumber: serviceNumber,
      duration: contract.duration,
      settlementHeight: settlementHeight,
      isp: isp,
      location: location,
      contractCost: `${rateObj.amount} ${rateObj.denom}`,
      callsSubmitted: contract.nonce,
      timeRemaining: timeRemaining,
      queries: queries,
      type: type,
      status: status,
      providerName: providerNameShort,
      providerFull: providerNameFull,
      providerId,
    };
  });

  const enhancedColumns = columns.map((col) => {
    if (col.field === "serviceNumber") {
      return {
        ...col,
        renderCell: (params) => {
          const serviceNumber = params.value;
          return <ServiceCell serviceNumber={serviceNumber} />;
        },
      };
    }
    return col;
  });

  return (
    <Box
      sx={{
        flex: 1,
        maxWidth: "98%",
        mx: "auto",
        overflow: "auto",
        "& .MuiDataGrid-root": { border: "none" },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: colors.primary[700],
          borderBottom: "none",
          backdropFilter: "blur(8px)",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: colors.primary[300],
          backdropFilter: "blur(12px)",
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: colors.primary[300],
        },
        "& .MuiDataGrid-toolbarContainer .MuiButtonBase-root": {
          color: colors.primary[500],
          fontWeight: "700",
          background: "transparent",
        },
      }}
    >
      {rows.length === 0 ? (
        <Typography>No contracts found</Typography>
      ) : (
        <DataGrid
          rows={rows}
          columns={enhancedColumns}
          getRowId={(row) => row.id}
        />
      )}
    </Box>
  );
};

export default ContractTable;

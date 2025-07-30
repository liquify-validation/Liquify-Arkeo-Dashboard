import React from "react";
import {
  Box,
  Typography,
  useTheme,
  Tooltip,
  IconButton,
  Link,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ServiceCell from "./ServiceCell";

import { secondsToTimeObject } from "../utils/commonFunctions";

import { useCurrentHeight } from "../hooks/useCurrentHeight";
import { useSecondsPerBlock } from "../hooks/useSecondsPerBlock";

const AllContractsTable = ({ contracts, getProviderNameFunction, columns }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { data: currentHeight, isLoading: heightLoading } = useCurrentHeight();
  const { data: secondsPerBlock, isLoading: spbLoading } = useSecondsPerBlock();

  const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value).catch((err) => {
      console.error("Could not copy text: ", err);
    });
  };

  const rows = (contracts || []).map((contract) => {
    const rateObj = contract.rate
      ? JSON.parse(contract.rate.replace(/'/g, '"'))
      : { denom: "", amount: "" };

    const status = contract.completed ? "Completed" : "In Progress";

    const providerId = contract.provider || "";
    const providerShort = providerId.slice(-4);
    const providerName =
      contract.provider_name ??
      (getProviderNameFunction
        ? getProviderNameFunction(providerId)
        : `${providerId.slice(0, 12)}...`);

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

    const queries = contract.queries_per_minute ?? "-";

    return {
      id: contract.id,
      serviceNumber: contract.service,
      providerId,
      providerShort,
      providerName,
      duration: contract.duration,
      settlementHeight: contract.settlement_height ?? "-",
      contractCost: `${rateObj.amount} ${rateObj.denom}`,
      callsSubmitted: contract.nonce,
      timeRemaining,
      queries,
      type: contract.type,
      status,
    };
  });

  const enhancedColumns = columns.map((col) => {
    if (col.field === "serviceNumber") {
      return {
        ...col,
        renderCell: (params) => <ServiceCell serviceNumber={params.value} />,
      };
    }

    if (col.field === "providerShort") {
      return {
        ...col,
        renderCell: (params) => {
          const fullProvider = params.row.providerId;
          const shortProvider = params.value;
          return (
            <Box display="flex" alignItems="center" gap={1}>
              <Typography sx={{ userSelect: "text", cursor: "pointer" }}>
                {shortProvider}
              </Typography>
              <Tooltip title="Copy full provider">
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(fullProvider);
                  }}
                >
                  <ContentCopyIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </Box>
          );
        },
      };
    }

    if (col.field === "providerName") {
      return {
        ...col,
        renderCell: (params) => {
          const providerId = params.row.providerId;
          const providerName = params.value;
          const providerUrl = `/contracts/${providerId}?location=UNKNOWN&isp=RTCOMM&providerName=${encodeURIComponent(
            providerName
          )}`;
          return (
            <Link
              href={providerUrl}
              style={{ textDecoration: "none", color: "#1d8aed" }}
            >
              {providerName}
            </Link>
          );
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

export default AllContractsTable;

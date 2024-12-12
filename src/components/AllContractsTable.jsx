import { Box, Typography, useTheme, Tooltip, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const AllContractsTable = ({ contracts }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const rows = contracts.map((contract) => {
    const rateObj = contract.rate
      ? JSON.parse(contract.rate.replace(/'/g, '"'))
      : { denom: "", amount: "" };
    const status = contract.completed === null ? "In Progress" : "Completed";
    const timeRemaining = "";
    const providerFull = contract.provider;
    const providerShort = providerFull.slice(-4);

    return {
      id: contract.id,
      providerFull: providerFull,
      providerShort: providerShort,
      duration: contract.duration,
      contractCost: `${rateObj.amount} ${rateObj.denom}`,
      callsSubmitted: contract.nonce,
      timeRemaining: timeRemaining,
      status: status,
    };
  });

  const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value).catch((err) => {
      console.error("Could not copy text: ", err);
    });
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "providerShort",
      headerName: "Provider",
      flex: 1,
      renderCell: (params) => {
        const fullProvider = params.row.providerFull;
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
    },
    { field: "duration", headerName: "Duration", flex: 1 },
    { field: "contractCost", headerName: "Contract Cost", flex: 1 },
    { field: "callsSubmitted", headerName: "# of Calls Submitted", flex: 1 },
    { field: "timeRemaining", headerName: "Time Remaining", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
  ];

  return (
    <Box
      sx={{
        height: 400,
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
        <DataGrid rows={rows} columns={columns} getRowId={(row) => row.id} />
      )}
    </Box>
  );
};

export default AllContractsTable;

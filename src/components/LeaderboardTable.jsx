import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { leaderboardData } from "../data/mockData";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
// import { use24hrCalls } from "../hooks/use24hrCalls";
// import { useProviders } from "../hooks/useProviders";

const LeaderboardTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    {
      field: "delegators",
      headerName: "Delegators",
      flex: 1,
    },
    {
      field: "totalEarnings",
      headerName: "Total Earnings",
      flex: 1,
    },
    {
      field: "callsSubmitted",
      headerName: "Calls Submitted",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Box
        m="40px 0 0 0"
        height="100%"
        sx={{
          "& .MuiDataGrid-main": {},
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            marginBottom: 2,
          }}
        >
          <LeaderboardIcon />
          <Typography variant="h6" component="h2">
            Leaderboard
          </Typography>
        </Box>

        <DataGrid
          rows={leaderboardData}
          columns={columns}
          getRowId={(row) => row.delegators}
        />
      </Box>
    </Box>
  );
};

export default LeaderboardTable;

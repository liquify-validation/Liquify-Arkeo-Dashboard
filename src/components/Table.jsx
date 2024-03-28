import { Box, Typography, useTheme } from "@mui/material";
import {
  DataGrid,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockDataTeam } from "../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../components/Header";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const Table = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "nodeAddress", headerName: "Node Address" },

    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
    },
    {
      field: "isp",
      headerName: "ISP",
      flex: 1,
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1,
    },
    {
      field: "contractCost",
      headerName: "Contract Cost",
      flex: 1,
    },
    {
      field: "callsSubmitted",
      headerName: "# Calls Submitted",
      flex: 1,
    },
    {
      field: "timeRemaining",
      headerName: "Time Remaining",
      flex: 1,
    },
    {
      field: "slashes",
      headerName: "Slashes",
      flex: 1,
    },
    {
      field: "score",
      headerName: "Score",
      flex: 1,
    },
    {
      field: "accessible",
      headerName: "Accesible",
      flex: 1,
    },
    {
      field: "chain",
      headerName: "Chain",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Box
        m="40px 0 0 0"
        height="100%"
        // className="gradient-table-mask"
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
        <DataGrid
          rows={mockDataTeam}
          columns={columns}
          getRowId={(row) => row.nodeAddress}
          slots={{
            toolbar: CustomToolbar,
          }}
        />
      </Box>
    </Box>
  );
};

export default Table;

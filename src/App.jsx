import { useState } from "react";

import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider, Box, IconButton } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { tokens } from "./theme";
import { DataProvider } from "./data/DataProvider";

import { Topbar, Sidebar, Footer } from "./global";

import {
  Dashboard,
  Explore,
  Provider,
  Providers,
  Settings,
  PieChart,
  Docs,
  Leaderboard,
  ProvidersTable,
  Contract,
  AllContracts,
} from "./pages/";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const [theme, colorMode] = useMode();

  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: "flex", height: "100vh" }}>
              <Sidebar isSidebar={isSidebar} setIsSidebar={setIsSidebar} />
              <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Topbar setIsSidebar={setIsSidebar} />
                <Box
                  sx={{
                    flexGrow: 1,
                    overflow: "auto",
                    backgroundColor: colors.primary[200],
                    paddingBottom: "2rem",
                  }}
                >
                  {" "}
                  <IconButton
                    onClick={() => setIsSidebar(!isSidebar)}
                    sx={{
                      position: "absolute",
                      top: "2em",
                      left: isSidebar ? "58px" : "245px",
                      transform: "translateY(-50%)",
                      zIndex: 10,
                      transition: "left 0.1s ease-in-out",
                      color: "white",
                    }}
                  >
                    {isSidebar ? (
                      <ArrowCircleRightIcon fontSize="large" />
                    ) : (
                      <ArrowCircleLeftIcon fontSize="large" />
                    )}
                  </IconButton>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/providers" element={<Providers />} />
                    <Route
                      path="/providers-statistics"
                      element={<ProvidersTable />}
                    />
                    <Route
                      path="/contracts/:providerId"
                      element={<Contract />}
                    />
                    <Route path="/contracts" element={<AllContracts />} />

                    <Route path="/provider" element={<Provider />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/piechart" element={<PieChart />} />
                    <Route path="/docs" element={<Docs />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                  </Routes>
                </Box>
                <Footer />
              </Box>
            </Box>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;

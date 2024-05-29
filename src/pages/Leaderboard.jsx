import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { Header, LeaderboardTable } from "../components";
import { HexMap, HexMapLight } from "../assets";

const Leaderboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const hexmapClassName = `hexmap-bg ${
    theme.palette.mode === "dark" ? "hexmap-dark" : "hexmap-light"
  }`;

  const backgroundImageUrl =
    theme.palette.mode === "dark" ? HexMap : HexMapLight;

  const redirectToProviders = () => {
    window.location.href = "/providers";
  };

  return (
    <Box
      className={hexmapClassName}
      sx={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center 70%",
        width: "100%",
        height: "100%",
        position: "relative",
        zIndex: 0,
      }}
    >
      <Box m="40px">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap="15px"
          ml={2}
        >
          <Header title="Leaderboard - Top Earners" />

          <Button
            onClick={redirectToProviders}
            sx={{
              height: "fit-content",
              color: theme.palette.mode === "dark" ? "white" : "black",
            }}
          >
            Back
          </Button>
        </Box>

        <Box gap="1rem" mt={5} ml={5}></Box>
        <LeaderboardTable />
        {/* Pagination */}
      </Box>
    </Box>
  );
};

export default Leaderboard;

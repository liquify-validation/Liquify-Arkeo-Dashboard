import { useContext } from "react";
import { Box, IconButton, useTheme, Typography } from "@mui/material";
import { ColorModeContext } from "../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

const Topbar = () => {
  const theme = useTheme();

  const colorMode = useContext(ColorModeContext);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      backgroundColor="#121533;"
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        borderRadius="3px"
        marginLeft="20px"
      >
        <Typography variant="h5" style={{ color: "white" }}>
          Welcome to Arkeo
        </Typography>
        <Typography variant="h7" style={{ color: "white" }}>
          Here is what is happening in your account today
        </Typography>
      </Box>

      <Box display="flex">
        <IconButton
          size="large"
          onClick={colorMode.toggleColorMode}
          style={{ color: "white" }}
        >
          {theme.palette.mode === "dark" ? (
            <LightModeOutlinedIcon fontSize="17px" />
          ) : (
            <DarkModeOutlinedIcon fontSize="17px" />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;

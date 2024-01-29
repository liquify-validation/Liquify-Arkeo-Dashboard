import React from "react";
import { Box, Grid, Typography, IconButton, useTheme } from "@mui/material";
import { LiquifyLogo } from "../assets";
import { tokens } from "../theme";
import GitHubIcon from "@mui/icons-material/GitHub";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";

const Footer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        position: "relative",
        bottom: 0,
        py: 2,
      }}
      backgroundColor={colors.primary[400]}
    >
      <Grid container justifyContent="space-between" alignItems="center" px={3}>
        <Grid item>
          <Typography
            variant="body1"
            component="span"
            sx={{ verticalAlign: "middle", mr: 1 }}
          >
            Built by:
          </Typography>
          <img
            src={LiquifyLogo}
            alt="Liquify Logo"
            style={{ width: "120px", verticalAlign: "middle" }}
          />
        </Grid>
        <Grid item>
          <IconButton aria-label="GitHub" size="large">
            <GitHubIcon fontSize="large" />
          </IconButton>
          <IconButton aria-label="X" size="large">
            <CloseIcon fontSize="large" />
          </IconButton>
          <IconButton aria-label="Email" size="large">
            <EmailIcon fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;

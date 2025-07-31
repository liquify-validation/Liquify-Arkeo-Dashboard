import { Box, Grid, Typography, IconButton, Link } from "@mui/material";
import { LiquifyLogo } from "../assets";
import GitHubIcon from "@mui/icons-material/GitHub";
import XIcon from "@mui/icons-material/X";
import EmailIcon from "@mui/icons-material/Email";

const EmailUrl = import.meta.env.VITE_CONTACT_EMAIL;
const GithubUrl = import.meta.env.VITE_GITHUB_URL;
const XUrl = import.meta.env.VITE_TWITTER_URL;

const Footer = () => {
  return (
    <Box
      className="footer"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 1,

        backgroundColor: "#121533",
        width: "100%",
      }}
    >
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        style={{ width: "100%" }}
      >
        <Grid item xs={12} sm={true} style={{ textAlign: "center" }}>
          <Typography
            variant="body1"
            component="span"
            sx={{ verticalAlign: "middle", mr: 1 }}
            color="white"
          >
            Built by:
          </Typography>
          <Link
            href="https://liquify.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={LiquifyLogo}
              alt="Liquify Logo"
              style={{ width: "120px", verticalAlign: "middle" }}
            />
          </Link>
        </Grid>

        <Grid item style={{ textAlign: "right", marginRight: "10px" }}>
          <Link href={GithubUrl} target="_blank" rel="noopener noreferrer">
            <IconButton aria-label="GitHub" size="large">
              <GitHubIcon fontSize="large" style={{ color: "white" }} />
            </IconButton>
          </Link>
          <Link href={XUrl} target="_blank" rel="noopener noreferrer">
            {" "}
            <IconButton aria-label="X" size="large">
              <XIcon fontSize="large" style={{ color: "white" }} />
            </IconButton>
          </Link>
          <Link href={`mailto:${EmailUrl}`}>
            {" "}
            <IconButton aria-label="Email" size="large">
              <EmailIcon fontSize="large" style={{ color: "white" }} />
            </IconButton>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;

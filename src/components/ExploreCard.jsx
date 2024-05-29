import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { tokens } from "../theme";
import GitHubIcon from "@mui/icons-material/GitHub";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LaunchIcon from "@mui/icons-material/Launch";

const ExploreCard = ({
  category,
  companyIcon,
  companyDescription,
  xLink,
  githubLink,
  linkedinLink,
  externalLink,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      width="300%"
      padding="25px"
      height="auto"
      className="gradient-border-mask"
    >
      {/* Category */}
      <Box
        m="0 auto"
        p="2px"
        px="5px"
        color="black"
        display="inline-block"
        justifyContent="center"
        backgroundColor={colors.greenAccent[600]}
        borderRadius="5px"
      >
        {category}
      </Box>

      {/* Company Icon */}
      <Box display="flex" justifyContent="left" mt={2}>
        {companyIcon}
      </Box>

      {/* Company Description */}
      <Box mt={2} width="100%">
        <Typography variant="p">{companyDescription}</Typography>
      </Box>

      {/* Social Icons and External Link */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={3}
      >
        <Box>
          <IconButton onClick={() => window.open(githubLink, "_blank")}>
            <GitHubIcon />
          </IconButton>
          <IconButton onClick={() => window.open(xLink, "_blank")}>
            <XIcon />
          </IconButton>
          <IconButton onClick={() => window.open(linkedinLink, "_blank")}>
            <LinkedInIcon />
          </IconButton>
        </Box>
        <IconButton onClick={() => window.open(externalLink, "_blank")}>
          <LaunchIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ExploreCard;

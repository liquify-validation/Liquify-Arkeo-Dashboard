import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const StatBox = ({ title, number, icon }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" padding="40px" height="100%">
      <Box display="flex" alignItems="center">
        {icon}
        <Box ml={3} mt={0.5}>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.text[100], display: "block" }}
          >
            {title}
          </Typography>

          <Typography mt={0.5} variant="h4" sx={{ color: colors.text[200] }}>
            {number}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default StatBox;

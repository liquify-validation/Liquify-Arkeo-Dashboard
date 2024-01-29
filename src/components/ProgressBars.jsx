import React from "react";
import {
  Box,
  Typography,
  LinearProgress,
  Stack,
  useTheme,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { tokens } from "../theme";

const data = [
  { title: "Github", value: 60 },
  { title: "Github", value: 30 },
  { title: "Github", value: 80 },
  { title: "Github", value: 40 },
  { title: "Github", value: 90 },
  { title: "Github", value: 70 },
];

const ProgressBars = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box>
      {data.map((item, index) => (
        <Stack
          key={index}
          direction="row"
          alignItems="center"
          spacing={3}
          sx={{ mb: 3 }}
        >
          <GitHubIcon />
          <Typography variant="subtitle1">{item.title}</Typography>
          <Box
            sx={{
              width: "100%",
              mx: 2,
              border: "2px solid white",
              borderRadius: 10,
            }}
          >
            <LinearProgress
              variant="determinate"
              value={item.value}
              sx={{
                height: 15,
                width: 320,
                borderRadius: 25,
                backgroundColor: "#D9D9D9",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#176BF8",
                  borderRadius: 10,
                },
              }}
            />
          </Box>
          <Typography variant="subtitle1">{item.value}%</Typography>
        </Stack>
      ))}
    </Box>
  );
};

export default ProgressBars;

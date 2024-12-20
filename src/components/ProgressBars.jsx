import { useMemo, useState } from "react";
import {
  Box,
  Typography,
  LinearProgress,
  Stack,
  useTheme,
  Tooltip,
  Button,
} from "@mui/material";
import { tokens } from "../theme";
import { useProvidersAnalytics } from "../hooks/useProviderAnalytics";

const MAX_VISIBLE = 5;
const MAX_NAME_LENGTH = 12;

const ProgressBars = ({ offset }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [showAll, setShowAll] = useState(false);

  const { data, isLoading, error } = useProvidersAnalytics(offset);

  const processedData = useMemo(() => {
    if (!data || !data.providers) return [];

    const providers = data.providers.map((p) => ({
      ...p,
      total_nonce: Number(p.total_nonce),
    }));

    const totalNonceSum = providers.reduce((sum, p) => sum + p.total_nonce, 0);

    if (totalNonceSum === 0) {
      return providers.map((p) => ({
        provider: p.provider,
        count: p.total_nonce,
        percentage: 0,
      }));
    }

    const mapped = providers.map((p) => ({
      provider: p.provider,
      count: p.total_nonce,
      percentage: Math.round((p.total_nonce / totalNonceSum) * 100),
    }));

    return mapped.sort((a, b) => b.percentage - a.percentage);
  }, [data]);

  if (isLoading) {
    return <Typography>Loading provider analytics...</Typography>;
  }

  if (error) {
    return <Typography>Error loading provider analytics</Typography>;
  }

  const displayedData = showAll
    ? processedData
    : processedData.slice(0, MAX_VISIBLE);

  const getDisplayName = (name) => {
    if (name.length > MAX_NAME_LENGTH) {
      return name.substring(0, MAX_NAME_LENGTH) + "...";
    }
    return name;
  };

  return (
    <Box width="100%" sx={{ zIndex: 1000 }}>
      {displayedData.map((item, index) => {
        const truncatedName = getDisplayName(item.provider);
        return (
          <Stack
            key={index}
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ mb: 2, width: "100%" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "fit-content",
                minWidth: "150px",
                padding: "1px",
              }}
            >
              <Tooltip title={item.provider}>
                <Typography
                  fontSize="14px"
                  fontWeight="600"
                  color={colors.text[100]}
                  sx={{ ml: 1, cursor: "default" }}
                >
                  {truncatedName}
                </Typography>
              </Tooltip>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                border: "2px solid white",
                borderRadius: 10,
              }}
            >
              <LinearProgress
                variant="determinate"
                value={item.percentage}
                sx={{
                  width: "100%",
                  height: 15,
                  borderRadius: 25,
                  backgroundColor: "#D9D9D9",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#176BF8",
                    borderRadius: 10,
                  },
                }}
              />
            </Box>
            <Typography
              fontSize="16px"
              fontWeight="700"
              color={colors.text[100]}
              sx={{ minWidth: "50px", textAlign: "right" }}
            >
              {`${item.count}`}
            </Typography>
          </Stack>
        );
      })}

      {processedData.length > MAX_VISIBLE && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="outlined"
            onClick={() => setShowAll(!showAll)}
            sx={{
              color: showAll ? "#000" : "#000",
              borderColor: "#bababa",
              "&:hover": {
                borderColor: "#176BF8",
                color: "#176BF8",
              },
            }}
          >
            {showAll ? "View Less" : "View All"}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ProgressBars;

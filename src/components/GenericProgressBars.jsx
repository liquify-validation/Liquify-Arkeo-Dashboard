import { useMemo, useState } from "react";
import {
  Box,
  Typography,
  LinearProgress,
  Stack,
  Tooltip,
  Button,
  useTheme,
} from "@mui/material";
import { tokens } from "../theme";

const GenericProgressBars = ({
  data,
  maxVisible = 5,
  maxLabelLength = null,
  barColor = "#176BF8",
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [showAll, setShowAll] = useState(false);

  const processed = useMemo(() => {
    const maxCount =
      data.reduce((m, d) => Math.max(m, Number(d.count) || 0), 0) || 1;
    return data
      .map((d) => ({
        ...d,
        pct: Math.round(((Number(d.count) || 0) / maxCount) * 100),
      }))
      .sort((a, b) => b.pct - a.pct);
  }, [data]);

  const visible = showAll ? processed : processed.slice(0, maxVisible);

  const truncate = (txt) =>
    typeof maxLabelLength === "number" &&
    maxLabelLength > 0 &&
    txt.length > maxLabelLength
      ? `${txt.slice(0, maxLabelLength)}…`
      : txt;

  return (
    <Box width="100%">
      {visible.map(({ label, count, pct, icon, tooltip }) => (
        <Stack
          key={label}
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ mb: 2, width: "100%" }}
        >
          <Tooltip title={tooltip || label}>
            <Stack
              direction="row"
              spacing={0.5}
              alignItems="center"
              sx={{ minWidth: 150 }}
            >
              {icon || <Box width={18} height={18} />}
              <Typography
                fontSize="14px"
                fontWeight={600}
                color={colors.text[100]}
                sx={{ cursor: "default" }}
              >
                {truncate(label)}
              </Typography>
            </Stack>
          </Tooltip>

          <Box
            sx={{ flexGrow: 1, borderRadius: 10, border: "2px solid white" }}
          >
            <LinearProgress
              variant="determinate"
              value={pct}
              sx={{
                height: 15,
                borderRadius: 8,
                backgroundColor: "#D9D9D9",
                "& .MuiLinearProgress-bar": { backgroundColor: barColor },
              }}
            />
          </Box>

          <Typography
            fontSize="16px"
            fontWeight={700}
            color={colors.text[100]}
            sx={{ minWidth: 50, textAlign: "right" }}
          >
            {count}
          </Typography>
        </Stack>
      ))}

      {processed.length > maxVisible && (
        <Box display="flex" justifyContent="center" mt={1}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setShowAll(!showAll)}
            sx={{
              userSelect: "none",
              backgroundColor: "#166cf9",
              borderRadius: "20px",
              px: 2,
              py: 1,
              mt: 3,
              textTransform: "uppercase",
              fontWeight: "semibold",
              color: "white",
              ml: 1,
            }}
          >
            {showAll ? "View Less" : "View All"}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default GenericProgressBars;

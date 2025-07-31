import { Box, useTheme } from "@mui/material";
import { useNumberOfServicesPerChain } from "../hooks/useNumberOfServicesPerChain";
import { getServiceIconPath } from "../utils/commonFunctions";
import GenericProgressBars from "./GenericProgressBars";

const TOKENS_UPPER = new Set(["btc", "eth", "usdc", "osmo", "arkeo", "rpc"]);
const toTitle = (s) =>
  s
    .split("-")
    .map((w) =>
      TOKENS_UPPER.has(w)
        ? w.toUpperCase()
        : w.charAt(0).toUpperCase() + w.slice(1)
    )
    .join(" ");

const stripNoise = (name) =>
  name
    .replace(/-mainnet/gi, "")
    .replace(/--+/g, "-")
    .replace(/^-|-$/g, "");

const ProgressBarsServices = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { data, isLoading, error } = useNumberOfServicesPerChain();

  if (isLoading) return <Box>Loading…</Box>;
  if (error || !data) return <Box>Error loading services per chain</Box>;

  const items = data.map((c) => {
    const visible = toTitle(stripNoise(c.name));
    const tooltip = toTitle(c.name);
    return {
      label: visible,
      count: c.count,
      icon: (
        <img
          src={getServiceIconPath(c.name, isDark)}
          alt={c.name}
          width={18}
          height={18}
        />
      ),
      tooltip,
    };
  });

  return (
    <GenericProgressBars
      data={items}
      barColor="#186bf9"
      maxLabelLength={null}
    />
  );
};

export default ProgressBarsServices;

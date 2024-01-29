import { Box } from "@mui/material";
import Header from "../components/Header";
import Line from "../components/Line";

const LineChart = () => {
  return (
    <Box m="20px">
      <Header title="Line Chart Example" subtitle="Simple Line Chart" />
      <Box height="65vh">
        <Line />
      </Box>
    </Box>
  );
};

export default LineChart;

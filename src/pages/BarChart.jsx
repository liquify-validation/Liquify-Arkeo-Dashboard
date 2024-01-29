import { Box } from "@mui/material";
import Header from "../components/Header";
import Bar from "../components/Bar";

const BarChart = () => {
  return (
    <Box m="20px">
      <Header title="Bar Chart Example" subtitle="Simple Bar Chart" />
      <Box height="65vh">
        <Bar />
      </Box>
    </Box>
  );
};

export default BarChart;

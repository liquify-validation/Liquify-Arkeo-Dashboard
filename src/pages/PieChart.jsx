import { Box } from "@mui/material";
import Header from "../components/Header";
import Pie from "../components/Pie";

const PieChart = () => {
  return (
    <Box m="20px">
      <Header title="Pie Chart Example" subtitle="Simple Pie Chart" />
      <Box height="65vh">
        <Pie />
      </Box>
    </Box>
  );
};

export default PieChart;

import { Button, ButtonGroup } from "@mui/material";

const OffsetButtonGroup = ({ offset, setOffset }) => {
  return (
    <ButtonGroup variant="outlined" sx={{ borderRadius: 15, pr: 2 }}>
      <Button
        onClick={() => setOffset("24")}
        sx={{
          backgroundColor: offset === "24" ? "#1D8AED" : "#BABABA80",
          color: offset === "24" ? "#FFFFFF" : "#000000",
          "&:hover": {
            backgroundColor: offset === "24" ? "#1577C2" : "#BABABA",
          },
        }}
      >
        Last 24 Hours
      </Button>
      <Button
        onClick={() => setOffset("7")}
        sx={{
          backgroundColor: offset === "7" ? "#1D8AED" : "#BABABA80",
          color: offset === "7" ? "#FFFFFF" : "#000000",
          "&:hover": {
            backgroundColor: offset === "7" ? "#1577C2" : "#BABABA",
          },
        }}
      >
        Last 7 Days
      </Button>
      <Button
        onClick={() => setOffset("14")}
        sx={{
          backgroundColor: offset === "14" ? "#1D8AED" : "#BABABA80",
          color: offset === "14" ? "#FFFFFF" : "#000000",
          "&:hover": {
            backgroundColor: offset === "14" ? "#1577C2" : "#BABABA",
          },
        }}
      >
        Last 14 Days
      </Button>
      <Button
        onClick={() => setOffset("28")}
        sx={{
          backgroundColor: offset === "28" ? "#1D8AED" : "#BABABA80",
          color: offset === "28" ? "#FFFFFF" : "#000000",
          "&:hover": {
            backgroundColor: offset === "28" ? "#1577C2" : "#BABABA",
          },
        }}
      >
        Last 28 Days
      </Button>
    </ButtonGroup>
  );
};

export default OffsetButtonGroup;

import React from "react";
import { Button, ButtonGroup } from "@mui/material";

const ContractsFilterButtonGroup = ({ filterType, setFilterType }) => {
  const buttonStyles = (type) => ({
    backgroundColor: filterType === type ? "#1D8AED" : "#BABABA80",
    color: filterType === type ? "#FFFFFF" : "#000000",
    "&:hover": {
      backgroundColor: filterType === type ? "#1577C2" : "#BABABA",
    },
  });

  return (
    <ButtonGroup variant="outlined" sx={{ borderRadius: 15, pr: 2 }}>
      <Button onClick={() => setFilterType("ALL")} sx={buttonStyles("ALL")}>
        ALL
      </Button>
      <Button
        onClick={() => setFilterType("ACTIVE")}
        sx={buttonStyles("ACTIVE")}
      >
        ACTIVE
      </Button>
      <Button
        onClick={() => setFilterType("COMPLETED")}
        sx={buttonStyles("COMPLETED")}
      >
        COMPLETED
      </Button>
    </ButtonGroup>
  );
};

export default ContractsFilterButtonGroup;

import React from "react";
import { Button, ButtonGroup } from "@mui/material";

const PillFilterButtonGroup = ({ value, options, onChange, sx }) => {
  const buttonStyles = (optionValue) => ({
    backgroundColor: value === optionValue ? "#1D8AED" : "#BABABA80",
    color: value === optionValue ? "#FFFFFF" : "#000000",
    "&:hover": {
      backgroundColor: value === optionValue ? "#1577C2" : "#BABABA",
    },
  });

  return (
    <ButtonGroup variant="outlined" sx={{ borderRadius: 15, pr: 2, ...sx }}>
      {options.map((opt) => (
        <Button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          sx={buttonStyles(opt.value)}
        >
          {opt.label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default PillFilterButtonGroup;

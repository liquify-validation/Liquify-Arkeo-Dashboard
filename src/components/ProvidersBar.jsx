import React, { useState } from "react";
import { Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const ProvidersBar = () => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <TextField
        variant="outlined"
        className="gradient-border-mask"
        label="Search providers"
        sx={{
          width: 300,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "transparent",
            },
            "&:hover fieldset": {
              borderColor: "transparent",
            },
            "&.Mui-focused fieldset": {
              borderColor: "transparent",
            },
          },
          "& .MuiOutlinedInput-input": {
            padding: "15px 1px",
          },
          "& .MuiInputLabel-outlined": {
            color: "grey",
            transform: "translate(12px, 15px) scale(1)",
          },
          "& .MuiInputLabel-shrink": {
            transform: "translate(14px, -6px) scale(0.75)",
            color: "#f0f3fb",
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default ProvidersBar;

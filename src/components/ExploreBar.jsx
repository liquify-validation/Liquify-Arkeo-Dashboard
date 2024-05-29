import { useState } from "react";
import { Box, Button, TextField, Stack, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const ExploreBar = () => {
  const [selectedButton, setSelectedButton] = useState("All");

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Stack spacing={2} direction="row">
        {["All", "Defi", "NFT", "DAO"].map((button) => (
          <Button
            key={button}
            variant={selectedButton === button ? "contained" : "outlined"}
            onClick={() => handleButtonClick(button)}
            sx={{
              borderRadius: "25px",
              backgroundColor: selectedButton === button ? "#176BF8" : "white",
              color: selectedButton === button ? "white" : "black",
              "&:hover": {
                backgroundColor:
                  selectedButton === button ? "#176BF8" : "#f0f0f0",
              },
            }}
          >
            {button}
          </Button>
        ))}
      </Stack>

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
            color: "white",
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

export default ExploreBar;

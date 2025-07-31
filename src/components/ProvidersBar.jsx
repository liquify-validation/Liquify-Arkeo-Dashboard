import {
  Box,
  TextField,
  InputAdornment,
  Tooltip,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import CustomButton from "../components/CustomButton";
// import { Link } from "react-router-dom";

const ProvidersBar = ({ onSearchChange }) => {
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="94%"
    >
      <Tooltip
        title={
          <Typography sx={{ fontSize: "1rem", fontWeight: 500 }}>
            Coming&nbsp;Soon
          </Typography>
        }
      >
        <span>
          <CustomButton
            text="Leaderboards"
            icon={LeaderboardIcon}
            size="medium"
            radius="25px"
            fontSize="16px"
            fontWeight="600"
            font="Poppins"
            horizontalPadding="25px"
            verticalPadding="15px"
            className="gradient-button-border-mask"
            disabled
            sx={{ pointerEvents: "none" }}
          />
        </span>
      </Tooltip>
      {/* <Link to="/leaderboard" style={{ textDecoration: "none" }}> */}
      {/* <CustomButton
          text="Leaderboards"
          icon={LeaderboardIcon}
          size="medium"
          radius="25px"
          fontSize="16px"
          fontWeight="600"
          font="Poppins"
          horizontalPadding="25px"
          verticalPadding="8px"
          className="gradient-button-border-mask"
        />
      </Link> */}
      <TextField
        variant="outlined"
        className="gradient-border-mask"
        label="Search providers"
        onChange={handleInputChange}
        sx={{
          flexGrow: 1,
          maxWidth: "calc(100% - 250px)",
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
            padding: "15px 14px",
          },
          "& .MuiInputLabel-outlined": {
            color: "grey",
            transform: "translate(14px, 15px) scale(1)",
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

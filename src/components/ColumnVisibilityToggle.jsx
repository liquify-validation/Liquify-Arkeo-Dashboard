import { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Popover,
  FormControlLabel,
  Switch,
  Typography,
  Button,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

const ColumnVisibilityToggle = ({
  columns,
  visibleColumns,
  onVisibilityChange,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [tempVisibility, setTempVisibility] = useState({});

  useEffect(() => {
    setTempVisibility(visibleColumns);
  }, [visibleColumns]);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setTempVisibility(visibleColumns);
  };

  const open = Boolean(anchorEl);

  const handleToggle = (field) => {
    const newVisibility = {
      ...tempVisibility,
      [field]: !tempVisibility[field],
    };
    setTempVisibility(newVisibility);
  };

  const closePopover = (save = true) => {
    if (save) onVisibilityChange(tempVisibility);
    setAnchorEl(null);
  };

  const half = Math.ceil(columns.length / 2);
  const leftColumns = columns.slice(0, half);
  const rightColumns = columns.slice(half);

  const switchSx = {
    "& .MuiSwitch-track": {
      backgroundColor: "#254c90 !important",
      opacity: 1,
    },

    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#146bf4 !important",
      opacity: 1,
    },

    "& .MuiSwitch-thumb, & .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb":
      {
        boxShadow: "none",
      },
  };

  return (
    <Box mr={1}>
      <IconButton onClick={handleOpen}>
        <FilterListIcon />
        <Typography variant="body2" ml={1}>
          Filter Columns
        </Typography>
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => closePopover(true)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Box
          p={2}
          display="flex"
          flexDirection="column"
          gap={2}
          px={4}
          minWidth="300px"
          className="gradient-table-mask"
          sx={{
            textAlign: "center",
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Toggle Columns
          </Typography>

          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={4}>
            <Box display="flex" flexDirection="column" gap={1}>
              {leftColumns.map((col) => (
                <FormControlLabel
                  key={col.field}
                  label={col.headerName || col.field}
                  labelPlacement="start"
                  sx={{
                    justifyContent: "space-between",
                    gap: "8px",
                  }}
                  control={
                    <Switch
                      checked={tempVisibility[col.field] !== false}
                      onChange={() => handleToggle(col.field)}
                      sx={switchSx}
                    />
                  }
                />
              ))}
            </Box>
            <Box display="flex" flexDirection="column" gap={1}>
              {rightColumns.map((col) => (
                <FormControlLabel
                  key={col.field}
                  label={col.headerName || col.field}
                  labelPlacement="start"
                  sx={{
                    justifyContent: "space-between",
                    gap: "8px",
                  }}
                  control={
                    <Switch
                      checked={tempVisibility[col.field] !== false}
                      onChange={() => handleToggle(col.field)}
                      sx={switchSx}
                    />
                  }
                />
              ))}
            </Box>
          </Box>

          <Box display="flex" justifyContent="center" gap={4}>
            <Button
              variant="outlined"
              onClick={() => closePopover(false)}
              className="cancel-button"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => closePopover(true)}
              className="save-button"
            >
              Save
            </Button>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default ColumnVisibilityToggle;

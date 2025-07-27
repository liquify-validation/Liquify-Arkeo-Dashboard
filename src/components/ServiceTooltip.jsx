import React from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { getServiceIconPath } from "../utils/commonFunctions";

const ServicesTooltip = ({ services, isDarkMode }) => {
  const servicesArray = Array.isArray(services) ? services : [services];

  console.log(services);

  return (
    <Tooltip
      arrow
      title={
        <Box>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            Services
          </Typography>
          {servicesArray.map((s, idx) => {
            const id = typeof s === "object" ? s.id : s;
            const name = typeof s === "object" ? s.name : s;
            const iconSrc = getServiceIconPath(name || id, isDarkMode);
            return (
              <Box
                key={idx}
                display="flex"
                alignItems="center"
                gap={1}
                mb={0.5}
              >
                <Box
                  component="img"
                  src={iconSrc}
                  alt={name || "Service"}
                  width={25}
                  height={25}
                />
                <Typography variant="body2">{name || id}</Typography>
              </Box>
            );
          })}
        </Box>
      }
    >
      <Box
        component="span"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          cursor: "pointer",
          ml: 1,
        }}
      >
        <InfoIcon />
      </Box>
    </Tooltip>
  );
};

export default ServicesTooltip;

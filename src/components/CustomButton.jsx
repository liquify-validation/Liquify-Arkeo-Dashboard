import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useTheme, Pagination } from "@mui/material";
import { tokens } from "../theme";
import Icon from "@mui/icons-material/Add"; // This is a placeholder, ensure you replace or remove as needed

const CustomButton = styled((props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    text,
    icon: IconComponent,
    size,
    className,
    radius,
    fontSize,
    fontWeight,
    font,
    horizontalPadding,
    verticalPadding,
    ...otherProps
  } = props;

  return (
    <Button
      variant="contained"
      size={size}
      className={className}
      startIcon={IconComponent ? <IconComponent /> : null}
      {...otherProps}
      style={{
        borderRadius: radius,
        fontSize: fontSize,
        fontWeight: fontWeight,
        fontFamily: font,
        paddingLeft: horizontalPadding,
        paddingRight: horizontalPadding,
        paddingTop: verticalPadding,
        paddingBottom: verticalPadding,
        backgroundColor: colors.primary[600],
        color: theme.palette.grey[200],
        "&:hover": {
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.grey[700]
              : theme.palette.grey[400],
        },
      }}
    >
      {text}
    </Button>
  );
})(
  ({
    theme,
    size,
    radius = "4px",
    fontSize = "1rem",
    fontWeight = "400",
    font = "Poppins",
  }) => ({
    padding: size === "large" ? theme.spacing(2) : theme.spacing(1),
    borderRadius: radius,
    fontSize: fontSize,
    fontWeight: fontWeight,
    fontFamily: font,
  })
);

export default CustomButton;

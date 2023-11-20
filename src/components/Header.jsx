import React from "react";
import { Typography, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import theme from "styles/theme";
export const Header = () => {
  const location = useLocation();

  return (
    <>
      <Box
        sx={{
          width: "100%",
          backgroundColor: theme.blue2,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" p="10px" > {location.pathname.slice(1)}</Typography>
      </Box>
    </>
  );
};

import { useTheme } from "@emotion/react";
import { Grid, Box, styled, Typography } from "@mui/material";
import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Colors } from "../styles/theme";

export default function Footer() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const FooterBox = styled(Box)(() => ({
    position: matches ? "fixed" : "fixed",
    width: "100%",
    bottom: "0",
    background: Colors.primary,
    color: "white",
  }));

  return (
    <FooterBox>
      <Typography textAlign={"center"} variant="h6">
        Created by Indeavor Team
      </Typography>
    </FooterBox>
  );
}

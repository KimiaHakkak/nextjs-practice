"use client";
import { IconButton } from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import { ColorModeContext } from "@/app/themeProvider";

export default function ThemeToggleButton() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <IconButton
      onClick={colorMode.toggleColorMode}
      sx={{
        position: "absolute",
        top: 16,
        right: 16,
        color: "white",
        bgcolor: "rgba(255,255,255,0.1)",
        "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
      }}
    >
      {theme.palette.mode === "dark" ? <LightMode /> : <DarkMode />}
    </IconButton>
  );
}

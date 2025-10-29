"use client";
import { Box, TextField, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function SearchBar({ city, setCity, onSearch }) {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
      <TextField
        variant="outlined"
        size="small"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city..."
        sx={{
          backgroundColor:
            theme.palette.mode === "light" ? "white" : "rgba(255,255,255,0.1)",
          borderRadius: 1,
          input: {
            color:
              theme.palette.mode === "light" ? "black" : "white",
          },
          "& .MuiInputBase-input::placeholder": {
            color:
              theme.palette.mode === "light" ? "#6b7280" : "#cbd5e1",
            opacity: 1,
          },
        }}
      />
      <Button
        variant="contained"
        onClick={onSearch}
        sx={{
          backgroundColor:
            theme.palette.mode === "light"
              ? "white"
              : "rgba(255,255,255,0.15)",
          color:
            theme.palette.mode === "light" ? "#2563eb" : "#90caf9",
          fontWeight: "bold",
          borderRadius: 1,
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor:
              theme.palette.mode === "light"
                ? "#e0e7ff"
                : "rgba(255,255,255,0.25)",
            transform: "scale(1.03)",
          },
        }}
      >
        Get Weather
      </Button>
    </Box>
  );
}

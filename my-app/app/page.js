"use client";

import { useState, useContext } from "react";
import { Box, TextField, Button, Typography, CircularProgress, Card, CardContent, IconButton, } from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext } from "./layout";

export default function Home() {
  const colorMode = useContext(ColorModeContext);
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const getWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const res = await fetch(`/api/weather?q=${city}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to fetch weather");
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          theme.palette.mode === "light"
            ? "linear-gradient(to bottom right, #60a5fa, #6366f1)"
            : "linear-gradient(to bottom right, #1e293b, #0f172a)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
        transition: "background 0.5s ease",
      }}
    >
      {/* Theme Toggle */}
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

      <Typography variant="h4" sx={{ fontWeight: "bold", color: "white", mb: 3 }}>
        Weather App
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <TextField
          variant="outlined"
          size="small"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city..."
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light" ? "white" : "rgba(255,255,255,0.1)",
            borderRadius: 1,
            input: {
              color: (theme) =>
                theme.palette.mode === "light" ? "black" : "white",
            },
            "& .MuiInputBase-input::placeholder": {
              color: (theme) =>
                theme.palette.mode === "light" ? "#6b7280" : "#cbd5e1",
              opacity: 1,
            },
          }}
        />
        <Button
          variant="contained"
          onClick={getWeather}
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "white"
                : "rgba(255,255,255,0.15)",
            color: (theme) =>
              theme.palette.mode === "light" ? "#2563eb" : "#90caf9",
            fontWeight: "bold",
            borderRadius: 1,
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? "#e0e7ff"
                  : "rgba(255,255,255,0.25)",
              transform: "scale(1.03)",
              boxShadow: (theme) =>
                theme.palette.mode === "light"
                  ? "0 0 10px rgba(37,99,235,0.2)"
                  : "0 0 10px rgba(255,255,255,0.2)",
            },
          }}
        >
          Get Weather
        </Button>

      </Box>

      {loading && <CircularProgress sx={{ color: "white" }} />}
      {error && <Typography sx={{ color: "#fee2e2", mt: 2 }}>{error}</Typography>}

      {weather && !loading && (
        <Card
          sx={{
            backgroundColor: "rgba(255,255,255,0.2)",
            backdropFilter: "blur(10px)",
            color: "white",
            borderRadius: 4,
            boxShadow: 3,
            width: 300,
            textAlign: "center",
            mt: 4,
          }}
        >
          <CardContent>
            <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
              {weather.name}
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              {Math.round(weather.main.temp)}°C
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ textTransform: "capitalize", mb: 2 }}
            >
              {weather.weather[0].description}
            </Typography>
            <Box
              component="img"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather icon"
              sx={{ mx: "auto", display: "block" }}
            />
          </CardContent>
        </Card>
      )}
    </Box>
  );
}

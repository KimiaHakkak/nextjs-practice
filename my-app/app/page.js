"use client";
import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";

export default function Home({mode, setMode}) {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const res = await fetch(`/api/weather?q=${city}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch weather");
      }

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
        background: "linear-gradient(to bottom right, #60a5fa, #6366f1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      {/* Dark/Light Toggle */}
        <IconButton
          onClick={() => setMode(mode === "light" ? "dark" : "light")}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "white",
            bgcolor: "rgba(255,255,255,0.1)",
            "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
          }}
        >
          {mode === "light" ? <DarkMode /> : <LightMode />}
        </IconButton>

      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", color: "white", mb: 3 }}
      >
        Weather App
      </Typography>

      {/* Input and Button */}
      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <TextField
          variant="outlined"
          size="small"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city..."
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
            input: { color: "text.primary" },
          }}
        />
        <Button
          variant="contained"
          onClick={getWeather}
          sx={{
            backgroundColor: "white",
            color: "#2563eb",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#e0e7ff" },
          }}
        >
          Get Weather
        </Button>
      </Box>

      {/* Loading Spinner */}
      {loading && <CircularProgress sx={{ color: "white" }} />}

      {/* Error Message */}
      {error && (
        <Typography sx={{ color: "#fee2e2", mt: 2 }}>{error}</Typography>
      )}

      {/* Weather Card */}
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

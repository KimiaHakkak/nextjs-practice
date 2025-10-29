//Main Page (Client Component)
//Manages state (city), handles fetch triggering, shows components.

"use client";
import { useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import { useWeather } from "@/hooks/useWeather";

export default function Home() {
  const theme = useTheme();
  const [city, setCity] = useState("");
  const { data: weather, isLoading, error, refetch } = useWeather(city);

  const handleSearch = () => {
    if (!city.trim()) return;
    refetch();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: theme.palette.mode === "light"
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
      <ThemeToggleButton />

      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", color: "white", mb: 3 }}
      >
        Weather App
      </Typography>

      <SearchBar city={city} setCity={setCity} onSearch={handleSearch} /> {/*this sets the city using our SearchBar react component*/}

      {isLoading && <CircularProgress sx={{ color: "white", mt: 2 }} />}

      {error && (
        <Typography sx={{ color: "#fee2e2", mt: 2 }}>
          {error.message}
        </Typography>
      )}

      {!weather && !isLoading && !error && (
        <Typography sx={{ color: "rgba(255,255,255,0.7)", mt: 3 }}>
          Enter a city name to see the weather 🌤️
        </Typography>
      )}

      <WeatherCard weather={weather} />
    </Box>
  );
}

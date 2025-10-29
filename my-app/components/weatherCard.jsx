//UI Display
//Shows fetched weather data nicely.

"use client";
import { Card, CardContent, Typography, Box } from "@mui/material";

export default function WeatherCard({ weather }) {
  if (!weather) return null;

  const {
    name,
    main: { temp } = {},
    weather: weatherInfo = [],
  } = weather;

  const condition = weatherInfo[0];

  return (
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
          {name}
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          {Math.round(temp)}°C
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ textTransform: "capitalize", mb: 2 }}
        >
          {condition?.description}
        </Typography>
        {condition?.icon && (
          <Box
            component="img"
            src={`https://openweathermap.org/img/wn/${condition.icon}@2x.png`}
            alt="weather icon"
            sx={{ mx: "auto", display: "block" }}
          />
        )}
      </CardContent>
    </Card>
  );
}

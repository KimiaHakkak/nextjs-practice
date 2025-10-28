"use client";
import { useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const getWeather = async () => {
    setError(null);
    setWeather(null);

    try {
      const res = await fetch(`/api/weather?q=${city}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error fetching weather");
      setWeather(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-500 flex flex-col items-center justify-center text-white p-6">
      <h1 className="text-3xl font-bold mb-4">🌤 Weather App</h1>

      <div className="flex gap-2 mb-6">
        <input
          className="p-2 rounded text-black outline-none"
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          onClick={getWeather}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-200">{error}</p>}

      {weather && (
        <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-md text-center">
          <h2 className="text-2xl font-semibold">{weather.name}</h2>
          <p className="text-lg">{weather.weather[0].description}</p>
          <p className="text-4xl font-bold mt-2">
            {Math.round(weather.main.temp)}°C
          </p>
          <p className="text-sm mt-1">
            💧 Humidity: {weather.main.humidity}% | 🌬 Wind:{" "}
            {weather.wind.speed} m/s
          </p>
        </div>
      )}
    </div>
  );
}

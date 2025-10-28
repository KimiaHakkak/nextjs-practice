"use client";
import { useState } from "react";

export default function Home() {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-500 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Weather App</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city..."
          className="px-4 py-2 rounded-md outline-none shadow text-gray-700"
        />
        <button
          onClick={getWeather}
          className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-md shadow hover:bg-blue-100"
        >
          Get Weather
        </button>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error message */}
      {error && <p className="text-red-200 mt-4">{error}</p>}

      {/* Weather data */}
      {weather && !loading && (
        <div className="bg-white/20 backdrop-blur-md text-white p-6 rounded-2xl shadow-md w-80 mt-6 text-center">
          <h2 className="text-2xl font-semibold mb-2">{weather.name}</h2>
          <p className="text-5xl font-bold mb-2">
            {Math.round(weather.main.temp)}°C
          </p>
          <p className="capitalize text-lg mb-4">{weather.weather[0].description}</p>

          {/* Weather Icon */}
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
            className="mx-auto"
          />
        </div>
      )}
    </div>
  );
}

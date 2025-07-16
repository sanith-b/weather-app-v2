import React, { useState } from "react";
import { WeatherData } from "../App";

const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY as string;

async function fetchWeather(city: string, unit: "metric" | "imperial"): Promise<WeatherData | null> {
  const geo = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`
  ).then((res) => res.json());
  if (!geo[0]) return null;
  const { lat, lon, name } = geo[0];
  const weatherRes = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
  ).then((r) => r.json());
  if (!weatherRes || !weatherRes.list || !weatherRes.city) return null;
  const current = weatherRes.list[0];
  const forecast = weatherRes.list.slice(0, 40).filter((_: any, i: number) => i % 8 === 0).map((w: any) => ({
    dt: w.dt,
    temp: w.main.temp,
    condition: w.weather[0].main,
  }));
  return {
    city: name,
    temp: current.main.temp,
    condition: current.weather[0].main,
    icon: current.weather[0].icon,
    forecast,
    alerts: weatherRes.city.alerts || [],
  };
}

export default function WeatherSearch({
  city,
  setCity,
  setWeather,
  unit,
}: {
  city: string;
  setCity: (c: string) => void;
  setWeather: (w: WeatherData | null) => void;
  unit: "metric" | "imperial";
}) {
  const [input, setInput] = useState(city);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const data = await fetchWeather(input, unit);
    setWeather(data);
    setCity(input);
    setLoading(false);
  }

  return (
    <form className="weather-search" onSubmit={handleSearch}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter city"
        aria-label="City"
      />
      <button type="submit" disabled={loading}>
        {loading ? "Loading..." : "Search"}
      </button>
    </form>
  );
}
import React, { useEffect, useState } from "react";
import WeatherSearch from "./components/WeatherSearch";
import WeatherDisplay from "./components/WeatherDisplay";
import ForecastChart from "./components/ForecastChart";
import Favorites from "./components/Favorites";
import WeatherAlerts from "./components/WeatherAlerts";
import ClothingSuggestion from "./components/ClothingSuggestion";
import DarkModeToggle from "./components/DarkModeToggle";
import { getUserPrefs, saveUserPrefs, firebaseInit } from "./firebase";
import "./App.css";

export interface WeatherData {
  city: string;
  temp: number;
  condition: string;
  icon: string;
  forecast: Array<{ dt: number; temp: number; condition: string }>;
  alerts?: { event: string; description: string }[];
}

export default function App() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    firebaseInit();
    getUserPrefs().then((prefs) => {
      if (prefs) {
        setFavorites(prefs.favorites || []);
        setUnit(prefs.unit || "metric");
        setDarkMode(prefs.darkMode || false);
      }
    });
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
    saveUserPrefs({ favorites, unit, darkMode });
  }, [favorites, unit, darkMode]);

  return (
    <div className={`app-container${darkMode ? " dark" : ""}`}>
      <header>
        <h1>Weather Lottie PWA</h1>
        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </header>
      <WeatherSearch city={city} setCity={setCity} setWeather={setWeather} unit={unit} />
      <div className="unit-toggle">
        <button onClick={() => setUnit(unit === "metric" ? "imperial" : "metric")}>
          Show in {unit === "metric" ? "°F" : "°C"}
        </button>
      </div>
      {weather && (
        <>
          <WeatherDisplay weather={weather} unit={unit} />
          <WeatherAlerts alerts={weather.alerts} />
          <ForecastChart forecast={weather.forecast} unit={unit} />
          <ClothingSuggestion weather={weather} unit={unit} />
          <Favorites
            favorites={favorites}
            addFavorite={(c) => setFavorites((favs) => Array.from(new Set([...favs, c])))}
            removeFavorite={(c) => setFavorites((favs) => favs.filter((f) => f !== c))}
            setCity={setCity}
          />
        </>
      )}
    </div>
  );
}
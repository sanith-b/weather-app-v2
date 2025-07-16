import React from "react";
import { WeatherData } from "../App";

// STUB: Replace with call to your AI/LLM API for dynamic suggestions
function getClothingSuggestion(weather: WeatherData, unit: "metric" | "imperial") {
  const t = weather.temp;
  if (unit === "imperial") {
    if (t < 50) return "Wear a warm coat, scarf, and gloves.";
    if (t < 68) return "A light jacket or sweater is suggested.";
    return "T-shirt and shorts are fine!";
  } else {
    if (t < 10) return "Wear a warm coat, scarf, and gloves.";
    if (t < 20) return "A light jacket or sweater is suggested.";
    return "T-shirt and shorts are fine!";
  }
}

export default function ClothingSuggestion({
  weather,
  unit,
}: {
  weather: WeatherData;
  unit: "metric" | "imperial";
}) {
  return (
    <div className="clothing-suggestion">
      <h4>Clothing Suggestion</h4>
      <div>{getClothingSuggestion(weather, unit)}</div>
    </div>
  );
}
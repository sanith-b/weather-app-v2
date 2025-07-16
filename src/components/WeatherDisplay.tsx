import React from "react";
import Lottie from "lottie-react";
import clearAnim from "../lottie/clear.json";
import rainAnim from "../lottie/rain.json";
import cloudsAnim from "../lottie/clouds.json";
import snowAnim from "../lottie/snow.json";
import thunderAnim from "../lottie/thunder.json";
import { WeatherData } from "../App";

function getLottie(condition: string) {
  if (/rain/i.test(condition)) return rainAnim;
  if (/cloud/i.test(condition)) return cloudsAnim;
  if (/snow/i.test(condition)) return snowAnim;
  if (/thunder/i.test(condition)) return thunderAnim;
  return clearAnim;
}

export default function WeatherDisplay({ weather, unit }: { weather: WeatherData; unit: "metric" | "imperial" }) {
  return (
    <div className="weather-display">
      <h2>{weather.city}</h2>
      <Lottie animationData={getLottie(weather.condition)} loop style={{ width: 120, height: 120 }} />
      <div className="weather-main">
        <span className="temp">
          {Math.round(weather.temp)}°{unit === "metric" ? "C" : "F"}
        </span>
        <span className="condition">{weather.condition}</span>
      </div>
    </div>
  );
}
import React from "react";
import { Line } from "react-chartjs-2";
import { WeatherData } from "../App";
import { Chart, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from "chart.js";
Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

export default function ForecastChart({
  forecast,
  unit,
}: {
  forecast: WeatherData["forecast"];
  unit: "metric" | "imperial";
}) {
  const data = {
    labels: forecast.map((f) => new Date(f.dt * 1000).toLocaleDateString(undefined, { weekday: "short" })),
    datasets: [
      {
        label: `Temp (${unit === "metric" ? "°C" : "°F"})`,
        data: forecast.map((f) => f.temp),
        fill: false,
        borderColor: "#007bff",
        backgroundColor: "#00c3ff",
        tension: 0.4,
      },
    ],
  };
  return (
    <div className="forecast-chart">
      <h3>5-Day Forecast</h3>
      <Line data={data} />
    </div>
  );
}
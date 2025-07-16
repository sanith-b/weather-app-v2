import React from "react";

export default function WeatherAlerts({
  alerts,
}: {
  alerts?: { event: string; description: string }[];
}) {
  if (!alerts || alerts.length === 0) return null;
  return (
    <div className="weather-alerts">
      <h4>Weather Alerts</h4>
      {alerts.map((a, i) => (
        <div className="alert" key={i}>
          <strong>{a.event}</strong>: {a.description}
        </div>
      ))}
    </div>
  );
}
import React from "react";
export default function DarkModeToggle({
  darkMode,
  setDarkMode,
}: {
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
}) {
  return (
    <button className="dark-toggle" onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
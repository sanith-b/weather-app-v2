import React from "react";

export default function Favorites({
  favorites,
  addFavorite,
  removeFavorite,
  setCity,
}: {
  favorites: string[];
  addFavorite: (city: string) => void;
  removeFavorite: (city: string) => void;
  setCity: (city: string) => void;
}) {
  return (
    <div className="favorites">
      <h4>Favorites</h4>
      <ul>
        {favorites.map((city) => (
          <li key={city}>
            <button onClick={() => setCity(city)}>{city}</button>
            <span
              style={{ cursor: "pointer", marginLeft: 8 }}
              onClick={() => removeFavorite(city)}
              aria-label="Remove"
            >
              ❌
            </span>
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          const c = prompt("Add city to favorites?");
          if (c) addFavorite(c);
        }}
      >
        + Add Favorite
      </button>
    </div>
  );
}
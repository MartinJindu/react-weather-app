import { useState } from "react";

const WeatherSearch = ({ onSearch }) => {
  const [city, setCity] = useState(""); // state to get city

  const handleSearch = () => {
    if (city.trim() !== "") {
      onSearch(city);
    }
    setCity("");
  };
  return (
    <div className="search-bar">
      <input
        type="text"
        value={city}
        placeholder="Enter city name"
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Get weather</button>
    </div>
  );
};
export default WeatherSearch;

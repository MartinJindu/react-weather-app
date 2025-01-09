import { useState } from "react";
import WeatherSearch from "./Components/WeatherSearch";
import WeatherCard from "./Components/WeatherCard";

// Import images for background
import clearImg from "./assets/clear2.jpg";
import cloudyImg from "./assets/cloudy.jpg";
import rainyImg from "./assets/rainy.jpg";
import thunderstormImg from "./assets/thunderstorm.jpg";
import snowImg from "./assets/snow.jpg";
import mistImg from "./assets/mist.jpg";
import sunnyImg from "./assets/sunny.jpg";
import pCloudyImg from "./assets/partly cloudy.jpg";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Setting background for weather condition
  const conditionToImage = {
    Clear: clearImg,
    Clouds: cloudyImg,
    "Partly cloudy": pCloudyImg,
    "Partly Cloudy": pCloudyImg,
    Rain: rainyImg,
    Thunderstorm: thunderstormImg,
    Snow: snowImg,
    Mist: mistImg,
    Sunny: sunnyImg,
    "Light freezing rain": rainyImg,
    "Light rain": rainyImg,
    "Light snow": snowImg,
    "Patchy rain nearby": rainyImg,
  };

  const fetchData = async (city) => {
    setLoading(true);
    setError("");
    try {
      const apiKey = "your_api_key"; // Insert your generated API Key
      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

      const response = await fetch(url);
      const data = await response.json();
      //console.log(response);

      if (response.ok) {
        setWeatherData(data);

        // Dynamically update the background
        const condition = data.current.condition.text;
        const image = conditionToImage[condition] || clearImg;
        document.body.style.backgroundImage = `url(${image})`;
      } else {
        setError(data.error.message || "Failed to fetch weather data");
        setWeatherData(null);
      }
    } catch (error) {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  const clear = () => setWeatherData(null); // Clear searched data

  return (
    <div className="container">
      <h1>Weather App</h1>
      <WeatherSearch onSearch={fetchData} />
      {loading && <p style={{ color: "white" }}>Loading data...</p>}
      {error && <p className="error">{error}</p>}
      {weatherData && <WeatherCard weather={weatherData} onClear={clear} />}
    </div>
  );
}

export default App;

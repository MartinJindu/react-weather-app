const WeatherCard = ({ weather, onClear }) => {
  const { location, current } = weather;
  // console.log(location);
  // console.log(current);
  const iconURL = `https:${current.condition.icon}`;

  return (
    <div className="weather-card">
      <h2>{location.name}</h2>
      <p>Country: {location.country}</p>
      <img src={iconURL} alt={current.condition.text} />
      <p>{current.condition.text}</p>
      <p>Temperature: {current.temp_c}°C</p>
      <p>Local Time: {location.localtime}</p>
      <p>Humidity: {current.humidity}%</p>
      <p>Cloud: {current.cloud}</p>
      <p>Geo-Location: {location.tz_id}</p>
      <p>
        Lat: {location.lat} Lon: {location.lon}
      </p>
      <button onClick={onClear}>Clear</button>
    </div>
  );
};
export default WeatherCard;

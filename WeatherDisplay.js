import React from 'react';

function WeatherDisplay({ data }) {
  if (!data || !data.main || !data.weather) {
    return null;
  }

  const { name, main, weather } = data;

  return (
    <div className="WeatherDisplay">
      <h2 className="text-center">{name}</h2>
      <div className="text-center">
        <img
          src={`https://openweathermap.org/img/w/${weather[0].icon}.png`}
          alt="Weather Icon"
        />
      </div>
      <div className="text-center">
        <p className="description">{weather[0].description}</p>
      </div>
      <div className="text-center">
        <p className="temperature">{Math.round(main.temp - 273.15)}°C</p>
        <p className="humidity">Humidity: {main.humidity}%</p>
      </div>
    </div>
  );
}

export default WeatherDisplay;


import React, { useState, useEffect } from 'react';

function Forecast({ city }) {
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    if (city) {
      fetchForecastData(city);
    }
  }, [city]);

  const fetchForecastData = (city) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},in&appid=6a2de3c8f7f488d1666cd69f90433d27`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setForecastData(data);
      })
      .catch((error) => {
        console.error('Error fetching forecast data: ', error);
      });
  };

  if (!forecastData || !forecastData.list) {
    return null;
  }

  const forecastItems = forecastData.list.slice(0, 5).map((forecast, index) => (
    <div key={index} className="col-md-2 mt-3">
<div className="card" style={{width: 100 }}>
        <div className="card-body">
          <h5 className="card-title">
            {new Date(forecast.dt * 1000+1).toLocaleDateString('en-US', {
              weekday: 'short',
            })}
          </h5>
          <p className="card-text">
            Temperature: {Math.round(forecast.main.temp - 273.15)}°C
          </p>
          <p className="card-text">Description: {forecast.weather[0].description}</p>
        </div>
      </div>
    </div>
  ));

  

  return (
    <div className="Forecast" >
      <h3 className="mt-4">5-Day Forecast</h3>
      <div className="row">{forecastItems}</div>
    </div>
  );
}

export default Forecast;

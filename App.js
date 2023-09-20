import React, { useState, useEffect } from 'react';
import './App.css';

import WeatherDisplay from './WeatherDisplay';
import Forecast from './Forecast';

const API_KEY = 'YOUR_API_KEY_HERE';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData(city);
    }
  }, [city]);

  const fetchWeatherData = (city) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},in&APPID=6a2de3c8f7f488d1666cd69f90433d27`
      )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        setBackgroundImage(getBackgroundImage(data.weather[0].icon));
      })
      .catch((error) => {
        console.error('Error fetching weather data: ', error);
      });
  };

  const getBackgroundImage = (icon) => {
    // Map weather icon codes to background images (you can add more mappings)
    const imageMappings = {
      '01d': 'clear-day.jpg',
      '02d': 'partly-cloudy-day.jpg',
      '03d': 'cloudy.jpg',
      '04d': 'cloudy.jpg',
      '09d': 'rain.jpg',
      '10d': 'rain.jpg',
      '11d': 'thunderstorm.jpg',
      '13d': 'snow.jpg',
      '50d': 'mist.jpg',
    };

    const defaultImage = 'default.jpg';

    return imageMappings[icon] || defaultImage;
  };
  
  const backgroundImageStyle = {
    backgroundImage: `url('https://img.freepik.com/premium-vector/clouds-stars-sun-blue-background-childrens-vector-illustration-sky_153074-219.jpg')`, // Replace with your image URL
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh', // Ensure the background covers the entire viewport height
  };

  

  return (
    <div className="App" style={backgroundImageStyle}>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-6">
            <div className="mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="Enter city or location"
                value={city}
                onChange={handleCityChange}
              />
            </div>
            {weatherData && (
              <>
                <WeatherDisplay data={weatherData} />
                <Forecast city={city} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

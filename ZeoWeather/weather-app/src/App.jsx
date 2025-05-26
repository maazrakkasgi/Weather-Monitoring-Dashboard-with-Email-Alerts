
import React, { useState, useEffect } from "react";
import Navbar from "../src/components/navbar";
import MainWeatherCard from "../src/components/mainweathercard";
import FiveDayForecast from "../src/components/fiveday";
import TodayHighlights from "../src/components/todayhighlights";
import DailyAggregates from "../src/components/DailyAggregates";

import axios from "axios";

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Mumbai"); // Default city
  const [airQualityData, setAirQualityData] = useState(null);
  const [fiveDayForecast, setFiveDayForecast] = useState(null);
  const [temperatureThreshold, setTemperatureThreshold] = useState(25); // Default threshold
  const [breachedCount, setBreachCount] = useState(0);

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  const fetchAirQualityData = (lat, lon) => {
    const API_KEY = "5d36e5ed29144e123587204a26a570a5"; // Replace with your OpenWeatherMap API key
    axios
      .get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      .then((response) => {
        setAirQualityData(response.data.list[0]);
      })
      .catch((error) => console.error("Error fetching the air quality data:", error));
  };

  const fetchWeatherData = (city) => {
    const API_KEY = "5d36e5ed29144e123587204a26a570a5"; // Replace with your OpenWeatherMap API key
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        fetchAirQualityData(data.coord.lat, data.coord.lon);
        checkTemperatureThreshold(data.main.temp); // Check temperature threshold
        axios
          .get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`)
          .then((response) => {
            setFiveDayForecast(response.data);
          })
          .catch((error) => console.error("Error fetching the 5-day forecast data:", error));
      })
      .catch((error) => console.error("Error fetching the weather data:", error));
  };

  const sendEmailNotification = async (currentTemp) => {
    try {
      const response = await fetch('http://localhost:5000/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipientEmail: 'usmaniaman40@gmail.com', // The email address to notify
          subject: 'Temperature Alert',
          message: `Alert: Temperature exceeded ${temperatureThreshold}°C! Current: ${currentTemp}°C`,
        }),
      });

      if (response.ok) {
        console.log('Email notification sent successfully');
      } else {
        console.error('Failed to send email notification');
      }
    } catch (error) {
      console.error('Error sending email notification:', error);
    }
  };

  const checkTemperatureThreshold = (currentTemp) => {
    if (currentTemp > temperatureThreshold) {
      setBreachCount((prevCount) => {
        const newCount = prevCount + 1;
        console.warn(`Alert: Temperature exceeded ${temperatureThreshold}°C! Current: ${currentTemp}°C`);
        sendEmailNotification(currentTemp); // Send email notification
        return newCount; // Increment count
      });
    } else {
      setBreachCount(0); // Reset if below threshold
    }
  };
  

  const handleSearch = (searchedCity) => {
    setCity(searchedCity);
  };

  const handleThresholdChange = (event) => {
    setTemperatureThreshold(event.target.value);
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <div>
        <label>
          Set Temperature Threshold (°C):
          <p>Breach Count: {breachedCount}</p>
          <input
            type="number"
            value={temperatureThreshold}
            onChange={handleThresholdChange}
          />
        </label>
      </div>
      {weatherData && airQualityData && (
        <div style={{ display: "flex", padding: "30px", gap: "20px" }}>
          <div style={{ flex: "1", marginRight: "10px" }}>
            <MainWeatherCard weatherData={weatherData} />
            <p style={{ fontWeight: "700", fontSize: "20px", marginTop: "20px" }}>
              5 Days Forecast
            </p>
            {fiveDayForecast && <FiveDayForecast forecastData={fiveDayForecast} />}
            {fiveDayForecast && <DailyAggregates forecastData={fiveDayForecast} />}
          </div>
          <div style={{ display: "flex", flexDirection: "column", flex: "0.5", gap: "20px" }}>
            <TodayHighlights weatherData={weatherData} airQualityData={airQualityData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
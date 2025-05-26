import React from "react";

const DailyAggregates = ({ forecastData }) => {
  const dailyTemperatures = {};

  // Process the forecast data to calculate aggregates
  forecastData.list.forEach((item) => {
    const date = item.dt_txt.split(' ')[0]; // Get the date from the timestamp
    if (!dailyTemperatures[date]) {
      dailyTemperatures[date] = {
        temperatures: [],
      };
    }
    dailyTemperatures[date].temperatures.push(item.main.temp);
  });

  const aggregates = Object.entries(dailyTemperatures).map(([date, data]) => {
    const temps = data.temperatures;
    const avgTemp = (temps.reduce((acc, temp) => acc + temp, 0) / temps.length).toFixed(2);
    const maxTemp = Math.max(...temps).toFixed(2);
    const minTemp = Math.min(...temps).toFixed(2);

    return { date, avgTemp, maxTemp, minTemp };
  });

  return (
    <div
      style={{
        backgroundColor: "#4B5563",
        color: "white",
        borderRadius: "0.5rem",
        width: "200px",
        padding: "15px",
      }}
    >
      <h3 style={{ margin: "0 0 15px 0", fontSize: "18px" }}>Daily Temperature Aggregates</h3>
      <ul style={{ listStyleType: "none", padding: "0" }}>
        {aggregates.map((aggregate, index) => (
          <li key={index} style={{ marginBottom: "15px" }}>
            {aggregate.date}: Avg: {aggregate.avgTemp}°C, Max: {aggregate.maxTemp}°C, Min: {aggregate.minTemp}°C
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DailyAggregates;

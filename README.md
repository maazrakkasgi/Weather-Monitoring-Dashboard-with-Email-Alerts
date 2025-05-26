## Weather Monitoring Dashboard with Email Alerts

This is a weather monitoring web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The app pulls real-time weather data from the OpenWeatherMap API for Indian metro cities, displaying current weather conditions, a five-day forecast, and air quality. It also includes a temperature threshold system that sends email notifications when the temperature exceeds the set threshold.

Features

Real-time Weather Data: Fetches current weather, air quality, and 5-day forecasts for major cities.
Threshold-based Alerts: Users can set a temperature threshold. If the current temperature exceeds the threshold, they receive an email alert.
Email Notifications: Email notifications are sent using the Nodemailer package when the threshold is breached.
City Search: Users can search for weather information by city.
Custom Thresholds: Users can customize their temperature threshold for alerts.

Tech Stack

Frontend: React.js
Backend: Node.js, Express.js, Mongoose
Database: MongoDB
Email Notifications: Nodemailer (via Gmail)
API Integration: OpenWeatherMap API

Prerequisites

Node.js (v12 or higher)
MongoDB (local or cloud instance)
OpenWeatherMap API key: You need an API key from OpenWeatherMap.
Gmail Account: For sending email notifications using Nodemailer.


Installation
1. Clone the repository
 ```
git clone https://github.com/Amanusmani242/ZEOTAP_02.git
cd ZeoWeather
 ```
2. Install dependencies
Backend

```
cd backend
npm install
```

Frontend
```
cd weather-app
npm install
```
3. Set up Environment Variables
Create a .env file in the backend directory and add the following environment variables:
MONGODB_URI=<your-mongodb-connection-string>
PORT=5000
GMAIL_USER=your-gmail-address@gmail.com
GMAIL_PASS=your-app-specific-password # (for Gmail)
OPENWEATHER_API_KEY=your-openweathermap-api-key

Backend
To start the backend server, navigate to the backend directory and run:
```
node server.js
```
The server will be running on http://localhost:5000.

Frontend
To start the frontend React application, navigate to the weather-app directory and run:
```
npm run dev
```
The frontend will be running on http://localhost:5173


Frontend Overview
The React application fetches weather and air quality data from the OpenWeatherMap API. Key components include:

MainWeatherCard: Displays current weather conditions.
FiveDayForecast: Displays the 5-day weather forecast.
TodayHighlights: Shows highlights such as air quality and current conditions.
Navbar: Allows users to search for a specific city.
DailyAggregates: Displays aggregated weather statistics.



Email Notifications
The email notification feature is triggered when the current temperature exceeds the user-defined threshold. Nodemailer is used to send email alerts via a Gmail account.

Make sure you use an App Password for your Gmail account instead of your standard password, as Gmail no longer supports less secure apps.

Contact
If you have any questions or suggestions, feel free to reach out:

Email: usmaniaman40@gmail.com.com
GitHub: Amanusmani242








  

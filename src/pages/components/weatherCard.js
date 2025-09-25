import { useEffect, useState } from "react";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import GrainIcon from "@mui/icons-material/Grain";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";

const API_KEY = "a6b90eac9a3508082605b43a1579f398";
const CITY = "Kottayam";
const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&units=metric&appid=${API_KEY}`;

export default function WeatherCard() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        // Group forecasts by day
        const dailyMap = {};
        data.list.forEach(item => {
          const date = item.dt_txt.split(" ")[0]; // e.g., "2025-09-20"
          if (!dailyMap[date]) dailyMap[date] = item;
        });

        // Take first 6 days (today + next 5)
        const daily = Object.values(dailyMap).slice(0, 6);

        setWeather({ city: data.city.name, daily });
      } catch (err) {
        console.error("Weather fetch error:", err);
      }
    }
    fetchWeather();
  }, []);

  const getIcon = (main) => {
    switch (main) {
      case "Clear":
        return <WbSunnyIcon className="text-yellow-500" fontSize="large" />;
      case "Clouds":
        return <CloudIcon className="text-white" fontSize="large" />;
      case "Rain":
        return <GrainIcon className="text-blue-500" fontSize="large" />;
      case "Thunderstorm":
        return <ThunderstormIcon className="text-purple-700" fontSize="large" />;
      default:
        return <CloudIcon fontSize="large" />;
    }
  };

  const getDayName = (dt_txt) => {
    const date = new Date(dt_txt);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  if (!weather) {
    return (
      <div
        className="text-white w-80 h-48 p-4 mx-auto rounded-3xl shadow-md mb-4 flex items-center justify-center"
        style={{ background: "linear-gradient(to right, #0099ff 0%, #99ccff 100%)" }}
      >
        Loading weather...
      </div>
    );
  }

  return (
    <div
      className="text-white w-80 p-4 mx-auto rounded-3xl shadow-md mb-4"
      style={{ background: "linear-gradient(to right, #0099ff 0%, #99ccff 100%)" }}
    >
      <h2 className="text-xl font-bold text-center text-yellow-200">{weather.city}</h2>

      {/* Current Day */}
      <div className="flex justify-center items-center mt-2">
        {getIcon(weather.daily[0].weather[0].main)}
        <span className="ml-2 text-2xl">{Math.round(weather.daily[0].main.temp)}°C</span>
      </div>

      {/* Next 5 Days */}
      <div className="grid grid-cols-5 gap-2 mt-4 text-center">
        {weather.daily.slice(1,6).map((day, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <span className="text-sm">{getDayName(day.dt_txt)}</span>
            {getIcon(day.weather[0].main)}
            <span className="text-sm">{Math.round(day.main.temp)}°C</span>
          </div>
        ))}
      </div>
    </div>
  );
}

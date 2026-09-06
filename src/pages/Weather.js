import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import WeatherDetails from "../components/WeatherDetails";
import Forecast from "../components/Forecast";

function Weather() {
  const navigate = useNavigate();

  // ==========================================
  // STATES
  // ==========================================

  const [city, setCity] = useState(
    localStorage.getItem("lastCity") || "Chennai"
  );

  const [weather, setWeather] = useState(null);

  const [forecast, setForecast] = useState([]);

  const [selectedDate, setSelectedDate] =
    useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");


  // ==========================================
  // WEATHER DESCRIPTION
  // ==========================================

  const getWeatherDescription = (code) => {

    if (code === 0) {
      return "Clear sky";
    }

    if (code === 1) {
      return "Mainly clear";
    }

    if (code === 2) {
      return "Partly cloudy";
    }

    if (code === 3) {
      return "Overcast";
    }

    if (code >= 45 && code <= 48) {
      return "Foggy";
    }

    if (code >= 51 && code <= 67) {
      return "Rain";
    }

    if (code >= 71 && code <= 77) {
      return "Snow";
    }

    if (code >= 80 && code <= 82) {
      return "Rain showers";
    }

    if (code >= 95) {
      return "Thunderstorm";
    }

    return "Unknown";
  };


  // ==========================================
  // SEARCH WEATHER
  // ==========================================

  const searchWeather = async (
    searchCity = city
  ) => {

    if (!searchCity.trim()) {

      setError(
        "Please enter a city name."
      );

      return;
    }


    setLoading(true);

    setError("");


    try {

      // ========================================
      // STEP 1
      // CITY → LATITUDE/LONGITUDE
      // ========================================

      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          searchCity
        )}&count=1&language=en&format=json`
      );


      if (!geoResponse.ok) {

        throw new Error(
          "Unable to search location."
        );

      }


      const geoData =
        await geoResponse.json();


      if (
        !geoData.results ||
        geoData.results.length === 0
      ) {

        throw new Error(
          "City not found."
        );

      }


      const location =
        geoData.results[0];


      const {
        latitude,
        longitude,
        name,
        country,
      } = location;


      // ========================================
      // STEP 2
      // GET CURRENT + DAILY + HOURLY WEATHER
      // ========================================

      const weatherResponse =
        await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5`
        );


      if (!weatherResponse.ok) {

        throw new Error(
          "Unable to get weather data."
        );

      }


      const weatherData =
        await weatherResponse.json();


      // ========================================
      // CURRENT WEATHER
      // ========================================

      const current =
        weatherData.current;


      const weatherInfo = {

        name: name,

        country: country,

        temperature:
          current.temperature_2m,

        feelsLike:
          current.apparent_temperature,

        humidity:
          current.relative_humidity_2m,

        windspeed:
          current.wind_speed_10m,

        weatherCode:
          current.weather_code,

        description:
          getWeatherDescription(
            current.weather_code
          ),

        time:
          current.time,
      };


      setWeather(weatherInfo);


      // ========================================
      // DAILY WEATHER
      // ========================================

      const daily =
        weatherData.daily;


      // ========================================
      // HOURLY WEATHER
      // ========================================

      const hourly =
        weatherData.hourly;


      // ========================================
      // CREATE 5-DAY FORECAST
      // WITH HOURLY DATA INSIDE EACH DAY
      // ========================================

      const forecastData =
        daily.time.map(
          (date, index) => {

            const dayHours = [];


            for (
              let i = 0;
              i < hourly.time.length;
              i++
            ) {

              if (
                hourly.time[i].startsWith(
                  date
                )
              ) {

                dayHours.push({

                  time:
                    hourly.time[i],

                  temperature:
                    hourly.temperature_2m[i],

                  humidity:
                    hourly
                      .relative_humidity_2m[i],

                  feelsLike:
                    hourly
                      .apparent_temperature[i],

                  weatherCode:
                    hourly.weather_code[i],

                  windspeed:
                    hourly.wind_speed_10m[i],

                });

              }

            }


            return {

              date: date,

              temperature:
                daily.temperature_2m_max[
                  index
                ],

              minTemperature:
                daily.temperature_2m_min[
                  index
                ],

              weatherCode:
                daily.weather_code[
                  index
                ],

              description:
                getWeatherDescription(
                  daily.weather_code[
                    index
                  ]
                ),

              hourly:
                dayHours,

            };

          }
        );


      setForecast(forecastData);


      // ========================================
      // SELECT FIRST DAY
      // ========================================

      if (
        forecastData.length > 0
      ) {

        setSelectedDate(
          forecastData[0].date
        );

      }


      // ========================================
      // SAVE CITY
      // ========================================

      localStorage.setItem(
        "lastCity",
        name
      );

      setCity(name);

    } catch (err) {

      setWeather(null);

      setForecast([]);

      setSelectedDate("");

      setError(
        err.message ||
          "Unable to get weather information."
      );

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // LOAD DEFAULT CITY
  // ==========================================

  useEffect(() => {

    searchWeather(city);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // ==========================================
  // SEARCH HANDLER
  // ==========================================

  const handleSearch = (e) => {

    e.preventDefault();

    searchWeather(city);

  };


  // ==========================================
  // UI
  // ==========================================

  return (

    <div className="min-h-screen bg-slate-50">

      {/* ======================================
          NAVBAR
      ====================================== */}

      <nav className="sticky top-0 z-50 border-b border-white/50 bg-white/80 shadow-sm backdrop-blur-xl">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">

          {/* Logo */}

          <div className="flex items-center gap-3">

            <img src="images/logo1.png" alt="Skyora Logo" className="mt-6 h-16 w-16" />
            <div>

              <h1 className="text-lg font-black tracking-tight text-slate-900 sm:text-xl">
                Skyora
              </h1>

              <p className="hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 sm:block">
                Atmospheric Insights
              </p>

            </div>

          </div>


          {/* Logout */}

          <button
            onClick={() =>
              navigate("/")
            }
            className="group flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-500"
          >

            <span>
              Logout
            </span>

            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>

          </button>

        </div>

      </nav>


      {/* ======================================
          MAIN
      ====================================== */}

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">


        {/* ======================================
            HERO
        ====================================== */}

        <section className="mb-10">

          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">

            {/* LEFT */}

            <div>

              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-4 py-2">

                <span className="h-2 w-2 rounded-full bg-emerald-500" />

                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-700">
                  Weather Pulse

                </span>

              </div>


            <h2 className="mt-5 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                      Know what the
                 <span className="block bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                     sky has planned.
                </span>
             </h2>

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
                Explore your city's weather in seconds — from temperature and
                humidity to wind, conditions, and the days ahead.
              </p>


              {/* Search */}

              <SearchBar
                city={city}
                setCity={setCity}
                handleSearch={handleSearch}
                loading={loading}
              />

            </div>


            {/* RIGHT DECORATION */}

            <div className="hidden lg:block">

              <div className="relative mx-auto h-[330px] max-w-md overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-700 p-8 shadow-2xl shadow-blue-200">

                {/* Sun */}

                <div className="absolute right-10 top-8 h-28 w-28 rounded-full bg-yellow-200/90 shadow-[0_0_80px_rgba(253,224,71,0.55)]" />


                {/* Clouds */}

                <div className="absolute bottom-16 left-8 text-7xl opacity-90">
                  ☁️
                </div>

                <div className="absolute bottom-4 right-2 text-8xl opacity-40">
                  ☁️
                </div>


                {/* Decoration */}

                <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-white/10" />

                <div className="absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-white/10" />


                {/* Text */}

                <div className="relative z-10">
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-100">
                      Weather, Reimagined
                    </p>
                    <h3 className="mt-32 max-w-xs text-3xl font-black text-white">
                      Every cloud tells a story.
                      <br />
                      We'll help you read it.
                    </h3>
                    <p className="mt-3 text-sm text-blue-100">
                      Clear forecasts and meaningful insights, all in one glance.
                    </p>
                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ======================================
            ERROR
        ====================================== */}

        {error && (

          <div className="mb-8 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-600 shadow-sm">

            <span className="text-lg">
              ⚠️
            </span>

            <div>

              <p className="font-bold">
                Something went wrong
              </p>

              <p className="mt-1 text-red-500">
                {error}
              </p>

            </div>

          </div>

        )}


        {/* ======================================
            LOADING
        ====================================== */}

        {loading && (

          <div className="rounded-[2rem] border border-slate-100 bg-white py-20 text-center shadow-lg shadow-slate-100">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cyan-50">

              <div className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-100 border-t-cyan-500" />

            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-800">
              Reading the sky...
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Getting the latest weather information.
            </p>

          </div>

        )}


        {/* ======================================
            WEATHER
        ====================================== */}

        {!loading && weather && (

          <div className="space-y-12">

            {/* Current weather */}

            <WeatherCard
              weather={weather}
            />


            {/* Current details */}

            <WeatherDetails
              weather={weather}
            />


            {/* 5 day calendar + selected day */}

            <Forecast
              forecast={forecast}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />

          </div>

        )}


        {/* ======================================
            EMPTY STATE
        ====================================== */}

        {!loading &&
          !weather &&
          !error && (

            <section className="rounded-[2rem] border border-slate-100 bg-white p-10 text-center shadow-xl shadow-slate-100 sm:p-16">

              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-cyan-50 to-blue-100 text-5xl">
                🌤️
              </div>

              <h3 className="mt-7 text-2xl font-black text-slate-900">
                Search for a city
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                Enter any city above and discover
                current conditions and a five-day
                weather progression.
              </p>

            </section>

          )}

      </main>

{/* ======================================
    FOOTER
====================================== */}

<footer className="mt-20 border-t border-slate-200 bg-slate-50">
  <div className="mx-auto max-w-7xl px-6 py-10">

    {/* Main Footer */}
    <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

      {/* Brand */}
      <div>
        <div className="flex items-center gap-3">
          <img
            src="images/logo1.png"
            alt="Skyora Logo"
            className="h-10 w-10 object-contain"
          />

          <span className="text-xl font-black tracking-tight text-slate-900">
            Skyora
          </span>
        </div>

        <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
          Read the sky. Plan what's next.
          Simple, beautiful weather insights for every day.
        </p>
      </div>

      {/* Navigation Links */}
<div className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-slate-500">

  <button
    type="button"
    className="transition-colors duration-200 hover:text-blue-600"
  >
    Home
  </button>

  <button
    type="button"
    className="transition-colors duration-200 hover:text-blue-600"
  >
    Forecast
  </button>

  <button
    type="button"
    className="transition-colors duration-200 hover:text-blue-600"
  >
    Weather Map
  </button>

  <button
    type="button"
    className="transition-colors duration-200 hover:text-blue-600"
  >
    About
  </button>

</div>
    </div>

    {/* Footer Bottom */}
    <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">

      <p>
        © 2026 Skyora. All rights reserved.
      </p>

      <p>
        Weather data powered by reliable forecast services.
      </p>

    </div>

  </div>
</footer>
    </div>
  );
}

export default Weather;
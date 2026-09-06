function WeatherCard({ weather }) {
  const getWeatherIcon = (code) => {
    if (code === 0) return "☀️";

    if (code === 1 || code === 2) {
      return "🌤️";
    }

    if (code === 3) {
      return "☁️";
    }

    if (code >= 45 && code <= 48) {
      return "🌫️";
    }

    if (code >= 51 && code <= 67) {
      return "🌧️";
    }

    if (code >= 71 && code <= 77) {
      return "❄️";
    }

    if (code >= 80 && code <= 82) {
      return "🌦️";
    }

    if (code >= 95) {
      return "⛈️";
    }

    return "🌤️";
  };

  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-900 p-6 text-white shadow-2xl shadow-blue-200 sm:p-8 lg:p-10">

      {/* Background decoration */}
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

      <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="absolute right-16 top-12 h-2 w-2 rounded-full bg-white/70" />

      <div className="absolute right-32 top-24 h-3 w-3 rounded-full bg-cyan-300/70" />

      <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">

        {/* Left side */}
        <div>

          <div className="flex items-center gap-2">

            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400" />

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-200">
              Live Weather
            </p>

          </div>

          <h2 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
            {weather.name}
          </h2>

          <p className="mt-2 flex items-center gap-2 text-sm text-blue-200">
            <span>📍</span>
            {weather.country}
          </p>

          <div className="mt-8">

            <p className="text-2xl font-bold text-white">
              {weather.description}
            </p>

            <p className="mt-2 text-sm text-blue-200">
              Feels like {Math.round(weather.feelsLike)}°C
            </p>

          </div>

          {/* Quick information */}
          <div className="mt-7 flex flex-wrap gap-2">

            <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-medium text-blue-100 backdrop-blur">
              💧 Humidity {weather.humidity}%
            </div>

            <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-medium text-blue-100 backdrop-blur">
              💨 Wind {Math.round(weather.windspeed)} km/h
            </div>

          </div>

        </div>

        {/* Right temperature */}
        <div className="text-center lg:min-w-[280px]">

          <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full border border-white/10 bg-white/10 shadow-2xl backdrop-blur-md sm:h-40 sm:w-40">

            <span className="text-7xl drop-shadow-lg sm:text-8xl">
              {getWeatherIcon(weather.weatherCode)}
            </span>

          </div>

          <div className="mt-6">

            <span className="text-7xl font-black tracking-tighter sm:text-8xl">
              {Math.round(weather.temperature)}
            </span>

            <span className="ml-1 align-top text-3xl font-bold text-cyan-200">
              °C
            </span>

          </div>

          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-blue-300">
            Current temperature
          </p>

        </div>

      </div>

      {/* Last updated */}
      <div className="relative mt-8 border-t border-white/10 pt-5">

        <p className="text-xs text-blue-300">
          Last updated
        </p>

        <p className="mt-1 text-sm font-medium text-blue-100">
          {weather.time.replace("T", " ")}
        </p>

      </div>

    </section>
  );
}

export default WeatherCard;
function WeatherDetails({ weather }) {
  const details = [
    {
      icon: "🌡️",
      title: "Temperature",
      value: `${Math.round(weather.temperature)}°C`,
      description: "Current temperature",
    },
    {
      icon: "🌤️",
      title: "Feels Like",
      value: `${Math.round(weather.feelsLike)}°C`,
      description: "Apparent temperature",
    },
    {
      icon: "💧",
      title: "Humidity",
      value: `${weather.humidity}%`,
      description: "Relative humidity",
    },
    {
      icon: "💨",
      title: "Wind",
      value: `${Math.round(weather.windspeed)} km/h`,
      description: "Wind speed",
    },
  ];

  return (
    <section>

      {/* Heading */}
      <div className="mb-6">

        <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-500">
          Weather Insights
        </p>

        <h3 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
          Today at a glance
        </h3>

        <p className="mt-2 text-sm text-slate-400">
          Everything you need to understand the current conditions.
        </p>

      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

        {details.map((detail) => (
          <div
            key={detail.title}
            className="group rounded-[1.5rem] border border-slate-100 bg-white p-5 shadow-lg shadow-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-200 sm:p-6"
          >

            <div className="flex items-center justify-between">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-100 text-2xl transition-transform duration-300 group-hover:scale-110">
                {detail.icon}
              </div>

              <span className="text-slate-200 transition-colors group-hover:text-cyan-400">
                ↗
              </span>

            </div>

            <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-slate-400">
              {detail.title}
            </p>

            <p className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              {detail.value}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              {detail.description}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
}

export default WeatherDetails;
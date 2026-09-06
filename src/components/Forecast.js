function Forecast({
  forecast,
  selectedDate,
  setSelectedDate,
}) {
  if (!forecast || forecast.length === 0) {
    return null;
  }

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

  const getDayName = (date, index) => {
    if (index === 0) {
      return "Today";
    }

    return new Date(date).toLocaleDateString(
      "en-US",
      {
        weekday: "short",
      }
    );
  };

  const selectedDay = forecast.find(
    (day) => day.date === selectedDate
  );

  return (
    <section>

      {/* ========================================
          HEADER
      ======================================== */}

      <div className="mb-6">

        <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-500">
          Weather Calendar
        </p>

        <h3 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
          5-Day Weather Progress
        </h3>

        <p className="mt-2 text-sm text-slate-400">
          Click any day to see detailed weather information.
        </p>

      </div>


      {/* ========================================
          5 DAY CALENDAR
      ======================================== */}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">

        {forecast.map((day, index) => {

          const date = new Date(day.date);

          const isSelected =
            selectedDate === day.date;

          return (
            <button
              key={day.date}
              type="button"
              onClick={() =>
                setSelectedDate(day.date)
              }
              className={`group relative overflow-hidden rounded-3xl border p-4 text-left transition-all duration-300 sm:p-5 ${
                isSelected
                  ? "border-cyan-400 bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-xl shadow-cyan-200"
                  : "border-slate-100 bg-white text-slate-900 shadow-lg shadow-slate-100 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl"
              }`}
            >

              {/* Selected dot */}
              {isSelected && (
                <div className="absolute right-4 top-4 h-2.5 w-2.5 rounded-full bg-white shadow-lg" />
              )}

              {/* Day */}
              <p
                className={`text-xs font-bold uppercase tracking-wider ${
                  isSelected
                    ? "text-cyan-100"
                    : "text-slate-400"
                }`}
              >
                {getDayName(day.date, index)}
              </p>

              {/* Date */}
              <p
                className={`mt-1 text-sm font-bold ${
                  isSelected
                    ? "text-white"
                    : "text-slate-700"
                }`}
              >
                {date.toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "numeric",
                  }
                )}
              </p>

              {/* Icon */}
              <div className="my-5 text-center">

                <span className="text-5xl transition-transform duration-300 group-hover:scale-110">
                  {getWeatherIcon(
                    day.weatherCode
                  )}
                </span>

              </div>

              {/* Temperature */}
              <div className="text-center">

                <span
                  className={`text-3xl font-black ${
                    isSelected
                      ? "text-white"
                      : "text-slate-900"
                  }`}
                >
                  {Math.round(day.temperature)}
                </span>

                <span
                  className={`ml-1 text-sm ${
                    isSelected
                      ? "text-cyan-100"
                      : "text-slate-400"
                  }`}
                >
                  °C
                </span>

              </div>

              {/* Description */}
              <p
                className={`mt-2 text-center text-[11px] ${
                  isSelected
                    ? "text-cyan-100"
                    : "text-slate-400"
                }`}
              >
                {day.description}
              </p>

              {/* Low */}
              <div
                className={`mt-4 border-t pt-3 text-center text-xs ${
                  isSelected
                    ? "border-white/20 text-cyan-100"
                    : "border-slate-100 text-slate-400"
                }`}
              >
                Low {Math.round(day.minTemperature)}°C
              </div>

            </button>
          );
        })}

      </div>


      {/* ========================================
          SELECTED DAY
      ======================================== */}

      {selectedDay && (
        <SelectedDay
          day={selectedDay}
          getWeatherIcon={getWeatherIcon}
        />
      )}

    </section>
  );
}


/* =================================================
   SELECTED DAY COMPONENT
================================================= */

function SelectedDay({
  day,
  getWeatherIcon,
}) {
  const date = new Date(day.date);

  /*
    We don't need every hour.

    We show:
    6 AM
    9 AM
    12 PM
    3 PM
    6 PM
    9 PM

    This makes the UI cleaner.
  */

  const importantHours = [
    "06:00",
    "09:00",
    "12:00",
    "15:00",
    "18:00",
    "21:00",
  ];

  const hourlyData =
    day.hourly.filter((hour) => {

      const time = hour.time.split("T")[1];

      return importantHours.includes(time);

    });


  return (
    <div className="mt-8 overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-xl shadow-slate-100">

      {/* ========================================
          SELECTED DAY HEADER
      ======================================== */}

      <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-blue-950 to-cyan-900 p-6 text-white sm:p-8">

        <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-400/10" />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

          {/* Date */}
          <div>

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">
              Selected Day
            </p>

            <h4 className="mt-2 text-2xl font-black sm:text-3xl">
              {date.toLocaleDateString(
                "en-US",
                {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                }
              )}
            </h4>

            <p className="mt-2 text-sm text-blue-200">
              Detailed weather outlook
            </p>

          </div>


          {/* Temperature */}
          <div className="flex items-center gap-5">

            <span className="text-6xl">
              {getWeatherIcon(
                day.weatherCode
              )}
            </span>

            <div>

              <p className="text-5xl font-black">
                {Math.round(day.temperature)}°C
              </p>

              <p className="mt-1 text-xs text-blue-200">
                Expected high
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* ========================================
          DAILY INFORMATION
      ======================================== */}

      <div className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-4 sm:p-8">

        <InfoBox
          title="Condition"
          value={day.description}
          icon="🌤️"
        />

        <InfoBox
          title="High"
          value={`${Math.round(
            day.temperature
          )}°C`}
          icon="🔥"
        />

        <InfoBox
          title="Low"
          value={`${Math.round(
            day.minTemperature
          )}°C`}
          icon="❄️"
        />

        <InfoBox
          title="Date"
          value={date.toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "numeric",
            }
          )}
          icon="📅"
        />

      </div>


      {/* ========================================
          HOURLY PROGRESS
      ======================================== */}

      <div className="border-t border-slate-100 px-6 pb-8 sm:px-8">

        <div className="mb-6 pt-7">

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-500">
            Hourly Weather
          </p>

          <h5 className="mt-2 text-xl font-black text-slate-900">
            Weather Progress
          </h5>

          <p className="mt-1 text-sm text-slate-400">
            Temperature changes throughout the day.
          </p>

        </div>


        {/* Desktop horizontal progress */}
        <div className="hidden overflow-x-auto pb-3 md:block">

          <div className="min-w-[720px]">

            {/* Timeline */}
            <div className="relative">

              {/* Line */}
              <div className="absolute left-0 right-0 top-8 h-1 rounded-full bg-slate-100" />

              <div className="relative grid grid-cols-6 gap-3">

                {hourlyData.map((hour) => {

                  const time =
                    hour.time.split("T")[1];

                  return (
                    <div
                      key={hour.time}
                      className="relative text-center"
                    >

                      {/* Icon circle */}
                      <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-cyan-100 to-blue-100 text-3xl shadow-lg">
                        {getWeatherIcon(
                          hour.weatherCode
                        )}
                      </div>

                      {/* Time */}
                      <p className="mt-4 text-xs font-bold text-slate-400">
                        {formatHour(time)}
                      </p>

                      {/* Temperature */}
                      <p className="mt-2 text-2xl font-black text-slate-900">
                        {Math.round(
                          hour.temperature
                        )}°
                      </p>

                      <p className="text-xs text-slate-400">
                        Celsius
                      </p>

                      {/* Humidity */}
                      <div className="mt-4 rounded-xl bg-slate-50 p-2">
                        <p className="text-[10px] font-bold uppercase text-slate-400">
                          Humidity
                        </p>

                        <p className="mt-1 text-xs font-bold text-cyan-600">
                          {hour.humidity}%
                        </p>
                      </div>

                      {/* Wind */}
                      <div className="mt-2 rounded-xl bg-slate-50 p-2">
                        <p className="text-[10px] font-bold uppercase text-slate-400">
                          Wind
                        </p>

                        <p className="mt-1 text-xs font-bold text-blue-600">
                          {Math.round(
                            hour.windspeed
                          )} km/h
                        </p>
                      </div>

                    </div>
                  );
                })}

              </div>

            </div>

          </div>

        </div>


        {/* Mobile hourly cards */}
        <div className="space-y-3 md:hidden">

          {hourlyData.map((hour) => {

            const time =
              hour.time.split("T")[1];

            return (
              <div
                key={hour.time}
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4"
              >

                {/* Time + icon */}
                <div className="flex items-center gap-3">

                  <span className="text-3xl">
                    {getWeatherIcon(
                      hour.weatherCode
                    )}
                  </span>

                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {formatHour(time)}
                    </p>

                    <p className="text-xs text-slate-400">
                      Humidity {hour.humidity}%
                    </p>
                  </div>

                </div>


                {/* Temperature */}
                <div className="text-right">

                  <p className="text-2xl font-black text-slate-900">
                    {Math.round(
                      hour.temperature
                    )}°C
                  </p>

                  <p className="text-xs text-blue-500">
                    💨 {Math.round(
                      hour.windspeed
                    )} km/h
                  </p>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}


/* =================================================
   INFO BOX
================================================= */

function InfoBox({
  title,
  value,
  icon,
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">

      <div className="flex items-center gap-2">

        <span className="text-lg">
          {icon}
        </span>

        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {title}
        </p>

      </div>

      <p className="mt-2 break-words text-lg font-black text-slate-800">
        {value}
      </p>

    </div>
  );
}


/* =================================================
   FORMAT HOUR
================================================= */

function formatHour(time) {
  const [hourString] = time.split(":");

  let hour = parseInt(hourString, 10);

  const period = hour >= 12 ? "PM" : "AM";

  hour = hour % 12;

  if (hour === 0) {
    hour = 12;
  }

  return `${hour} ${period}`;
}


export default Forecast;
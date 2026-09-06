import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      email.trim() === "" ||
      password.trim() === ""
    ) {
      alert(
        "Please enter email and password"
      );

      return;
    }

    navigate("/weather");
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-slate-950 px-4 py-8">

      {/* Background glow */}

      <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

      <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl" />


      {/* Main card */}

      <div className="relative z-10 m-auto grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl lg:grid-cols-2">


        {/* ====================================
            LEFT BRANDING
        ==================================== */}

        <div className="relative hidden overflow-hidden bg-gradient-to-br from-cyan-600 via-blue-700 to-indigo-900 p-10 text-white lg:flex lg:flex-col lg:justify-between">

          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />

          <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-cyan-300/10" />


          <div className="relative">
          <img src="images/logo1.png" alt="Skyora Logo" className="mt-6 h-16 w-16" />
            <h1 className="mt-6 text-4xl font-black tracking-tight">
              Skyora
            </h1>

          <p className="mt-3 max-w-sm text-lg leading-7 text-blue-100">
              See what the sky has in store, plan your day with confidence,
              and stay one step ahead of every forecast.
          </p>

          </div>


          <div className="relative">

            <div className="mb-4 text-7xl">
              ☀️
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200">
              Your Daily Companion
            </p>

            <p className="mt-2 text-sm text-blue-200">
              Check conditions. Plan ahead. Enjoy your day.
            </p>

          </div>

        </div>


        {/* ====================================
            LOGIN
        ==================================== */}

        <div className="bg-white p-7 sm:p-10 lg:p-12">

          {/* Mobile logo */}

          <div className="mb-8 text-center lg:hidden">

            <img src="images/logo1.png" alt="Skyora Logo" className="mt-6 h-16 w-16" />

            <h1 className="mt-4 text-3xl font-black text-slate-900">
              Skyora
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Weather, simply understood.
            </p>

          </div>


          <div>

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-500">
              Welcome Back
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
              Sign in to continue
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Access your weather dashboard and discover
              the conditions around you.
            </p>

          </div>


          <form
            onSubmit={handleLogin}
            className="mt-8 space-y-5"
          >

            {/* Email */}

            <div>

              <label className="mb-2 block text-sm font-bold text-slate-700">
                Email Address
              </label>

              <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-cyan-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-cyan-50">

                <span className="mr-3 text-lg">
                  ✉️
                </span>

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  className="w-full bg-transparent py-4 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
                />

              </div>

            </div>


            {/* Password */}

            <div>

              <div className="mb-2 flex items-center justify-between">

                <label className="block text-sm font-bold text-slate-700">
                  Password
                </label>

                <span className="text-xs font-semibold text-cyan-600">
                  Secure Login
                </span>

              </div>


              <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-cyan-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-cyan-50">

                <span className="mr-3 text-lg">
                  🔒
                </span>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  className="w-full bg-transparent py-4 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
                />

              </div>

            </div>


            {/* Login */}

            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 py-4 text-sm font-bold text-white shadow-xl shadow-cyan-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-100"
            >

              Login

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>

            </button>

          </form>


          <div className="mt-8 flex items-center gap-3">

            <div className="h-px flex-1 bg-slate-100" />

            <span className="text-xs text-slate-300">
              A. WEATHER
            </span>

            <div className="h-px flex-1 bg-slate-100" />

          </div>


          <p className="mt-6 text-center text-xs text-slate-400">
            © 2026 A. Weather · Built with ReactJS & Open-Meteo
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;
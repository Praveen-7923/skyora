function SearchBar({ city, setCity, handleSearch, loading }) {
  return (
    <form
      onSubmit={handleSearch}
      className="mt-8 w-full"
    >
      <div className="flex w-full flex-col gap-3 rounded-3xl border border-white/70 bg-white/90 p-2 shadow-2xl shadow-slate-200/60 backdrop-blur-xl sm:flex-row">

        {/* Search input */}
        <div className="flex min-w-0 flex-1 items-center rounded-2xl bg-slate-50 px-4 transition-all duration-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-cyan-100">

          <div className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-lg">
            📍
          </div>

          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search any city..."
            className="min-w-0 flex-1 bg-transparent py-3 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400 sm:text-base"
          />
        </div>

        {/* Search button */}
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-cyan-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Searching...
            </>
          ) : (
            <>
              <span>🔍</span>
              Search
            </>
          )}
        </button>

      </div>
    </form>
  );
}

export default SearchBar;
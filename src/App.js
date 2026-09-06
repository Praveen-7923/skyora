import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Weather from "./pages/Weather";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/weather"
          element={<Weather />}
        />

      </Routes>
    </BrowserRouter>
  );
}
export default App;
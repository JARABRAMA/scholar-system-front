import { useState } from "react";

import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { Aouth } from "./screens/Aouth.jsx";
import { TobBar } from "./components/TopBar.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <TobBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Aouth />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

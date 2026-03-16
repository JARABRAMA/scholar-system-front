import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router";
import { Aouth } from "./screens/Aouth.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Aouth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

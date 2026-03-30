import { useState } from "react";

import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { Aouth } from "./screens/Aouth.jsx";
import { TobBar } from "./components/TopBar.jsx";
import { NewUser } from "./screens/NewUser.jsx";
import { FilterUsers } from "./screens/FilterUsers.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <TobBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Aouth />} />
          <Route path="/users/new" element={<NewUser />} />
          <Route path="/users" element={<FilterUsers />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

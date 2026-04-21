import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { Aouth } from "./screens/Aouth.jsx";
import { TobBar } from "./components/TopBar.jsx";
import { NewUser } from "./screens/NewUser.jsx";
import { FilterUsers } from "./screens/FilterUsers.jsx";
import { PrivateRoute } from "./components/PrivateRoute.jsx";
import { NavigationPaths } from "./navigation/NavigationPaths.jsx";
import { CoursesScreen } from "./screens/CoursesScreen.jsx";

function App() {
  return (
    <BrowserRouter>
      <TobBar />
      <Routes>
        <Route path="/" element={<Aouth />} />
        <Route element={<PrivateRoute allowedRoles={["ADMINISTRADOR"]} />}>
          <Route path="/users/new" element={<NewUser />} />
          <Route path="/users" element={<FilterUsers />} />
        </Route>

        <Route path={NavigationPaths.COURSES} element={<CoursesScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { Aouth } from "./screens/Aouth.jsx";
import { TobBar } from "./components/TopBar.jsx";
import { NewUser } from "./screens/NewUser.jsx";
import { FilterUsers } from "./screens/FilterUsers.jsx";
import { PrivateRoute } from "./components/PrivateRoute.jsx";
import { NavigationPaths } from "./navigation/NavigationPaths.jsx";
import { CoursesScreen } from "./screens/CoursesScreen.jsx";
import { ProfileScreen } from "./screens/ProfileScreen.jsx";
import { EditUser } from "./screens/EditUser.jsx";
function App() {
  return (
    <BrowserRouter>
      <TobBar />
      <Routes>
        <Route path="/" element={<Aouth />} />
        <Route element={<PrivateRoute allowedRoles={["ADMINISTRADOR"]} />}>
          <Route path={NavigationPaths.NEW_USER} element={<NewUser />} />
          <Route path={NavigationPaths.USERS} element={<FilterUsers />} />
        </Route>
        <Route path={NavigationPaths.PROFILE} element={<ProfileScreen />} />
        <Route path={NavigationPaths.EDIT_USER} element={<EditUser />} />

        <Route path={NavigationPaths.COURSES} element={<CoursesScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

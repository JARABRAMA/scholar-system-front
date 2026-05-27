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
import { NewCourse } from "./screens/NewCourseScreen.jsx";
import { CourseDetails } from "./screens/CourseDetails.jsx";
import { NewGroupScreen } from "./screens/NewGroupScreen.jsx";
import { GroupDetails } from "./screens/GroupDetails.jsx";
import { Roles } from "./utils/Roles.js";
import { ResetPasswordScreen } from "./screens/ResetPasswordScreen.jsx";
import { CourseGradesScreen } from "./screens/CourseGradesScreen.jsx";
import { StudentGradesScreen } from "./screens/StudentGradesScreen.jsx";

function App() {
  return (
    <BrowserRouter>
      <TobBar />
      <Routes>
        <Route path="/" element={<Aouth />} />
        <Route
          path={NavigationPaths.RESET_PASSWORD}
          element={<ResetPasswordScreen />}
        />
        <Route
          element={
            <PrivateRoute
              allowedRoles={[
                Roles.ADMINISTRADOR,
                Roles.ESTUDIANTE,
                Roles.PROFESOR,
              ]}
            />
          }
        >
          <Route path={NavigationPaths.COURSES} element={<CoursesScreen />} />
          <Route
            path={NavigationPaths.COURSE_DETAIL}
            element={<CourseDetails />}
          />
          <Route path={NavigationPaths.PROFILE} element={<ProfileScreen />} />
          <Route path={NavigationPaths.EDIT_USER} element={<EditUser />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={["ADMINISTRADOR"]} />}>
          <Route path={NavigationPaths.NEW_USER} element={<NewUser />} />
          <Route path={NavigationPaths.USERS} element={<FilterUsers />} />
          <Route path={NavigationPaths.NEW_COURSE} element={<NewCourse />} />

          <Route
            path={NavigationPaths.NEW_GROUP}
            element={<NewGroupScreen />}
          />
          <Route
            path={NavigationPaths.GROUP_DETAIL}
            element={<GroupDetails />}
          />
        </Route>
        <Route element={<PrivateRoute allowedRoles={[Roles.PROFESOR]} />}>
          <Route
            path={NavigationPaths.GRADES}
            element={<CourseGradesScreen />}
          ></Route>
        </Route>
        <Route element={<PrivateRoute allowedRoles={[Roles.ESTUDIANTE]} />}>
          <Route
            path={NavigationPaths.STUDENT_GRADES}
            element={<StudentGradesScreen />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

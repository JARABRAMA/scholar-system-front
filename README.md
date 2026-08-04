# Scholar System — Frontend

Frontend web application for **Scholar System**, an academic management platform. The app lets students, teachers and administrators manage courses, groups, schedules, users and grades through a single-role interface backed by a microservices API.

> Note: the UI text is written in Spanish. `example/` contains a leftover Vite starter template and is **not** part of the application.

## Tech Stack

- **React 19** + **Vite 7** (SWC plugin for Fast Refresh)
- **Tailwind CSS 4** (`@tailwindcss/vite` plugin)
- **react-router 7** — declarative routing
- **Zustand 5** — global state (auth/session)
- **jwt-decode** — JWT payload parsing
- **ESLint 9** (JS recommended + React Hooks + React Refresh + `standard`)

## Getting Started

Prerequisites: Node.js 18+ and npm.

```bash
npm install        # install dependencies
npm run dev        # start the Vite dev server
npm run build      # production build (outputs dist/)
npm run preview    # preview the production build locally
npm run lint       # run ESLint over the whole project
```

## Environment Variables

Create a `.env` file in the project root (`.env` is gitignored). See `.env` for reference values.

| Variable                  | Description                              | Default             |
| ------------------------- | ---------------------------------------- | ------------------- |
| `VITE_BASE_URL`           | Users & auth microservice base URL       | `http://localhost:8080` |
| `VITE_COUSES_URL`         | Courses & groups microservice base URL   | `http://localhost:8081` |
| `VITE_EVALUATIONS_URL`    | Evaluations & grades microservice URL    | `http://localhost:8082` |

## Architecture Overview

The frontend is a SPA that talks to three separate backend services:

- **Users / Auth service** (`VITE_BASE_URL`) — login, password reset, user CRUD, city (department/municipality) catalog.
- **Courses service** (`VITE_COUSES_URL`) — courses, groups, schedules, teachers, students per group.
- **Evaluations service** (`VITE_EVALUATIONS_URL`) — evaluations (assignments/partials) and grades.

All API requests are protected with a `Bearer` token read from the Zustand store.

## Project Structure

```
src/
├── App.jsx                    # Router + top-level layout & route guards
├── main.jsx                   # React entry point
├── index.css                  # Tailwind + Inter font + global styles
├── components/                # Reusable UI components & feature components
│   ├── course/                # Course list cards (admin) and group cards (teacher/student)
│   ├── grades/                # Evaluation creation & student-grades hooks
│   ├── groupdetails/          # Add schedule / add student modals
│   ├── reset-password/        # Forms for the 3-step password reset flow
│   └── schedule/              # Schedule display item
├── hooks/                     # Data-fetching & form logic hooks
│   ├── course/                # Teacher/student courses content
│   ├── grades/                # Evaluations table, group evaluations
│   ├── groups/                # Group fetching
│   ├── reset-password/        # Send code / verify code / reset form
│   └── students/              # Students by group
├── screens/                   # Route-level pages
├── store/LoginStore.jsx       # Zustand auth store (token, profile, role)
├── navigation/NavigationPaths.jsx  # Centralized route path constants
├── utils/                     # Roles, days, captalize, format helpers
├── core/, features/, shared/  # Empty scaffolding directories (unused)
public/sprite.svg              # SVG icon sprite used across the UI
```

## Routing & Navigation

All path constants live in `src/navigation/NavigationPaths.jsx`. Route definitions and guards are in `src/App.jsx`.

| Path                          | Screen               | Roles            |
| ----------------------------- | -------------------- | ---------------- |
| `/`                           | Login (`Aouth`)      | Public           |
| `/auth/reset-password`        | `ResetPasswordScreen`| Public           |
| `/courses`                    | `CoursesScreen`      | All authenticated |
| `/courses/:courseId`          | `CourseDetails`      | All authenticated |
| `/profile/:id`                | `ProfileScreen`      | All authenticated |
| `/users/edit/:id`             | `EditUser`           | All authenticated |
| `/users/new`                  | `NewUser`            | Administrator    |
| `/users`                      | `FilterUsers`        | Administrator    |
| `/courses/new`                | `NewCourse`          | Administrator    |
| `/courses/:courseId/new-group`| `NewGroupScreen`     | Administrator    |
| `/groups/:id`                 | `GroupDetails`       | Administrator    |
| `/group/:groupId/grades`      | `CourseGradesScreen` | Teacher          |
| `/grades/:studentId`          | `StudentGradesScreen`| Student          |

Route protection uses `PrivateRoute` (`src/components/PrivateRoute.jsx`): unauthenticated users are redirected to `/`, and users whose role is not in `allowedRoles` are redirected to `/unauthorized`.

## Authentication & Roles

- On login (`POST /auth/login`), the returned `accessToken` is decoded with `jwt-decode` and persisted in the Zustand `useLoginStore`.
- The store exposes: `fullname`, `email` (`sub`), `role`, `id` (`jti`), `accessToken` and an `isTeacher` flag.
- Roles are defined in `src/utils/Roles.js`: `ESTUDIANTE` (student), `PROFESOR` (teacher), `ADMINISTRADOR` (administrator).
- Password reset is a 3-step flow tracked by `ResetPasswordStatus` (`SEND_CODE` → `VERIFY_CODE` → `RESET_PASSWORD`):
  - `POST /auth/send-code/{email}`
  - `POST /auth/validate-code` → returns a `resetToken`
  - `POST /auth/reset-password`

## Features by Role

**Administrator**
- Manage users: list/filter (search + role), create, edit, delete, view profiles.
- Manage courses: create, list (paginated + search), view details.
- Manage groups: create, assign teacher, add/remove schedules and students.

**Teacher**
- View their assigned groups (course, teacher, schedules).
- Register grades: create evaluations and enter grade values per student for a group.

**Student**
- View their groups and teachers.
- View their own grades per course/group (read-only).

## Key Data-Fetching Hooks

| Hook                       | Endpoint                                     |
| -------------------------- | -------------------------------------------- |
| `useLogin`                 | `POST {users}/auth/login`                    |
| `useCourses`               | `GET {courses}/api/courses?text=&page=`      |
| `useCourseDetails`         | `GET {courses}/api/courses/{courseId}`       |
| `useCourseGroups`          | `GET {courses}/api/groups/course/{courseId}` |
| `useTeacherStudentContent` | `GET {courses}/api/groups/user/{userId}`     |
| `useFetchGroupDetails`     | `GET {courses}/api/groups/{id}`              |
| `useFetchTeachers`         | `GET {courses}/api/users/teachers`           |
| `useFetchStudentsByGroup`  | `GET {courses}/api/users/group/{groupId}`    |
| `useFilterUsers`           | `GET {users}/users?search=&role=&page=`      |
| `useFetchUser`             | `GET {users}/users/{id}`                     |
| `useFetchCities`           | `GET {users}/city/departments` and `/city/municipalities/{dept}` |
| `useNewUser` / `useEditUser` / `useDeleteUser` | `POST/PUT/DELETE {users}/users[/{id}]` |
| `useNewGroup` / `useGroupDetailsForm` | `POST/PUT {courses}/api/groups[/{id}]` |
| `useEvaluations`           | `GET {evaluations}/api/evaluations/group/{groupId}`, `POST {evaluations}/api/grades` |
| `useFetchGradesByStudent`  | `GET {evaluations}/api/grades/student/{studentId}` |
| `useCreateEvaluation`      | `POST {evaluations}/api/evaluations`          |

Most list hooks debounce input (400–500 ms) and keep pagination/filter state in sync with the URL search params.

## UI Components

Shared building blocks in `src/components/`:

- `Button`, `Input`, `CitySelect`, `RoleSelect`, `RolePill`, `Pagination`, `Spinner`
- `Dialog`, `LoadingDialog`, `ErrorDialog`, `ErrorContainer` — feedback/dialog patterns
- `TopBar`, `SideBar`, `ProfileIcon` — layout and branding
- `PrivateRoute`, `LoginForm`, `DeleteUserDialog`, `useDeleteUser`

Icons come from an inline SVG sprite (`public/sprite.svg`) referenced via `<use href="/sprite.svg#icon-name">`.

## Conventions

- Components and hooks are named in `PascalCase` / `camelCase`; files use `.jsx` for React files and `.js` for pure utilities.
- Hooks encapsulate all data fetching and form logic; screens stay thin and compose hooks + presentational components.
- Fetch calls read the access token from `useLoginStore` and read service URLs from `import.meta.env`.
- Styling is utility-first Tailwind; the Inter font is loaded in `src/index.css`.

## Deployment

The project is configured for **Vercel** via `vercel.json`, which rewrites all routes to `/index.html` so client-side routing works on any path.

```
npm run build
```

## Scripts

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start development server           |
| `npm run build`   | Build production bundle            |
| `npm run preview` | Serve the production build         |
| `npm run lint`    | Lint the codebase with ESLint      |

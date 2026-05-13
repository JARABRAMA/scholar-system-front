import { SideBar } from "../components/SideBar.jsx";
import { captalize } from "../utils/captalize.js";
import { useCourseDetails } from "../hooks/useCourseDetials.jsx";
import { useCourseGroups } from "../hooks/useCourseGroups.jsx";
import { Button } from "../components/Button.jsx";

export function CourseDetails() {
  return (
    <main className="grid grid-cols-[auto_1fr] bg-stone-100 overflow-y-hidden">
      <SideBar />
      <Content />
    </main>
  );
}

import { Spinner } from "../components/Spinner.jsx";
import { useNavigate } from "react-router";

function Content() {
  const {
    course,
    loading: loadingCourseDetails,
    error: errorCourseDetails,
  } = useCourseDetails();
  const navigate = useNavigate();

  return (
    <>
      {loadingCourseDetails && !course && (
        <div className="flex flex-1">
          <Spinner />
        </div>
      )}
      {course && (
        <section className="py-8 px-12 overflow-y-hidden flex flex-col gap-8 ">
          <header className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl">{course.name}</h1>
              <span className="text-stone-400">
                Detalles del curso, consulta los credtios el nombre, el codigo y
                cada uno de los grupos del curso
              </span>
            </div>
            <Button
              onClick={() => navigate(`/courses/${course.code}/new-group`)}
              className={"bg-blue-500 text-white h-fit w-fit p-4 flex gap-1"}
            >
              <svg className="size-6">
                <use href="/sprite.svg#plus" />
              </svg>
              Crear grupo
            </Button>
          </header>
          <GroupsList />
        </section>
      )}
    </>
  );
}

function GroupsList() {
  const {
    groups,
    loading: loadingGroups,
    error: errorCourseGroups,
  } = useCourseGroups();
  console.log(groups);
  return (
    <>
      {loadingGroups && (
        <div>
          <Spinner />
        </div>
      )}
      {groups && (
        <div className="grid grid-cols-3 gap-4">
          {groups.map((g) => (
            <GroupCard
              key={g.id}
              name={g.groupName}
              schedules={g.schedules}
              teacher={g.teacher}
            />
          ))}
        </div>
      )}
      {groups && groups.length === 0 && (
        <div className="flex flex-1 items-center justify-center">
          <span className="text-2xl text-stone-400 text-center">
            No hay grupos creados para este curso aún
          </span>
        </div>
      )}
    </>
  );
}

function GroupCard({ name, schedules, teacher }) {
  return (
    <div
      className="bg-white shadow-sm px-6 py-4 rounded-xl flex flex-col border border-stone-300 gap-2
    justify-between"
    >
      <span className="text-xl">{captalize(name)}</span>
      <div className="bg-indigo-500 text-white px-2 py-1 rounded-md">
        <span>
          {teacher ? `Profesor: ${teacher.fullName}` : "Profesor: No asignado"}
        </span>
        {teacher && <span>{teacher.email}</span>}
      </div>
      <span>Horario</span>
      {schedules && (
        <div className="bg-stone-300 px-2 py-2 rounded">
          {schedules.map((s) => (
            <ScheduleItem
              day={s.day}
              startTime={s.startsTime}
              endTime={s.endTime}
            />
          ))}
        </div>
      )}
      <Button
        className={"self-end bg-blue-500 text-white border-0 hover:bg-blue-600"}
      >
        Ver grupo
      </Button>
    </div>
  );
}

function ScheduleItem({ day, startTime, endTime }) {
  return (
    <div className="flex gap-2 justify-between">
      <span>{captalize(day.toLowerCase())}</span>
      <div className="flex gap-1">
        <span>{startTime}</span>-<span>{endTime}</span>
      </div>
    </div>
  );
}

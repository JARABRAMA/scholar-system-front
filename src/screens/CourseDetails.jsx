import { SideBar } from "../components/SideBar.jsx";
import { captalize } from "../utils/captalize.js";
import { useCourseDetails } from "../hooks/useCourseDetials.jsx";
import { useCourseGroups } from "../hooks/useCourseGroups.jsx";
import { Button } from "../components/Button.jsx";
import { ProfileIcon } from "../components/ProfileIcon.jsx";
import { formatTo4Digits } from "../utils/utils.js";

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
        <section className="py-8 px-12 overflow-y-auto flex flex-col gap-8 ">
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
        <div className="grid grid-cols-3 gap-4 ">
          {groups.map((g) => (
            <GroupCard
              key={g.id}
              name={g.groupName}
              schedules={g.schedules}
              teacher={g.teacher}
              id={g.id}
            />
          ))}
        </div>
      )}
      {groups && groups.length === 0 && (
        <div className="grid grid-cols-3">
          <span className="text-2xl text-stone-400 text-center">
            No hay grupos creados para este curso aún
          </span>
        </div>
      )}
    </>
  );
}

function GroupCard({ name, schedules, teacher, id }) {
  return (
    <article className="shadow-sm  rounded-xl flex flex-col border bg-stone-100 border-stone-300 justify-between gap-2">
      <header className="flex flex-1 max-h-fit bg-indigo-500 w-full h-full rounded-t-xl text-indigo-100 justify-between px-4 py-4 items-center">
        <span className="text-2xl font-bold">{captalize(name)}</span>
        <span className="text-sm bg-indigo-700 rounded-lg py-1 px-2 text-indigo-300">
          GP-{formatTo4Digits(id)}
        </span>
      </header>
      <section className="flex gap-4 px-4 py-2 items-center">
        {teacher && (
          <ProfileIcon fullName={teacher.fullName} className="size-12" />
        )}
        <div className="flex flex-col ">
          <span>
            {teacher
              ? `Profesor: ${teacher.fullName}`
              : "Profesor: No asignado"}
          </span>
          {teacher && (
            <span className="text-sm text-stone-600">{teacher.email}</span>
          )}
        </div>
      </section>
      {schedules && (
        <section className="mx-6 text-sm bg-stone-300 p-4 rounded-xl my-2 flex flex-col gap-1">
          <span className="text-stone-800">HORARIO</span>
          {schedules.map((s) => (
            <ScheduleItem
              day={s.day}
              startTime={s.startsTime}
              endTime={s.endTime}
            />
          ))}
        </section>
      )}
      <Button
        className={
          "self-end justify-self-end bg-indigo-500 text-white border-0 hover:bg-indigo-600 m-4 flex gap-1"
        }
      >
        Ver grupo
        <svg className="size-5">
          <use href="/sprite.svg#navigate-next" />
        </svg>
      </Button>
    </article>
  );
}

function ScheduleItem({ day, startTime, endTime }) {
  return (
    <div className="flex gap-2 justify-between items-center pe-9">
      <span className="flex text-stone-800 items-center gap-1">
        <svg className="size-4">
          <use href="/sprite.svg#calendar" />
        </svg>
        {captalize(day.toLowerCase())}
      </span>
      <div className="flex gap-1 text-stone-800 font-bold">
        <span>{startTime.slice(0, 5)}</span>-<span>{endTime.slice(0, 5)}</span>
      </div>
    </div>
  );
}

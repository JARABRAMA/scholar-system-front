import { SideBar } from "../components/SideBar.jsx";
import { Button } from "../components/Button.jsx";
import { Spinner } from "../components/Spinner.jsx";
import { Pagination } from "../components/Pagination.jsx";
import { useCourses } from "../hooks/useCourses.jsx";
import { useNavigate } from "react-router";
import { NavigationPaths } from "../navigation/NavigationPaths.jsx";
import { formatTo4Digits } from "../utils/utils.js";

export function CoursesScreen() {
  return (
    <main className="grid grid-cols-[auto_1fr] bg-stone-100 overflow-y-hidden">
      <SideBar />
      <Content />
    </main>
  );
}

function Content() {
  const {
    courses,
    loading,
    error,
    onSetSearchText,
    totalPages,
    currentPage,
    isLast,
    isFirst,
    onNextPage,
    onPreviousPage,
    onSetPage,
  } = useCourses();
  const navigate = useNavigate();
  return (
    <section className="py-8 px-12 overflow-y-auto  flex flex-col">
      <header className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-4xl">Gestionar Cursos</h1>
          <p className="text-stone-400">Oferta académica del semestre</p>
        </div>
        <Button
          onClick={() => navigate(NavigationPaths.NEW_COURSE)}
          className="bg-blue-600 text-white flex items-center px-3 gap-2 hover:outline-0"
        >
          <svg className="size-8 p-0 m-0">
            <use href="/sprite.svg#plus"> </use>
          </svg>
          Añadir curso
        </Button>
      </header>
      <SearchBar onSetSearchText={onSetSearchText} />
      <CoursesGird
        courses={courses}
        loading={loading}
        error={error}
        totalPages={totalPages}
        currentPage={currentPage}
        isLast={isLast}
        isFirst={isFirst}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
        onSetPage={onSetPage}
      />
    </section>
  );
}
function CoursesGird({
  courses,
  loading,
  error,
  totalPages,
  currentPage,
  isLast,
  isFirst,
  onNextPage,
  onPreviousPage,
  onSetPage,
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-col flex-1">
      {loading && !courses && !error && (
        <div className="flex flex-1 justify-center items-center">
          <Spinner />
        </div>
      )}

      <section className="my-8 grid grid-cols-3 gap-5 items-start flex-1 content-start">
        {courses &&
          courses.map((c) => (
            <CourseCard
              key={c.code}
              code={c.code}
              name={c.name}
              credits={c.credits}
              ngroups={c.ngroups}
            />
          ))}
      </section>

      <Pagination
        currentPage={currentPage}
        isFirstPage={isFirst}
        isLastPage={isLast}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
        onSetPage={onSetPage}
        pages={pages}
      />
    </div>
  );
}

function CourseCard({ code, name, credits, ngroups }) {
  const navigate = useNavigate();
  return (
    <article
      className="bg-white  gap-2 rounded-xl shadow-sm shadow-stone-100 
     border-2 border-stone-300  flex flex-col flex-1"
    >
      <header className="flex flex-col gap-2 px-4 py-4 bg-sky-600 rounded-t-xl text-sky-100">
        <span className="bg-sky-700 rounded-lg p-1 w-fit text-sm">
          CS-{formatTo4Digits(code)}
        </span>
        <span className="text-lg font-bold">{name.toUpperCase()}</span>
      </header>
      <section className="grid grid-cols-2 gap-4 justify-center items-center px-4 py-2">
        <div className="flex flex-col bg-stone-300 p-3 rounded-md">
          <span className="font-bold text-xl">{ngroups}</span>
          <span className="text-sm flex gap-1 items-center">
            <svg className="size-4">
              <use href="/sprite.svg#board"></use>
            </svg>
            grupos
          </span>
        </div>
        <div className="flex flex-col bg-stone-300 p-3 rounded-md">
          <span className="font-bold text-xl">{credits}</span>
          <span className="text-sm flex gap-1 items-center">
            <svg className="size-4">
              <use href="/sprite.svg#hat"></use>
            </svg>
            creditos
          </span>
        </div>
      </section>
      <Button
        onClick={() => navigate(`/courses/${code}`)}
        className={
          "w-fit h-fit border border-stone-300 rounded-xl self-end mx-4 mb-4 bg-sky-600 text-sky-100 flex gap-1"
        }
      >
        Ver grupos
        <svg className="size-5">
          <use href="/sprite.svg#navigate-next"></use>
        </svg>
      </Button>
    </article>
  );
}

function SearchBar({ onSetSearchText }) {
  return (
    <div className="flex border-stone-300 border-2 py-2 px-2.5 gap-2.5 rounded-md ">
      <svg className="size-6 text-stone-600">
        <use href="/sprite.svg#search"></use>
      </svg>
      <input
        onInput={(e) => onSetSearchText(e.target.value)}
        type="text"
        placeholder="Buscar cursos..."
        className="bg-transparent border-none focus:outline-none"
      />
    </div>
  );
}

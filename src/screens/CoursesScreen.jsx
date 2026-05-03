import { SideBar } from "../components/SideBar.jsx";
import { Button } from "../components/Button.jsx";
import { Spinner } from "../components/Spinner.jsx";
import { Pagination } from "../components/Pagination.jsx";
import { useCourses } from "../hooks/useCourses.jsx";
import { useNavigate } from "react-router";
import { NavigationPaths } from "../navigation/NavigationPaths.jsx";

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
    <section className="py-8 px-12 overflow-y-hidden ">
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
    <>
      {loading && !courses && !error && (
        <div className="flex flex-1 justify-center items-center">
          <Spinner />
        </div>
      )}
      <section className="my-8 course-grid gap-5 justify-between items-start overflow-y-auto ">
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
    </>
  );
}

function CourseCard({ code, name, credits, ngroups }) {
  return (
    <div
      className="bg-white  gap-2 rounded-xl shadow-sm shadow-stone-100 
     border-2 border-stone-300 px-4 py-4 flex flex-col "
    >
      <span className="text-stone-600">{code}</span>
      <span className="text-lg text-black">{name}</span>
      <span className="text-stone-600 text-sm">{ngroups} grupos</span>
      <div className="flex justify-between">
        <span className="bg-blue-100 w-fit px-1.5 py-0.5 rounded-lg text-blue-800">
          {credits} créditos
        </span>
        <Button
          className={
            "w-fit h-fit border border-stone-300 rounded-xl text-stone-900"
          }
        >
          Ver grupos
        </Button>
      </div>
    </div>
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

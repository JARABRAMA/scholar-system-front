import { SideBar } from "../components/SideBar";

export function CoursesScreen() {
  return (
    <main className="grid grid-cols-[auto_1fr] ">
      <SideBar />
      <Content />
    </main>
  );
}

function Content() {
  return (
    <section className="p-8 overflow-y-auto ">
      <h1 className="text-2xl font-bold">Gestionar Cursos</h1>
      <p className="text-stone-600">Oferta académica del semestre</p>
      <SearchBar />
      <CoursesGird />
    </section>
  );
}

function CoursesGird() {
  return (
    <section className="my-8 course-grid gap-5 justify-between items-start ">
      <CourseCard
        code="CS101"
        name="Introducción a la Programación"
        credits={3}
      />
      <CourseCard
        code="CS101"
        name="Introducción a la Programación"
        credits={3}
      />
      <CourseCard
        code="CS101"
        name="Introducción a la Programación"
        credits={3}
      />
    </section>
  );
}

function CourseCard({ code, name, credits }) {
  return (
    <div className="bg-stone-100 rounded-md shadow-sm shadow-stone-300 border-2 border-stone-300 px-2.5 py-2">
      <span>{code}</span>
      <p>{name}</p>
      <p>{credits} créditos</p>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="flex border-stone-300 border-2 py-2 px-2.5 gap-2.5 rounded-md ">
      <svg className="size-6 text-stone-600">
        <use href="/sprite.svg#search"></use>
      </svg>
      <input
        type="text"
        placeholder="Buscar cursos..."
        className="bg-transparent border-none focus:outline-none"
      />
    </div>
  );
}

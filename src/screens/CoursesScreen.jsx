import { SideBar } from "../components/SideBar";
import { Button } from "../components/Button";

export function CoursesScreen() {
  return (
    <main className="grid grid-cols-[auto_1fr] bg-stone-100">
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
        ngroups={4}
        credits={3}
      />
      <CourseCard
        code="CS101"
        name="Introducción a la Programación"
        ngroups={3}
        credits={3}
      />
      <CourseCard
        code="CS101"
        name="Introducción a la Programación"
        ngroups={2}
        credits={3}
      />
    </section>
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

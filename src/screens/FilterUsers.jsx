import { SideBar } from "../components/SideBar.jsx";
import { Button } from "../components/Button.jsx";
import { RoleSelect } from "../components/RoleSelect.jsx";
import { CitySelect } from "../components/CitySelect.jsx";

export function FilterUsers() {
  return (
    <main className="grid grid-cols-[auto_1fr] bg-stone-100">
      <SideBar />
      <Content />
    </main>
  );
}

function StatisticCard({ title, value }) {
  return (
    <article
      className="flex flex-col items-center justify-center shadow-sm shadow-stone-300/80
    bg-white rounded-md border border-stone-300 px-5 py-3 gap-3"
    >
      <p className="text-stone-400 whitespace-no-wrap text-sm">{title}</p>
      <h3 className="text-2xl text-black font-mono font-bold">{value}</h3>
    </article>
  );
}

function SearchBar() {
  return (
    <div className="grid grid-cols-[2fr_1fr_1fr]  gap-x-4 items-center">
      <div className="flex gap-2 bg-white shadow-md shadow-stone-200 border border-stone-300 px-1.5 rounded-md items-center py-2">
        <svg className="size-6">
          <use href="/sprite.svg#search"></use>
        </svg>
        <input
          type="text"
          placeholder="Buscar usuario por nombre completo"
          className="border-none focus:outline-none bg-transparent text-md flex flex-1"
        ></input>
      </div>
      <RoleSelect className="bg-white border border-stone-300 rounded-2xl ring-0 outline-0 shadow-md shadow-stone-200 py-2.5" />
      <CitySelect
        className="bg-white border border-stone-300 rounded-2xl ring-0 outline-0 shadow-md shadow-stone-200 py-2.5"
        py-2
      />
    </div>
  );
}

function Content() {
  return (
    <section className="m-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-4xl">Gestionar Usuarios</h2>
          <span className="text-stone-400">
            Administra estudiantes, docentes y administradores.
          </span>
        </div>
        <Button className="bg-blue-600 text-white flex items-center px-3 gap-2 hover:outline-0">
          <svg className="size-8 p-0 m-0">
            <use href="/sprite.svg#plus"> </use>
          </svg>
          Añadir usuario
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-4 my-2">
        <StatisticCard title={"TOTAL USUARIOS"} value={124} />
        <StatisticCard title={"ESTUDIANTES"} value={80} />
        <StatisticCard title={"DOCENTES"} value={30} />
        <StatisticCard title={"ADMINISTRADORES"} value={14} />
      </div>

      <SearchBar />
    </section>
  );
}

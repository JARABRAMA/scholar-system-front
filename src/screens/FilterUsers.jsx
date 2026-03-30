import { SideBar } from "../components/SideBar.jsx";
import { Button } from "../components/Button.jsx";

export function FilterUsers() {
  return (
    <main className="grid grid-cols-[auto_1fr]">
      <SideBar />
      <Content />
    </main>
  );
}

function Content() {
  return (
    <section>
      <div>
        <h2>Gestionar Usuarios</h2>
        <span>Administra estudiantes, docentes y administradores.</span>
        <Button className="bg-blue-600 text-white flex items-center px-3 gap-2">
          <svg className="size-8 p-0 m-0">
            <use href="/sprite.svg#plus"> </use>
          </svg>
          Añadir usuario
        </Button>
      </div>
    </section>
  );
}

import { Link } from "react-router";

export function SideBar() {
  return (
    <aside
      className="flex flex-col gap-3 bg-stone-200
    py-6 px-3 shadow-sm shadow-stone-100"
    >
      <SideNav selected={true}>Gestionar Usuarios</SideNav>
      <SideNav>Gestionar Cursos</SideNav>
      <SideNav>Perfil</SideNav>
    </aside>
  );
}

function SideNav({ selected, children }) {
  const classSelected =
    "rounded-lg bg-white shadow-sm items-center text-black justify-start  text-sm";
  return (
    <Link
      className={
        selected
          ? `flex gap-3 py-2 px-4 ${classSelected}`
          : "flex gap-3 py-2 px-4 items-center text-stone-500"
      }
    >
      <div
        className={
          selected
            ? "bg-blue-500 rounded-full size-2"
            : "bg-stone-500 rounded-full size-2"
        }
      />
      {children}
    </Link>
  );
}

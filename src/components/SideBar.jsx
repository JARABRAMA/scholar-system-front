import { Link } from "react-router";
import { useLoginStore } from "../store/LoginStore";

export function SideBar() {
  return (
    <aside
      className="flex flex-col gap-3 bg-stone-200
    py-6 px-3 shadow-sm shadow-stone-100 flex-1"
    >
      <SideNav selected={true}>Gestionar Usuarios</SideNav>
      <SideNav>Gestionar Cursos</SideNav>
      <ProfileLink />
    </aside>
  );
}

function ProfileLink() {
  const userId = useLoginStore((state) => state.id);
  return <Link to={`/profile/${userId}`}>Perfil</Link>;
}

function SideNav({ selected, children, className }) {
  const classSelected =
    "rounded-lg bg-white shadow-sm items-center text-black justify-start  text-sm";
  return (
    <Link
      className={
        selected
          ? `flex gap-3 py-2 px-4 ${classSelected} ${className}`
          : `flex gap-3 py-2 px-4 items-center text-stone-500 ${className}`
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

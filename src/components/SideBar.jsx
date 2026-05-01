import { Link, useLocation } from "react-router";
import { useLoginStore } from "../store/LoginStore";

export function SideBar() {
  const location = useLocation();
  return (
    <aside
      className="flex flex-col gap-3 bg-stone-200
    py-6 px-3 shadow-sm shadow-stone-100 flex-1"
    >
      <SideNav selected={location.pathname.startsWith("/users")} path="/users">
        Gestionar Usuarios
      </SideNav>
      <SideNav
        selected={location.pathname.startsWith("/courses")}
        path="/courses"
      >
        Gestionar Cursos
      </SideNav>
      <div className="flex-1" />
      <ProfileLink />
    </aside>
  );
}

function ProfileLink() {
  const userId = useLoginStore((state) => state.id);
  const location = useLocation();
  const selected = location.pathname.startsWith("/profile");
  return (
    <Link
      className={
        selected
          ? "flex justify-self-end gap-3 py-2 px-4 bg-stone-50 shadow-sm rounded-xl"
          : "flex justify-self-end gap-3 py-2 px-4"
      }
      to={`/profile/${userId}`}
    >
      <svg className="size-5">
        <use href="/sprite.svg#user" />
      </svg>
      Perfil
    </Link>
  );
}

function SideNav({ selected, children, className, path = "" }) {
  const classSelected =
    "rounded-lg bg-white shadow-sm items-center text-black justify-start  text-sm";
  return (
    <Link
      to={path}
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

import { Link, useLocation } from "react-router";
import { useLoginStore } from "../store/LoginStore.jsx";
import { useSideBar } from "../hooks/useSideBar.jsx";

export function SideBar() {
  const { location, isAdministrator } = useSideBar();
  return (
    <aside
      className="flex flex-col gap-3 bg-stone-200
    py-6 px-3 shadow-sm shadow-stone-100 flex-1"
    >
      {isAdministrator() && (
        <SideNav
          selected={location.pathname.startsWith("/users")}
          path="/users"
        >
          <div className="flex gap-1 items-center ">
            <svg className="size-5">
              <use href="/sprite.svg#users" />
            </svg>
            Usuarios
          </div>
        </SideNav>
      )}
      <SideNav
        selected={
          location.pathname.startsWith("/courses") ||
          location.pathname.startsWith("/group")
        }
        path="/courses"
      >
        <div className="flex gap-1 items-center ">
          <svg className="size-5">
            <use href="/sprite.svg#book" />
          </svg>
          Cursos
        </div>
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
  const classSelected =
    "rounded-xl box-border hover:scale-105 bg-white duration-100 hover:border shadow-sm items-center text-black justify-start";

  return (
    <Link
      className={
        selected
          ? `flex gap-3 py-2 box-border px-4 ${classSelected} `
          : `flex gap-3 py-2 px-4 box-border duration-100 hover:bg-stone-300 hover:border rounded-xl hover:text-stone-800 hover:scale-105 items-center text-stone-500`
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
    "rounded-xl box-border hover:scale-105 bg-white duration-100 hover:border shadow-sm items-center text-black justify-start";
  return (
    <Link
      to={path}
      className={
        selected
          ? `flex gap-3 py-2 box-border px-4 ${classSelected} ${className}`
          : `flex gap-3 py-2 px-4 box-border duration-100 hover:bg-stone-300 hover:border rounded-xl hover:text-stone-800 hover:scale-105 items-center text-stone-500 ${className}`
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

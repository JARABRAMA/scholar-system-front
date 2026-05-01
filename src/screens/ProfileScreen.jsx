import { useNavigate } from "react-router";
import { SideBar } from "../components/SideBar";
import { Spinner } from "../components/Spinner";
import { RolePill } from "../components/RolePill.jsx";
import { Button } from "../components/Button.jsx";
import { useFetchUser } from "../hooks/useFetchUser.jsx";

export function ProfileScreen() {
  const { user, error, loading } = useFetchUser();
  return (
    <main className="grid grid-cols-[auto_1fr]">
      <SideBar />
      <Content user={user} />
    </main>
  );
}

function Content({ user, loading, error }) {
  const navigate = useNavigate();
  const onEdit = () => navigate(`/users/edit/${user.id}`);
  return (
    <>
      {!user && loading && (
        <div>
          <Spinner />
        </div>
      )}
      {user && (
        <section className="flex flex-col flex-1 bg-stone-100">
          <div className="flex flex-col rounded-xl border border-stone-300 bg-white p-8 gap-8 m-8">
            <div className="flex w-full h-fit gap-8 border-b border-stone-300 pt-4 pb-8 items-center">
              <ProfileIcon fullName={user.fullName} />
              <div className="flex flex-col gap-1 align-center justify-center">
                <span className="text-2xl">{user.fullName}</span>
                <span className="text-md text-stone-500">{user.email}</span>
                <RolePill
                  role={user.role}
                  className="text-sm bg-blue-100 text-blue-800"
                />
              </div>

              <div className="flex flex-col gap-4 px-4">
                <Button
                  className={
                    "flex bg-red-200 border border-red-500 text-red-500 gap-1"
                  }
                >
                  <svg className="size-5 text-red-500">
                    <use href="./sprite.svg#edit" />
                  </svg>
                  Eliminar
                </Button>
                <Button
                  onClick={onEdit}
                  className={"flex border-black border text-black gap-1"}
                >
                  <svg className="size-5">
                    <use href="./sprite.svg#bin" />
                  </svg>
                  Editar
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 justify-between">
              <UserField title="ID DE USARIO" value={user.id} />
              <UserField title="ROL" value={user.role} />
              <UserField title="FECHA DE NACIMIENTO" value={user.birthDate} />
              <UserField title="CIUDAD" value={user.municipality} />
              <UserField title="EMAIL" value={user.email} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function UserField({ title, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-stone-500">{title}</span>
      <span className="text-stone-900">{value}</span>
    </div>
  );
}

function ProfileIcon({ fullName }) {
  const getInitials = (str) =>
    str
      ?.split(" ")
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "";

  return (
    <div
      className="rounded-full bg-linear-to-r from-cyan-500 to-blue-800
   text-white text-2xl size-16 flex items-center justify-center-safe"
    >
      {getInitials(fullName)}
    </div>
  );
}

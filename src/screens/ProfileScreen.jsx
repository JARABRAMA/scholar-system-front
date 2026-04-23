import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useLoginStore } from "../store/LoginStore";
import { SideBar } from "../components/SideBar";
import { Spinner } from "../components/Spinner";
import { RolePill } from "../components/RolePill.jsx";
import { Button } from "../components/Button.jsx";

function useProfile() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { id: userId } = useParams();
  const accessToken = useLoginStore((state) => state.accessToken);
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  // fetch user from api
  useEffect(() => {
    if (!accessToken || !userId) return;

    const fetchUser = async () => {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setUser(data);
      } else {
        setError(data);
      }
      setLoading(false);
    };
    fetchUser();
  }, [userId, accessToken]);

  return {
    user,
    error,
    loading,
  };
}

export function ProfileScreen() {
  const { user, error, loading } = useProfile();
  return (
    <main className="grid grid-cols-[auto_1fr]">
      <SideBar />
      <Content user={user} />
    </main>
  );
}

function Content({ user, loading, error }) {
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
              <ProfileIcon />
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
                <Button className={"flex border-black border text-black gap-1"}>
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

function ProfileIcon() {
  const fullname = useLoginStore((state) => state.fullname);
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
      {getInitials(fullname)}
    </div>
  );
}

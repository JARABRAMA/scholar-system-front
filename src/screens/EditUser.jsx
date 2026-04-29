import { SideBar } from "../components/SideBar.jsx";
import { Input } from "../components/Input.jsx";
import { useFetchUser } from "../hooks/UseFetchUser.jsx";
import { Spinner } from "../components/Spinner.jsx";
import { useFetchCities } from "../hooks/UseFetchCities.jsx";
import { CitySelect } from "../components/CitySelect.jsx";
import { Button } from "../components/Button.jsx";
import { useLoginStore } from "../store/LoginStore.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { NavigationPaths } from "../navigation/NavigationPaths.jsx";
import { useRef } from "react";

export function useEditUser() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const accesToken = useLoginStore((state) => state.accessToken);
  const [updatingLoading, setUpdateLoading] = useState(false);
  const [updatingError, setUpdateError] = useState();
  const { user, loading: userLoading, error } = useFetchUser();
  const navigate = useNavigate();

  const {
    departments,
    municipalities,
    onChoseDepartment,
    loading: citiesLoading,
    chosenDepartment,
  } = useFetchCities();

  const onSubmitForm = async (event) => {
    setUpdateLoading(true);
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.target).entries());

    const updatePayload = {
      fullName: formData.fullName || user.fullName,
      email: formData.email || user.email,
      birthDate: formData.birthDate || user.birthDate,
      department: formData.department || user.department,
      municipality: formData.municipality || user.municipality,
    };

    const response = await fetch(`${BASE_URL}/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesToken}`,
      },
      body: JSON.stringify(updatePayload),
    });

    const dataResponse = await response.json();

    if (response.ok) {
      navigate(NavigationPaths.USERS);
    } else {
      setUpdateError(dataResponse);
      setUpdateLoading(false);
    }
  };

  return {
    user,
    error,
    departments,
    municipalities,
    onChoseDepartment,
    loading: userLoading || citiesLoading,
    chosenDepartment,
    onSubmitForm,
    updatingError,
    updatingLoading,
    onDissmissError: () => setUpdateError(undefined),
  };
}

export function EditUser() {
  return (
    <main className="grid grid-cols-[auto_1fr]">
      <SideBar />
      <Content />
    </main>
  );
}

function ErrorMessage({ title, description, onDissmiss }) {
  return (
    <>
      <span>{title}</span>
      <span>{description}</span>
      {onDissmiss && <Button onClick={onDissmiss}>Reintentar</Button>}
    </>
  );
}

function Content() {
  const {
    user,
    error,
    departments,
    municipalities,
    onChoseDepartment,
    loading,
    chosenDepartment,
    onSubmitForm,
    updatingError,
    updatingLoading,
    onDissmissError,
  } = useEditUser();
  const dialogRef = useRef();

  useEffect(() => {
    if (error) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [error, dialogRef]);

  return (
    <>
      <dialog ref={dialogRef}>
        {updatingError && (
          <ErrorMessage
            title={updatingError.title}
            description={updatingError.detail}
          />
        )}
      </dialog>
      {error && (
        <div className="flex flex-1 bg-stone-100 items-center justify-center">
          <ErrorMessage title={error.title} description={error.detail} />
        </div>
      )}
      {loading && (
        <div className="flex flex-1 bg-stone-100 items-center justify-center">
          <Spinner />
        </div>
      )}
      {user && !loading && !error && (
        <section className=" flex flex-1 bg-stone-100">
          <div className="m-8">
            <div className="flex flex-col pb-8">
              <span className="text-3xl">Editar Usuario</span>
              <span className="text-stone-600">
                Solo se pueden modificar: nombre, email, fecha de nacimiento y
                ciudad
              </span>
            </div>
            <article className="flex flex-col bg-white border border-stone-300 rounded-xl p-8">
              <form className="pb-8 " onSubmit={(e) => onSubmitForm(e)}>
                <section className="grid grid-cols-2 gap-x-8 border-b-2 border-stone-300 pb-8">
                  <Input name="fullName" placeholder={user.fullName}>
                    Nombre Completo
                  </Input>
                  <Input name="email" type="email" placeholder={user.email}>
                    Correo Electronico
                  </Input>
                  <Input
                    name="birthDate"
                    placeholder={user.birthDate}
                    type="date"
                  >
                    Fecha de nacimiento
                  </Input>
                  <CitySelect
                    name="department"
                    label="Departamento de residencia"
                    values={departments}
                    onSelect={onChoseDepartment}
                  />
                  <CitySelect
                    disabled={!chosenDepartment || chosenDepartment === ""}
                    name="municipality"
                    label="Municipio de residencia"
                    values={municipalities}
                  />
                </section>
                {updatingLoading && (
                  <div className="flex my-8 items-center justify-center">
                    <Spinner />
                  </div>
                )}
                <div className="flex justify-end gap-8 mt-8">
                  <Button className="border">Cancelar</Button>
                  <Button type="submit" className="bg-blue-600 text-white">
                    Guardar cambios
                  </Button>
                </div>
              </form>
            </article>
          </div>
        </section>
      )}
    </>
  );
}

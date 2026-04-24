import { SideBar } from "../components/SideBar.jsx";
import { Input } from "../components/Input.jsx";
import { useFetchUser } from "../hooks/UseFetchUser.jsx";
import { Spinner } from "../components/Spinner.jsx";
import { useFetchCities } from "../hooks/UseFetchCities.jsx";
import { CitySelect } from "../components/CitySelect.jsx";
import { Button } from "../components/Button.jsx";

export function useEditUser() {
  const { user, loading: userLoading, error } = useFetchUser();
  const {
    departments,
    municipalities,
    onChoseDepartment,
    loading: citiesLoading,
    chosenDepartment,
  } = useFetchCities();

  return {
    user,
    error,
    departments,
    municipalities,
    onChoseDepartment,
    loading: userLoading || citiesLoading,
    chosenDepartment,
  };
}

export function EditUser() {
  const {
    user,
    error,
    departments,
    municipalities,
    onChoseDepartment,
    loading,
    chosenDepartment,
  } = useEditUser();
  return (
    <main className="grid grid-cols-[auto_1fr]">
      <SideBar />
      <Content
        user={user}
        loading={loading}
        error={error}
        departments={departments}
        municipalities={municipalities}
        onChoseDepartment={onChoseDepartment}
        chosenDepartment={chosenDepartment}
      />
    </main>
  );
}

function Content({
  user,
  loading,
  error,
  departments,
  municipalities,
  onChoseDepartment,
  chosenDepartment,
}) {
  return (
    <>
      {loading && (
        <div className="flex flex-1 bg-stone-100 items-center justify-center">
          <Spinner />{" "}
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
              <form
                className="grid grid-cols-2 gap-x-8 border-b-2 pb-8 border-stone-300"
                onSubmit={(e) => e.preventDefault()}
              >
                <Input required={true} placeholder={user.fullName}>
                  Nombre Completo
                </Input>
                <Input required={true} placeholder={user.email}>
                  Correo Electronico
                </Input>
                <Input required={true} placeholder={user.birthDate} type="date">
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
              </form>

              <div className="flex justify-end gap-8 mt-8">
                <Button className="border">Cancelar</Button>
                <Button className="bg-blue-600 text-white">
                  Guardar cambios
                </Button>
              </div>
            </article>
          </div>
        </section>
      )}
    </>
  );
}

import { SideBar } from "../components/SideBar";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { RoleSelect } from "../components/RoleSelect.jsx";
import { CitySelect } from "../components/CitySelect.jsx";
import { useEffect, useState } from "react";
import { useLoginStore } from "../store/LoginStore.jsx";
import { useNavigate } from "react-router";
import { NavigationPaths } from "../navigation/NavigationPaths.jsx";

function useNewUser() {
  const [loading, setLoading] = useState(true);
  const [chosenDepartment, setChosenDepartment] = useState();
  const [departments, setDepartments] = useState();
  const [municipalities, setMunicipalities] = useState();
  const [Error, setError] = useState();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const accessToken = useLoginStore((state) => state.accessToken);
  const navigate = useNavigate();

  // load departments.
  useEffect(() => {
    setLoading(true);
    const fetchDepartments = async () => {
      const res = await fetch(`${baseUrl}/city/departments`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (res.ok) {
        setDepartments(data);
      }
      setLoading(false);
    };
    fetchDepartments();
  }, [baseUrl, accessToken]);

  // load municipalities
  useEffect(() => {
    const fetchMunicipalities = async () => {
      const res = await fetch(
        `${baseUrl}/city/municipalities/${chosenDepartment}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        },
      );
      const data = await res.json();
      console.log("municipios: ", data);
      if (res.ok) {
        setMunicipalities(data);
      }
    };
    if (!chosenDepartment || chosenDepartment == "") {
      setMunicipalities(undefined);
    } else {
      fetchMunicipalities();
    }
  }, [chosenDepartment, baseUrl, accessToken]);

  const onSubmitForm = async (event) => {
    event.preventDefault();
    setLoading(true);
    const newUser = Object.fromEntries(new FormData(event.target).entries());
    console.log(newUser);
    const res = await fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(newUser),
    });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      navigate(NavigationPaths.USERS);
    } else {
      setError(data.detail);
    }
    setLoading(false);
  };
  const onChoseDepartment = (dept) => {
    console.log("change departament: ", dept);
    setChosenDepartment(dept);
  };

  return {
    departments,
    municipalities,
    onChoseDepartment,
    loading,
    onSubmitForm,
    chosenDepartment,
  };
}

export function NewUser() {
  const {
    departments,
    municipalities,
    onChoseDepartment,
    loading,
    onSubmitForm,
    chosenDepartment,
  } = useNewUser();
  return (
    <main className="grid grid-cols-[auto_1fr]">
      <SideBar />
      <Content
        departments={departments}
        municipalities={municipalities}
        setChosenDepartment={onChoseDepartment}
        chosenDepartment={chosenDepartment}
        onSubmitForm={onSubmitForm}
      />
    </main>
  );
}

function Content({
  departments,
  municipalities,
  setChosenDepartment,
  chosenDepartment,
  onSubmitForm,
}) {
  return (
    <section className="flex flex-col p-5 bg-stone-100 ">
      <h2 className="text-2xl">Añadir nuevo usuario</h2>
      <p className="text-md text-stone-500">
        Completa el formulario para registrar un nuevo usuario a la plataforma
      </p>

      <NewUserForm
        departments={departments}
        municipalities={municipalities}
        setChosenDepartment={setChosenDepartment}
        chosenDepartment={chosenDepartment}
        onSubmitForm={onSubmitForm}
      />
    </section>
  );
}

function NewUserForm({
  departments,
  municipalities,
  setChosenDepartment,
  chosenDepartment,
  onSubmitForm,
}) {
  return (
    <form
      className=" bg-white p-6 rounded-xl my-5 
    max-w-4xl shadow-sm shadow-stone-300 flex flex-col gap-4"
      onSubmit={onSubmitForm}
    >
      <div
        className="grid grid-cols-2 gap-y-4 
    gap-x-4"
      >
        <Input
          name="fullName"
          children="Nombre completo"
          required={true}
          placeholder="e.g. Pepito Juarez Campuzano"
          desciption="Mínimo 2 palabras, máximo 4. Sin caracteres especiales."
        />
        <Input
          name="email"
          children="Correo electronico"
          required={true}
          placeholder="e.g pepito.juarez@gmail.com"
          desciption="Debe terminar en @gmail.com"
        />
        <Input
          name="birthDate"
          children="Fecha de nacimiento"
          required={true}
          type="date"
        />
        <RoleSelect label={true} name="roleName" />
        <CitySelect
          name="department"
          label="Departamento de residencia"
          values={departments}
          onSelect={setChosenDepartment}
        />
        <CitySelect
          disabled={!chosenDepartment || chosenDepartment === ""}
          name="municipality"
          label="Municipio de residencia"
          values={municipalities}
        />
        <Input
          name="password"
          children="Contraseña"
          required={true}
          placeholder="************"
          desciption="Min. 8 caracteres, una mayúscula y un número o carácter especial."
        />
      </div>
      <Button className="bg-blue-600 text-white self-end">Crear Usuario</Button>
    </form>
  );
}

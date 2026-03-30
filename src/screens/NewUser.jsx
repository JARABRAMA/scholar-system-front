import { SideBar } from "../components/SideBar";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { RoleSelect } from "../components/RoleSelect.jsx";
import { CitySelect } from "../components/CitySelect.jsx";

export function NewUser() {
  return (
    <main className="grid grid-cols-[auto_1fr]">
      <SideBar />
      <Content />
    </main>
  );
}

function Content() {
  return (
    <section className="flex flex-col p-5 bg-stone-100 ">
      <h2 className="text-2xl">Añadir nuevo usuario</h2>
      <p className="text-md text-stone-500">
        Completa el formulario para registrar un nuevo usuario a la plataforma
      </p>

      <NewUserForm />
    </section>
  );
}

function NewUserForm() {
  return (
    <form
      className=" bg-white p-6 rounded-xl my-5 
    max-w-4xl shadow-sm shadow-stone-300 flex flex-col gap-4"
    >
      <div
        className="grid grid-cols-2 gap-y-4 
    gap-x-4"
      >
        <Input
          name="name"
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
        <RoleSelect label={true} />
        <CitySelect label={true} />
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

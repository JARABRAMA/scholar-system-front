import { SideBar } from "../components/SideBar";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

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

function RoleSelect() {
  return (
    <div className="flex flex-col  ">
      <label>
        Rol <span className="text-red-500">*</span>
      </label>
      <select className="border rounded-md h-fit p-1.5">
        <option value="">Seleccionar rol</option>
        <option value="ESTUDIANTE">ESTUDIANTE</option>
        <option value="PROFESOR">PROFESOR</option>
        <option value="ADMINISTRADOR">ADMINSTRADOR</option>
      </select>
    </div>
  );
}

function CitySelect() {
  return (
    <div className="flex flex-col">
      <label>
        Ciudad de residencia <span className="text-red-500">*</span>
      </label>
      <select name="city" className="border rounded-md h-fit p-1.5">
        <option value="">Seleccionar ciudad</option>
        <option value="Mediellin">Medellin</option>
        <option value="">Bogota</option>
        <option value="">Cali</option>
        <option value="">Carepa</option>
        <option value="">Chigorodo</option>
      </select>
    </div>
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
        <RoleSelect />
        <CitySelect />
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

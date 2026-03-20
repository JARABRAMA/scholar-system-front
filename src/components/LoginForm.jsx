import { Button } from "./Button";
import { Link } from "react-router";

export function LoginForm() {
  return (
    <article className="bg-gray-200 w-md rounded-2xl px-5  py-4 flex flex-col gap-3">
      <div>
        <h2 className="text-3xl font-bold m-0 p-0">Bienvenido de Vuelta</h2>
        <small className="text-sm text-gray-500">
          Ingresa tus credenciales para continuar
        </small>
      </div>

      <form className="flex flex-col gap-4">
        <Input
          name="email"
          placeholder="user@gmail.com"
          type="email"
          required={true}
        >
          Correo Electronico
        </Input>

        <Input
          name="password"
          placeholder="******"
          type="password"
          required={true}
        >
          Contraseña
        </Input>
        <Button className="bg-blue-700 text-gray-100 hover:bg-blue-600 border-0 hover:outline-0">
          Iniciar Sesión
        </Button>

        <Link className="self-center text-blue-700 hover:underline">
          ¿Olvidaste tu contraseña?
        </Link>
      </form>
    </article>
  );
}

function Input({ children, placeholder, type, name, required }) {
  return (
    <div className="flex flex-col">
      <div>
        <label>{children}</label>
        {required && <span className="text-red-500 "> *</span>}
      </div>
      <input
        className="border rounded-md py-1 px-2"
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
}

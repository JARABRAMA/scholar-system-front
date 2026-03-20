import { Button } from "./Button";

export function TobBar() {
  return (
    <header className="bg-gray-950 py-4 px-2 flex justify-between flex-1">
      <h1 className="font-bold text-4xl text-gray-100 flex flex-row items-center gap-3">
        <svg className="size-10 bg-blue-700 text-gray-100 py-1 px-2 rounded-md">
          <use href="./sprite.svg#academic" />
        </svg>
        Scholar System
      </h1>

      <nav className="flex gap-2 text-gray-100 items-center">
        <RolePill />
        <SingOutButton />
      </nav>
    </header>
  );
}

function SingOutButton() {
  return (
    <Button className="bg-red-900/40 border text-red-500 rounded-lg px-4">
      Cerrar Sesión
    </Button>
  );
}

function RolePill() {
  return (
    <div
      className="bg-gray-900/50 flex items-center jstify-center align-center
      px-3 py-1 rounded-full border text-gray-600 w-fit h-fit"
    >
      <span className="p-0 m-0 w-fit">ADMIN</span>
    </div>
  );
}

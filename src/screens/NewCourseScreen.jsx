import { SideBar } from "../components/SideBar.jsx";
import { Input } from "../components/Input.jsx";
import { Button } from "../components/Button.jsx";
import { useLoginStore } from "../store/LoginStore";
import { useNavigate } from "react-router";
import { NavigationPaths } from "../navigation/NavigationPaths.jsx";
import { useState } from "react";
import { Dialog } from "../components/Dialog.jsx";
import { Spinner } from "../components/Spinner";

export function NewCourse() {
  return (
    <main className="grid grid-cols-[auto_1fr] bg-stone-100 overflow-y-hidden">
      <SideBar />
      <Content />
    </main>
  );
}

function Content() {
  return (
    <section className="py-8 px-12 overflow-y-hidden flex flex-col gap-8 ">
      <header>
        <h1 className="text-4xl">Crear nuevo curso </h1>
        <span className="text-stone-400">
          Los nombres y el codigo del curso deben de ser unicos en el sistema
        </span>
      </header>
      <NewCourseForm />
    </section>
  );
}

function useNewCourse() {
  const courseService = import.meta.env.VITE_COUSES_URL;
  const accessToken = useLoginStore((state) => state.accessToken);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const onSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const requestData = Object.fromEntries(formData.entries());

    const res = await fetch(`${courseService}/api/courses`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    const resData = await res.json();

    if (res.ok) {
      navigate(NavigationPaths.COURSES);
    } else {
      setError(resData);
    }

    setLoading(false);
  };

  const onDismissError = () => setError(undefined);

  return { onSubmitForm, loading, error, onDismissError };
}

function NewCourseForm() {
  const { onSubmitForm, loading, error, onDismissError } = useNewCourse();
  return (
    <>
      {loading && (
        <Dialog open={loading}>
          <Spinner />
        </Dialog>
      )}

      {!loading && error && (
        <Dialog open={error}>
          <div className="flex flex-col p-4 justify-between items-center gap-2">
            <svg className="size-18 text-red-500">
              <use href="/sprite.svg#error" />
            </svg>
            <h3 className="text-2xl self-center text-center">{error.title}</h3>
            <span>{error.detail}</span>
            <Button
              className="bg-blue-600 text-white flex items-center px-3 gap-2 hover:outline-0 self-end"
              onClick={onDismissError}
            >
              Reintentar
            </Button>
          </div>
        </Dialog>
      )}
      <form
        onSubmit={onSubmitForm}
        className="grid grid-cols-2 gap-4 w-full bg-white rounded-xl border border-stone-300 shadow-sm px-8 py-6 max-w-3xl"
      >
        <div className="col-span-2">
          <Input
            name="name"
            placeholder="Ej. Geometria euclidiana"
            required={true}
          >
            Nombre del curso
          </Input>
        </div>

        <Input name="credits" type="number" placeholder="Ej. 3" required={true}>
          Creditos del curso
        </Input>
        <Input name="code" type="number" placeholder="Ej. 405" required={true}>
          Codigo del curso
        </Input>

        <div className="col-span-2 flex justify-end gap-4 border-t border-stone-300 pt-8">
          <Button className="items-center px-3 gap-2 border-2 border-stone-600 text-stone-800">
            Cancelar
          </Button>
          <Button
            className="bg-blue-600 text-white flex items-center px-3 gap-2 hover:outline-0"
            type="submit"
          >
            Guardar Curso
          </Button>
        </div>
      </form>
    </>
  );
}

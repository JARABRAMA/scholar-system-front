import { useRef } from "react";
import { useEffect } from "react";
import { Button } from "./Button";
import { ErrorContainer } from "./ErrorContainer";

export function ErrorDialog({ error, onDissmissError }) {
  const dialogRef = useRef();
  useEffect(() => {
    if (error) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [error, dialogRef]);
  return (
    <dialog
      ref={dialogRef}
      className="rounded-2xl self-center justify-self-center"
    >
      <div className="flex flex-col gap-2 m-4">
        <ErrorContainer error={error} />
        <Button
          className="w-fit self-end bg-blue-500 text-white hover:bg-blue-600"
          onClick={onDissmissError}
        >
          Volver a intentar
        </Button>
      </div>
    </dialog>
  );
}

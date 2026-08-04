import { Spinner } from "./Spinner";
import { useRef, useEffect } from "react";

export function LoadingDialog({ loading }) {
  const ref = useRef();
  useEffect(() => {
    if (loading) {
      ref.current.showModal();
    } else {
      ref.current.close();
    }
  }, [loading, ref]);
  return (
    <dialog className="self-center justify-self-center rounded-xl" ref={ref}>
      <div className="flex items-center justify-center p-8">
        <Spinner />
      </div>
    </dialog>
  );
}

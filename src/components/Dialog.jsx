import { useEffect, useRef } from "react";

export function Dialog({ open, className, children }) {
  const dialogRef = useRef();
  // close and open dialog
  useEffect(() => {
    if (open) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [open]);
  return (
    <dialog
      className={`m-auto w-1/3 h-1/3 rounded-xl border-2 border-stone-400 open:flex open:flex-1 ${className}`}
      ref={dialogRef}
    >
      {children}
    </dialog>
  );
}

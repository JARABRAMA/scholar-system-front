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
      className={`rounded-xl border-2 border-stone-400  ${className}`}
      ref={dialogRef}
    >
      {children}
    </dialog>
  );
}

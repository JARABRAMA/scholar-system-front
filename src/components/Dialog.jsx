import { useEffect, useRef } from "react";

export function Dialog({ open, className }) {
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
    <dialog className={className} ref={dialogRef}>
      {children}
    </dialog>
  );
}

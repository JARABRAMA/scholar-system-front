import { useState, useRef, useEffect } from "react";
import { ResetPasswordStatus } from "../../utils/ResetPasswordStatus";

export function useSendCodeForm({ onSetStatus, email }) {
  const [codeSendingError, setCodeSendingError] = useState();
  const [codeSendingLoading, setCodeSendingLoading] = useState(false);
  const authenticationService = import.meta.env.VITE_BASE_URL;
  const dialogRef = useRef();
  useEffect(() => {
    if (!dialogRef.current) return;
    if (codeSendingLoading) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [codeSendingLoading, dialogRef]);

  const onSubmit = async (e) => {
    setCodeSendingLoading(true);
    setCodeSendingError();
    e.preventDefault();
    try {
      const res = await fetch(
        `${authenticationService}/auth/send-code/${email}`,
        { method: "POST" },
      );
      if (res.ok) {
        onSetStatus(ResetPasswordStatus.VERIFY_CODE);
        return;
      }
      const data = await res.json();
      setCodeSendingError(data.detail);
    } catch (e) {
      console.log("Error: ", e);
      setCodeSendingError("Error de conexion, intenta mas tarde");
    } finally {
      setCodeSendingLoading(false);
    }
  };

  return {
    dialogRef,
    onSubmit,
    codeSendingError,
  };
}

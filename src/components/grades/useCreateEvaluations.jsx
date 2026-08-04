import { useState } from "react";
import { useLoginStore } from "../../store/LoginStore";

export function useCreateEvaluation({ groupId }) {
  const [isOpenedCreateEvaluation, setIsOpenedCreateEvaluation] =
    useState(false);
  const openCreateEvaluation = () => setIsOpenedCreateEvaluation(true);
  const closeCreateEvaluation = () => setIsOpenedCreateEvaluation(false);
  const evaluationServiceUrl = import.meta.env.VITE_EVALUATIONS_URL;
  const accessToken = useLoginStore((state) => state.accessToken);
  const [loadingCreateEvaluation, setLoadingCreateEvaluation] = useState(false);
  const [errorCreateEvaluation, setErrorCreateEvaluation] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    percentage: "",
    description: "",
  });

  const onCreateEvaluation = async () => {
    setErrorCreateEvaluation(null);
    setLoadingCreateEvaluation(true);

    const requestBody = { ...formData, groupId };
    try {
      const response = await fetch(`${evaluationServiceUrl}/api/evaluations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      if (!response.ok) {
        setErrorCreateEvaluation(data.detail);
        return false;
      } else {
        setIsOpenedCreateEvaluation(false);
        setErrorCreateEvaluation(null);
        return true;
      }
    } catch (e) {
      console.error("Error: ", e);
      setErrorCreateEvaluation("Error de conexion, intenta mas tarde");
      return false;
    } finally {
      setLoadingCreateEvaluation(false);
    }
  };
  const onUpdateForm = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return {
    isOpenedCreateEvaluation,
    openCreateEvaluation,
    closeCreateEvaluation,
    onCreateEvaluation,
    formData,
    onUpdateForm,
    loadingCreateEvaluation,
    errorCreateEvaluation,
    onDismissCreateEvaluationError: () => setErrorCreateEvaluation(null),
  };
}

import { useState, useEffect } from "react";
import { useLoginStore } from "../../store/LoginStore";

export function useFetchGroupEvaluations({ groupId }) {
  const [evaluations, setEvaluations] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const evaluationsServiceUrl = import.meta.env.VITE_EVALUATIONS_URL;
  const accessToken = useLoginStore((state) => state.accessToken);

  useEffect(() => {
    const fetchGroupGrades = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${evaluationsServiceUrl}/api/evaluations/group/${groupId}`,
          { headers: { Authorization: `Bearer ${accessToken}` } },
        );

        const data = await response.json();
        if (response.ok) {
          setEvaluations(data);
        } else {
          setError(data.detail);
        }
      } catch (e) {
        console.log("Error: ", e);
        setError("Error de conexion, porfavor intenta mas tarde");
      } finally {
        setLoading(false);
      }
    };
    fetchGroupGrades();
  }, [accessToken, evaluationsServiceUrl, groupId]);

  return { evaluations, loading, error };
}

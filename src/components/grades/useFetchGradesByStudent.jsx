import { useEffect } from "react";
import { useState } from "react";
import { useLoginStore } from "../../store/LoginStore";

export function useFetchGradesByStudent({ studentId }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [grades, setGrades] = useState(null);
  const evaluationsServiceUrl = import.meta.env.VITE_EVALUATIONS_URL;
  const accessToken = useLoginStore((state) => state.accessToken);

  useEffect(() => {
    const fetchGradesByStudent = async () => {
      try {
        setError(null);
        setLoading(true);

        const response = await fetch(
          `${evaluationsServiceUrl}/api/grades/student/${studentId}`,
          { headers: { Authorization: `Bearer ${accessToken}` } },
        );
        const data = await response.json();
        if (!response.ok) {
          setError(data.detail);
        } else {
          setGrades(data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchGradesByStudent();
  }, [studentId, accessToken, evaluationsServiceUrl]);

  return { loading, error, grades };
}

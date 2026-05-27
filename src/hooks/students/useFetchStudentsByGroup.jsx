import { useState, useEffect } from "react";
import { useLoginStore } from "../../store/LoginStore";

export function useFetchStudentsByGroup({ groupId }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const courseServiceUrl = import.meta.env.VITE_COUSES_URL;
  const accessToken = useLoginStore((state) => state.accessToken);

  useEffect(() => {
    if (!groupId) return;
    ``;
    const fetchStudentByGroup = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${courseServiceUrl}/api/users/group/${groupId}`,
          { headers: { Authorization: `Bearer ${accessToken}` } },
        );
        const data = await response.json();
        if (response.ok) {
          setStudents(data);
        } else {
          setError(data.detail);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentByGroup();
  }, [accessToken, courseServiceUrl, groupId]);

  return { students, loading, error };
}

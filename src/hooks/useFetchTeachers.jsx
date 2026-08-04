import { useState, useEffect } from "react";
import { useLoginStore } from "../store/LoginStore.jsx";

export function useFetchTeachers() {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [teachers, setTeachers] = useState();
  const courseService = import.meta.env.VITE_COUSES_URL;
  const accessToken = useLoginStore((state) => state.accessToken);

  useEffect(() => {
    setLoading(true);
    const fetchTeachers = async () => {
      setLoading(true);
      const res = await fetch(`${courseService}/api/users/teachers`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setTeachers(data);
      } else {
        setError(data);
      }
      setLoading(false);
    };
    fetchTeachers();
  }, [accessToken, courseService]);

  return {
    loading,
    error,
    teachers,
  };
}

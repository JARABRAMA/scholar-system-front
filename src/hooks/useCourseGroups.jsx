import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useLoginStore } from "../store/LoginStore.jsx";

export function useCourseGroups() {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [groups, setGroups] = useState();
  const courseService = import.meta.env.VITE_COUSES_URL;
  const accessToken = useLoginStore((state) => state.accessToken);

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      const res = await fetch(
        `${courseService}/api/groups/course/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const data = await res.json();
      if (res.ok) {
        setGroups(data);
      } else {
        setError(data);
      }
      setLoading(false);
    };
    fetchGroups();
  }, [accessToken, courseId, courseService]);

  return {
    loading,
    error,
    groups,
  };
}

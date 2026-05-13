import { useParams } from "react-router";
import { useLoginStore } from "../store/LoginStore.jsx";
import { useState, useEffect } from "react";

export function useCourseDetails() {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [course, setCourse] = useState();
  const courseService = import.meta.env.VITE_COUSES_URL;
  const accessToken = useLoginStore((state) => state.accessToken);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      const res = await fetch(`${courseService}/api/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();

      if (res.ok) {
        setCourse(data);
      } else {
        setError(data);
      }
      setLoading(false);
    };
    fetchCourseDetails();
  }, [accessToken, courseId, courseService]);

  return { course, loading, error };
}

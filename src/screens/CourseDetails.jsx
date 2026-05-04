import { useParams } from "react-router";
import { SideBar } from "../components/SideBar.jsx";
import { useEffect, useState } from "react";
import { useLoginStore } from "../store/LoginStore.jsx";

export function CourseDetails() {
  return (
    <main className="grid grid-cols-[auto_1fr] bg-stone-100 overflow-y-hidden">
      <SideBar />
      <Content />
    </main>
  );
}

function useCourseDetails() {
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
  }, [courseId]);

  return { course, loading, error };
}

function Content() {
  return (
    <section className="py-8 px-12 overflow-y-hidden flex flex-col gap-8 ">
      <header>Detalles del curso</header>
    </section>
  );
}

import { useFetchGroupDetails } from "./useFetchGroupDetails.jsx";
import { useFetchTeachers } from "./useFetchTeachers.jsx";
import { useLoginStore } from "../store/LoginStore.jsx";
import { Navigate, useNavigate, useParams } from "react-router";
import { useRef, useState, useEffect } from "react";
import { NavigationPaths } from "../navigation/NavigationPaths.jsx";

export function useGroupDetailsForm() {
  const navigate = useNavigate();
  const { group, loading, error } = useFetchGroupDetails();
  const { teachers } = useFetchTeachers();
  const accessToken = useLoginStore((state) => state.accessToken);
  const { id: groupId } = useParams();
  const scheduleDialogRef = useRef(null);

  const [groupName, setGroupName] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [teacherId, setTeacherId] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [students, setStudents] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [showAddSchedule, setShowAddSchedule] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    day: "LUNES",
    startsTime: "09:00",
    endTime: "10:00",
  });

  const [showAddStudent, setShowAddStudent] = useState(false);

  useEffect(() => {
    if (group) {
      setGroupName(group.groupName);
      setCapacity(group.capacity);
      setTeacherId(group.teacher?.id || "");
      setSchedules(group.schedules || []);
      setStudents(group.students || []);
    }
  }, [group]);

  useEffect(() => {
    if (showAddSchedule) {
      scheduleDialogRef.current?.showModal();
    } else {
      scheduleDialogRef.current?.close();
    }
  }, [showAddSchedule]);

  const handleAddSchedule = () => {
    if (schedules.some((s) => s.day === newSchedule.day)) {
      alert("Ya existe un horario para este día");
      return;
    }
    setSchedules([
      ...schedules,
      {
        id: Date.now(),
        ...newSchedule,
      },
    ]);
    setShowAddSchedule(false);
    setNewSchedule({ day: "LUNES", startsTime: "09:00", endTime: "10:00" });
  };

  const handleRemoveSchedule = (scheduleId) => {
    setSchedules(schedules.filter((s) => s.id !== scheduleId));
  };

  const handleAddStudent = (student) => {
    if (student && !students.some((s) => s.id === student.id)) {
      setStudents([...students, student]);
      setShowAddStudent(false);
    }
  };

  const handleRemoveStudent = (studentId) => {
    setStudents(students.filter((s) => s.id !== studentId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    try {
      const updateRequest = {
        groupName,
        capacity: Number.parseInt(capacity, 10),
        teacherId: teacherId ? Number.parseInt(teacherId, 10) : null,
        schedules: schedules.map((s) => ({
          day: s.day,
          startsTime: s.startsTime,
          endTime: s.endTime,
        })),
        studentsIds: students.map((s) => s.id),
      };

      const courseService = import.meta.env.VITE_COUSES_URL;
      const res = await fetch(`${courseService}/api/groups/${groupId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updateRequest),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al actualizar el grupo");
      }

      setTimeout(() => setSubmitSuccess(false), 3000);
      navigate(`/courses/${group.course.code}`);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    handleSubmit,
    groupName,
    setGroupName,
    capacity,
    setCapacity,
    group,
    teacherId,
    setTeacherId,
    teachers,
    schedules,
    setShowAddSchedule: (value) => setShowAddSchedule(value),
    handleRemoveSchedule,
    handleAddSchedule,
    students,
    setShowAddStudent: (value) => setShowAddStudent(value),
    handleRemoveStudent,
    handleAddStudent,
    submitError,
    submitSuccess,
    submitting,
    showAddSchedule,
    showAddStudent,
    newSchedule,
    setNewSchedule,
  };
}

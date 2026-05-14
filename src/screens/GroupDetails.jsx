import { SideBar } from "../components/SideBar.jsx";
import { useParams } from "react-router";
import { useLoginStore } from "../store/LoginStore";
import { useState, useEffect, useRef } from "react";
import { Spinner } from "../components/Spinner.jsx";
import { Input } from "../components/Input.jsx";
import { ProfileIcon } from "../components/ProfileIcon.jsx";
import { useFetchTeachers } from "../hooks/useFetchTeachers.jsx";
import { Button } from "../components/Button.jsx";
import { captalize } from "../utils/captalize.js";

export function GroupDetails() {
  return (
    <main className="grid grid-cols-[auto_1fr] bg-stone-100 overflow-hidden">
      <SideBar />
      <Content />
    </main>
  );
}

function Content() {
  return (
    <section className="p-8 flex gap-5 flex-1 flex-col overflow-y-auto">
      <h1 className="text-4xl w-max">Detalles del grupo</h1>
      <GroupInfoForm />
    </section>
  );
}

function useGroupDetails() {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const courseSerivice = import.meta.env.VITE_COUSES_URL;
  const accessToken = useLoginStore((state) => state.accessToken);

  useEffect(() => {
    const fetchGroup = async () => {
      setLoading(true);
      const res = await fetch(`${courseSerivice}/api/groups/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Error fetching group details");
        setLoading(false);
        return;
      }
      setGroup(data);
      console.log(data);
      setLoading(false);
    };
    fetchGroup();
  }, [id, accessToken, courseSerivice]);

  return { group, loading, error };
}

function GroupInfoForm() {
  const { group, loading, error } = useGroupDetails();
  const { teachers } = useFetchTeachers();
  const accessToken = useLoginStore((state) => state.accessToken);
  const { id: groupId } = useParams();
  const scheduleDialogRef = useRef(null);

  // Estados para formulario
  const [groupName, setGroupName] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [teacherId, setTeacherId] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [students, setStudents] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Modal para agregar horario
  const [showAddSchedule, setShowAddSchedule] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    day: "MONDAY",
    startsTime: "09:00",
    endTime: "10:00",
  });

  // Modal para agregar estudiante
  const [showAddStudent, setShowAddStudent] = useState(false);

  // Inicializar con datos del grupo
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

  if (loading)
    return (
      <div className="flex flex-1 items-center justify-center min-w-max">
        <Spinner />
      </div>
    );
  if (error) return <p className="text-red-500">{error}</p>;
  if (!group) return <p>Grupo no encontrado</p>;

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
    setNewSchedule({ day: "MONDAY", startsTime: "09:00", endTime: "10:00" });
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
        id: Number.parseInt(groupId, 10),
        groupName,
        capacity: Number.parseInt(capacity, 10),
        teacherId: teacherId ? Number.parseInt(teacherId, 10) : null,
        schedules: schedules.map((s) => ({
          day: s.day,
          startsTime: s.startsTime,
          endTime: s.endTime,
        })),
        courseId: group.courseId,
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

      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 pb-8">
      <article className="bg-stone-200 p-4 rounded-xl shadow-sm shadow-stone-300">
        <span className="font-bold">Información del grupo</span>
        <Input
          name="groupName"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        >
          <span className="text-sm text-stone-800">Nombre del grupo</span>
        </Input>
        <Input
          name="capacity"
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        >
          <span className="text-sm text-stone-800">Cupos Disponibles</span>
        </Input>
      </article>
      <article className="bg-stone-200 p-4 rounded-xl shadow-sm shadow-stone-300">
        <div className="grid grid-cols-[auto_1fr] gap-4 text-stone-800">
          <span className="col-span-2 font-bold">Profesor</span>
          {group.teacher ? (
            <>
              <ProfileIcon
                fullName={group.teacher.fullName}
                className="size-12"
              />
              <div className="flex flex-col">
                <span>{group.teacher.fullName}</span>
                <span className="text-sm">{group.teacher.email}</span>
              </div>
            </>
          ) : (
            <span>No asignado</span>
          )}
          <span className="col-span-2">
            {group.teacher ? "Cambiar profesor" : "Asignar profesor"}
          </span>
          <select
            className="border border-black bg-white px-4 py-2 rounded-md col-span-2"
            name="teacherId"
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
          >
            <option value="">Elige un profesor</option>
            {teachers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.fullName}
              </option>
            ))}
          </select>
        </div>
      </article>
      <article className="bg-stone-200 p-4 rounded-xl shadow-sm shadow-stone-300 gap-4 col-span-2 grid grid-cols-4">
        <span className="col-span-4 font-bold">Horarios</span>
        {schedules.map((s) => (
          <div key={s.id} className="relative">
            <ScheduleItem schedule={s} />
            <button
              type="button"
              onClick={() => handleRemoveSchedule(s.id)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
            >
              ×
            </button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() => setShowAddSchedule(true)}
          className="bg-blue-500 text-white hover:bg-blue-600 border-none flex items-center gap-2 w-fit"
        >
          <svg className="size-5">
            <use href="/sprite.svg#add" />
          </svg>
          Agregar horario
        </Button>
      </article>
      <article className="bg-stone-200 p-4 gap-y-4 rounded-xl shadow-sm shadow-stone-300 col-span-2 gap-x-2 grid grid-cols-[1fr_auto]">
        <span className="font-bold col-span-2">Estudiantes</span>
        <Button
          type="button"
          onClick={() => setShowAddStudent(true)}
          className="flex w-fit gap-2 items-center bg-blue-500 text-white hover:bg-blue-600 border-none col-span-2"
        >
          <svg className="size-5">
            <use href="/sprite.svg#add" />
          </svg>
          Agregar estudiante
        </Button>

        {students.map((s) => (
          <StudentItem
            key={s.id}
            student={s}
            onRemove={() => handleRemoveStudent(s.id)}
          />
        ))}
      </article>

      {/* Mensajes de estado */}
      {submitError && (
        <div className="col-span-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {submitError}
        </div>
      )}
      {submitSuccess && (
        <div className="col-span-2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          Grupo actualizado exitosamente
        </div>
      )}

      {/* Botón de submit */}
      <Button
        type="submit"
        disabled={submitting}
        className="col-span-2 bg-green-600 text-white hover:bg-green-700 border-none w-full py-3 font-bold disabled:bg-gray-400"
      >
        {submitting ? "Guardando..." : "Guardar Cambios"}
      </Button>

      {/* Modal agregar estudiante */}

      <AddStudentModal
        onClose={() => setShowAddStudent(false)}
        onAdd={handleAddStudent}
        students={students}
        accessToken={accessToken}
        scheduleDialogRef={scheduleDialogRef}
      />
    </form>
  );
}

function AddScheduleModal({
  newSchedule,
  setNewSchedule,
  setShowAddSchedule,
  handleAddSchedule,
  scheduleDialogRef,
}) {
  return (
    <dialog ref={scheduleDialogRef}>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
          <h2 className="text-xl font-bold mb-4">Agregar Horario</h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="schedule-day"
                className="block text-sm font-medium mb-1"
              >
                Día
              </label>
              <select
                id="schedule-day"
                value={newSchedule.day}
                onChange={(e) =>
                  setNewSchedule({ ...newSchedule, day: e.target.value })
                }
                className="w-full border border-black px-3 py-2 rounded-md"
              >
                <option value="LUNES">Lunes</option>
                <option value="MARTES">Martes</option>
                <option value="MIERCOLES">Miércoles</option>
                <option value="JUEVES">Jueves</option>
                <option value="VIERNES">Viernes</option>
                <option value="SABADO">Sábado</option>
                <option value="DOMINGO">Domingo</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="schedule-start"
                className="block text-sm font-medium mb-1"
              >
                Hora inicio
              </label>
              <input
                id="schedule-start"
                type="time"
                value={newSchedule.startsTime}
                onChange={(e) =>
                  setNewSchedule({
                    ...newSchedule,
                    startsTime: e.target.value,
                  })
                }
                className="w-full border border-black px-3 py-2 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="schedule-end"
                className="block text-sm font-medium mb-1"
              >
                Hora fin
              </label>
              <input
                id="schedule-end"
                type="time"
                value={newSchedule.endTime}
                onChange={(e) =>
                  setNewSchedule({
                    ...newSchedule,
                    endTime: e.target.value,
                  })
                }
                className="w-full border border-black px-3 py-2 rounded-md"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setShowAddSchedule(false)}
                className="px-4 py-2 border border-stone-400 rounded-md hover:bg-stone-100"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleAddSchedule}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}

function StudentItem({ student, onRemove }) {
  return (
    <div className="col-span-2 grid grid-cols-[auto_1fr_auto] gap-x-6 items-center text-stone-800 last:border-none border-b border-stone-400 pb-3">
      <ProfileIcon
        fullName={student.fullName}
        className="size-10 text-lg row-span-2"
      />
      <div className="flex flex-col">
        <span>{student.fullName}</span>
        <span className="text-sm text-stone-700">{student.email}</span>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="border-stone-700 border-2 w-fit self-center justify-self-center text-stone-700 bg-stone-100 hover:border-2 hover:border-red-500 hover:text-red-500 hover:bg-red-100 rounded-md p-1 transition"
      >
        <svg className="size-6">
          <use href="/sprite.svg#delete" />
        </svg>
      </button>
    </div>
  );
}

function ScheduleItem({ schedule }) {
  return (
    <article className="bg-stone-300 shadow-sm shadow-stone-400 text-stone-800 py-2 px-3 text-sm rounded-md flex gap-2 justify-between items-center">
      <span className="flex gap-1 items-center font-bold">
        <svg className="size-5">
          <use href="/sprite.svg#clock" />
        </svg>
        {captalize(schedule.day.toLowerCase())}
      </span>
      <span className="flex items-center">
        {schedule.startsTime?.slice(0, 5)} - {schedule.endTime?.slice(0, 5)}
      </span>
    </article>
  );
}

function AddStudentModal({ onClose, onAdd, students, accessToken }) {
  const [availableStudents, setAvailableStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [loading, setLoading] = useState(true);
  const courseService = import.meta.env.VITE_COUSES_URL;

  useEffect(() => {
    const fetchAvailableStudents = async () => {
      try {
        const res = await fetch(`${courseService}/api/users?role=STUDENT`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          // Filtrar estudiantes que no estén ya en el grupo
          const filtered = data.filter(
            (student) => !students.some((s) => s.id === student.id),
          );
          setAvailableStudents(filtered);
        }
      } catch (err) {
        console.error("Error fetching students:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAvailableStudents();
  }, [accessToken, courseService, students]);

  const handleAdd = () => {
    if (selectedStudentId) {
      const student = availableStudents.find(
        (s) => s.id === Number.parseInt(selectedStudentId, 10),
      );
      if (student) {
        onAdd(student);
        setSelectedStudentId("");
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-4">Agregar Estudiante</h2>
        {loading ? (
          <p>Cargando estudiantes...</p>
        ) : availableStudents.length === 0 ? (
          <p className="text-gray-600">
            No hay estudiantes disponibles para agregar
          </p>
        ) : (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="student-select"
                className="block text-sm font-medium mb-2"
              >
                Selecciona un estudiante
              </label>
              <select
                id="student-select"
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                className="w-full border border-black px-3 py-2 rounded-md"
              >
                <option value="">-- Elige un estudiante --</option>
                {availableStudents.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.fullName} ({student.email})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-stone-400 rounded-md hover:bg-stone-100"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleAdd}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
                disabled={!selectedStudentId}
              >
                Agregar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

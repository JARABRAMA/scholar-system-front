import { useState, useEffect } from "react";
import { useLoginStore } from "../../store/LoginStore";
import { Button } from "../Button";

export function AddStudentModal({ onClose, onAdd, students, modalStudentRef }) {
  const [availableStudents, setAvailableStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [loading, setLoading] = useState(true);
  const accessToken = useLoginStore((state) => state.accessToken);
  const usersService = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchAvailableStudents = async () => {
      try {
        const res = await fetch(`${usersService}/users?role=ESTUDIANTE`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          // Filtrar estudiantes que no estén ya en el grupo
          console.log(data);
          const filtered = data.content.filter(
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
  }, [accessToken, usersService, students]);

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
    <dialog ref={modalStudentRef}>
      <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
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
          <Button onClick={onClose}>Cerrar</Button>
        </div>
      </div>
    </dialog>
  );
}

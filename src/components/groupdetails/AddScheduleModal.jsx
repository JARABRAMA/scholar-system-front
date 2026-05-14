export function AddScheduleModal({
  newSchedule,
  setNewSchedule,
  setShowAddSchedule,
  handleAddSchedule,
  modalScheduleRef,
}) {
  return (
    <dialog ref={modalScheduleRef}>
      <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
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

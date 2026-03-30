export function RoleSelect() {
  return (
    <div className="flex flex-col  ">
      <label>
        Rol <span className="text-red-500">*</span>
      </label>
      <select className="border rounded-md h-fit p-1.5">
        <option value="">Seleccionar rol</option>
        <option value="ESTUDIANTE">ESTUDIANTE</option>
        <option value="PROFESOR">PROFESOR</option>
        <option value="ADMINISTRADOR">ADMINSTRADOR</option>
      </select>
    </div>
  );
}

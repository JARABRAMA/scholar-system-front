export function RoleSelect({
  label = false,
  className = "",
  onInput = () => {},
  name = "role",
}) {
  if (label) {
    return (
      <div className={`flex flex-col ${className}`}>
        <label>
          Rol <span className="text-red-500">*</span>
        </label>

        <select
          name={name}
          onChange={(e) => {
            onInput(e.target.value);
          }}
          className="border rounded-md h-fit p-1.5"
        >
          <option value="">Seleccionar rol</option>
          <option value="ESTUDIANTE">ESTUDIANTE</option>
          <option value="PROFESOR">PROFESOR</option>
          <option value="ADMINISTRADOR">ADMINSTRADOR</option>
        </select>
      </div>
    );
  }
  return (
    <select
      name={name}
      onChange={(e) => {
        onInput(e.target.value);
      }}
      className={`border rounded-md h-fit p-1.5 ${className}`}
    >
      <option value="">Seleccionar rol</option>
      <option value="ESTUDIANTE">ESTUDIANTE</option>
      <option value="PROFESOR">PROFESOR</option>
      <option value="ADMINISTRADOR">ADMINSTRADOR</option>
    </select>
  );
}

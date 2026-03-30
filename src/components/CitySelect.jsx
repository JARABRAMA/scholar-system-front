export function CitySelect({ label = false, className = "" }) {
  if (label) {
    return (
      <div className={`flex flex-col ${className}`}>
        label && (
        <label>
          Ciudad de residencia <span className="text-red-500">*</span>
        </label>
        )
        <select name="city" className="border rounded-md h-fit p-1.5">
          <option value="">Seleccionar ciudad</option>
          <option value="Mediellin">Medellin</option>
          <option value="">Bogota</option>
          <option value="">Cali</option>
          <option value="">Carepa</option>
          <option value="">Chigorodo</option>
        </select>
      </div>
    );
  }
  return (
    <select
      name="city"
      className={`border rounded-md h-fit p-1.5 ${className}`}
    >
      <option value="">Seleccionar ciudad</option>
      <option value="Mediellin">Medellin</option>
      <option value="">Bogota</option>
      <option value="">Cali</option>
      <option value="">Carepa</option>
      <option value="">Chigorodo</option>
    </select>
  );
}

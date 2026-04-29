export function CitySelect({
  name = "city",
  label,
  className = "",
  values = [],
  onSelect = () => {},
  disabled = false,
}) {
  const disabledClassName = disabled ? "text-stone-400" : "";
  if (label) {
    return (
      <div className={`flex flex-col ${className} ${disabledClassName}`}>
        {label && (
          <label>
            {label}
            <span className="text-red-500">*</span>
          </label>
        )}
        <select
          disabled={disabled}
          name={name}
          className="border bg-white rounded-md h-fit p-1.5"
          onChange={(e) => onSelect(e.target.value)}
        >
          <option value="">Elige una opcion</option>
          {values.map((dpt, index) => (
            <option id={index} value={dpt}>
              {dpt}
            </option>
          ))}
        </select>
      </div>
    );
  }
  return (
    <select
      disabled={disabled}
      name={name}
      className={`border rounded-md h-fit p-1.5 ${className}`}
      onChange={(e) => onSelect(e.target.value)}
    >
      <option value="">Seleccionar ciudad</option>
      {values.map((dpt, index) => (
        <option id={index} value={dpt}>
          {dpt}
        </option>
      ))}
    </select>
  );
}

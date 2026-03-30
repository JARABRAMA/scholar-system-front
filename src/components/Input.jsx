export function Input({
  children,
  placeholder,
  type,
  name,
  required,
  desciption,
}) {
  return (
    <div className="flex flex-col">
      <div>
        <label>{children}</label>
        {required && <span className="text-red-500 "> *</span>}
      </div>
      <input
        className="border rounded-md py-1 px-2"
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
      />
      {desciption && (
        <span className="font-inherit text-sm text-stone-500 my-0.5">
          {desciption}
        </span>
      )}
    </div>
  );
}

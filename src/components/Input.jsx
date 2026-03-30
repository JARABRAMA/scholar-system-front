export function Input({
  children,
  placeholder,
  type,
  name,
  required,
  desciption,
}) {
  return (
    <div className="flex flex-col px-1 py-2 gap-1 ">
      <div>
        <label>{children}</label>
        {required && <span className="text-red-500 "> *</span>}
      </div>
      <input
        className="py-1 px-3 bg-white border border-stone-300 rounded-md focus:outline-blue-500 shadow-sm shadow-stone-300"
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

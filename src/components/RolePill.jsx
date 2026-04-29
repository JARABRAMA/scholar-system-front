export function RolePill({ role, className = "" }) {
  return (
    <div
      className={` flex items-center jstify-center align-center
      px-3 py-1 rounded-full border  w-fit h-fi ${className}`}
    >
      <span>{role}</span>
    </div>
  );
}

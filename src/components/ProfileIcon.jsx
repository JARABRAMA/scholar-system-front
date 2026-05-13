export function ProfileIcon({ fullName, className = "" }) {
  const getInitials = (str) =>
    str
      ?.split(" ")
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "";

  return (
    <div
      className={`rounded-full bg-linear-to-r from-cyan-500 to-blue-800
   text-white text-2xl flex items-center justify-center-safe ${className}`}
    >
      {getInitials(fullName)}
    </div>
  );
}

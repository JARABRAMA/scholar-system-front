export function Button({ className, children }) {
  return (
    <button
      className={`${className} transition-transform duration-300 hover:outline-2 active:scale-90 box-border py-1.5 rounded-md px-3`}
    >
      {children}
    </button>
  );
}

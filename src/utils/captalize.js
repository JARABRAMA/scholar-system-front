export function captalize(str) {
  if (!str) return ""; // Manejar cadenas vacías o nulas
  return str.charAt(0).toUpperCase() + str.slice(1);
}
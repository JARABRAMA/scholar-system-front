import { SideBar } from "../components/SideBar";

export function StudentGradesScreen() {
  return (
    <main className="grid grid-cols-[auto_1fr]">
      <SideBar />
      <Content />
    </main>
  );
}

function Content() {
  return (
    <div>
      <h1>Revisa tus notas</h1>
      <p>Visualiza las notas de todos tus cursos</p>
    </div>
  );
}

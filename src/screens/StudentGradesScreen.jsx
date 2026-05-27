import { useParams } from "react-router";
import { useFetchGradesByStudent } from "../components/grades/useFetchGradesByStudent";
import { SideBar } from "../components/SideBar";
import { Spinner } from "../components/Spinner";
import { ErrorContainer } from "../components/ErrorContainer";
import { useLoginStore } from "../store/LoginStore";
import { ProfileIcon } from "../components/ProfileIcon";
import { formatTo4Digits } from "../utils/utils";

export function StudentGradesScreen() {
  const { studentId } = useParams();
  const { loading, error, grades } = useFetchGradesByStudent({ studentId });

  if (loading) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <ErrorContainer error={error} />
      </div>
    );
  }

  return (
    <main className="grid grid-cols-[auto_1fr]">
      <SideBar />
      <Content grades={grades} />
    </main>
  );
}

function Content({ grades }) {
  return (
    <section className="flex flex-col px-12 py-8 gap-8">
      <PageHeader />
      <GradesContainer grades={grades} />
    </section>
  );
}

function GradesContainer({ grades }) {
  return (
    <div>
      {grades &&
        grades.map((entry) => (
          <GradeTable key={entry.group.groupId} entry={entry} />
        ))}
    </div>
  );
}

function GradeTable({ entry }) {
  return (
    <div className="shadow-sm rounded-xl shadow-stone-300">
      <TableHeader
        courseName={entry.group.course?.name}
        groupId={entry.group.groupId}
        teacherName={entry.group.teacher.fullName}
        teacherEmail={entry.group.teacher.email}
      />
      {entry.grades &&
        entry.grades.map((grade) => <GradeRow key={grade.id} grade={grade} />)}
    </div>
  );
}

function GradeRow({ grade }) {
  return (
    <div className="bg-stone-100 border-b hover:scale-[1.01] hover:bg-blue-50 duration-100 border-stone-300 last:rounded-b-xl last:border-none flex justify-between px-4 py-2">
      <div className="flex flex-col">
        <span className="text-sm font-bold">{grade.evaluation.name}</span>
        <span className="text-sm text-stone-600">
          {grade.evaluation.description ?? "Sin descripción"}
        </span>
      </div>
      <span className="text-lg font-bold text-stone-600 self-center text-center">
        {grade.value !== null ? grade.value : "Sin valor"}
      </span>
    </div>
  );
}

function TableHeader({ courseName, groupId, teacherName, teacherEmail }) {
  return (
    <div className="flex justify-between bg-blue-600 text-white px-4 py-2 rounded-t-xl">
      <div className="flex-col flex">
        <span className="text-sm font-bold">{courseName}</span>
        <span className="text-sm text-blue-100">
          GP-{formatTo4Digits(groupId)}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-sm text-blue-100">{teacherName}</span>
        <span className="text-sm font-light text-blue-100">{teacherEmail}</span>
      </div>
    </div>
  );
}

function PageHeader() {
  return (
    <>
      <div>
        <h1 className="text-4xl font-bold">Revisa tus notas</h1>
        <p className="text-stone-600">
          Visualiza las notas de todos tus cursos
        </p>
      </div>
      <StudentInformation />
    </>
  );
}

function StudentInformation() {
  const fullName = useLoginStore((state) => state.fullname);
  const id = useLoginStore((state) => state.id);
  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-4">
      <ProfileIcon className="size-12 p-1 row-span-2" fullName={fullName} />
      <span className="text-sm font-bold">{fullName}</span>
      <span className="text-sm text-stone-600">ID-{formatTo4Digits(id)}</span>
    </div>
  );
}

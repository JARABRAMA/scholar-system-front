import { SideBar } from "../components/SideBar";
import { Spinner } from "../components/Spinner.jsx";
import { ErrorContainer } from "../components/ErrorContainer.jsx";
import { Button } from "../components/Button.jsx";
import { formatTo4Digits } from "../utils/utils.js";
import { useEvaluations } from "../hooks/grades/useEvaluations.jsx";
import { ErrorDialog } from "../components/ErrorDialog.jsx";
import { LoadingDialog } from "../components/LoadingDialog.jsx";

export function CourseGradesScreen() {
  return (
    <main className="grid grid-cols-[auto_1fr] bg-stone-100 overflow-y-hidden">
      <SideBar />
      <Content />
    </main>
  );
}

function Content() {
  const {
    group,
    table,
    evaluations,
    loading,
    error,
    updateTable,
    onSave,
    updateGradesError,
    updateGradesLoading,
    onDissmissError,
  } = useEvaluations();

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
    <>
      <LoadingDialog loading={updateGradesLoading} />
      <ErrorDialog
        error={updateGradesError}
        onDissmissError={onDissmissError}
      />
      <section className="flex flex-col gap-8 py-8 px-12">
        {group && <PageHeader group={group} onSave={onSave} />}
        {evaluations && (
          <EvaluationsTable
            evaluations={evaluations}
            table={table}
            updateTable={updateTable}
          />
        )}
      </section>
    </>
  );
}

function EvaluationsTable({ evaluations, table, updateTable }) {
  const lenCols = evaluations.length;

  return (
    <div
      className="grid rounded-xl "
      style={{ gridTemplateColumns: `repeat(${lenCols + 1}, 1fr)` }}
    >
      <span
        className="bg-blue-50 text-blue-800 font-bold min-h-full self-center text-center
        border border-blue-300 flex items-center px-2 rounded-tl-2xl"
      >
        Estudiante
      </span>
      {evaluations.map((e) => (
        <TableEvaluationHeader
          evaluationName={e.name}
          percentage={e.percentage}
        />
      ))}

      {table &&
        table.map((s) => (
          <StudentTableRow
            key={s.student.id}
            row={s}
            updateTable={updateTable}
          />
        ))}
    </div>
  );
}

function StudentTableRow({ row, updateTable }) {
  return (
    <>
      <div className="bg-white flex flex-col gap-1 items-center p-1 border border-blue-300">
        <span className="text-blue-800 font-bold">{row.student.fullName}</span>
        <span className="text-stone-600 text-sm font-light">
          {row.student.email}
        </span>
      </div>
      {row.evaluations.map((e) => (
        <input
          value={e.value ?? ""}
          onChange={(event) =>
            updateTable(row.student.id, e.evaluationId, event.target.value)
          }
          key={`${e.studentId}-${e.evaluationId}`}
          type="number"
          min="0"
          max="5"
          className="border bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none
          [&::-webkit-inner-spin-button]:appearance-none text-center focus:outline-none focus:bg-blue-50"
        />
      ))}
    </>
  );
}

function TableEvaluationHeader({ evaluationName, percentage }) {
  return (
    <div className="bg-blue-50 flex flex-col gap-1 items-center p-1 border border-blue-300">
      <span className="text-blue-800 font-bold">{evaluationName}</span>
      <span className="bg-blue-200 border border-blue-300 rounded-full text-sm px-2 text-blue-600">
        {percentage}%
      </span>
    </div>
  );
}

function PageHeader({ group, onSave }) {
  return (
    <div className="flex justify-between">
      <div>
        <h1 className="text-4xl">Registro de Calificaciones</h1>
        <p className="text-stone-600">
          {group?.groupName} - {group?.course.name} - CD-
          {formatTo4Digits(group.id)}
        </p>
      </div>
      <Button
        onClick={onSave}
        className="bg-blue-600 h-fit text-white hover:bg-blue-700 row-span-2"
      >
        Guardar
      </Button>
    </div>
  );
}

import { SideBar } from "../components/SideBar";
import { Spinner } from "../components/Spinner.jsx";
import { ErrorContainer } from "../components/ErrorContainer.jsx";
import { Button } from "../components/Button.jsx";
import { formatTo4Digits } from "../utils/utils.js";
import { useEvaluations } from "../hooks/grades/useEvaluations.jsx";
import { ErrorDialog } from "../components/ErrorDialog.jsx";
import { LoadingDialog } from "../components/LoadingDialog.jsx";
import { Dialog } from "../components/Dialog.jsx";
import { useCreateEvaluation } from "../components/grades/useCreateEvaluations.jsx";
import { Input } from "../components/Input.jsx";
import { useParams } from "react-router";

export function CourseGradesScreen() {
  return (
    <main className="grid grid-cols-[auto_1fr] bg-stone-100 overflow-y-hidden">
      <SideBar />
      <Content />
    </main>
  );
}

function Content() {
  const { groupId } = useParams();
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
    refetchEvaluations,
  } = useEvaluations();

  const {
    isOpenedCreateEvaluation,
    openCreateEvaluation,
    closeCreateEvaluation,
    onCreateEvaluation,
    formData: formEvaluationData,
    onUpdateForm: onUpdateFormEvaluationData,
    loadingCreateEvaluation,
    errorCreateEvaluation,
    onDismissCreateEvaluationError,
  } = useCreateEvaluation({ groupId });

  const handleCreateEvaluation = async (event) => {
    const success = await onCreateEvaluation(event);
    if (success) {
      await refetchEvaluations();
    }
  };
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
      <LoadingDialog loading={isOpenedCreateEvaluation} />
      <Dialog
        className="self-center justify-self-center"
        open={isOpenedCreateEvaluation}
        onClose={closeCreateEvaluation}
      >
        <CreateGradeModalChildren
          onCreateEvaluation={handleCreateEvaluation}
          onCancel={closeCreateEvaluation}
          onUpdate={onUpdateFormEvaluationData}
          formData={formEvaluationData}
          loading={loadingCreateEvaluation}
          error={errorCreateEvaluation}
          onDismissError={onDismissCreateEvaluationError}
        />
      </Dialog>
      <ErrorDialog
        error={updateGradesError}
        onDissmissError={onDissmissError}
      />
      <section className="flex flex-col gap-8 py-8 px-12 overflow-y-auto">
        {group && (
          <PageHeader
            group={group}
            onSave={onSave}
            openCreateEvaluation={openCreateEvaluation}
          />
        )}
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

function CreateGradeModalChildren({
  onCreateEvaluation,
  onCancel,
  onUpdate,
  formData,
  loading,
  error,
  onDismissError,
}) {
  if (loading)
    return (
      <div className="p-8">
        <Spinner />
      </div>
    );
  if (error)
    return (
      <div className="p-8">
        <ErrorContainer error={error} onDissmissError={onDismissError} />
      </div>
    );

  return (
    <form
      className="grid grid-cols-2 p-8  gap-x-2 flex-col"
      onSubmit={onCreateEvaluation}
    >
      <h3 className="font-bold col-span-2 text-xl">Nueva evaluacion</h3>
      <p className="col-span-2 text-stone-600">Crea una nueva evaluación</p>
      <Input
        onChange={(e) => {
          onUpdate(e.target.name, e.target.value);
        }}
        value={formData.name}
        name="name"
        required
      >
        Nombre
      </Input>
      <Input
        onChange={(e) => {
          onUpdate(e.target.name, e.target.value);
        }}
        value={formData.percentage}
        name="percentage"
        required
      >
        Porcentaje
      </Input>
      <Input
        value={formData.description}
        name="description"
        onChange={(e) => {
          onUpdate(e.target.name, e.target.value);
        }}
        required
        className="col-span-2 min-w-max"
      >
        Descripción
      </Input>
      <Button
        className="bg-red-500 hover:bg-red-600 text-white"
        onClick={onCancel}
      >
        Cancelar
      </Button>
      <Button
        className="bg-blue-600 text-white hover:bg-blue-700"
        type="submit"
      >
        Crear
      </Button>
    </form>
  );
}

function EvaluationsTable({ evaluations, table, updateTable }) {
  const lenCols = evaluations.length;

  return (
    <div
      className="grid rounded-xl "
      style={{ gridTemplateColumns: `auto repeat(${lenCols}, 1fr)` }}
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

function PageHeader({ group, onSave, openCreateEvaluation }) {
  return (
    <div className="grid grid-cols-[1fr_auto] justify-between">
      <h1 className="text-4xl">Registro de Calificaciones</h1>
      <Button
        onClick={openCreateEvaluation}
        className="bg-green-600 h-fit text-white hover:bg-green-700"
      >
        Crear Evaluación
      </Button>
      <p className="text-stone-600">
        {group?.groupName} - {group?.course.name} - CD-
        {formatTo4Digits(group.id)}
      </p>
      <Button
        onClick={onSave}
        className="bg-blue-600 h-fit text-white hover:bg-blue-700"
      >
        Guardar
      </Button>
    </div>
  );
}

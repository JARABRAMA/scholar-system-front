import {SideBar} from "../components/SideBar.jsx";
import {useCourseDetails} from "../hooks/useCourseDetials.jsx";
import {Spinner} from "../components/Spinner.jsx";
import {Input} from "../components/Input.jsx";
import {useFetchTeachers} from "../hooks/useFetchTeachers.jsx";
import {DaysOfWeek} from "../utils/DaysOfWeek.js";
import {Button} from "../components/Button.jsx";
import {Dialog} from "../components/Dialog.jsx";
import {useNewGroup} from "../hooks/useNewGroup.jsx";

export function NewGroupScreen() {
	return (
		<main className="grid grid-cols-[auto_1fr] bg-stone-100 overflow-y-hidden">
			<SideBar/>
			<Content/>
		</main>
	);
}

function Content() {
	const {course, loading: courseDetailLoading} = useCourseDetails();
	const {teachers, loading: teachersLoading} = useFetchTeachers();
	return (
		<section className="py-8 px-12  flex flex-col gap-8 overflow-y-auto">
			<header>
				<h1 className="text-4xl">Crear un nuevo grupo</h1>
				<span className="text-stone-400">
          Llena el formulario para crear un nuevo grupo
        </span>
			</header>
			{courseDetailLoading || teachersLoading ? (
				<div className="flex flex-1 items-center justify-center">
					<Spinner/>
				</div>
			) : course && teachers ? (
				<GroupForm course={course} teachers={teachers}/>
			) : null}
		</section>
	);
}


function GroupForm({course, teachers}) {
	const {
		onSubmit,
		schedules,
		handleChange,
		addSchedule,
		removeSchedule,
		loading,
		error,
		onDismissError,
	} = useNewGroup();
	return (
		<>
			{loading && (
				<Dialog open={loading}>
					<Spinner/>
				</Dialog>
			)}

			{error && (
				<Dialog open={error}>
					<div className="flex flex-col p-4 justify-between items-center gap-2">
						<svg className="size-18 text-red-500">
							<use href="/sprite.svg#error"/>
						</svg>
						<h3 className="text-2xl self-center text-center">{error.title}</h3>
						<span>{error.detail}</span>
						<Button
							className="bg-blue-600 text-white flex items-center px-3 gap-2 hover:outline-0 self-end"
							onClick={onDismissError}
						>
							Reintentar
						</Button>
					</div>
				</Dialog>
			)}
			<form
				className="max-w-3xl flex flex-col gap-4 "
				onSubmit={(e) => onSubmit(e, course.code)}
			>
				<div className=" p-4 bg-white rounded-xl shadow-sm border border-stone-300 grid grid-cols-2 gap-4">
					<div className="col-span-2">
						<span>Curso</span>
						<div className=" border border-stone-300 rounded-xl bg-white shadow-sm flex gap-2 py-2 px-4 w-fit">
							<svg className="size-6 text-blue-500">
								<use href="/sprite.svg#book"/>
							</svg>
							{course.name}
						</div>
					</div>
					<Input name={"name"} required={true}>
						Nombre del grupo
					</Input>
					<Input name={"capacity"} type="number" required={true}>
						Capacidad del grupo
					</Input>

					<div className="flex flex-col gap-2">
						<span>Profesor</span>
						<select
							className="border border-black px-4 py-2 rounded-md"
							name="teacherId"
						>
							<option value="">Elige un profesor</option>
							{teachers.map((t) => (
								<option value={t.id}>{t.fullName}</option>
							))}
						</select>
					</div>
				</div>
				<Schedules
					schedules={schedules}
					handleChange={handleChange}
					removeSchedule={removeSchedule}
					addSchedule={addSchedule}
				/>

				<Button
					className="bg-blue-500 text-white hover:bg-blue-600"
					type="submit"
				>
					Guardar
				</Button>
			</form>
		</>
	);
}

function Schedules({schedules, handleChange, removeSchedule, addSchedule}) {
	return (
		<div className="p-4 bg-white rounded-xl shadow-sm border border-stone-300 flex flex-col gap-4">
			<span>Horarios</span>

			{schedules.map((schedule, index) => (
				<div
					key={index}
					className="grid grid-cols-4 gap-4 items-center justify-center"
				>
					{/* Día */}
					<div className="flex flex-col gap-1">
						Dia
						<select
							required={true}
							className="border border-black px-4 py-2 rounded-md"
							value={schedule.day}
							onChange={(e) => handleChange(index, "day", e.target.value)}
						>
							<option value="">Elige un día</option>
							{Object.entries(DaysOfWeek).map(([key, value]) => (
								<option key={key} value={value}>
									{key}
								</option>
							))}
						</select>
					</div>

					{/* Hora inicio */}
					<Input
						type="time"
						required={true}
						value={schedule.startsTime}
						onChange={(e) => handleChange(index, "startsTime", e.target.value)}
					>
						Hora de inicio
					</Input>

					{/* Hora fin */}
					<Input
						type="time"
						required={true}
						value={schedule.endTime}
						onChange={(e) => handleChange(index, "endTime", e.target.value)}
					>
						Hora de finalización
					</Input>

					{/* Botón eliminar */}
					<Button
						type="button"
						onClick={() => removeSchedule(index)}
						className=" bg-red-500 text-white flex flex-gap 2 items-center w-fit self-cener justify-self-center hover:bg-red-400"
					>
						<svg className="size-6">
							<use href="/sprite.svg#delete"/>
						</svg>
					</Button>
				</div>
			))}

			{/* Botón agregar */}
			<button
				type="button"
				onClick={addSchedule}
				className="border border-blue-500 text-blue-500 bg-white hover:bg-stone-100 hover:ring hover-ring-blue-500 px-4 py-2 rounded-md"
			>
				Agregar horario
			</button>
		</div>
	);
}

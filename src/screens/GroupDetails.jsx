import {SideBar} from "../components/SideBar.jsx";
import {useEffect, useRef} from "react";
import {Spinner} from "../components/Spinner.jsx";
import {Input} from "../components/Input.jsx";
import {ProfileIcon} from "../components/ProfileIcon.jsx";
import {Button} from "../components/Button.jsx";
import {captalize} from "../utils/captalize.js";
import {useGroupDetailsForm} from "../hooks/useGroupDetailsForm.jsx";
import {AddScheduleModal} from "../components/groupdetails/AddScheduleModal.jsx";
import {AddStudentModal} from "../components/groupdetails/AddStudentModal.jsx";

export function GroupDetails() {
	return (
		<main className="grid grid-cols-[auto_1fr] bg-stone-100 overflow-hidden">
			<SideBar/>
			<Content/>
		</main>
	);
}

function Content() {
	return (
		<section className="p-8 flex gap-5 flex-1 flex-col overflow-y-auto">
			<h1 className="text-4xl w-max">Detalles del grupo</h1>
			<GroupInfoForm/>
		</section>
	);
}

function GroupInfoForm() {
	const {
		handleSubmit,
		groupName,
		setGroupName,
		capacity,
		setCapacity,
		group,
		teacherId,
		setTeacherId,
		teachers,
		schedules,
		setShowAddSchedule,
		handleRemoveSchedule,
		students,
		setShowAddStudent,
		handleRemoveStudent,
		handleAddStudent,
		submitError,
		submitSuccess,
		submitting,
		showAddSchedule,
		showAddStudent,
		newSchedule,
		setNewSchedule,
		handleAddSchedule,
		loading, error
	} = useGroupDetailsForm();

	const modalStudentRef = useRef();
	const modalScheduleRef = useRef();

	useEffect(() => {
		if (showAddStudent) {
			modalStudentRef.current?.showModal();
		} else {
			modalStudentRef.current?.close();
		}
	}, [showAddStudent]);

	useEffect(() => {
		if (showAddSchedule) {
			modalScheduleRef.current?.showModal();
		} else {
			modalScheduleRef.current?.close();
		}
	}, [showAddSchedule]);

	if (loading) {
		return (<div className='flex flex-1 justify-center items-center'>
			<Spinner/>
		</div>)
	}

	if (error) {
		return (
			<div
				className="flex flex-1 justify-center items-center">
				<h2 className='text-xl text-red-400'>
					<svg>
						<use href='/sprite.svg#warning'/>
					</svg>
					Error
				</h2>
				<p className='text-stone-800'>{error}</p>
			</div>
		)
	}

	return (

		<form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 pb-8">
			<article className="bg-stone-200 p-4 rounded-xl shadow-sm shadow-stone-300">
				<span className="font-bold">Información del grupo</span>
				<Input
					name="groupName"
					value={groupName}
					onChange={(e) => setGroupName(e.target.value)}
				>
					<span className="text-sm text-stone-800">Nombre del grupo</span>
				</Input>
				<Input
					name="capacity"
					type="text"
					value={capacity}
					onChange={(e) => setCapacity(e.target.value)}
				>
					<span className="text-sm text-stone-800">Cupos Disponibles</span>
				</Input>
			</article>
			<article className="bg-stone-200 p-4 rounded-xl shadow-sm shadow-stone-300">
				<div className="grid grid-cols-[auto_1fr] gap-4 text-stone-800">
					<span className="col-span-2 font-bold">Profesor</span>
					{group?.teacher ? (
						<>
							<ProfileIcon
								fullName={group.teacher.fullName}
								className="size-12"
							/>
							<div className="flex flex-col">
								<span>{group.teacher.fullName}</span>
								<span className="text-sm">{group.teacher.email}</span>
							</div>
						</>
					) : (
						<span>No asignado</span>
					)}
					<span className="col-span-2">
            {group?.teacher ? "Cambiar profesor" : "Asignar profesor"}
          </span>
					<select
						className="border border-black bg-white px-4 py-2 rounded-md col-span-2"
						name="teacherId"
						value={teacherId}
						onChange={(e) => setTeacherId(e.target.value)}
					>
						<option value="">Elige un profesor</option>

						{teachers?.map((t) => (
							<option key={t.id} value={t.id}>
								{t.fullName}
							</option>
						))}
					</select>
				</div>
			</article>
			<article
				className="bg-stone-200 p-4 rounded-xl shadow-sm shadow-stone-300 gap-4 col-span-2 grid grid-cols-4">
				<span className="col-span-4 font-bold">Horarios</span>
				{schedules.map((s) => (
					<div key={s.id} className="relative">
						<ScheduleItem schedule={s}/>
						<button
							type="button"
							onClick={() => handleRemoveSchedule(s.id)}
							className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
						>
							×
						</button>
					</div>
				))}
				<Button
					type="button"
					onClick={() => setShowAddSchedule(true)}
					className="bg-blue-500 text-white hover:bg-blue-600 border-none flex items-center gap-2 w-fit"
				>
					<svg className="size-5">
						<use href="/sprite.svg#add"/>
					</svg>
					Agregar horario
				</Button>
			</article>
			<article
				className="bg-stone-200 p-4 gap-y-4 rounded-xl shadow-sm shadow-stone-300 col-span-2 gap-x-2 grid grid-cols-[1fr_auto]">
				<span className="font-bold col-span-2">Estudiantes</span>
				<Button
					type="button"
					onClick={() => setShowAddStudent(true)}
					className="flex w-fit gap-2 items-center bg-blue-500 text-white hover:bg-blue-600 border-none col-span-2"
				>
					<svg className="size-5">
						<use href="/sprite.svg#add"/>
					</svg>
					Agregar estudiante
				</Button>

				{students.map((s) => (
					<StudentItem
						key={s.id}
						student={s}
						onRemove={() => handleRemoveStudent(s.id)}
					/>
				))}
			</article>

			{/* Mensajes de estado */}
			{submitError && (
				<div className="col-span-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
					{submitError}
				</div>
			)}
			{submitSuccess && (
				<div className="col-span-2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
					Grupo actualizado exitosamente
				</div>
			)}

			{/* Botón de submit */}
			<Button
				type="submit"
				disabled={submitting}
				className="col-span-2 bg-green-600 text-white hover:bg-green-700 border-none w-full py-3 font-bold disabled:bg-gray-400"
			>
				{submitting ? "Guardando..." : "Guardar Cambios"}
			</Button>

			<AddStudentModal
				onClose={() => setShowAddStudent(false)}
				onAdd={handleAddStudent}
				students={students}
				modalStudentRef={modalStudentRef}
			/>
			<AddScheduleModal
				newSchedule={newSchedule}
				setNewSchedule={setNewSchedule}
				setShowAddSchedule={setShowAddSchedule}
				handleAddSchedule={handleAddSchedule}
				modalScheduleRef={modalScheduleRef}
				onClose={() => setShowAddSchedule(false)}
			/>
		</form>
	);
}

function StudentItem({student, onRemove}) {
	return (
		<div
			className="col-span-2 grid grid-cols-[auto_1fr_auto] gap-x-6 items-center text-stone-800 last:border-none border-b border-stone-400 pb-3">
			<ProfileIcon
				fullName={student.fullName}
				className="size-10 text-lg row-span-2"
			/>
			<div className="flex flex-col">
				<span>{student.fullName}</span>
				<span className="text-sm text-stone-700">{student.email}</span>
			</div>
			<button
				type="button"
				onClick={onRemove}
				className="border-stone-700 border-2 w-fit self-center justify-self-center text-stone-700 bg-stone-100 hover:border-2 hover:border-red-500 hover:text-red-500 hover:bg-red-100 rounded-md p-1 transition"
			>
				<svg className="size-6">
					<use href="/sprite.svg#delete"/>
				</svg>
			</button>
		</div>
	);
}

function ScheduleItem({schedule}) {
	return (
		<article
			className="bg-stone-300 shadow-sm shadow-stone-400 text-stone-800 py-2 px-3 text-sm rounded-md flex gap-2 justify-between items-center">
      <span className="flex gap-1 items-center font-bold">
        <svg className="size-5">
          <use href="/sprite.svg#clock"/>
        </svg>
				{captalize(schedule.day.toLowerCase())}
      </span>
			<span className="flex items-center">
        {schedule.startsTime?.slice(0, 5)} - {schedule.endTime?.slice(0, 5)}
      </span>
		</article>
	);
}

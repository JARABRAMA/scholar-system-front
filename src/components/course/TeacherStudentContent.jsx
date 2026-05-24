import { useTeacherStudentContent } from '../../hooks/course/useTeacherStudentContent.jsx'
import { captalize } from '../../utils/captalize.js'
import { formatTo4Digits } from '../../utils/utils.js'
import { Button } from '../Button.jsx'
import { ErrorContainer } from '../ErrorContainer.jsx'
import { ProfileIcon } from '../ProfileIcon.jsx'
import { ScheduleItem } from '../schedule/ScheduleItem.jsx'
import { Spinner } from '../Spinner.jsx'

export function TeacherStudentContent () {
  return (
    <section className='flex flex-col gap-8 py-8 px-12'>
      <header>
        <h1
          className='text-4xl'
        >Bienvenido a Scholar System
        </h1>
        <p className='text-stone-600'>Tus grupos inscritos — horarios y profesores de este semestre</p>
      </header>
      <GroupsGrid />
    </section>
  )
}

function GroupsGrid () {
  const { groups, loading, error } = useTeacherStudentContent()
  if (error) {
    return (
      <div className='flex flex-1 mask-center'>
        <ErrorContainer error={error} />
      </div>
    )
  }
  if (loading) {
    return (
      <div className='flex flex-1 justify-center items-center overflow-y-auto'>
        <Spinner />
      </div>
    )
  }

  return (
    <div className='grid grid-cols-3 items-center gap-4 '>
      {groups?.map(g => <GroupCard key={g.id} group={g} />)}
    </div>
  )
}

function GroupCard ({ group }) {
  return (
    <article className='flex flex-col hover:scale-105 duration-100 rounded-2xl bg-white h-full justify-between'>
      <GroupCardHeader
        courseName={group.course.name}
        groupName={group.groupName}
        groupId={group.id}
        credits={group.course.credits}
      />
      <GroupCardTeacher
        fullName={group.teacher.fullName}
        email={group.teacher.email}
      />
      <ScheduleGroupCard schedules={group.schedules} />

      <Button className='m-4 flex items-center self-end bg-sky-800 text-white hover:bg-blue-800 '>
        Ver calificaciones
        <svg className='size-6'>
          <use href='/sprite.svg#navigate-next' />
        </svg>
      </Button>

    </article>
  )
}

function ScheduleGroupCard ({ schedules }) {
  return (
    <div className='flex flex-col  p-4 border-y gap-2 border-stone-300'>
      <span>Horario</span>
      {schedules.length !== 0 && schedules.map((s, index) => <ScheduleItem
        className='bg-stone-200 rounded-xl px-2 py-1'
        key={index}
        day={s.day}
        startTime={s.startsTime}
        endTime={s.endTime}
                                                             />)}
      {
          schedules.length === 0 && <span className='self-center text-stone-600 p-2'>No hay horarios asignados aun</span>
      }
    </div>
  )
}

function GroupCardTeacher ({ fullName, email }) {
  return (
    <div className='grid grid-cols-[auto_1fr]  p-4 gap-x-4 '>
      <span className='col-span-2 text-sm text-stone-700 pb-2'>Profesor</span>
      {fullName && email
        ? (
          <>
            <ProfileIcon className='row-span-2 size-12' fullName={fullName} />
            <span>{fullName}</span>
            <span className='text-sm text-stone-600'>{email}</span>
          </>
          )
        : (<span className='self-center text-stone-600 p-2'>Noy hay profesor asignado aun</span>)}
    </div>
  )
}

function GroupCardHeader ({ groupName, courseName, groupId, credits }) {
  return (
    <div className='duration-300 grid grid-cols-[1fr_auto] gap-y-2 justify-between bg-sky-800 p-4 bg-sky-blue700
     rounded-t-2xl text-white'
    >
      <span
        className='text-sm text-blue-200'
      >{captalize(groupName.toLowerCase())}
      </span>
      <span className='bg-sky-700 w-fit px-1.5 text-sm
       text-sky-200 font-bold justify-self-end rounded-full'
      >G-{formatTo4Digits(groupId)}
      </span>
      <span className='font-bold text-lg'>{captalize(courseName.toLowerCase())}</span>
      <span
        className='text-sm justify-self-end text-blue-200'
      >{credits} creditos
      </span>
    </div>
  )
}

import { SideBar } from '../components/SideBar.jsx'
import { AdministratorContent } from '../components/course/AdministratorContent.jsx'
import { TeacherStudentContent } from '../components/course/TeacherStudentContent.jsx'
import { useAdministrator } from '../hooks/useAdministrator.jsx'

export function CoursesScreen () {
  const { isAdministrator } = useAdministrator()
  return (
    <main className='grid grid-cols-[auto_1fr] bg-stone-100 overflow-y-hidden'>
      <SideBar />
      {isAdministrator &&
        <AdministratorContent />}
      {!isAdministrator &&
        <TeacherStudentContent />}
    </main>
  )
}

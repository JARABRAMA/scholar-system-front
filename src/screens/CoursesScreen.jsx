import { SideBar } from '../components/SideBar.jsx'
import { AdministratorContent } from '../components/course/AdministratorContent.jsx'
import { useCourseScreen } from '../hooks/useCourseScreen.jsx'
import { TeacherStudentContent } from '../components/course/TeacherStudentContent.jsx'

export function CoursesScreen () {
  const { isAdministrator } = useCourseScreen()
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

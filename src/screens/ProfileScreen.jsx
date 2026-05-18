import { useNavigate } from 'react-router'
import { SideBar } from '../components/SideBar'
import { Spinner } from '../components/Spinner'
import { RolePill } from '../components/RolePill.jsx'
import { Button } from '../components/Button.jsx'
import { useFetchUser } from '../hooks/useFetchUser.jsx'
import { ProfileIcon } from '../components/ProfileIcon.jsx'
import { ErrorContainer } from '../components/ErrorContainer.jsx'
import { DeleteUserDialog } from '../components/DeleteUserDialog.jsx'
import { useDeleteUser } from '../components/useDeleteUser.jsx'

export function ProfileScreen () {
  const { user, error, loading } = useFetchUser()

  return (
    <main className='grid grid-cols-[auto_1fr]'>
      <SideBar />
      <Content user={user} loading={loading} error={error} />
    </main>
  )
}

function Content ({ user, loading, error }) {
  const navigate = useNavigate()
  const onEdit = () => navigate(`/users/edit/${user.id}`)
  const { deleteDialogRef, onToggleShowDeleteDialog } = useDeleteUser()

  if (loading && !error) {
    return (
      <div className='flex flex-1 justify-center items-center'>
        <Spinner />
      </div>
    )
  }

  if (error) {
    return <ErrorContainer error={error} />
  }
  return (
    <>
      <DeleteUserDialog
        fullName={user?.fullName}
        onToggleShowDeleteDialog={onToggleShowDeleteDialog}
        deleteDialogRef={deleteDialogRef}
      />
      {user &&
        <section className='flex flex-col flex-1 bg-stone-100'>
          <div className='flex flex-col rounded-xl border border-stone-300 bg-white p-8 gap-8 m-8'>
            <div className='flex w-full h-fit gap-8 border-b border-stone-300 pt-4 pb-8 items-center'>
              <ProfileIcon fullName={user.fullName} className='size-16' />
              <div className='flex flex-col gap-1 align-center justify-center'>
                <span className='text-2xl'>{user.fullName}</span>
                <span className='text-md text-stone-500'>{user.email}</span>
                <RolePill
                  role={user.role}
                  className='text-sm bg-blue-100 text-blue-800'
                />
              </div>

              <div className='flex flex-col gap-4 px-4'>
                <Button
                  onClick={onToggleShowDeleteDialog}
                  className='flex bg-red-50 hover:bg-red-100 border border-red-500 text-red-500 gap-2 justify-center'
                >
                  <svg className='size-5 text-red-500'>
                    <use href='/sprite.svg#delete' />
                  </svg>
                  Eliminar
                </Button>
                <Button
                  onClick={onEdit}
                  className='flex border-black border hover:bg-stone-100 justify-center gap-2 text-black'
                >
                  <svg className='size-5'>
                    <use href='/sprite.svg#edit' />
                  </svg>
                  Editar
                </Button>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4 justify-between'>
              <UserField title='ID DE USARIO' value={user.id} />
              <UserField title='ROL' value={user.role} />
              <UserField title='FECHA DE NACIMIENTO' value={user.birthDate} />
              <UserField title='CIUDAD' value={user.municipality} />
              <UserField title='EMAIL' value={user.email} />
            </div>
          </div>
        </section>}
    </>
  )
}

function UserField ({ title, value }) {
  return (
    <div className='flex flex-col'>
      <span className='text-stone-500'>{title}</span>
      <span className='text-stone-900'>{value}</span>
    </div>
  )
}

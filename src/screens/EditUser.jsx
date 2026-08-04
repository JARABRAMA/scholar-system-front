import { SideBar } from '../components/SideBar.jsx'
import { Input } from '../components/Input.jsx'
import { Spinner } from '../components/Spinner.jsx'
import { CitySelect } from '../components/CitySelect.jsx'
import { Button } from '../components/Button.jsx'
import { useEffect, useRef } from 'react'
import { useEditUser } from '../hooks/useEditUser.jsx'
import { ErrorContainer } from '../components/ErrorContainer.jsx'
import { useNavigate } from 'react-router'

export function EditUser () {
  return (
    <main className='grid grid-cols-[auto_1fr]'>
      <SideBar />
      <Content />
    </main>
  )
}

function Content () {
  const {
    error,
    departments,
    municipalities,
    loading,
    chosenDepartment,
    onSubmitForm,
    updatingError,
    updatingLoading,
    onDissmissError,
    formData,
    onUpdateForm
  } = useEditUser()

  const dialogRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    if (updatingError) {
      dialogRef.current.showModal()
    } else {
      dialogRef.current.close()
    }
  }, [updatingError])

  return (
    <>
      <dialog ref={dialogRef} className='rounded-2xl self-center justify-self-center'>
        <div className='flex flex-col gap-2 m-4'>

          <ErrorContainer error={updatingError} />
          <Button className='w-fit self-end bg-blue-500 text-white hover:bg-blue-600' onClick={onDissmissError}>Volver a intentar</Button>
        </div>
      </dialog>

      {error && (
        <div className='flex flex-1 bg-stone-100 items-center justify-center'>
          <ErrorContainer error={error} />
        </div>
      )}
      {loading && (
        <div className='flex flex-1 bg-stone-100 items-center justify-center'>
          <Spinner />
        </div>
      )}
      {!loading && !error && (
        <section className=' flex flex-1 bg-stone-100'>
          <div className='m-8'>

            <div className='flex flex-col pb-8'>
              <span className='text-3xl'>Editar Usuario</span>
              <span className='text-stone-600'>
                Solo se pueden modificar: nombre, email, fecha de nacimiento y
                ciudad
              </span>
            </div>
            <article className='flex flex-col bg-white border border-stone-300 rounded-xl p-8'>
              <form className='pb-8 ' onSubmit={(e) => onSubmitForm(e)}>
                <section className='grid grid-cols-2 gap-x-8 border-b-2 border-stone-300 pb-8'>
                  <Input
                    onChange={onUpdateForm}
                    value={formData.fullName}
                    name='fullName'
                  >
                    Nombre Completo
                  </Input>
                  <Input
                    value={formData.email}
                    onChange={onUpdateForm}
                    name='email'
                    type='email'
                  >
                    Correo Electronico
                  </Input>
                  <Input
                    name='birthDate'
                    onChange={onUpdateForm}
                    value={formData.birthDate}
                    type='date'
                  >
                    Fecha de nacimiento
                  </Input>
                  <CitySelect
                    value={formData.department}
                    name='department'
                    label='Departamento de residencia'
                    values={departments}
                    onSelect={onUpdateForm}
                  />
                  <CitySelect
                    disabled={!chosenDepartment || chosenDepartment === ''}
                    name='municipality'
                    label='Municipio de residencia'
                    values={municipalities}
                    value={formData.municipality}
                    onSelect={onUpdateForm}
                  />
                </section>
                {updatingLoading && (
                  <div className='flex my-8 items-center justify-center'>
                    <Spinner />
                  </div>
                )}
                <div className='flex justify-end gap-8 mt-8'>
                  <Button onClick={() => navigate(-1)} className='border'>Cancelar</Button>
                  <Button type='submit' className='bg-blue-600 text-white'>
                    Guardar cambios
                  </Button>
                </div>
              </form>
            </article>
          </div>
        </section>
      )}
    </>
  )
}

import { SideBar } from '../components/SideBar'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { RoleSelect } from '../components/RoleSelect.jsx'
import { CitySelect } from '../components/CitySelect.jsx'
import { useNewUser } from '../hooks/UseNewUsers.jsx'
import { Dialog } from '../components/Dialog.jsx'
import { Spinner } from '../components/Spinner.jsx'

export function NewUser () {
  const {
    departments,
    municipalities,
    onChoseDepartment,
    loading,
    onSubmitForm,
    chosenDepartment,
    error
  } = useNewUser()
  return (
    <main className='grid grid-cols-[auto_1fr]'>
      <SideBar />
      <Content
        departments={departments}
        municipalities={municipalities}
        setChosenDepartment={onChoseDepartment}
        chosenDepartment={chosenDepartment}
        onSubmitForm={onSubmitForm}
        loading={loading}
        error={error}
      />
    </main>
  )
}

function Content ({
  departments,
  municipalities,
  setChosenDepartment,
  chosenDepartment,
  onSubmitForm,
  loading,
  error
}) {
  return (
    <section className='flex flex-col p-5 bg-stone-100 h-full'>
      <Dialog open={loading || error}>
        {loading && !error && (
          <div className='flex flex-1 min-h-max items-center justify-center flex-col gap-7 '>
            <span className='text-stone-900 text-xl'>Cargando...</span>
            <Spinner />
          </div>
        )}
        {error && (
          <div className='flex flex-1 min-h-max items-center justify-center flex-col gap-7'>
            <svg className='size-10 text-red-500'>
              <use href='/sprite.svg#error' />
            </svg>
            <span className='text-stone-900 text-xl'>Error</span>
            <span>{error}</span>
          </div>
        )}
      </Dialog>
      <h2 className='text-2xl'>Añadir nuevo usuario</h2>
      <p className='text-md text-stone-500'>
        Completa el formulario para registrar un nuevo usuario a la plataforma
      </p>

      <NewUserForm
        departments={departments}
        municipalities={municipalities}
        setChosenDepartment={setChosenDepartment}
        chosenDepartment={chosenDepartment}
        onSubmitForm={onSubmitForm}
      />
    </section>
  )
}

function NewUserForm ({
  departments,
  municipalities,
  setChosenDepartment,
  chosenDepartment,
  onSubmitForm
}) {
  return (
    <form
      className='bg-white p-6 rounded-xl my-5
    flex flex-col gap-4 h-full'
      onSubmit={onSubmitForm}
    >
      <div className='grid grid-cols-2 gap-y-4 gap-x-4 flex-1'>
        <Input
          name='fullName'
          required
          placeholder='e.g. Pepito Juarez Campuzano'
          desciption='Mínimo 2 palabras, máximo 4. Sin caracteres especiales.'
        >
          Nombre Completo
        </Input>
        <Input
          name='email'
          required
          placeholder='e.g pepito.juarez@gmail.com'
          desciption='Debe terminar en @gmail.com'
        >
          Correo Electrónico
        </Input>
        <Input name='birthDate' required type='date'>
          Fecha de nacimiento
        </Input>
        <RoleSelect label name='roleName' />
        <CitySelect
          name='department'
          label='Departamento de residencia'
          values={departments}
          onSelect={setChosenDepartment}
        />
        <CitySelect
          disabled={!chosenDepartment || chosenDepartment === ''}
          name='municipality'
          label='Municipio de residencia'
          values={municipalities}
        />
        <Input
          name='password'
          required
          placeholder='************'
          desciption='Min. 8 caracteres, una mayúscula y un número o carácter especial.'
        >
          Contraseña
        </Input>
      </div>
      <Button type='submit' className='bg-blue-600 text-white self-end'>
        Crear Usuario
      </Button>
    </form>
  )
}

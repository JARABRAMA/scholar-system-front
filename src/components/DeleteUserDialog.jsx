import { Button } from '../components/Button.jsx'

export function DeleteUserDialog ({ deleteDialogRef, fullName, onToggleShowDeleteDialog }) {
  return (
    <dialog
      className='justify-self-center self-center rounded-2xl'
      ref={deleteDialogRef}
    >
      <div className='grid text-center grid-cols-2 p-4 gap-4 items-center justify-center'>
        <h3 className='col-span-2 text-2xl font-bold'>
          <svg className='size-16 justify-self-center text-red-500'>
            <use href='/sprite.svg#warning' />
          </svg>
          Alerta!
        </h3>

        <p className='col-span-2'>
          Estas seguro de que quieres eliminar
          <br /> el usuario {fullName}
        </p>

        <Button
          className='border hover:bg-stone-100'
          onClick={onToggleShowDeleteDialog}
        >
          Cancelar
        </Button>
        <Button
          className='bg-red-50 text-red-600 border border-red-600 hover:bg-red-100 hover:text-red-600'
        >
          Eliminar Usuario
        </Button>
      </div>

    </dialog>
  )
}

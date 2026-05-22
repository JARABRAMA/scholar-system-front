import { Button } from '../components/Button.jsx'
import { ErrorContainer } from './ErrorContainer.jsx'
import { Spinner } from './Spinner.jsx'

export function DeleteUserDialog ({
  deleteDialogRef, fullName, onToggleShowDeleteDialog,
  errorDelete, loadingDelete,
  onDelete, onDissmissDeleteError
}) {
  return (
    <dialog
      className='justify-self-center self-center rounded-2xl'
      ref={deleteDialogRef}
    >
      {!loadingDelete && !errorDelete && <DeleteContent
        fullName={fullName}
        onDelete={onDelete}
        onToggleShowDeleteDialog={onToggleShowDeleteDialog}
                                         />}
      {loadingDelete && !errorDelete && <Spinner />}

      {errorDelete &&
        <div className='p-4'>
          <ErrorContainer
            error={errorDelete} onDissmissError={() => {
              onToggleShowDeleteDialog()
              onDissmissDeleteError()
            }}
          />
        </div>}
    </dialog>
  )
}

function DeleteContent ({ fullName, onToggleShowDeleteDialog, onDelete }) {
  return (
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
        onClick={onDelete}
      >
        Eliminar Usuario
      </Button>
    </div>
  )
}

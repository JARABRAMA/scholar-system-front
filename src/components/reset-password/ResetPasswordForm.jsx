import { useEffect, useRef, useState } from 'react'
import { HeaderForm } from './HeaderForm.jsx'
import { Input } from '../Input'
import { FormErrorMessage } from './FormErrorMessage.jsx'
import { Button } from '../Button.jsx'
import { LoadingDialog } from '../LoadingDialog.jsx'
import { useNavigate } from 'react-router'
import { useResetPasswordForm } from '../../hooks/reset-password/useResetPasswordForm.jsx'

export function ResetPasswordForm ({ resetToken }) {
  const {
    loadingDialogRef, isSuccess, onSubmit, firstPassword, resetPassError,
    onChangePassword, setFirstPassword, secondPassword, setSecondPassword
  } = useResetPasswordForm({ resetToken })
  return (
    <>
      <FormErrorMessage error={FormErrorMessage} />
      <LoadingDialog ref={loadingDialogRef} />
      <ResetPasswordSuccessDialog isSuccess={isSuccess} />
      <form onSubmit={onSubmit} className='p-8 bg-stone-200 shadow-sm shadow-stone-300 rounded-2xl flex flex-col gap-8'>
        <HeaderForm title='Ingresa tu nueva contraseña' description='Elige una nueva contraseña segura' />
        <PasswordInput
          value={firstPassword}
          onSetValue={(value) => onChangePassword(value, setFirstPassword)}
          text='Ingresa tu contraseña'
        />
        <PasswordInput
          value={secondPassword}
          onSetValue={(value) => onChangePassword(value, setSecondPassword)}
          text='Confirma tu contraseña'
        />
        <FormErrorMessage error={resetPassError} />
        <Button type='submit' className='bg-blue-600 text-white hover:bg-blue-700 w-fit self-end'>
          Cambiar contraseña
        </Button>
      </form>
    </>
  )
}

function ResetPasswordSuccessDialog ({ isSuccess }) {
  const navigate = useNavigate()
  const dialogRef = useRef()

  useEffect(() => {
    if (isSuccess) {
      dialogRef.current.showModal()
    } else {
      dialogRef.current.close()
    }
  }, [dialogRef, isSuccess])

  return (
    <dialog ref={dialogRef} className='self-center justify-self-center p-8 rounded-xl border'>
      <div className='flex flex-col gap-4'>
        <svg className='size-13 text-green-600 bg-green-100 p-2 rounded-full border-2'>
          <use href='/sprite.svg#checked' />
        </svg>
        <h3 className='font-bold text-2xl'>Cambiaste la contraseña con exito</h3>
        <p>Ahora puedes iniciar sesion con tu nueva contraseña</p>
        <Button
          onClick={() => { navigate(-1) }}
          className='bg-blue-600 hover:bg-blue-700 text-white w-fit self-start'
        >
          Iniciar sesion
        </Button>
      </div>
    </dialog>
  )
}

function PasswordInput ({ value, onSetValue, text }) {
  const [isViewMode, setIsViewMode] = useState(false)
  const toggleViewMode = () => {
    setIsViewMode(!isViewMode)
  }
  const viewModeButtonClass = 'bg-blue-700 text-blue-50 border-blue-50 border-2'
  return (
    <div className='grid grid-cols-[1fr_auto] gap-2 items-center justify-center'>
      <Input
        value={value}
        onChange={(e) => onSetValue(e.target.value)}
        required type={isViewMode ? 'text' : 'password'}
      >
        {text}
      </Input>
      <button
        type='button'
        onClick={toggleViewMode}
        className={`flex mask-center duration-100 active:scale-95 justify-self-end self-end mb-2 p-1
       border rounded-lg  ${isViewMode ? viewModeButtonClass : 'text-blue-700 bg-blue-50'}`}
      >

        <svg className='size-6 mask-center'>
          <use href='/sprite.svg#eye' />
        </svg>
      </button>
    </div>
  )
}

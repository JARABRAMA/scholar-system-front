import { Input } from '../Input.jsx'
import { Button } from '../Button.jsx'
import { LoadingDialog } from '../LoadingDialog.jsx'
import { useSendCodeForm } from '../../hooks/reset-password/useSendCodeForm.jsx'
import { FormErrorMessage } from './FormErrorMessage.jsx'
import { HeaderForm } from './HeaderForm.jsx'

export function SendCodeForm ({ onSetStatus, onSetEmail, email }) {
  const { dialogRef, onSubmit, codeSendingError } = useSendCodeForm({ onSetStatus, email })

  return (
    <>
      <LoadingDialog ref={dialogRef} />
      <form onSubmit={onSubmit} className='p-8 bg-stone-200 shadow-sm shadow-stone-300 rounded-2xl flex flex-col gap-8'>
        <HeaderForm title='Recupera tu contraseña' description='Ingresa tu correo electronico y te enviaremos codigo a tu correo' />
        <Input placeholder='email.ejemplo@gmail.com' type='email' name='email' required value={email} onChange={(e) => onSetEmail(e.target.value)}>
          Ingreasa tu email
        </Input>
        <FormErrorMessage error={codeSendingError} />
        <Button type='submit' className='bg-blue-600 flex w-fit self-end gap-4 ps-8 text-white'>
          Enviar codigo
          <svg className='size-6'>
            <use href='/sprite.svg#navigate-next' />
          </svg>
        </Button>
      </form>
    </>
  )
}

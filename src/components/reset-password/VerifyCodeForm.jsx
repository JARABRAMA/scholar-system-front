import { Button } from '../Button'
import { Input } from '../Input'
import { useVerifyCodeForm } from '../../hooks/reset-password/useVerifyCodeForm.jsx'
import { LoadingDialog } from '../LoadingDialog.jsx'
import { FormErrorMessage } from './FormErrorMessage.jsx'
import { HeaderForm } from './HeaderForm'

export function VerifyCodeForm ({ email, setStatus, onSetResetToken }) {
  const { loadingDialogRef, onSubmit, code, onSetCode, validateError: error } = useVerifyCodeForm({ email, setStatus, onSetResetToken })
  return (
    <>
      <LoadingDialog ref={loadingDialogRef} />
      <form onSubmit={onSubmit} className='p-8 bg-stone-200 shadow-sm shadow-stone-300 rounded-2xl flex flex-col gap-8'>
        <HeaderForm
          title='Hemos enviado un codigo a tu direccion de correo'
          description='Ingresa el codigo para que podamos verificar que si seas tu'
        />
        <Input
          required
          value={code}
          onChange={(e) => onSetCode(e.target.value)}
          placeholder='XXXXXX'
        >Ingresa el codigo
        </Input>
        <FormErrorMessage error={error} />
        <Button
          className='bg-blue-600 hover:bg-blue-700 text-white
         w-fit self-end'
          type='submit'
        >Verificar codigo
        </Button>
      </form>
    </>
  )
}

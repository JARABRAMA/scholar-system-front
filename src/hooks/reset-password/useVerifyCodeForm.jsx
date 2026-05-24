import { useState, useRef, useEffect } from 'react'
import { ResetPasswordStatus } from '../../utils/ResetPasswordStatus'

export function useVerifyCodeForm ({ email, onSetResetToken, setStatus }) {
  const authService = import.meta.env.VITE_BASE_URL
  const [code, setCode] = useState('')
  const onSetCode = (value) => { setCode(value) }
  const [validateLoading, setValidateLoading] = useState(false)
  const [validateError, setValidateError] = useState()

  const loadingDialogRef = useRef()
  useEffect(() => {
    if (validateLoading) {
      loadingDialogRef.current.showModal()
    } else {
      loadingDialogRef.current.close()
    }
  }, [loadingDialogRef, validateLoading])

  const onSubmit = async (event) => {
    setValidateError()
    setValidateLoading(true)
    event.preventDefault()

    try {
      const validateReqBody = { code, email }
      const res = await fetch(`${authService}/auth/validate-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validateReqBody)
      })
      const data = await res.json()
      if (res.ok) {
        onSetResetToken(data.resetToken)
        setStatus(ResetPasswordStatus.RESET_PASSWORD)
      } else {
        setValidateError(data.detail)
      }
    } catch (e) {
      console.log('Error: ', e)
      setValidateError('Error de conexion, porfavor intenta mas tarde')
    } finally {
      setValidateLoading(false)
    }
  }

  return {
    loadingDialogRef,
    onSubmit,
    code,
    onSetCode,
    validateError
  }
}

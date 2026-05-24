import { useState, useRef, useEffect } from 'react'

export function useResetPasswordForm ({ resetToken }) {
  const [firstPassword, setFirstPassword] = useState('')
  const [secondPassword, setSecondPassword] = useState('')
  const [resetPassError, setResetPassError] = useState()
  const [loading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const onChangePassword = (value, setFunction) => { setFunction(value) }
  const authServiceUrl = import.meta.env.VITE_BASE_URL

  const loadingDialogRef = useRef()

  useEffect(() => {
    if (loading) {
      loadingDialogRef.current.showModal()
    } else {
      loadingDialogRef.current.close()
    }
  }, [loading, loadingDialogRef])

  const success = () => { setIsSuccess(true) }

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResetPassError()
    if (secondPassword !== firstPassword) {
      setResetPassError('Las contraseñas no coinciden')
    }
    const updatePassReqBody = {
      newPassword: firstPassword,
      resetToken
    }
    try {
      const res = await fetch(
        `${authServiceUrl}/auth/reset-password`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatePassReqBody)
        })

      if (!res.ok) {
        const data = await res.json()
        setResetPassError(data.detail)
      } else {
        success()
      }
    } catch (e) {
      console.log('Error: ', e)
      setResetPassError('Error de conexion, porfavor intenta mas tarde')
    } finally {
      setLoading(false)
    }
  }

  return {
    loadingDialogRef,
    isSuccess,
    onSubmit,
    firstPassword,
    onChangePassword,
    setFirstPassword,
    secondPassword,
    setSecondPassword,
    resetPassError
  }
}

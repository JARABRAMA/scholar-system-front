import { useState } from 'react'
import { SendCodeForm } from '../components/reset-password/SendCodeForm.jsx'
import { VerifyCodeForm } from '../components/reset-password/VerifyCodeForm.jsx'
import { ResetPasswordStatus } from '../utils/ResetPasswordStatus.js'
import { ResetPasswordForm } from '../components/reset-password/ResetPasswordForm.jsx'

export function ResetPasswordScreen () {
  return (
    <Content />
  )
}

function Content () {
  const [email, setEmail] = useState('')
  const onSetEmail = (value) => { setEmail(value) }
  const [status, setStatus] = useState(ResetPasswordStatus.SEND_CODE)
  const onSetStatus = (value) => { setStatus(value) }
  const [resetToken, setResetToken] = useState()
  const onSetResetToken = (value) => { setResetToken(value) }
  const isSendingCode = status === ResetPasswordStatus.SEND_CODE
  const isVerifyingCode = status === ResetPasswordStatus.VERIFY_CODE
  const isResettingPassword = status === ResetPasswordStatus.RESET_PASSWORD

  return (
    <main className='flex bg-stone-100 flex-1 flex-col items-center justify-center'>
      {isSendingCode && <SendCodeForm onSetStatus={onSetStatus} onSetEmail={onSetEmail} email={email} />}
      {isVerifyingCode && <VerifyCodeForm email={email} onSetResetToken={onSetResetToken} setStatus={onSetStatus} />}
      {isResettingPassword && <ResetPasswordForm resetToken={resetToken} />}
    </main>
  )
}

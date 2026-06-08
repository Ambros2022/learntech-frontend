'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { useRouter } from 'src/hooks/useCompatRouter'
import styles from './AuthForms.module.css'
import ForgotPasswordForm from './ForgotPasswordForm'
import OtpVerificationForm from './OtpVerificationForm'
import NewPasswordForm from './NewPasswordForm'

const schema = z.object({
  email: z.string().trim().email('Email is not valid'),
  password: z.string().trim().min(1, 'Password is Required'),
})

type FormValues = z.infer<typeof schema>

export default function SignInForm({ closeModal }: { closeModal: () => void }) {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [step, setStep] = useState<'signin' | 'forgot' | 'otp' | 'newpass'>('signin')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  })

  const backToSignIn = () => {
    setEmail('')
    setOtp('')
    setStep('signin')
  }

  const onSubmit = async (values: FormValues) => {
    try {
      const body = new FormData()
      body.append('email', values.email)
      body.append('password', values.password)

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}api/auth/user/signin`, { method: 'POST', body })
      const data = await res.json()

      if (data.status === 1) {
        localStorage.setItem('UserData', JSON.stringify(data.data))
        window.dispatchEvent(new Event('storage'))
        toast.success(data.message)
        reset()
        router.push('/write-review')
        closeModal()
      } else {
        toast.error(data.message)
      }
    } catch (err: any) {
      toast.error(err.message ?? 'Something went wrong')
    }
  }

  return (
    <div className='container mt-3'>
      {step === 'forgot' ? (
        <ForgotPasswordForm
          onNext={() => setStep('otp')}
          setEmail={setEmail}
          onBackToSignIn={backToSignIn}
        />
      ) : step === 'otp' ? (
        <OtpVerificationForm
          onNext={() => setStep('newpass')}
          email={email}
          setOtp={setOtp}
          onBack={() => setStep('forgot')}
        />
      ) : step === 'newpass' ? (
        <NewPasswordForm email={email} otp={otp} onBackToSignIn={backToSignIn} />
      ) : (
        <>
          <h5 className='text-center text-black'>Welcome back!</h5>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-3'>
              <label htmlFor='email' className='form-label text-black'>Email address</label>
              <input type='email' className='form-control' id='email' {...register('email')} />
              {errors.email && <div className='text-danger'>{errors.email.message}</div>}
            </div>
            <div className='mb-3'>
              <label htmlFor='password' className='form-label text-black'>Password</label>
              <div className={`input-group ${styles.passwordInput}`}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className='form-control'
                  id='password'
                  {...register('password')}
                />
                <button className={`btn ${styles.eyeBtn}`} type='button' onClick={() => setShowPassword(p => !p)}>
                  <i className={showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'} style={{ color: '#254692' }} />
                </button>
              </div>
              {errors.password && <div className='text-danger'>{errors.password.message}</div>}
            </div>
            <div className='mb-3 text-center'>
              <small
                className='btn-link text-blue'
                style={{ cursor: 'pointer' }}
                onClick={() => setStep('forgot')}
              >
                Forgot Password?
              </small>
            </div>
            <div className='d-grid mb-3'>
              <button type='submit' className={`btn ${styles.btnSignUp} btn-block`}>Log In</button>
            </div>
          </form>
        </>
      )}
    </div>
  )
}

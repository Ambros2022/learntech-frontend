'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import styles from './AuthForms.module.css'

const schema = z.object({
  email: z.string().trim().email('Email is not valid'),
})

type FormValues = z.infer<typeof schema>

interface Props {
  onNext: () => void
  setEmail: (email: string) => void
  onBackToSignIn: () => void
}

export default function ForgotPasswordForm({ onNext, setEmail, onBackToSignIn }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      const body = new FormData()
      body.append('email', values.email)

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}api/auth/user/forgotPassword`, { method: 'POST', body })
      const data = await res.json()

      if (data.status === 1) {
        toast.success(data.message)
        setEmail(values.email)
        reset()
        onNext()
      } else {
        toast.error(data.errors?.[0]?.msg ?? data.message)
      }
    } catch (err: any) {
      toast.error(err.message ?? 'Something went wrong')
    }
  }

  return (
    <div className='container mt-3'>
      <h5 className='text-center text-black'>Forgot Password</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label text-black'>Email address</label>
          <input type='email' className='form-control' id='email' {...register('email')} />
          {errors.email && <div className='text-danger'>{errors.email.message}</div>}
        </div>
        <div className='d-grid mb-3'>
          <button type='submit' className={`btn ${styles.btnSignUp} btn-block`}>Verify Password</button>
        </div>
        <div className='mb-3 text-center'>
          <small className='btn-link text-blue' style={{ cursor: 'pointer' }} onClick={onBackToSignIn}>
            Back to Log In
          </small>
        </div>
      </form>
    </div>
  )
}

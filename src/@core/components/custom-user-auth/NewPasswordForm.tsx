'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import styles from './AuthForms.module.css'

const schema = z
  .object({
    password: z.string().trim().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().trim().min(1, 'Confirm Password is required'),
  })
  .refine(d => d.password === d.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })

type FormValues = z.infer<typeof schema>

interface Props {
  email: string
  otp: string
  onBackToSignIn: () => void
}

export default function NewPasswordForm({ email, otp, onBackToSignIn }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { password: '', confirmPassword: '' },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      const body = new FormData()
      body.append('email', email)
      body.append('token', otp)
      body.append('password', values.password)

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}api/auth/user/newPassword`, { method: 'POST', body })
      const data = await res.json()

      if (data.status === 1) {
        toast.success(data.message)
        reset()
        onBackToSignIn()
      } else {
        toast.error(data.message)
      }
    } catch (err: any) {
      toast.error(err.message ?? 'Something went wrong')
    }
  }

  return (
    <div className='container mt-3'>
      <h5 className='text-center text-black'>Set New Password</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label text-black'>New Password</label>
          <input type='password' className='form-control' id='password' {...register('password')} />
          {errors.password && <div className='text-danger'>{errors.password.message}</div>}
        </div>
        <div className='mb-3'>
          <label htmlFor='confirmPassword' className='form-label text-black'>Confirm Password</label>
          <input type='password' className='form-control' id='confirmPassword' {...register('confirmPassword')} />
          {errors.confirmPassword && <div className='text-danger'>{errors.confirmPassword.message}</div>}
        </div>
        <div className='d-grid mb-3'>
          <button type='submit' className={`btn ${styles.btnSignUp} btn-block`}>Set New Password</button>
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

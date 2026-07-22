'use client'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { LazyPhoneInputField } from 'src/app/components/ClientWrappers'
import { toast } from 'sonner'
import styles from './AuthForms.module.css'
import Link from 'next/link'
import { useRouter } from 'src/hooks/useCompatRouter'

const schema = z
  .object({
    name: z.string().trim().min(1, 'Required'),
    email: z.string().trim().email('Email is not valid'),
    mobile: z.string().min(1, 'Required').refine(v => /^\+\d{1,4}-\d{3,}$/.test(v), 'Phone is not valid'),
    password: z.string().trim().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().trim().min(1, 'Required'),
    agree: z.boolean().refine(v => v === true, 'Must agree to terms and conditions'),
  })
  .refine(d => d.password === d.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })

type FormValues = z.infer<typeof schema>

export default function SignupForm({ closeModal }: { closeModal: () => void }) {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', mobile: '', password: '', confirmPassword: '', agree: false },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      const body = new FormData()
      body.append('name', values.name)
      body.append('email', values.email)
      body.append('mobile', values.mobile)
      body.append('password', values.password)
      body.append('confirmpassword', values.confirmPassword)

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}api/auth/user/signup`, { method: 'POST', body })
      const data = await res.json()

      if (data.status === 1) {
        localStorage.setItem('UserData', JSON.stringify(data.data))
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
      <h5 className='text-center text-black'>Create new account</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label text-black'>Name</label>
          <input type='text' className='form-control' id='name' {...register('name')} />
          {errors.name && <div className='text-danger'>{errors.name.message}</div>}
        </div>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label text-black'>Email address</label>
          <input type='email' className='form-control' id='email' {...register('email')} />
          {errors.email && <div className='text-danger'>{errors.email.message}</div>}
        </div>
        <div className='mb-3'>
          <label htmlFor='mobile' className='form-label text-black'>Phone</label>
          <Controller
            name='mobile'
            control={control}
            render={({ field }) => <LazyPhoneInputField field={field} />}
          />
          {errors.mobile && <div className='text-danger'>{errors.mobile.message}</div>}
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
        <div className='mb-3'>
          <label htmlFor='confirmPassword' className='form-label text-black'>Confirm Password</label>
          <div className={`input-group ${styles.passwordInput}`}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              className='form-control'
              id='confirmPassword'
              {...register('confirmPassword')}
            />
            <button className={`btn ${styles.eyeBtn}`} type='button' onClick={() => setShowConfirmPassword(p => !p)}>
              <i className={showConfirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'} style={{ color: '#254692' }} />
            </button>
          </div>
          {errors.confirmPassword && <div className='text-danger'>{errors.confirmPassword.message}</div>}
        </div>
        <div className='mb-3 form-check'>
          <input type='checkbox' className='form-check-input' id='agree' {...register('agree')} />
          <label className='form-check-label text-black' htmlFor='agree'>
            By signing up, you will agree to our{' '}
            <Link href='/terms-and-conditions'>
              <span className='text-blue fw-bold'> Terms, Data Policy </span>
            </Link>{' '}
            and <span className='text-blue fw-bold'> Cookies Policy.</span>
          </label>
          {errors.agree && <div className='text-danger'>{errors.agree.message}</div>}
        </div>
        <div className='d-grid mb-3'>
          <button type='submit' className={`btn ${styles.btnSignUp} btn-block`}>Sign Up</button>
        </div>
      </form>
    </div>
  )
}

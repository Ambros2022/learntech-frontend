'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import styles from './AuthForms.module.css'

const schema = z.object({
  otp: z.string().trim().min(1, 'OTP is required'),
})

type FormValues = z.infer<typeof schema>

interface Props {
  onNext: () => void
  email: string
  setOtp: (otp: string) => void
  onBack: () => void
}

export default function OtpVerificationForm({ onNext, email, setOtp, onBack }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { otp: '' },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      const body = new FormData()
      body.append('email', email)
      body.append('token', values.otp)

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}api/auth/user/forgotPassword/tokenverify`, { method: 'POST', body })
      const data = await res.json()

      if (data.status === 1) {
        toast.success(data.message)
        setOtp(values.otp)
        reset()
        onNext()
      } else {
        toast.error(data.message)
      }
    } catch (err: any) {
      toast.error(err.message ?? 'Something went wrong')
    }
  }

  return (
    <div className='container mt-3'>
      <h5 className='text-center text-black'>Verify OTP</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-3'>
          <label htmlFor='otp' className='form-label text-black'>OTP</label>
          <input type='text' className='form-control' id='otp' {...register('otp')} />
          {errors.otp && <div className='text-danger'>{errors.otp.message}</div>}
        </div>
        <div className='d-grid mb-3'>
          <button type='submit' className={`btn ${styles.btnSignUp} btn-block`}>Verify OTP</button>
        </div>
        <div className='mb-3 text-center'>
          <small className='btn-link text-blue' style={{ cursor: 'pointer' }} onClick={onBack}>
            Back to Forgot Password
          </small>
        </div>
      </form>
    </div>
  )
}

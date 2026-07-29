'use client'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { useRouter } from 'src/hooks/useCompatRouter'
import { LazyPhoneInputField as PhoneInputField } from 'src/app/components/ClientWrappers'
import Link from 'next/link'

import { phoneSchema, submitEnquiry } from './formUtils'

const schema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().trim().email('Email is not valid'),
  contact_number: phoneSchema,
  location: z.string().trim().min(1, 'Location is required'),
  message: z.string(),
  terms: z.boolean().refine(v => v === true, 'You must accept the terms and conditions'),
})

type FormValues = z.infer<typeof schema>

interface Props {
  page?: string
  onChanges?: () => void
}

export default function ContactUsForm({ onChanges }: Props) {
  const router = useRouter()

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      contact_number: '',
      location: '',
      message: '',
      terms: false,
    },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      toast.loading('Processing')
      const ok = await submitEnquiry({
        name: values.name,
        email: values.email,
        contact_number: values.contact_number,
        location: values.location,
        message: values.message,
      })
      toast.dismiss()
      if (ok) {
        toast.success('Thank you. We will get back to you.')
        reset()
        onChanges?.()
        router.push('/thank-you')
      } else {
        toast.error('Try again later!')
      }
    } catch {
      toast.dismiss()
      toast.error('Try again later!')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <input type="text" placeholder="Full Name*" className="form-control" {...register('name')} />
        {errors.name && <div className="error text-danger">{errors.name.message}</div>}
      </div>
      <div className="mb-3">
        <input type="email" placeholder="Email ID*" className="form-control" {...register('email')} />
        {errors.email && <div className="error text-danger">{errors.email.message}</div>}
      </div>
      <div className="mb-3">
        <Controller
          name="contact_number"
          control={control}
          render={({ field }) => <PhoneInputField field={field} />}
        />
        {errors.contact_number && <div className="error text-danger">{errors.contact_number.message}</div>}
      </div>
      <div className="mb-3">
        <input type="text" placeholder="Location*" className="form-control" {...register('location')} />
        {errors.location && <div className="error text-danger">{errors.location.message}</div>}
      </div>
      <div className="mb-3">
        <textarea placeholder="Type your message" className="form-control" {...register('message')} />
        {errors.message && <div className="error text-danger">{errors.message.message}</div>}
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input border-black" id="terms" {...register('terms')} />
        <label className="form-check-label" htmlFor="terms">
          By Clicking this, I agree to the <Link href="/terms-and-conditions">Terms & Conditions</Link>
        </label>
        {errors.terms && <div className="error text-danger">{errors.terms.message}</div>}
      </div>
      <div className="d-grid pb-3">
        <button type="submit" className="submitBtn btn-xl btn-block btn">Submit</button>
      </div>
    </form>
  )
}

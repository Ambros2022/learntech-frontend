'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { useRouter } from 'src/hooks/useCompatRouter'
import { LazyPhoneInputField as PhoneInputField } from 'src/app/components/ClientWrappers'
import { phoneSchema, submitEnquiry } from './formUtils'

const schema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().trim().email('Email is not valid'),
  contact_number: phoneSchema,
})

type FormValues = z.infer<typeof schema>

export default function NewsLetterEnquiry() {
  const router = useRouter()
  const {
    register, control, handleSubmit, reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', contact_number: '' },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      toast.loading('Processing')
      const ok = await submitEnquiry({
        name: values.name,
        email: values.email,
        contact_number: values.contact_number,
      })
      toast.dismiss()
      if (ok) {
        toast.success('Thank you. We will get back to you.')
        reset()
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
    <form onSubmit={handleSubmit(onSubmit)} className="container expertInquirySec">
      <div className="row mb-3">
        <div className="col-lg-3 col-md-6 mb-3 px-xl-4 px-lg-3 px-md-5">
          <input type="text" placeholder="Enter Name" className="form-control text-black" {...register('name')} />
          {errors.name && <div className="error text-danger">{errors.name.message}</div>}
        </div>
        <div className="col-lg-3 col-md-6 mb-3 px-xl-4 px-lg-3 px-md-5">
          <Controller name="contact_number" control={control} render={({ field }) => <PhoneInputField field={field} />} />
          {errors.contact_number && <div className="error text-danger">{errors.contact_number.message}</div>}
        </div>
        <div className="col-lg-3 col-md-6 mb-3 px-xl-4 px-lg-3 px-md-5">
          <input type="email" placeholder="Enter Email" className="form-control" {...register('email')} />
          {errors.email && <div className="error text-danger">{errors.email.message}</div>}
        </div>
        <div className="col-lg-3 col-md-6 mb-3 px-xl-4 text-md-start text-center px-lg-3 px-md-5">
          <button type="submit" disabled={isSubmitting} className="btn reqBtn">Submit</button>
        </div>
      </div>
    </form>
  )
}

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
  location: z.string().trim().min(1, 'Location is required'),
  course: z.string().trim().min(1, 'Course is required'),
  message: z.string().trim(),
})

type FormValues = z.infer<typeof schema>

export default function EnquiryFormMed({ heading }: { heading: string }) {
  const router = useRouter()
  const {
    register, control, handleSubmit, reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', contact_number: '', location: '', course: '', message: '' },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      toast.loading('Processing')
      const ok = await submitEnquiry({
        name: values.name,
        email: values.email,
        contact_number: values.contact_number,
        location: values.location,
        course_in_mind: values.course,
        message: values.message,
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
    <div className="bg-skyBlue px-3 rounded">
      <h3 className="fw-bold text-blue text-center pt-0 mb-3 f20">{heading}</h3>
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
          <Controller name="contact_number" control={control} render={({ field }) => <PhoneInputField field={field} />} />
          {errors.contact_number && <div className="error text-danger">{errors.contact_number.message}</div>}
        </div>
        <div className="mb-3">
          <input type="text" placeholder="Location*" className="form-control" {...register('location')} />
          {errors.location && <div className="error text-danger">{errors.location.message}</div>}
        </div>
        <div className="mb-3">
          <input type="text" placeholder="Interested Course*" className="form-control" {...register('course')} />
          {errors.course && <div className="error text-danger">{errors.course.message}</div>}
        </div>
        <div className="mb-3">
          <textarea placeholder="Type your message" className="form-control" {...register('message')} />
        </div>
        <div className="text-center pb-3">
          <button type="submit" disabled={isSubmitting} className="submitBtn btn-xl btn-block btn">
            Reserve Now
          </button>
        </div>
      </form>
    </div>
  )
}

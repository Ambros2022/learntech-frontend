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
  name: z.string().trim().min(1, 'Full Name is required'),
  email: z.string().trim().email('Invalid email address'),
  contact_number: phoneSchema,
  location: z.string().trim().min(1, 'Location is required'),
  course: z.string().trim().min(1, 'Preferred course is required'),
  college: z.string().trim(),
  message: z.string().trim(),
  terms: z.boolean().refine(v => v, 'You must accept the terms and conditions'),
})

type FormValues = z.infer<typeof schema>

export default function ContactPageUsForm() {
  const router = useRouter()
  const {
    register, control, handleSubmit, reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', contact_number: '', location: '', course: '', college: '', message: '', terms: false },
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
        college_name: values.college,
        description: values.message,
      })
      toast.dismiss()
      if (ok) {
        toast.success('Thank you. We will get back to you.')
        reset()
        router.push('/thank-you')
      } else {
        toast.error('Please try again later!')
      }
    } catch {
      toast.dismiss()
      toast.error('Please try again later!')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-skyBlue mbbsAbroad rounded p-3">
      <h2 className="text-blue fw-bold text-center mb-3">Contact for Personalized Support!</h2>
      <div className="mb-3">
        <input type="text" className="form-control" placeholder="Full Name*" {...register('name')} />
        {errors.name && <div className="text-danger">{errors.name.message}</div>}
      </div>
      <div className="mb-3">
        <input type="email" className="form-control" placeholder="Email ID*" {...register('email')} />
        {errors.email && <div className="text-danger">{errors.email.message}</div>}
      </div>
      <div className="mb-3">
        <Controller name="contact_number" control={control} render={({ field }) => <PhoneInputField field={field} />} />
        {errors.contact_number && <div className="text-danger">{errors.contact_number.message}</div>}
      </div>
      <div className="mb-3">
        <input type="text" className="form-control" placeholder="Location*" {...register('location')} />
        {errors.location && <div className="text-danger">{errors.location.message}</div>}
      </div>
      <div className="mb-3">
        <input type="text" className="form-control" placeholder="Preferred Course*" {...register('course')} />
        {errors.course && <div className="text-danger">{errors.course.message}</div>}
      </div>
      <div className="mb-3">
        <input type="text" className="form-control" placeholder="Preferred College" {...register('college')} />
      </div>
      <div className="mb-3">
        <textarea className="form-control" placeholder="Type your message" {...register('message')} />
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input border-black" id="terms-contact-page" {...register('terms')} />
        <label className="form-check-label" htmlFor="terms-contact-page">
          By clicking submit, I agree to the terms &amp; conditions and privacy policy and give my
          consent to receive updates through SMS/Email.
        </label>
        {errors.terms && <div className="text-danger">{errors.terms.message}</div>}
      </div>
      <div className="mb-3 text-center">
        <button type="submit" disabled={isSubmitting} className="btn submitBtn">Submit</button>
      </div>
    </form>
  )
}

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
  college_name: z.string().trim(),
  course: z.string().trim().min(1, 'Course is required'),
  description: z.string().trim(),
  terms: z.boolean().refine(v => v, 'You must accept the terms and conditions'),
})

type FormValues = z.infer<typeof schema>

export default function AbroadEnquiryForm() {
  const router = useRouter()
  const {
    register, control, handleSubmit, reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', contact_number: '', location: '', college_name: '', course: '', description: '', terms: false },
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
        college_name: values.college_name,
        description: values.description,
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
    <form onSubmit={handleSubmit(onSubmit)} className="bg-skyBlue px-3 px-md-5 pt-3 pt-md-5 pb-3">
      <div className="row mb-3">
        <div className="text-center mb-3">
          <h3 className="fw-bold text-blue">Unlock Study Abroad Opportunities!</h3>
          <p className="stdud15">
            From choosing the right university to securing your admission, our experts are here to
            support your journey to international academic success.
          </p>
        </div>
        <div className="mb-3">
          <input type="text" placeholder="Full Name" className="form-control" {...register('name')} />
          {errors.name && <div className="error text-danger">{errors.name.message}</div>}
        </div>
        <div className="mb-3">
          <input type="email" placeholder="Email ID" className="form-control" {...register('email')} />
          {errors.email && <div className="error text-danger">{errors.email.message}</div>}
        </div>
        <div className="mb-3">
          <Controller name="contact_number" control={control} render={({ field }) => <PhoneInputField field={field} />} />
          {errors.contact_number && <div className="error text-danger">{errors.contact_number.message}</div>}
        </div>
        <div className="mb-3">
          <input type="text" placeholder="Location" className="form-control" {...register('location')} />
          {errors.location && <div className="error text-danger">{errors.location.message}</div>}
        </div>
        <div className="mb-3">
          <input type="text" placeholder="Preferred College" className="form-control" {...register('college_name')} />
        </div>
        <div className="mb-3">
          <input type="text" placeholder="Preferred Course" className="form-control" {...register('course')} />
          {errors.course && <div className="error text-danger">{errors.course.message}</div>}
        </div>
        <div className="mb-3">
          <textarea placeholder="Type your message" className="form-control" {...register('description')} />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input border-black" id="terms-abroad" {...register('terms')} />
          <label className="form-check-label" htmlFor="terms-abroad">
            By Clicking this, I agree to the{' '}
            <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
          </label>
          {errors.terms && <div className="error text-danger">{errors.terms.message}</div>}
        </div>
      </div>
      <div className="text-center reqBtn px-xl-4 px-lg-3 px-md-3 px-1">
        <button type="submit" disabled={isSubmitting} className="btn onBrdBtn">
          Get Onboard Now!
        </button>
      </div>
    </form>
  )
}

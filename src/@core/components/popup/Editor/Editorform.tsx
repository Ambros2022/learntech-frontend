'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { LazyPhoneInputField as PhoneInputField } from 'src/app/components/ClientWrappers'
import Link from 'next/link'
import { phoneSchema, submitEnquiry } from '../formUtils'

const schema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().trim().email('Email is not valid'),
  contact_number: phoneSchema,
  course: z.string().trim().min(1, 'Course is required'),
  location: z.string().trim().min(1, 'Location is required'),
  terms: z.boolean().refine(v => v, 'You must accept the terms and conditions'),
})

type FormValues = z.infer<typeof schema>

interface Props {
  page?: string
  onChanges?: () => void
}

export default function EditorEnquiryForm({ page, onChanges }: Props) {
  const {
    register, control, handleSubmit, reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', contact_number: '', course: '', location: '', terms: false },
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
      })
      toast.dismiss()
      if (ok) {
        toast.success('Thank you. We will get back to you.')
        reset()
        onChanges?.()
        window.location.href = `${process.env.NEXT_PUBLIC_WEB_URL}/thank-you`
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
        <input type="text" placeholder="Enter Name" className="form-control" {...register('name')} />
        {errors.name && <div className="error text-danger">{errors.name.message}</div>}
      </div>
      <div className="mb-3">
        <input type="email" placeholder="Enter Email" className="form-control" {...register('email')} />
        {errors.email && <div className="error text-danger">{errors.email.message}</div>}
      </div>
      <div className="mb-3">
        <Controller name="contact_number" control={control} render={({ field }) => <PhoneInputField field={field} />} />
        {errors.contact_number && <div className="error text-danger">{errors.contact_number.message}</div>}
      </div>
      <div className="mb-3">
        <input type="text" placeholder="Enter Course" className="form-control" {...register('course')} />
        {errors.course && <div className="error text-danger">{errors.course.message}</div>}
      </div>
      <div className="mb-3">
        <input type="text" placeholder="Enter Location" className="form-control" {...register('location')} />
        {errors.location && <div className="error text-danger">{errors.location.message}</div>}
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input border-black" id="terms-editor" {...register('terms')} />
        <label className="form-check-label" htmlFor="terms-editor">
          By Clicking this, I agree to the{' '}
          <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
        </label>
        {errors.terms && <div className="error text-danger">{errors.terms.message}</div>}
      </div>
      <div className="d-grid">
        <button type="submit" disabled={isSubmitting} className="submitBtn btn-xl btn-block btn">
          {page === 'Brochure' ? 'Download Brochure' : 'Submit'}
        </button>
      </div>
    </form>
  )
}

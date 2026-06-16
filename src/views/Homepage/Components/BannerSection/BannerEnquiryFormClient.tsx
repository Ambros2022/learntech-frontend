'use client'

import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { useRouter } from 'src/hooks/useCompatRouter'
import { LazyPhoneInputField as PhoneInputField } from 'src/app/components/ClientWrappers'
import Link from 'next/link'

const PHONE_RULES: [RegExp, RegExp][] = [
  [/^\+91-/, /^\+91-\d{10}$/],
  [/^\+966-/, /^\+966-\d{9}$/],
  [/^\+971-/, /^\+971-\d{9}$/],
  [/^\+974-/, /^\+974-\d{8}$/],
  [/^\+968-/, /^\+968-\d{8}$/],
  [/^\+965-/, /^\+965-\d{8}$/],
  [/^\+973-/, /^\+973-\d{8}$/],
  [/^\+977-/, /^\+977-\d{10}$/],
]

const isValidPhone = (val: string) => {
  const rule = PHONE_RULES.find(([prefix]) => prefix.test(val))
  return rule ? rule[1].test(val) : false
}

const schema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().trim().email('Email is not valid'),
  contact_number: z.string().refine(isValidPhone, 'Enter a valid phone number'),
  course: z.string().trim().min(1, 'Course is required'),
  location: z.string().trim().min(1, 'Location is required'),
  terms: z.boolean().refine(v => v === true, 'You must accept the terms and conditions'),
})

type FormValues = z.infer<typeof schema>

export default function BannerEnquiryFormClient() {
  const router = useRouter()
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      contact_number: '',
      course: '',
      location: '',
      terms: false,
    },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      toast.loading('Processing')
      const body = new FormData()
      body.append('name', values.name)
      body.append('email', values.email)
      body.append('contact_number', values.contact_number)
      body.append('location', values.location)
      body.append('course_in_mind', values.course)
      body.append('current_url', window.location.href)

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}api/website/enquiry`, {
        method: 'POST',
        body,
      })
      toast.dismiss()

      if (res.ok) {
        reset()
        router.push('/thank-you')
      } else {
        toast.error('Try again later!')
      }
    } catch {
      toast.error('Try again later!')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Enter Name"
          className="form-control"
          {...register('name')}
        />
        {errors.name && <div className="error text-danger">{errors.name.message}</div>}
      </div>

      <div className="mb-3">
        <input
          type="email"
          placeholder="Enter Email"
          className="form-control"
          {...register('email')}
        />
        {errors.email && <div className="error text-danger">{errors.email.message}</div>}
      </div>

      <div className="mb-3">
        <Controller
          name="contact_number"
          control={control}
          render={({ field }) => <PhoneInputField field={field} />}
        />
        {errors.contact_number && (
          <div className="error text-danger">{errors.contact_number.message}</div>
        )}
      </div>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Course in mind"
          className="form-control"
          {...register('course')}
        />
        {errors.course && <div className="error text-danger">{errors.course.message}</div>}
      </div>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Enter Location"
          className="form-control"
          {...register('location')}
        />
        {errors.location && <div className="error text-danger">{errors.location.message}</div>}
      </div>

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input border-black"
          id="bannerTerms"
          {...register('terms')}
        />
        <label className="form-check-label terms-label" htmlFor="bannerTerms">
          By clicking submit, I agree to the{' '}
          <Link href="/terms-and-conditions">terms &amp; conditions</Link> and privacy policy and
          give my consent to receive updates through SMS/Email.
        </label>
        {errors.terms && <div className="error text-danger">{errors.terms.message}</div>}
      </div>

      <div className="d-grid">
        <button
          type="submit"
          className="submitBtn btn-xl btn-block btn submitBtn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  )
}

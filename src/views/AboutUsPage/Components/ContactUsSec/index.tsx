'use client'

import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { useRouter } from 'src/hooks/useCompatRouter'
import { LazyPhoneInputField as PhoneInputField } from 'src/app/components/ClientWrappers'
import Link from 'next/link'
import Image from 'next/image'

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
  fullName: z.string().trim().min(1, 'Full Name is required'),
  email: z.string().trim().email('Email is not valid'),
  mobileNumber: z.string().refine(isValidPhone, 'Enter a valid phone number'),
  courseInMind: z.string().trim().min(1, 'Course In Mind is required'),
  location: z.string().trim().min(1, 'Location is required'),
  message: z.string().trim().optional().default(''),
  terms: z.boolean().refine(v => v === true, 'You must accept the terms and conditions'),
})

type FormValues = z.infer<typeof schema>

export default function ContactUsSec() {
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
      fullName: '',
      email: '',
      mobileNumber: '',
      courseInMind: '',
      location: '',
      message: '',
      terms: false,
    },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      toast.loading('Processing')
      const body = new FormData()
      body.append('name', values.fullName)
      body.append('email', values.email)
      body.append('contact_number', values.mobileNumber)
      body.append('course_in_mind', values.courseInMind)
      body.append('current_url', window.location.href)
      body.append('message', values.message || '')
      body.append('location', values.location)

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}api/website/enquiry`, {
        method: 'POST',
        body,
      })
      toast.dismiss()

      if (res.ok) {
        toast.success('Thank you. We will get back to you.')
        reset()
        router.push('/thank-you')
      } else {
        toast.error('Please try again later!')
      }
    } catch {
      toast.error('Please try again later!')
    }
  }

  return (
    <section>
      <div className="row g-0">
        <div className="col-md-6">
          <Image
            src="/images/icons/contact-team.webp"
            width={1000}
            height={1000}
            alt="Learntech admission counsellors"
            className="w-100 h-100"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="col-md-6 position-relative">
          <div className="bg-blue py-4 py-md-5 h-100 w-100 px-5 d-flex flex-column">
            <div className="align-content-center h-100 w-100">
              <h2 className="text-white fw-bold text-center mb-4">Contact Us</h2>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row px-md-5">
                  <div className="col-md-12 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full Name"
                      {...register('fullName')}
                    />
                    {errors.fullName && <div className="text-danger">{errors.fullName.message}</div>}
                  </div>

                  <div className="col-md-12 mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Id"
                      {...register('email')}
                    />
                    {errors.email && <div className="text-danger">{errors.email.message}</div>}
                  </div>

                  <div className="col-md-12 mb-3">
                    <Controller
                      name="mobileNumber"
                      control={control}
                      render={({ field }) => <PhoneInputField field={field} />}
                    />
                    {errors.mobileNumber && <div className="text-danger">{errors.mobileNumber.message}</div>}
                  </div>

                  <div className="col-md-12 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Course In Mind"
                      {...register('courseInMind')}
                    />
                    {errors.courseInMind && <div className="text-danger">{errors.courseInMind.message}</div>}
                  </div>

                  <div className="col-md-12 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Location"
                      {...register('location')}
                    />
                    {errors.location && <div className="text-danger">{errors.location.message}</div>}
                  </div>

                  <div className="col-md-12 mb-3">
                    <textarea
                      className="form-control"
                      placeholder="Type your message"
                      {...register('message')}
                    />
                    {errors.message && <div className="text-danger">{errors.message.message}</div>}
                  </div>

                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input border-black"
                      id="terms"
                      {...register('terms')}
                    />
                    <label className="form-check-label text-white" htmlFor="terms">
                      By Clicking this, I agree to the{' '}
                      <Link href="/terms-and-conditions" className="text-warning">
                        Terms & Conditions
                      </Link>
                    </label>
                    {errors.terms && <div className="error text-danger">{errors.terms.message}</div>}
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-success btn-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

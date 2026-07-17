'use client'

import { useEffect, useState, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { useRouter } from 'src/hooks/useCompatRouter'
import { LazyPhoneInputField as PhoneInputField } from 'src/app/components/ClientWrappers'

import { phoneSchema } from './formUtils'

const schema = z.object({
  name: z.string().min(1, 'Name is required').trim(),
  email: z.string().email('Email is not valid'),
  contact_number: phoneSchema,
  course: z.string().min(1, 'Stream is required'),
})

type FormValues = z.infer<typeof schema>

export interface Stream {
  id: number
  name: string
}

interface Props {
  placeholder?: string
  collegeName?: string
  /** Pre-fetched by the parent server component. Falls back to client fetch when omitted. */
  streams?: Stream[]
}

const API_BASE = (process.env.NEXT_PUBLIC_API_URI || '').replace(/\/+$/, '')

export default function ExpertEnquiryForm({ placeholder = 'Stream', collegeName, streams: streamsProp }: Props) {
  const router = useRouter()
  const [streams, setStreams] = useState<Stream[]>(streamsProp ?? [])
  const abortRef = useRef<AbortController | null>(null)

  // Only fetch client-side if the parent server component didn't pre-fetch streams
  useEffect(() => {
    if (streamsProp && streamsProp.length > 0) return
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller
    fetch(`${API_BASE}/api/website/stream/get?size=100`, { signal: controller.signal })
      .then(r => r.json())
      .then(json => setStreams((json?.data ?? []).map((s: any) => ({ id: s.id, name: s.name }))))
      .catch(err => { if (err?.name !== 'AbortError') console.error('[ExpertForm] stream fetch failed', err) })
    return () => abortRef.current?.abort()
  }, [streamsProp])

  // Keep in sync if parent re-renders with new streams
  useEffect(() => {
    if (streamsProp) setStreams(streamsProp)
  }, [streamsProp])

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', contact_number: '', course: '' },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      toast.loading('Processing')
      const body = new FormData()
      body.append('name', values.name)
      body.append('email', values.email)
      body.append('contact_number', values.contact_number)
      body.append('course_in_mind', values.course)
      body.append('college_name', collegeName || '')
      body.append('current_url', window.location.href)

      const res = await fetch(`${API_BASE}/api/website/enquiry`, { method: 'POST', body })
      toast.dismiss()

      if (res.ok) {
        toast.success('Thank you. We will get back to you.')
        reset()
        router.push('/thank-you')
      } else {
        toast.error('Failed to submit form. Please try again.')
      }
    } catch {
      toast.dismiss()
      toast.error('Error submitting form. Please try again later!')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container expertInquirySec">
      <div className="row mb-3">
        <div className="col-lg-3 col-md-6 mb-3 px-xl-4 px-lg-3 px-md-5">
          <input
            {...register('name')}
            type="text"
            placeholder="Enter Name"
            className="form-control text-black"
          />
          {errors.name && <div className="error text-danger">{errors.name.message}</div>}
        </div>

        <div className="col-lg-3 col-md-6 mb-3 px-xl-4 px-lg-3 px-md-5">
          <Controller
            control={control}
            name="contact_number"
            render={({ field }) => <PhoneInputField field={field} />}
          />
          {errors.contact_number && (
            <div className="error text-danger">{errors.contact_number.message}</div>
          )}
        </div>

        <div className="col-lg-3 col-md-6 mb-3 px-xl-4 px-lg-3 px-md-5">
          <input
            {...register('email')}
            type="email"
            placeholder="Enter Email"
            className="form-control"
          />
          {errors.email && <div className="error text-danger">{errors.email.message}</div>}
        </div>

        <div className="col-lg-3 col-md-6 mb-3 px-xl-4 px-lg-3 px-md-5">
          <select {...register('course')} className="form-control custom-select-bold-arrow">
            <option value="">Select {placeholder}</option>
            {streams.map(s => (
              <option key={s.id} value={s.name}>{s.name}</option>
            ))}
          </select>
          {errors.course && <div className="error text-danger">{errors.course.message}</div>}
        </div>
      </div>

      <div className="text-center px-xl-4 px-lg-3 px-md-3 px-1">
        <button type="submit" disabled={isSubmitting} className="btn reqBtn">
          Request for a Call Back
        </button>
      </div>
    </form>
  )
}

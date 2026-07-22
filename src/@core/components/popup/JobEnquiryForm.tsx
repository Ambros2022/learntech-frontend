'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { LazyPhoneInputField as PhoneInputField } from 'src/app/components/ClientWrappers'
import { phoneSchema } from './formUtils'

const API = (process.env.NEXT_PUBLIC_API_URI || '').replace(/\/+$/, '')

const schema = z.object({
  fullName: z.string().trim().min(1, 'Full Name is required'),
  email: z.string().trim().email('Email is not valid'),
  phone: phoneSchema,
  d_o_b: z.string().trim().min(1, 'Date of Birth is required'),
  jobs_position_id: z.string().min(1, 'Post Applied is required'),
  job_location_id: z.string().min(1, 'Job Location is required'),
  currentLocation: z.string().trim().min(1, 'Current Location is required'),
  total_exp: z.string().trim().min(1, 'Total Experience is required'),
})

type FormValues = z.infer<typeof schema>

interface Props {
  locations: { id: number; name: string }[]
  data: { id: number; name: string }[]
}

export default function JobEnquiryForm({ locations, data }: Props) {
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [showPhone, setShowPhone] = useState(true)

  const {
    register, control, handleSubmit, reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '', email: '', phone: '', d_o_b: '',
      jobs_position_id: '', job_location_id: '', currentLocation: '', total_exp: '',
    },
  })

  const onSubmit = async (values: FormValues) => {
    if (!resumeFile) {
      toast.error('Please upload resume.')
      return
    }
    try {
      toast.loading('Processing', { duration: 3000 })
      const body = new FormData()
      body.append('name', values.fullName)
      body.append('email', values.email)
      body.append('phone', values.phone)
      body.append('d_o_b', values.d_o_b)
      body.append('current_location', values.currentLocation)
      body.append('total_exp', values.total_exp)
      body.append('jobs_position_id', values.jobs_position_id)
      body.append('job_location_id', values.job_location_id)
      body.append('current_url', window.location.href)
      body.append('resume', resumeFile)

      const res = await fetch(`${API}/api/website/addjobsenquires/get`, { method: 'POST', body })
      toast.dismiss()
      if (res.ok) {
        toast.success('Thank you for submitting your details.', { duration: 5000 })
        reset()
        setResumeFile(null)
        setShowPhone(false)
        setTimeout(() => setShowPhone(true), 0)
      } else {
        toast.error('Error submitting form. Please try again later.')
      }
    } catch {
      toast.dismiss()
      toast.error('Error submitting form. Please try again later.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
      <div className="row mb-md-3 careerContact">
        <div className="col-md-6">
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Full Name*" {...register('fullName')} />
            {errors.fullName && <div className="text-danger">{errors.fullName.message}</div>}
          </div>
        </div>
        <div className="col-md-6 careerContact">
          <div className="mb-3">
            <input type="email" className="form-control" placeholder="Email Id" {...register('email')} />
            {errors.email && <div className="text-danger">{errors.email.message}</div>}
          </div>
        </div>
      </div>

      <div className="row mb-md-3 careerContact">
        <div className="col-md-6">
          <div className="mb-3 Jobenquiryphoneinput">
            {showPhone && (
              <Controller name="phone" control={control} render={({ field }) => <PhoneInputField field={field} />} />
            )}
            {errors.phone && <div className="text-danger">{errors.phone.message}</div>}
          </div>
        </div>
        <div className="col-md-6 careerContact">
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="DOB: DD/MM/YY" {...register('d_o_b')} />
            {errors.d_o_b && <div className="text-danger">{errors.d_o_b.message}</div>}
          </div>
        </div>
      </div>

      <div className="row mb-md-3 careerContact">
        <div className="col-md-6">
          <div style={{ position: 'relative' }}>
            <div className="mb-3 color-joenquiry">
              <select className="form-control" {...register('jobs_position_id')}>
                <option value="">Position Applied</option>
                {data.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
              </select>
              <div style={{ position: 'absolute', top: '50%', right: 10, transform: 'translateY(-50%)' }}>
                <i className="bi bi-caret-down-fill caret-down" />
              </div>
              {errors.jobs_position_id && <div className="text-danger">{errors.jobs_position_id.message}</div>}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div style={{ position: 'relative' }}>
            <div className="mb-3 color-joenquiry">
              <select className="form-control" {...register('job_location_id')}>
                <option value="">Job Location</option>
                {locations.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
              </select>
              <div style={{ position: 'absolute', top: '50%', right: 10, transform: 'translateY(-50%)' }}>
                <i className="bi bi-caret-down-fill caret-down" />
              </div>
              {errors.job_location_id && <div className="text-danger">{errors.job_location_id.message}</div>}
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-md-3 careerContact">
        <div className="col-md-6">
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Current Location" {...register('currentLocation')} />
            {errors.currentLocation && <div className="text-danger">{errors.currentLocation.message}</div>}
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Total Experience in Years" {...register('total_exp')} />
            {errors.total_exp && <div className="text-danger">{errors.total_exp.message}</div>}
          </div>
        </div>
        <div className="col-md-12">
          <div className="mb-3 jobFile">
            <input
              type="file"
              accept=".pdf,.docx"
              className="form-control jobFileInput"
              onChange={e => setResumeFile(e.currentTarget.files?.[0] ?? null)}
            />
            {resumeFile
              ? <div className="file-name">{resumeFile.name}</div>
              : <div className="placeholder-text">Please Upload a valid .Pdf or .Docx File</div>
            }
          </div>
        </div>
      </div>

      <div className="text-center">
        <button type="submit" disabled={isSubmitting} className="btn submitBtn">Submit</button>
      </div>
    </form>
  )
}

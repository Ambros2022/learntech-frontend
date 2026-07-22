'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { useRouter } from 'src/hooks/useCompatRouter'
import { submitEnquiry } from 'src/@core/components/popup/formUtils'

const schema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().trim().email('Email is not valid'),
  contact_number: z.string().trim().min(1, 'Phone Number is required'),
  message: z.string().trim(),
})

type FormValues = z.infer<typeof schema>

export default function ContactForm404() {
  const router = useRouter()
  const {
    register, handleSubmit, reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', contact_number: '', message: '' },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      toast.loading('Processing')
      const ok = await submitEnquiry({
        name: values.name,
        email: values.email,
        contact_number: values.contact_number,
        description: values.message,
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
    <>
      <h5 className="pb-3 fw-bold text-center text-blue">Contact Us</h5>
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
          <input type="text" placeholder="Enter Phone Number" className="form-control" {...register('contact_number')} />
          {errors.contact_number && <div className="error text-danger">{errors.contact_number.message}</div>}
        </div>
        <div className="mb-3">
          <textarea placeholder="Enter message" className="form-control" {...register('message')} />
        </div>
        <div className="d-grid">
          <button type="submit" disabled={isSubmitting} className="submitBtn btn-xl btn-block btn">
            Submit
          </button>
        </div>
      </form>
    </>
  )
}

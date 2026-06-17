'use client'
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
  location: z.string().trim().min(1, 'Location is required'),
  message: z.string(),
  terms: z.boolean().refine(v => v === true, 'You must accept the terms and conditions'),
})

type FormValues = z.infer<typeof schema>

interface Props {
  page?: string
  onChanges?: () => void
}

export default function ContactUsForm({ onChanges }: Props) {
  const router = useRouter()

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      contact_number: '',
      location: '',
      message: '',
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
      body.append('message', values.message)
      body.append('current_url', window.location.href)

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}api/website/enquiry`, {
        method: 'POST',
        body,
      })
      toast.dismiss()

      if (res.ok) {
        toast.success('Thank you. We will get back to you.')
        reset()
        onChanges?.()
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
        <input type="text" placeholder="Full Name*" className="form-control" {...register('name')} />
        {errors.name && <div className="error text-danger">{errors.name.message}</div>}
      </div>
      <div className="mb-3">
        <input type="email" placeholder="Email ID*" className="form-control" {...register('email')} />
        {errors.email && <div className="error text-danger">{errors.email.message}</div>}
      </div>
      <div className="mb-3">
        <Controller
          name="contact_number"
          control={control}
          render={({ field }) => <PhoneInputField field={field} />}
        />
        {errors.contact_number && <div className="error text-danger">{errors.contact_number.message}</div>}
      </div>
      <div className="mb-3">
        <input type="text" placeholder="Location*" className="form-control" {...register('location')} />
        {errors.location && <div className="error text-danger">{errors.location.message}</div>}
      </div>
      <div className="mb-3">
        <textarea placeholder="Type your message" className="form-control" {...register('message')} />
        {errors.message && <div className="error text-danger">{errors.message.message}</div>}
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input border-black" id="terms" {...register('terms')} />
        <label className="form-check-label" htmlFor="terms">
          By Clicking this, I agree to the <Link href="/terms-and-conditions">Terms & Conditions</Link>
        </label>
        {errors.terms && <div className="error text-danger">{errors.terms.message}</div>}
      </div>
      <div className="d-grid pb-3">
        <button type="submit" className="submitBtn btn-xl btn-block btn">Submit</button>
      </div>
    </form>
  )
}

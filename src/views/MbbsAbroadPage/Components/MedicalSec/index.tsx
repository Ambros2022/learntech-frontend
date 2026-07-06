'use client'
import React from 'react'
import ReadMoreContent from 'src/components/ui/ReadMoreWrapper'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { useRouter } from 'src/hooks/useCompatRouter'
import { LazyPhoneInputField as PhoneInputField } from 'src/app/components/ClientWrappers'
import Link from 'next/link'
import { phoneSchema, submitEnquiry } from 'src/@core/components/popup/formUtils'

const validationSchema = z.object({
    name: z.string().trim().min(1, 'Full Name is required'),
    contact: phoneSchema,
    email: z.string().trim().email('Invalid email address').min(1, 'Email is required'),
    location: z.string().trim().min(1, 'Location is required'),
    country: z.string().trim().min(1, 'Preferred Country is required'),
    college: z.string().trim().optional(),
    message: z.string().trim().optional(),
    terms: z.boolean().refine(v => v === true, 'You must accept the terms and conditions'),
})

type FormValues = z.infer<typeof validationSchema>

const MedicalSec = ({ data = {} }: { data?: { meta_title?: string, top_description?: string } }) => {
    const router = useRouter()

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            name: '',
            contact: '',
            email: '',
            location: '',
            country: '',
            college: '',
            message: '',
            terms: false,
        },
    })

    const onSubmit = async (values: FormValues) => {
        try {
            toast.loading('Processing')
            const ok = await submitEnquiry({
                name: values.name,
                contact_number: values.contact,
                email: values.email,
                location: values.location,
                country: values.country,
                college_name: values.college || '',
                message: values.message || '',
            })

            toast.dismiss()
            if (ok) {
                toast.success('Thank you. We will get back to you.')
                reset()
                router.push('/thank-you')
            } else {
                toast.error('Please try again later!')
            }
        } catch (error) {
            toast.dismiss()
            toast.error('Please try again later!')
            console.error('Error submitting form:', error)
        }
    }



    return (
        <section className='py-3 bg-white'>
            <div className="container">
                <div className="row">
                    <div className="col-md-7 col-lg-8 col-xl-8 minehightinnercourse">
                        <ReadMoreContent html={data.top_description || ''} />
                    </div>
                    <div className="col-md-5 col-lg-4 col-xl-4 pt-3 pt-md-0">
                        <form onSubmit={handleSubmit(onSubmit)} className='bg-skyBlue mbbsAbroad rounded p-3'>
                            <h2 className='text-blue fw-bold text-center mb-3'>Start Your Medical Journey</h2>
                            <p className='text-black fw-bold text-center mb-3'>Fill This & Help Us Book a Flight for Your Successful Medical Career</p>
                            <div className="mb-3">
                                <input type="text" className='form-control' placeholder='Full Name*' {...register('name')} />
                                {errors.name && <div className="text-danger">{errors.name.message}</div>}
                            </div>
                            <div className="mb-3">
                                <Controller
                                    name='contact'
                                    control={control}
                                    render={({ field }) => <PhoneInputField field={field} />}
                                />
                                {errors.contact && <div className="text-danger">{errors.contact.message}</div>}
                            </div>
                            <div className="mb-3">
                                <input type="email" className='form-control' placeholder='Email ID*' {...register('email')} />
                                {errors.email && <div className="text-danger">{errors.email.message}</div>}
                            </div>
                            <div className="mb-3">
                                <input type="text" className='form-control' placeholder='Location*' {...register('location')} />
                                {errors.location && <div className="text-danger">{errors.location.message}</div>}
                            </div>
                            <div className="mb-3">
                                <input type="text" className='form-control' placeholder='Preferred Country*' {...register('country')} />
                                {errors.country && <div className="text-danger">{errors.country.message}</div>}
                            </div>
                            <div className="mb-3">
                                <input type="text" className='form-control' placeholder='Preferred College' {...register('college')} />
                            </div>
                            <div className="mb-3">
                                <textarea className='form-control' placeholder='Type your message' {...register('message')} />
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input border-black" id="terms" {...register('terms')} />
                                <label className="form-check-label" htmlFor="terms">
                                    By Clicking this, I agree to the <Link href="/terms-and-conditions" >Terms & Conditions</Link>
                                </label>
                                {errors.terms && <div className="error text-danger">{errors.terms.message}</div>}
                            </div>
                            <div className="mb-3 text-center">
                                <button type="submit" className='btn submitBtn'>Make me a Doctor!</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MedicalSec

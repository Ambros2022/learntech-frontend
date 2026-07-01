'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import styles from './BamsPage.module.css'

const API_URL = process.env.NEXT_PUBLIC_API_URI || ''

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu & Kashmir',
  'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
  'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha',
  'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Tripura',
  'Telangana', 'Uttarakhand', 'Uttar Pradesh', 'West Bengal',
  'Andaman & Nicobar', 'Chandigarh', 'Dadra and Nagar Haveli',
  'Daman & Diu', 'Delhi', 'Lakshadweep', 'Puducherry'
]

export default function BamsHeroFormClient() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isSubmitting) return

    const form = formRef.current
    if (!form) return

    const formData = new FormData(form)
    formData.append('current_url', window.location.href)
    formData.append('SourceCampaign', 'BAMS Counselling 2025-26')

    // Rename 'contact' to 'contact_number' for API
    const contact = formData.get('contact') as string
    formData.delete('contact')
    formData.append('contact_number', contact)

    try {
      setIsSubmitting(true)
      toast.loading('Processing')

      const response = await fetch(`${API_URL}/api/website/landingpage/enquiry`, {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        toast.dismiss()
        toast.success('Thank you. We will get back to you.')
        form.reset()
        router.push('/thank-you')
      } else {
        throw new Error('Submission failed')
      }
    } catch (error) {
      toast.dismiss()
      toast.error('Try again later!')
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`${styles.formBoxamb} p-md-4 ${styles.slideIn2}`}>
      <h3 className={`f700 pb-2 ${styles.bamsFont20}`} style={{ color: 'white', textAlign: 'center' }}>
        Fill Out the Form to Get Assistance in Securing Your BAMS Seat for A.Y. 2025-26
      </h3>

      <form ref={formRef} onSubmit={handleSubmit}>
        <div className='form-group mb-3'>
          <input
            type='text'
            id='hero-name'
            name='name'
            placeholder='Name'
            required
            className='form-control'
          />
        </div>

        <div className='form-group mb-3'>
          <input
            type='email'
            id='hero-email'
            name='email'
            placeholder='Your Email'
            required
            className='form-control'
          />
        </div>

        <div className='form-group mb-3'>
          <input
            type='number'
            id='hero-contact'
            name='contact'
            placeholder='Contact No.'
            required
            className='form-control'
          />
        </div>

        <div className='form-group mb-3'>
          <input
            type='number'
            id='hero-neetrank'
            name='neetrank'
            placeholder='NEET Score'
            required
            className='form-control'
          />
        </div>

        <div className='form-group mb-3'>
          <select
            id='hero-location'
            name='location'
            required
            className={`browser-default custom-select form-control ${styles.whiteBgBlackText}`}
          >
            <option value=''>State</option>
            {STATES.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <div className='form-group mb-3'>
          <textarea
            id='hero-description'
            name='description'
            placeholder='Message (Optional)'
            className='form-control'
            rows={3}
          />
        </div>

        <div className='form-group text-center'>
          <button
            type='submit'
            disabled={isSubmitting}
            className={`btn btn-success btn-bds-add-svyasa-apply ${styles.colorBtnAddApply} p-3 px-5`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}

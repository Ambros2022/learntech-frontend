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
    formData.append('SourceCampaign', 'BAMS Counselling 2026-27')

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
    <div className={styles.leadCard}>
      <h3>Fill Out the Form to Get Assistance in Securing Your BAMS Seat for A.Y. 2026-27</h3>

      <form ref={formRef} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <input
            type='text'
            name='name'
            placeholder='Full Name:'
            required
          />
        </div>

        <div className={styles.field}>
          <input
            type='email'
            name='email'
            placeholder='Email Address:'
            required
          />
        </div>

        <div className={styles.field}>
          <input
            type='tel'
            name='contact'
            placeholder='Phone No:'
            required
          />
        </div>

        <div className={styles.field}>
          <input
            type='number'
            name='neetrank'
            placeholder='NEET Score:'
          />
        </div>

        <div className={styles.field}>
          <select name='location' required>
            <option value=''>State</option>
            {STATES.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <textarea
            name='description'
            placeholder='Your Message (Optional):'
            rows={2}
          />
        </div>

        <button
          type='submit'
          disabled={isSubmitting}
          className={styles.formSubmit}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
        </button>
      </form>
    </div>
  )
}

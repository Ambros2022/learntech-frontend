'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import styles from './SymbiosisPage.module.css'
import PhoneInputField from 'src/@core/components/popup/PhoneInput'

const API_URL = process.env.NEXT_PUBLIC_API_URI || ''

const COURSES = [
  'Bachelor of Business Administration (BBA) (Hons)',
  'Bachelor of Business Administration- Dual Degree',
  'Bachelor of Computer Applications (BCA)',
  'Bachelor of Arts in Mass Communication (BAMC)',
  'B.Com with ACCA Preparation',
  'B.Com (Honors) with ACCA Preparation',
  'B.Sc Psychology (Honors)',
  'B.Tech in Computer Engineering',
  'Master of Business Administration (MBA)',
]

interface Props {
  isModal?: boolean
}

export default function SymEnquiryFormClient({ isModal = false }: Props) {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [phone, setPhone] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isSubmitting) return

    if (!phone.trim()) {
      toast.error('Phone number is required')
      return
    }

    const form = formRef.current
    if (!form) return

    const formData = new FormData(form)
    formData.append('current_url', window.location.href)
    formData.append('Source', 'Google Ads')
    formData.append('SourceCampaign', 'Symbiosis Dubai 2026-27')

    // Rename contact → contact_number for API
    let contact = phone
    if (contact && !contact.startsWith('+')) {
      contact = `+${contact}`
    }
    formData.delete('contact')
    formData.append('contact_number', contact)

    try {
      setIsSubmitting(true)
      toast.loading('Processing')

      const response = await fetch(`${API_URL}/api/website/landingpage/enquiry`, {
        method: 'POST',
        body: formData,
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
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className='form-group'>
        <input
          type='text'
          name='name'
          placeholder='Full Name'
          required
          className={styles.symFormField}
        />
      </div>
      <div className='form-group'>
        <input
          type='email'
          name='email'
          placeholder='Email'
          required
          className={styles.symFormField}
        />
      </div>
      <div className='form-group mb-3'>
        <div className={styles.symPhoneInputContainer}>
          <PhoneInputField
            country='ae'
            field={{
              value: phone,
              onChange: (v: string) => setPhone(v),
            }}
          />
        </div>
      </div>
      <div className='form-group'>
        <input
          type='text'
          name='location'
          placeholder='Enter Location'
          required
          className={styles.symFormField}
        />
      </div>
      <div className='form-group'>
        <select name='course_in_mind' required defaultValue='' className={`${styles.symFormField} ${styles.symFormSelect}`}>
          <option value='' disabled>Select Course</option>
          {COURSES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className='form-group'>
        <textarea
          name='description'
          placeholder='Message (Optional)'
          rows={2}
          className={styles.symFormField}
          style={{ resize: 'vertical' }}
        />
      </div>
      <div className='form-group text-center'>
        <button
          type='submit'
          disabled={isSubmitting}
          className={isModal ? styles.symModalSubmit : styles.symFormSubmit}
        >
          {isSubmitting ? 'Submitting...' : <>Submit <i className='bi bi-arrow-right-circle ms-1' /></>}
        </button>
      </div>
    </form>
  )
}

'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
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

interface Props {
  open: boolean
  onClose: () => void
}

export default function BamsPredictorModalClient({ open, onClose }: Props) {
  const router = useRouter()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open) {
      if (!dialog.open) dialog.showModal()
    } else {
      if (dialog.open) dialog.close()
    }
  }, [open])

  const handleClose = useCallback(() => {
    dialogRef.current?.close()
    onClose()
  }, [onClose])

  const handleDialogClick = useCallback((e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      handleClose()
    }
  }, [handleClose])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isSubmitting) return

    const form = formRef.current
    if (!form) return

    const formData = new FormData(form)
    formData.append('current_url', window.location.href)
    formData.append('SourceCampaign', 'BAMS Counselling 2025-26')

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
        handleClose()
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
    <dialog
      ref={dialogRef}
      className={styles.dialogModal}
      onClick={handleDialogClick}
    >
      <div className={styles.dialogBody}>
        <button className={styles.dialogClose} onClick={handleClose} aria-label='Close modal'>
          &times;
        </button>

        <div className={styles.headingPopup}>
          <h4 className={`text-center ${styles.popUp}`}>
            Please Fill in Your Details to Receive Your Rank <br />
            Prediction Report.
          </h4>
        </div>

        <form ref={formRef} onSubmit={handleSubmit}>
          <div className='form-group mb-3'>
            <input
              type='text'
              name='name'
              placeholder='Name*'
              required
              className={`form-control ${styles.bamsFormField} py-3`}
            />
          </div>

          <div className='form-group mb-3'>
            <input
              type='email'
              name='email'
              placeholder='Your Email*'
              required
              className={`form-control ${styles.bamsFormField} py-3`}
            />
          </div>

          <div className='form-group mb-3'>
            <input
              type='number'
              name='contact'
              placeholder='Contact No.*'
              required
              className={`form-control ${styles.bamsFormField} py-3`}
            />
          </div>

          <div className='form-group mb-3'>
            <input
              type='number'
              name='neetrank'
              placeholder='NEET Score'
              required
              className={`form-control ${styles.bamsFormField} py-3`}
            />
          </div>

          <div className='form-group mb-3'>
            <select
              name='location'
              required
              className={`browser-default custom-select form-control ${styles.whiteBgBlackText} ${styles.bamsFormField} py-3`}
            >
              <option value=''>State</option>
              {STATES.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <div className='form-group mb-3'>
            <textarea
              name='description'
              placeholder='Message (Optional)'
              className={`form-control ${styles.bamsFormField} py-3`}
              rows={3}
            />
          </div>

          <div className='form-group text-center'>
            <button
              type='submit'
              disabled={isSubmitting}
              className={`${styles.formSubmit} ${styles.btnModel} mt-2 py-3`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  )
}

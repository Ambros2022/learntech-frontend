'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { PROGRAMMES, UNIVERSITIES, SIU_NAME, BITS_NAME } from './DubaiScholarshipsData'

interface ModalProps {
  open: boolean
  initialCollege?: string
  initialCourse?: string
  onClose: () => void
}

const API_URI = (process.env.NEXT_PUBLIC_API_URI || 'https://newapi.learntechww.com/').replace(/\/+$/, '')

export default function DubaiScholarshipsEnquiryModalClient({
  open,
  initialCollege = '',
  initialCourse = '',
  onClose,
}: ModalProps) {
  const router = useRouter()
  const modalBoxRef = useRef<HTMLDivElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDone, setIsDone] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    college: SIU_NAME,
    course: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Initialize form state when opened
  useEffect(() => {
    if (!open) return
    setIsDone(false)
    setErrors({})

    let collegeToSet = SIU_NAME
    if (initialCollege) {
      if (initialCollege.toLowerCase().includes('bits') || initialCollege === 'b') {
        collegeToSet = BITS_NAME
      } else {
        collegeToSet = SIU_NAME
      }
    }

    setFormData((prev) => ({
      ...prev,
      college: collegeToSet,
      course: initialCourse || '',
    }))

    // Lock body scroll
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Focus first input
    const timer = setTimeout(() => {
      const nameInput = document.getElementById('pf-name') as HTMLInputElement | null
      nameInput?.focus()
    }, 120)

    return () => {
      document.body.style.overflow = originalOverflow
      clearTimeout(timer)
    }
  }, [open, initialCollege, initialCourse])

  // Handle Escape key
  useEffect(() => {
    if (!open) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  // Available courses based on selected college
  const currentCollegeCode = formData.college === BITS_NAME ? 'b' : 's'
  const availableCourses = PROGRAMMES.filter((p) => p.college === currentCollegeCode)

  const validate = () => {
    const nextErrors: Record<string, string> = {}
    if (!formData.name.trim()) nextErrors.name = 'Full name is required'
    if (!formData.phone.trim()) {
      nextErrors.phone = 'Phone number is required'
    } else if (!/^[0-9+\s\-]{7,15}$/.test(formData.phone.trim())) {
      nextErrors.phone = 'Please enter a valid phone number'
    }
    if (!formData.email.trim()) {
      nextErrors.email = 'Email address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = 'Please enter a valid email address'
    }
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    try {
      setIsSubmitting(true)
      toast.loading('Submitting enquiry...', { id: 'enquiry-toast' })

      const fd = new FormData()
      fd.append('name', formData.name.trim())
      fd.append('email', formData.email.trim())
      fd.append(
        'contact_number',
        formData.phone.startsWith('+') ? formData.phone.trim() : `+91-${formData.phone.trim()}`
      )
      fd.append('location', formData.city.trim() || 'Dubai/India')
      fd.append('course_in_mind', formData.course || `${formData.college} Programmes`)
      fd.append(
        'description',
        `Scholarship enquiry for ${formData.course || 'All courses'} at ${formData.college} from ${
          formData.city || 'UAE/India'
        }`
      )
      fd.append('current_url', typeof window !== 'undefined' ? window.location.href : '')
      fd.append('Source', 'Google Ads')
      fd.append('SourceCampaign', 'dubai-university-scholarships')

      const res = await fetch(`${API_URI}/api/website/landingpage/enquiry`, {
        method: 'POST',
        body: fd,
      })

      toast.dismiss('enquiry-toast')
      if (res.ok) {
        toast.success('Thank you! A Learntech counsellor will contact you shortly.')
        setIsDone(true)
        setTimeout(() => {
          onClose()
          router.push('/thank-you')
        }, 1200)
      } else {
        toast.error('Submission failed. Please try again or call +971 50 495 5123.')
      }
    } catch {
      toast.dismiss('enquiry-toast')
      toast.success('Thank you! A Learntech counsellor will contact you shortly.')
      setIsDone(true)
      setTimeout(() => {
        onClose()
      }, 1200)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!open) return null

  return (
    <div
      className={`pm ${open ? 'open' : ''}`}
      id="pm"
      aria-hidden={!open}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className={`pm-box ${isDone ? 'done' : ''}`}
        ref={modalBoxRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pm-t"
      >
        <div className="pm-hero">
          <button type="button" className="pm-x" id="pm-x" aria-label="Close" onClick={onClose}>
            &times;
          </button>
          <span className="pm-chip">Up to 50% Scholarship</span>
          <h3 id="pm-t">Check your UAE scholarship</h3>
          <p>Share your details and a counsellor will call you shortly.</p>
        </div>

        <form className="pm-form" id="pm-form" noValidate onSubmit={handleSubmit}>
          <div className="form-field span-2">
            <label htmlFor="pf-name">
              Full name <span className="req">*</span>
            </label>
            <input
              id="pf-name"
              type="text"
              placeholder="Enter your full name"
              required
              autoComplete="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            {errors.name && <small style={{ color: '#E93C47', fontSize: '12px' }}>{errors.name}</small>}
          </div>

          <div className="form-field">
            <label htmlFor="pf-phone">
              Phone number <span className="req">*</span>
            </label>
            <input
              id="pf-phone"
              type="tel"
              placeholder="Mobile number"
              required
              autoComplete="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            {errors.phone && <small style={{ color: '#E93C47', fontSize: '12px' }}>{errors.phone}</small>}
          </div>

          <div className="form-field">
            <label htmlFor="pf-email">
              Email <span className="req">*</span>
            </label>
            <input
              id="pf-email"
              type="email"
              placeholder="you@example.com"
              required
              autoComplete="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {errors.email && <small style={{ color: '#E93C47', fontSize: '12px' }}>{errors.email}</small>}
          </div>

          <div className="form-field">
            <label htmlFor="pf-city">City</label>
            <input
              id="pf-city"
              type="text"
              placeholder="Enter your city"
              autoComplete="address-level2"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
          </div>

          <div className="form-field">
            <label htmlFor="pf-college">Universities</label>
            <select
              id="pf-college"
              value={formData.college}
              style={{ color: '#0b1020', backgroundColor: '#ffffff' }}
              onChange={(e) => {
                const nextCol = e.target.value
                setFormData({ ...formData, college: nextCol, course: '' })
              }}
            >
              {UNIVERSITIES.map((c) => (
                <option key={c.code} value={c.name} style={{ color: '#0b1020', backgroundColor: '#ffffff' }}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field span-2">
            <label htmlFor="pf-course">Course</label>
            <select
              id="pf-course"
              value={formData.course}
              style={{ color: '#0b1020', backgroundColor: '#ffffff' }}
              onChange={(e) => setFormData({ ...formData, course: e.target.value })}
            >
              <option value="" style={{ color: '#0b1020', backgroundColor: '#ffffff' }}>
                Select course
              </option>
              {availableCourses.map((x) => (
                <option
                  key={x.title}
                  value={x.title}
                  style={{ color: '#0b1020', backgroundColor: '#ffffff' }}
                >
                  {x.title} ({x.level}) - {x.scholarship}
                </option>
              ))}
            </select>
          </div>

          <div className="full">
            <button className="b" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Check my scholarship'}
            </button>
          </div>
          <p className="pm-note">By submitting you agree to be contacted about admissions and scholarships.</p>
        </form>

        <div className="pm-ok">
          <b>You&apos;re cleared for take-off!</b>
          <p>A counsellor will get in touch with you shortly.</p>
        </div>
      </div>
    </div>
  )
}

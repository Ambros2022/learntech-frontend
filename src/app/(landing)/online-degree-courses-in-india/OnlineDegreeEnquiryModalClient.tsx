'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const COURSE_OPTIONS = [
  { value: 'Online BBA', label: 'Online BBA (Bachelor of Business Administration)' },
  { value: 'Online BCA', label: 'Online BCA (Bachelor of Computer Applications)' },
  { value: 'Online B.Com', label: 'Online B.Com (Bachelor of Commerce)' },
  { value: 'Online BA (Journalism & Mass Communication)', label: 'Online BA (Journalism & Mass Communication)' },
  { value: 'Online MBA', label: 'Online MBA (Master of Business Administration)' },
  { value: 'Online MBA in Human Resources (HR)', label: 'Online MBA in Human Resources (HR)' },
  { value: 'Online MBA in Marketing', label: 'Online MBA in Marketing' },
  { value: 'Online MBA in Finance', label: 'Online MBA in Finance' },
  { value: 'Online MBA in Operations', label: 'Online MBA in Operations' },
  { value: 'Online MBA in General Management', label: 'Online MBA in General Management' },
  { value: 'Online MCA', label: 'Online MCA (Master of Computer Applications)' },
  { value: 'Online MCA in Artificial Intelligence', label: 'Online MCA in Artificial Intelligence' },
  { value: 'Online MCA in Cybersecurity and AI', label: 'Online MCA in Cybersecurity and AI' },
  { value: 'Online M.Com', label: 'Online M.Com (Master of Commerce)' },
  { value: 'Online M.Sc in Data Science', label: 'Online M.Sc in Data Science' },
  { value: 'Online M.Sc in Artificial Intelligence and Machine Learning', label: 'Online M.Sc in Artificial Intelligence and Machine Learning' },
  { value: 'Online M.Sc in Mathematics', label: 'Online M.Sc in Mathematics' },
  { value: 'Online MA in Applied Economics', label: 'Online MA in Applied Economics' },
  { value: 'Online MA in Economics', label: 'Online MA in Economics' },
  { value: 'Online MA in English with Communication', label: 'Online MA in English with Communication' },
  { value: 'Online MA in English', label: 'Online MA in English' },
  { value: 'Online MA in Journalism', label: 'Online MA in Journalism' },
]

// Map a free-text hint (card title, finder result) onto one of the select options
function resolveCourse(hint: string) {
  if (!hint) return ''
  const h = hint.toLowerCase()
  // "Online MCA (Artificial Intelligence)" → "online mca in artificial intelligence"
  const normalised = h.replace(/\s*\(([^)]+)\)$/, ' in $1').replace(/&/g, 'and')
  const exact = COURSE_OPTIONS.find((o) => [h, normalised].includes(o.value.toLowerCase()))
  if (exact) return exact.value
  const prefix = h.split(' ').slice(0, 2).join(' ')
  return COURSE_OPTIONS.find((o) => o.value.toLowerCase().startsWith(prefix))?.value || ''
}

const API_URI = (process.env.NEXT_PUBLIC_API_URI || 'https://newapi.learntechww.com/').replace(/\/+$/, '')

interface ModalProps {
  open: boolean
  initialCourse?: string
  onClose: () => void
}

export default function OnlineDegreeEnquiryModalClient({ open, initialCourse = '', onClose }: ModalProps) {
  const router = useRouter()
  const overlayRef = useRef<HTMLDivElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    course: '',
    state: '',
  })

  useEffect(() => {
    if (!open) return
    const course = resolveCourse(initialCourse)
    if (course) setFormData((prev) => ({ ...prev, course }))
  }, [open, initialCourse])

  useEffect(() => {
    if (open) {
      document.body.classList.add('enq-open')
      document.body.style.overflow = 'hidden'
      setTimeout(() => {
        const input = document.getElementById('modalFullName')
        input?.focus()
      }, 100)
    } else {
      document.body.classList.remove('enq-open')
      document.body.style.overflow = ''
    }

    return () => {
      document.body.classList.remove('enq-open')
      document.body.style.overflow = ''
    }
  }, [open])

  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (isSubmitting) return

      const cleanPhone = formData.phone.replace(/\D/g, '')
      if (cleanPhone.length !== 10) {
        toast.error('Please enter a valid 10-digit Indian mobile number')
        return
      }

      if (!formData.fullName.trim()) {
        toast.error('Please enter your full name')
        return
      }

      if (!formData.email.trim()) {
        toast.error('Please enter your email address')
        return
      }

      if (!formData.course) {
        toast.error('Please select an interested course')
        return
      }

      if (!formData.state) {
        toast.error('Please select your state')
        return
      }

      try {
        setIsSubmitting(true)
        toast.loading('Submitting enquiry...', { id: 'enquiry-toast' })

        const fd = new FormData()
        fd.append('name', formData.fullName.trim())
        fd.append('email', formData.email.trim())
        fd.append('contact_number', `+91-${cleanPhone}`)
        fd.append('location', formData.state)
        fd.append('course_in_mind', formData.course)
        fd.append('description', `Enquiry for ${formData.course} from state ${formData.state}`)
        fd.append('current_url', window.location.href)
        fd.append('Source', 'Google Ads')
        fd.append('SourceCampaign', 'Online Degree Courses in India')

        const res = await fetch(`${API_URI}/api/website/landingpage/enquiry`, {
          method: 'POST',
          body: fd,
        })

        toast.dismiss('enquiry-toast')
        if (res.ok) {
          toast.success('Thank you! A Learntech counsellor will contact you shortly.')
          onClose()
          router.push('/thank-you')
        } else {
          toast.error('Submission failed. Please try again or call our toll-free number.')
        }
      } catch (err) {
        toast.dismiss('enquiry-toast')
        toast.error('Connection error. Please try again.')
        console.error('Enquiry submission error:', err)
      } finally {
        setIsSubmitting(false)
      }
    },
    [formData, isSubmitting, onClose, router]
  )

  // Always mounted so the design's fade/scale transition runs; `visibility: hidden` keeps it out of the tab order when closed
  return (
    <div
      ref={overlayRef}
      className={`popup-overlay${open ? ' active' : ''}`}
      id="popupOverlay"
      aria-hidden={!open}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose()
      }}
    >
      <div className="popup-box" role="dialog" aria-modal="true" aria-labelledby="formTitle">
        <button
          type="button"
          className="close-popup"
          id="closePopup"
          aria-label="Close popup"
          onClick={onClose}
        >
          &times;
        </button>

        {/* LEFT BANNER */}
        <div className="popup-banner" id="popupBanner">
          <div className="banner-tag">STUDY ONLINE, YOUR WAY</div>

          <div>
            <h2>
              Choose the right online degree.<br />
              <span>Learn on your own schedule.</span>
            </h2>

            <p>
              Compare online UG and PG programmes from leading universities and get clear, honest guidance
              from our counsellors before you apply.
            </p>

            <div className="banner-points">
              <span>Course Guidance</span>
              <span>Expert Support</span>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="popup-form-panel">
          <h3 id="formTitle">Let’s find your programme</h3>
          <p className="form-intro">
            Share a few details and a Learntech Online counsellor will call you to help you shortlist the right programme.
          </p>

          <form id="enquiryForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="modalFullName">
                Full Name <span>*</span>
              </label>
              <input
                type="text"
                id="modalFullName"
                name="fullName"
                placeholder="Enter your full name"
                autoComplete="name"
                required
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="modalPhone">
                Phone Number <span>*</span>
              </label>
              <input
                type="tel"
                id="modalPhone"
                name="phone"
                placeholder="Enter 10-digit mobile number"
                autoComplete="tel"
                inputMode="numeric"
                pattern="[6-9][0-9]{9}"
                title="Enter a valid 10-digit Indian mobile number"
                maxLength={10}
                required
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="modalEmail">
                Email Address <span>*</span>
              </label>
              <input
                type="email"
                id="modalEmail"
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="modalCourse">
                Interested Courses <span>*</span>
              </label>
              <select
                id="modalCourse"
                name="course"
                required
                value={formData.course}
                onChange={handleChange}
              >
                <option value="" disabled>Select a course</option>
                {COURSE_OPTIONS.map((o) => (
                  <option value={o.value} key={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="modalState">
                Your State <span>*</span>
              </label>
              <select
                id="modalState"
                name="state"
                required
                value={formData.state}
                onChange={handleChange}
              >
                <option value="" disabled>Select your state</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Delhi">Delhi</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Odisha">Odisha</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting…' : <>Talk to a Counsellor <span aria-hidden="true">→</span></>}
            </button>

            <p className="form-note">
              By clicking submit, I agree to the terms &amp; conditions and privacy policy and give my consent to
              receive updates through SMS/Email.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}


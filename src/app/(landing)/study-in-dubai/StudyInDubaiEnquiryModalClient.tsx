'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { COURSES, COLLEGES, INDIAN_STATES } from './StudyInDubaiData'

interface ModalProps {
  open: boolean
  initialCourse?: string
  onClose: () => void
}

const API_URI = (process.env.NEXT_PUBLIC_API_URI || 'https://newapi.learntechww.com/').replace(/\/+$/, '')

export default function StudyInDubaiEnquiryModalClient({ open, initialCourse = '', onClose }: ModalProps) {
  const router = useRouter()
  const modalRef = useRef<HTMLDivElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: '',
    state: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const isFieldActive = (field: keyof typeof formData) => focusedField === field || Boolean(formData[field])

  // Format course option values nicely
  const getCourseValue = (c: typeof COURSES[number]) => `${COLLEGES[c.c].short} – ${c.name}`

  // Group courses by college
  const symCourses = COURSES.filter((c) => c.c === 'sym')
  const bitsCourses = COURSES.filter((c) => c.c === 'bits')

  // Set initial course if provided
  useEffect(() => {
    if (!open) return
    setIsDone(false)
    setErrors({})

    if (initialCourse) {
      // Find matching course
      const match = COURSES.find(
        (c) =>
          getCourseValue(c).toLowerCase() === initialCourse.toLowerCase() ||
          c.name.toLowerCase() === initialCourse.toLowerCase() ||
          initialCourse.toLowerCase().includes(c.name.toLowerCase())
      )
      if (match) {
        setFormData((prev) => ({ ...prev, course: getCourseValue(match) }))
      } else {
        setFormData((prev) => ({ ...prev, course: initialCourse }))
      }
    }
  }, [open, initialCourse])

  // Body lock & auto-focus
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => {
        const input = document.getElementById('lmName')
        input?.focus()
      }, 120)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Escape key
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
    const { name, value } = e.target
    if (name === 'phone') {
      const clean = value.replace(/\D/g, '').slice(0, 10)
      setFormData((prev) => ({ ...prev, phone: clean }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please enter your full name.'
    }
    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      errs.phone = 'Enter a valid 10-digit mobile number.'
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Enter a valid email address.'
    }
    if (!formData.course) {
      errs.course = 'Please select a course.'
    }
    if (!formData.state) {
      errs.state = 'Please select your state.'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
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
      fd.append('contact_number', `+91-${formData.phone}`)
      fd.append('location', formData.state)
      fd.append('course_in_mind', formData.course)
      fd.append('description', `Enquiry for ${formData.course} from state ${formData.state} - Study in Dubai`)
      fd.append('current_url', typeof window !== 'undefined' ? window.location.href : '')
      fd.append('Source', 'Google Ads')
      fd.append('SourceCampaign', 'study-in-dubai')

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
        }, 800)
      } else {
        toast.error('Submission failed. Please try again or call our counsellor.')
      }
    } catch (err) {
      toast.dismiss('enquiry-toast')
      toast.error('Connection error. Please try again.')
      console.error('Enquiry submission error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) {
      onClose()
    }
  }

  return (
    <div
      ref={modalRef}
      className={`lm${open ? ' open' : ''}${isDone ? ' done' : ''}`}
      id="lm"
      aria-hidden={!open}
      onClick={handleOverlayClick}
    >
      <div className="lm__box" role="dialog" aria-modal="true" aria-labelledby="lmTitle">
        <button className="lm__x" type="button" aria-label="Close form" onClick={onClose} data-close>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <aside className="lm__side">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="lm__img"
            src="/images/study-in-dubai/media/young-female-student-front-laptop-library.jpg"
            alt="Student studying with laptop in library"
            loading="lazy"
          />
          <span className="lm__tag">Study in Dubai</span>
          <div className="lm__c">
            <h2>Choose the right course in Dubai.</h2>
            <p className="lm__sub">Start your next chapter.</p>
            <p className="lm__txt">
              Compare UG and PG programmes at Symbiosis International University Dubai and BITS Pilani Dubai and get clear,
              honest guidance from our counsellors before you apply.
            </p>
            <div className="lm__chips">
              <span>Course Guidance</span>
              <span>Expert Support</span>
            </div>
          </div>
        </aside>

        <div className="lm__main">
          <div className="lm__head">
            <h3 id="lmTitle">Let’s find your programme</h3>
            <p>Share a few details and a Learntech counsellor will call you to help you shortlist the right programme.</p>
          </div>

          <form className="lm__form" id="lmForm" noValidate onSubmit={handleSubmit}>
            <div className="lm__f">
              <label htmlFor="lmName">
                Full Name <i>*</i>
              </label>
              <input
                id="lmName"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Enter your full name"
                required
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                className={isFieldActive('name') ? 'is-typing has-value' : ''}
                style={isFieldActive('name') ? { backgroundColor: '#ffffff' } : undefined}
                aria-invalid={!!errors.name}
              />
              {errors.name && <span className="lm__err">{errors.name}</span>}
            </div>

            <div className="lm__f">
              <label htmlFor="lmPhone">
                Phone Number <i>*</i>
              </label>
              <input
                id="lmPhone"
                name="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                maxLength={10}
                placeholder="Enter 10-digit mobile number"
                required
                value={formData.phone}
                onChange={handleChange}
                onFocus={() => setFocusedField('phone')}
                onBlur={() => setFocusedField(null)}
                className={isFieldActive('phone') ? 'is-typing has-value' : ''}
                style={isFieldActive('phone') ? { backgroundColor: '#ffffff' } : undefined}
                aria-invalid={!!errors.phone}
              />
              {errors.phone && <span className="lm__err">{errors.phone}</span>}
            </div>

            <div className="lm__f">
              <label htmlFor="lmEmail">
                Email Address <i>*</i>
              </label>
              <input
                id="lmEmail"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className={isFieldActive('email') ? 'is-typing has-value' : ''}
                style={isFieldActive('email') ? { backgroundColor: '#ffffff' } : undefined}
                aria-invalid={!!errors.email}
              />
              {errors.email && <span className="lm__err">{errors.email}</span>}
            </div>

            <div className="lm__f">
              <label htmlFor="lmCourse">
                Course <i>*</i>
              </label>
              <select
                id="lmCourse"
                name="course"
                required
                value={formData.course}
                onChange={handleChange}
                onFocus={() => setFocusedField('course')}
                onBlur={() => setFocusedField(null)}
                className={isFieldActive('course') ? 'is-typing has-value' : ''}
                style={isFieldActive('course') ? { backgroundColor: '#ffffff' } : undefined}
                aria-invalid={!!errors.course}
              >
                <option value="">Select a course</option>
                <optgroup label="Symbiosis Dubai">
                  {symCourses.map((c) => {
                    const val = getCourseValue(c)
                    return (
                      <option key={c.id} value={val}>
                        {c.name}
                      </option>
                    )
                  })}
                </optgroup>
                <optgroup label="BITS Pilani Dubai">
                  {bitsCourses.map((c) => {
                    const val = getCourseValue(c)
                    return (
                      <option key={c.id} value={val}>
                        {c.name}
                      </option>
                    )
                  })}
                </optgroup>
              </select>
              {errors.course && <span className="lm__err">{errors.course}</span>}
            </div>

            <div className="lm__f">
              <label htmlFor="lmState">
                Your State <i>*</i>
              </label>
              <select
                id="lmState"
                name="state"
                autoComplete="address-level1"
                required
                value={formData.state}
                onChange={handleChange}
                onFocus={() => setFocusedField('state')}
                onBlur={() => setFocusedField(null)}
                className={isFieldActive('state') ? 'is-typing has-value' : ''}
                style={isFieldActive('state') ? { backgroundColor: '#ffffff' } : undefined}
                aria-invalid={!!errors.state}
              >
                <option value="">Select your state</option>
                {INDIAN_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.state && <span className="lm__err">{errors.state}</span>}
            </div>

            <button className="lm__go" type="submit" id="lmSubmit" disabled={isSubmitting}>
              {isSubmitting ? 'Please wait...' : 'Talk to a Counsellor'}{' '}
              <span aria-hidden="true">→</span>
            </button>

            <p className="lm__fine">
              By clicking submit, I agree to the terms &amp; conditions and privacy policy and give my consent to receive updates through SMS/Email.
            </p>
          </form>

          <div className="lm__ok" id="lmOk" role="status">
            <svg aria-hidden="true" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <h3>Thank you!</h3>
            <p>We’ve received your details. A Learntech counsellor will contact you shortly.</p>
            <button className="btn btn--sm" type="button" onClick={onClose} data-close>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

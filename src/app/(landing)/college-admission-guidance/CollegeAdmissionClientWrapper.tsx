'use client'

import {
  useState,
  useCallback,
  useEffect,
  useRef,
  memo,
} from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import useEmblaCarousel from 'embla-carousel-react'
import dynamic from 'next/dynamic'
import styles from './CollegeAdmissionPage.module.css'
import CollegeAdmissionNavbarClient from './CollegeAdmissionNavbarClient'

const PhoneInputField = dynamic(() => import('src/@core/components/popup/PhoneInput'))

/* ─── Constants ────────────────────────────────────────────── */
const API_URL = process.env.NEXT_PUBLIC_API_URI || ''

/* ─── Zod schema ────────────────────────────────────────────── */
const enquirySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email required'),
  contact: z
    .string()
    .min(7, 'Phone number too short')
    .max(15, 'Phone number too long')
    .regex(/^\+?[\d\s\-()]+$/, 'Invalid phone number'),
  location: z.string().min(1, 'Location is required'),
  course: z.string().min(1, 'Please enter your course interest'),
  description: z.string().optional(),
})

type EnquiryFields = z.infer<typeof enquirySchema>

/* ─── Submit helper ─────────────────────────────────────────── */
async function submitEnquiry(fields: EnquiryFields) {
  const fd = new FormData()
  fd.append('name', fields.name)
  fd.append('email', fields.email)
  fd.append('contact_number', fields.contact)
  fd.append('location', fields.location)
  fd.append('course_in_mind', fields.course)
  fd.append('description', fields.description ?? '')
  fd.append('current_url', window.location.href)
  fd.append('Source', 'Google Ads')
  fd.append('SourceCampaign', 'BAMS Counselling 2026-27')
  return fetch(`${API_URL}/api/website/landingpage/enquiry`, { method: 'POST', body: fd })
}

/* ══════════════════════════════════════════════════════════════
   ENQUIRY FORM — shared by hero + modal
══════════════════════════════════════════════════════════════ */
interface EnquiryFormProps {
  isModal?: boolean
  onSuccess?: () => void
}

export const BamsEnquiryForm = memo(function BamsEnquiryForm({ isModal = false, onSuccess }: EnquiryFormProps) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFields>({ resolver: zodResolver(enquirySchema) })

  const onSubmit = async (data: EnquiryFields) => {
    try {
      toast.loading('Processing…')
      const res = await submitEnquiry(data)
      if (res.ok) {
        toast.dismiss()
        toast.success('Thank you. We will get back to you.')
        reset()
        onSuccess?.()
        router.push('/thank-you')
      } else {
        throw new Error('Submission failed')
      }
    } catch {
      toast.dismiss()
      toast.error('Try again later!')
    }
  }



  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {isModal ? (
        /* ── Modal layout: stacked full-width fields, no labels ── */
        <>
          <div className='form-group mb-3'>
            <input type='text' placeholder='Enter Name' className='form-control' {...register('name')} />
            {errors.name && <span className={styles.errorMsg}>{errors.name.message}</span>}
          </div>
          <div className='form-group mb-3'>
            <input type='email' placeholder='Enter Email' className='form-control' {...register('email')} />
            {errors.email && <span className={styles.errorMsg}>{errors.email.message}</span>}
          </div>
          <div className='mb-3 form-group'>
            <Controller name='contact' control={control} render={({ field }) => <PhoneInputField field={field} />} />
            {errors.contact && <span className={styles.errorMsg}>{errors.contact.message}</span>}
          </div>
          <div className='form-group mb-3'>
            <input type='text' placeholder='Location' className='form-control' {...register('location')} />
            {errors.location && <span className={styles.errorMsg}>{errors.location.message}</span>}
          </div>
          <div className='form-group mb-3'>
            <input type='text' placeholder='Interested course?' className='form-control' {...register('course')} />
            {errors.course && <span className={styles.errorMsg}>{errors.course.message}</span>}
          </div>
          <div className='form-group mb-3'>
            <textarea placeholder='Message (Optional)' className='form-control' rows={2} {...register('description')} />
          </div>
          <div className='form-group text-center'>
            <button type='submit' disabled={isSubmitting} className='btn-submit w-100'>
              {isSubmitting ? 'Submitting…' : (<>SUBMIT &nbsp;<i className='bi bi-arrow-right' /></>)}
            </button>
          </div>
        </>
      ) : (
        /* ── Hero card layout: labels + 2-column grid ── */
        <div className='row gy-2 gx-2'>
          <div className='col-12'>
            <label className={styles.formLabel}>Full Name *</label>
            <input type='text' placeholder='Your full name' className={styles.formControl} {...register('name')} />
            {errors.name && <span className={styles.errorMsg}>{errors.name.message}</span>}
          </div>
          <div className='col-sm-6'>
            <label className={styles.formLabel}>Email *</label>
            <input type='email' placeholder='Email' className={styles.formControl} {...register('email')} />
            {errors.email && <span className={styles.errorMsg}>{errors.email.message}</span>}
          </div>
          <div className='col-sm-6'>
            <label className={styles.formLabel}>Phone *</label>
            <div className={`form-group ${styles.collegeadmisson}`}>
              <Controller name='contact' control={control} render={({ field }) => <PhoneInputField field={field} />} />
            </div>
            {errors.contact && <span className={styles.errorMsg}>{errors.contact.message}</span>}
          </div>
          <div className='col-sm-6'>
            <label className={styles.formLabel}>Location *</label>
            <input type='text' placeholder='Location' className={styles.formControl} {...register('location')} />
            {errors.location && <span className={styles.errorMsg}>{errors.location.message}</span>}
          </div>
          <div className='col-sm-6'>
            <label className={styles.formLabel}>Interested course? *</label>
            <input type='text' placeholder='Interested course?' className={styles.formControl} {...register('course')} />
            {errors.course && <span className={styles.errorMsg}>{errors.course.message}</span>}
          </div>
          <div className='col-12'>
            <label className={styles.formLabel}>Message <span style={{ color: 'var(--cag-ink-muted)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(Optional)</span></label>
            <textarea placeholder='Message (Optional)' className={`${styles.formControl} ${styles.formControlTextarea}`} {...register('description')} />
          </div>
          <div className='col-12 mt-3'>
            <button type='submit' disabled={isSubmitting} className={styles.btnSubmit}>
              {isSubmitting ? 'Submitting…' : (<>Start My Journey &nbsp;<i className='bi bi-arrow-right' /></>)}
            </button>
          </div>
        </div>
      )}
    </form>
  )
})

/* ══════════════════════════════════════════════════════════════
   MODAL
══════════════════════════════════════════════════════════════ */
interface ModalProps {
  open: boolean
  onClose: () => void
}

export const BamsEnquiryModal = memo(function BamsEnquiryModal({ open, onClose }: ModalProps) {
  if (!open) return null

  return (
    <div className='modal show cag-modal' style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }} onClick={onClose}>
      <div className='modal-dialog modal-dialog-centered' onClick={(e) => e.stopPropagation()}>
        <div className='modal-content'>
          <div className='modal-body'>
            <div className='text-end'>
              <button type='button' className='btn-close' onClick={onClose} aria-label='Close'></button>
            </div>
            <div className='heading-popup'>
              <h3 className='text-center pop-up'>Enter Your Details to Get Started</h3>
            </div>
            <BamsEnquiryForm isModal onSuccess={onClose} />
          </div>
        </div>
      </div>
    </div>
  )
})

/* ══════════════════════════════════════════════════════════════
   CTA MINI FORM (bottom section)
══════════════════════════════════════════════════════════════ */
const ctaSchema = z.object({
  ctaName: z.string().min(1),
  ctaPhone: z.string().min(7),
  ctaCourse: z.string().optional(),
})
type CtaFields = z.infer<typeof ctaSchema>

export function BamsCtaForm() {
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<CtaFields>({
    resolver: zodResolver(ctaSchema),
  })

  const onSubmit = async (data: CtaFields) => {
    try {
      toast.loading('Processing…')
      const fd = new FormData()
      fd.append('name', data.ctaName)
      fd.append('contact_number', data.ctaPhone)
      fd.append('course_in_mind', data.ctaCourse ?? '')
      fd.append('current_url', window.location.href)
      fd.append('Source', 'Google Ads')
      fd.append('SourceCampaign', 'BAMS Counselling 2026-27')
      const res = await fetch(`${API_URL}/api/website/landingpage/enquiry`, { method: 'POST', body: fd })
      if (res.ok) {
        toast.dismiss()
        toast.success('Thank you!')
        setSubmitted(true)
        reset()
        router.push('/thank-you')
      } else throw new Error()
    } catch {
      toast.dismiss()
      toast.error('Try again later!')
    }
  }

  if (submitted) {
    return (
      <div className={styles.ctaSubmittedBox}>
        <div style={{ fontSize: 34, marginBottom: 8 }}>🎉</div>
        <div style={{ color: '#fff', fontWeight: 600, fontSize: 16 }}>You&apos;re on the list!</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>
          Our counsellor will call you within 24 hours.
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.hForm}>
        <div className={styles.hField}>
          <label className={styles.hLabel}>Full Name</label>
          <input className={styles.hInput} type='text' placeholder='Your name' {...register('ctaName')} />
        </div>
        <div className={styles.hField}>
          <label className={styles.hLabel}>Phone Number</label>
          <input className={styles.hInput} type='tel' placeholder='Phone number' {...register('ctaPhone')} />
        </div>
        <div className={styles.hField}>
          <label className={styles.hLabel}>Interested Course?</label>
          <input className={styles.hInput} type='text' placeholder='e.g. BAMS' {...register('ctaCourse')} />
        </div>
        <button className={styles.hSubmit} type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Sending…' : <>Get Started &rarr;</>}
        </button>
      </div>
      <p className={styles.formNote}>Free session &nbsp;·&nbsp; No spam &nbsp;·&nbsp; No commitment</p>
    </form>
  )
}

/* ══════════════════════════════════════════════════════════════
   IMAGE STACK (Who We Are section)
══════════════════════════════════════════════════════════════ */
const aboutImages = [
  '/images/collegeadmissions/about1.webp',
  '/images/collegeadmissions/about2.webp',
  '/images/collegeadmissions/about3.webp',
]

export function BamsImageStack() {
  const [stackCur, setStackCur] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setStackCur(c => (c + 1) % 3), 4000)
    return () => clearInterval(interval)
  }, [])

  const getPos = (i: number) => ((i - stackCur + 3) % 3)

  return (
    <div className={styles.cagStackRoot}>
      <div className={styles.cagStack}>
        {aboutImages.map((src, i) => (
          <div
            key={i}
            className={styles.cagScard}
            data-pos={getPos(i)}
            onClick={() => { if (getPos(i) > 0) setStackCur(i) }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`About ${i + 1}`} />
            <div className={styles.grad} />
          </div>
        ))}
        <div className={styles.cagStackNav}>
          <button className={styles.cagStackBtn} onClick={() => setStackCur(c => (c - 1 + 3) % 3)}>&#8249;</button>
          <div className={styles.cagStackDots}>
            {[0, 1, 2].map(i => (
              <button
                key={i}
                className={`${styles.cagStackDot} ${stackCur === i ? styles.cagStackDotOn : ''}`}
                onClick={() => setStackCur(i)}
              />
            ))}
          </div>
          <button className={styles.cagStackBtn} onClick={() => setStackCur(c => (c + 1) % 3)}>&#8250;</button>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   COLLEGE CAROUSEL
══════════════════════════════════════════════════════════════ */
interface College {
  name: string
  loc: string
  img: string
  gradient: string
  badgeBg: string
  badgeBorder: string
}

interface CollegeCarouselProps {
  colleges: College[]
}

export function BamsCollegeCarousel({ colleges }: CollegeCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    containScroll: false,
    dragFree: false,
  })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const interval = setInterval(() => emblaApi.scrollNext(), 3000)
    return () => clearInterval(interval)
  }, [emblaApi])

  return (
    <div className={styles.cagCollegeCarousel}>
      <button className={`${styles.cagCarouselArrow} ${styles.arrowPrev}`} onClick={scrollPrev} aria-label='Previous'>
        <i className='bi bi-arrow-left' />
      </button>
      <button className={`${styles.cagCarouselArrow} ${styles.arrowNext}`} onClick={scrollNext} aria-label='Next'>
        <i className='bi bi-arrow-right' />
      </button>
      <div className={styles.cagCollegeViewport} ref={emblaRef}>
        <div className={styles.cagCollegeTrack}>
          {colleges.map((c, i) => (
            <div key={i} className={styles.cagCollegeCard}>
              <div className={styles.cardImg}>
                <div className={styles.cardPlaceholder} style={{ background: c.gradient }} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.img} alt={c.name} onError={e => (e.currentTarget.style.display = 'none')} />
                <div
                  className={styles.cardBadge}
                  style={{ background: c.badgeBg, color: '#fff', borderColor: c.badgeBorder }}
                >
                  Admissions Open For AY 2026-27
                </div>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardLoc}><i className='bi bi-geo-alt-fill' />{c.loc}</div>
                <div className={styles.cardName} dangerouslySetInnerHTML={{ __html: c.name }} />
                <button className={styles.cardApply} data-bams-trigger>
                  Apply Now <i className='bi bi-arrow-up-right' />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   TESTIMONIAL CAROUSEL
══════════════════════════════════════════════════════════════ */
interface Testimonial {
  num: string
  video: string
  quote: string
  name: string
  role: string
  initials: string
  avaBg: string
  avaColor: string
}

const StarSvg = () => (
  <svg viewBox='0 0 24 24'>
    <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
  </svg>
)

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
}

export function BamsTestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const progressRef = useRef<HTMLDivElement>(null)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [testiEmblaRef, testiEmblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    skipSnaps: false,
    containScroll: false,
    dragFree: false,
    duration: 30,
  })
  const [testiIdx, setTestiIdx] = useState(0)

  const scrollPrev = useCallback(() => testiEmblaApi?.scrollPrev(), [testiEmblaApi])
  const scrollNext = useCallback(() => testiEmblaApi?.scrollNext(), [testiEmblaApi])

  useEffect(() => {
    if (!testiEmblaApi) return
    const onSelect = () => setTestiIdx(testiEmblaApi.selectedScrollSnap())
    testiEmblaApi.on('select', onSelect)
    onSelect()
    return () => { testiEmblaApi.off('select', onSelect) }
  }, [testiEmblaApi])

  // YouTube postMessage listener
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data
        if (data?.event === 'onStateChange') {
          setVideoPlaying(data.info === 1 || data.info === 3)
        }
      } catch { /* ignore */ }
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [])

  // Auto-advance paused while video playing
  useEffect(() => {
    if (!testiEmblaApi || videoPlaying) return
    const interval = setInterval(() => testiEmblaApi.scrollNext(), 6000)
    return () => clearInterval(interval)
  }, [testiEmblaApi, videoPlaying])

  // Progress bar
  useEffect(() => {
    if (videoPlaying) {
      if (progressRef.current) progressRef.current.style.width = '0%'
      return
    }
    let raf: number
    let start: number | null = null
    const INTERVAL = 6000
    const tick = (ts: number) => {
      if (!start) start = ts
      const elapsed = ts - start
      if (progressRef.current) {
        progressRef.current.style.width = Math.min((elapsed / INTERVAL) * 100, 100) + '%'
      }
      if (elapsed >= INTERVAL) start = ts
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [testiIdx, videoPlaying])

  return (
    <div className={styles.cagTestiWrap}>
      <div className={styles.cagTestiViewport} ref={testiEmblaRef}>
        <div className={styles.cagTestiTrack}>
          {testimonials.map((t, i) => (
            <div key={i} className={`${styles.tcCard} ${i === testiIdx ? styles.active : ''}`}>
              <div className={styles.tcVideo}>
                <div className={styles.tcNum}>{t.num}</div>
                <iframe
                  src={t.video}
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                  loading='lazy'
                  title={`Testimonial ${t.num}`}
                />
              </div>
              <div className={styles.tcBody}>
                <div className={styles.tcStars}>{[...Array(5)].map((_, si) => <StarSvg key={si} />)}</div>
                <p className={styles.tcQuote}>{t.quote}</p>
                <div className={styles.tcDivider} />
                <div className={styles.tcAuthor}>
                  <div className={styles.tcAva} style={{ background: t.avaBg, color: t.avaColor }}>
                    {t.initials}
                  </div>
                  <div>
                    <div className={styles.tcName}>{t.name}</div>
                    <div className={styles.tcRole}>{t.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.tcControls}>
        <button className={styles.tcArrow} onClick={scrollPrev} aria-label='Previous testimonial'>
          <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <polyline points='15 18 9 12 15 6' />
          </svg>
        </button>
        <div className={styles.tcDots}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`${styles.tcDot} ${i === testiIdx ? styles.active : ''}`}
              onClick={() => testiEmblaApi?.scrollTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
        <div className={styles.tcProgress}>
          <div className={styles.tcProgressFill} ref={progressRef} />
        </div>
        <button className={styles.tcArrow} onClick={scrollNext} aria-label='Next testimonial'>
          <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <polyline points='9 18 15 12 9 6' />
          </svg>
        </button>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   SCROLL REVEAL — IntersectionObserver, no AOS
══════════════════════════════════════════════════════════════ */
export function BamsScrollReveal() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.bams-reveal')
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('bams-visible')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    reveals.forEach(el => {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight) {
        el.classList.add('bams-visible')
      } else {
        obs.observe(el)
      }
    })
    return () => obs.disconnect()
  }, [])

  return null
}

/* ══════════════════════════════════════════════════════════════
   TOP-LEVEL WRAPPER — manages modal state, wires navbar + modal
══════════════════════════════════════════════════════════════ */
interface WrapperProps {
  children: React.ReactNode
}

export default function CollegeAdmissionClientWrapper({ children }: WrapperProps) {
  const [showModal, setShowModal] = useState(false)

  const openModal = useCallback(() => setShowModal(true), [])
  const closeModal = useCallback(() => setShowModal(false), [])

  // Event delegation for data-bams-trigger
  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const trigger = (e.target as HTMLElement).closest('[data-bams-trigger]')
    if (trigger) { e.preventDefault(); openModal() }
  }, [openModal])

  return (
    <div onClick={handleClick}>
      <CollegeAdmissionNavbarClient onGetStarted={openModal} />
      {children}
      <BamsEnquiryModal open={showModal} onClose={closeModal} />
      <BamsScrollReveal />
    </div>
  )
}

'use client'
import React, { useEffect, useState, useCallback, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.min.css'
import useEmblaCarousel from 'embla-carousel-react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { Field, Form, Formik, ErrorMessage } from 'formik'
import { toast } from 'react-hot-toast'
import axios from 'src/configs/axios'
import Modal from 'react-bootstrap/Modal'

const PhoneInputField = dynamic(() => import('src/@core/components/popup/PhoneInput'))


const aboutImages = [
  `/images/collegeadmissions/about1.webp`,
  `/images/collegeadmissions/about2.webp`,
  `/images/collegeadmissions/about3.webp`,
]

const colleges = [
  { name: 'S-VYASA University, Bangalore', loc: 'Bengaluru', img: `/images/collegeadmissions/colleges1.webp`, gradient: 'linear-gradient(145deg,#fdf0e4,#f5ddb8)', badgeBg: 'rgba(200,82,42,0.18)', badgeBorder: 'rgba(200,82,42,0.4)' },
  { name: 'S-VYASA University Kerala (upcoming campus)', loc: 'Kerala', img: `/images/collegeadmissions/colleges2.webp`, gradient: 'linear-gradient(145deg,#e4f5e8,#c8ecd0)', badgeBg: 'rgba(42,122,68,0.2)', badgeBorder: 'rgba(42,122,68,0.4)' },
  { name: 'S-VYASA University (Yoga Campus)', loc: 'Bengaluru', img: `/images/collegeadmissions/colleges3.webp`, gradient: 'linear-gradient(145deg,#f0e4f8,#e4ccf0)', badgeBg: 'rgba(122,42,200,0.2)', badgeBorder: 'rgba(122,42,200,0.35)' },
  { name: 'Yenepoya University, Bangalore', loc: 'Bengaluru', img: `/images/collegeadmissions/colleges4.webp`, gradient: 'linear-gradient(145deg,#fdf0e4,#f5ddb8)', badgeBg: 'rgba(200,82,42,0.18)', badgeBorder: 'rgba(200,82,42,0.4)' },
  { name: 'Srinivas University, Mangalore', loc: 'Mangalore', img: `/images/collegeadmissions/colleges5.webp`, gradient: 'linear-gradient(145deg,#e4f5e8,#c8ecd0)', badgeBg: 'rgba(42,122,68,0.2)', badgeBorder: 'rgba(42,122,68,0.4)' },
  { name: 'Chinmaya Vishwa Vidyapeeth (CVV), Kochi, Kerala', loc: 'Kerala', img: `/images/collegeadmissions/colleges6.webp`, gradient: 'linear-gradient(145deg,#f0e4f8,#e4ccf0)', badgeBg: 'rgba(122,42,200,0.2)', badgeBorder: 'rgba(122,42,200,0.35)' },
  { name: 'Sri Devaraj URS, Kolar', loc: 'Kolar', img: `/images/collegeadmissions/colleges7.webp`, gradient: 'linear-gradient(145deg,#fdf0e4,#f5ddb8)', badgeBg: 'rgba(200,82,42,0.18)', badgeBorder: 'rgba(200,82,42,0.4)' },
  { name: 'Sri Venkateshwara Dental College, Bangalore', loc: 'Bengaluru', img: `/images/collegeadmissions/colleges8.webp`, gradient: 'linear-gradient(145deg,#e4f5e8,#c8ecd0)', badgeBg: 'rgba(42,122,68,0.2)', badgeBorder: 'rgba(42,122,68,0.4)' },
  { name: 'BGS and SJB Group of Institutions, Bangalore', loc: 'Bengaluru', img: `/images/collegeadmissions/colleges9.webp`, gradient: 'linear-gradient(145deg,#f0e4f8,#e4ccf0)', badgeBg: 'rgba(122,42,200,0.2)', badgeBorder: 'rgba(122,42,200,0.35)' },
  { name: 'RV University, Mysuru', loc: 'Mysuru', img: `/images/collegeadmissions/colleges10.webp`, gradient: 'linear-gradient(145deg,#f0e4f8,#e4ccf0)', badgeBg: 'rgba(122,42,200,0.2)', badgeBorder: 'rgba(122,42,200,0.35)' },
  { name: 'Sri Sri Ayurveda, Bengaluru', loc: 'Bengaluru', img: `/images/collegeadmissions/colleges11.webp`, gradient: 'linear-gradient(145deg,#f0e4f8,#e4ccf0)', badgeBg: 'rgba(122,42,200,0.2)', badgeBorder: 'rgba(122,42,200,0.35)' },
  { name: 'GIBS Business School, Bangalore', loc: 'Bengaluru', img: `/images/collegeadmissions/colleges12.webp`, gradient: 'linear-gradient(145deg,#f0e4f8,#e4ccf0)', badgeBg: 'rgba(122,42,200,0.2)', badgeBorder: 'rgba(122,42,200,0.35)' },
  { name: 'Alliance Ascent College, Bangalore', loc: 'Bengaluru', img: `/images/collegeadmissions/colleges13.webp`, gradient: 'linear-gradient(145deg,#f0e4f8,#e4ccf0)', badgeBg: 'rgba(122,42,200,0.2)', badgeBorder: 'rgba(122,42,200,0.35)' },
]

// ── enablejsapi=1 added to every embed URL so YouTube fires postMessage events ──
const testimonials = [
  { num: '01 / 05', video: 'https://www.youtube.com/embed/5aUW_0wz018?rel=0&modestbranding=1&enablejsapi=1', quote: `"Hi! My name is Sakshi. I live in Bangalore. I am pursuing BCA with specialisation in AI, ML and robotics from S-VYASA deemed to be university. The environment and surroundings are very good. The college is located in an IT tech park consisting of tech giants. It is pretty. The internship is compulsory here which will be beneficial for us in the future."`, name: "Sakshi S Peddarpeth's", role: 'Student', initials: 'SP', avaBg: 'var(--cag-accent-pale)', avaColor: 'var(--cag-accent)' },
  { num: '02 / 05', video: 'https://www.youtube.com/embed/m8TmsutwywA?rel=0&modestbranding=1&enablejsapi=1', quote: `"Hi, My name is Varun and I got my admission into SRM Medical College, with the help of Learntech consultancy. The Learntech Institute motivated us to go to the SRM and physically we have seen that it's one of the best colleges as far as the colleges I have visited so far and we are really happy that we got admission through Learntech."`, name: "Varun Dhiman's", role: 'Student and Parent', initials: 'VD', avaBg: '#fff0f1', avaColor: 'var(--cag-gold)' },
  { num: '03 / 05', video: 'https://www.youtube.com/embed/qmMxwANw8AI?rel=0&modestbranding=1&enablejsapi=1', quote: `"Hi everyone, I am Ronak from Maharashtra. I couldn't make it to government medical seats this year and was searching for admission guidance to secure a seat in good MBBS colleges. Then I came to know about Learntech consultancy and their expert service in admission guidance. Right from the day I contacted them, they helped me with every procedure on my behalf. I am very grateful to the Learntech consultancy, helping me to secure admission in one of the top colleges in Bangalore."`, name: "Ronak's", role: 'Student', initials: 'R', avaBg: '#f0fff6', avaColor: '#1a7a4a' },
  { num: '04 / 05', video: 'https://www.youtube.com/embed/Ekgpd8tPFJ8?si=Cv2jzh-jS0VLoCNJ&enablejsapi=1', quote: `"Hello I'm Smriti Deo and I am from Bhopal (M.P). Thanks to the people from Bangalore Study. I have got admission in Cardiac Care Technology at Raja Rajeshwari Medical College. They have been really supportive and friendly. They made the whole process really simple and convenient to me."`, name: "Smriti Deo's", role: 'Student', initials: 'SD', avaBg: '#f0fff6', avaColor: '#1a7a4a' },
  { num: '05 / 05', video: 'https://www.youtube.com/embed/K7g_h2VJeKU?si=gRMQSMA7hSCnf8ia&enablejsapi=1', quote: `"I am Nikam Jokhio and I am from Arunachal Pradesh. I came to Bangalore for my further studies. The course I opted for is B. Sc Anesthesia at Dr. B R Ambedkar Medical College and Hospital. Learntech helped me find the best college. I am really thankful to Learntech and especially to Pooja ma'am."`, name: "Nikam Jokhio's", role: 'Student', initials: 'NK', avaBg: '#f0fff6', avaColor: '#1a7a4a' },
]

const services = [
  { num: '01', variant: 'sc-w', icon: 'bi-person-lines-fill', title: 'Career & Admission Strategy', desc: 'Success in college admissions is never accidental. It comes from navigating the admission process with the right strategy. We help students choose the courses and colleges where they have the strongest chance of securing a seat.' },
  { num: '02', variant: 'sc-b', icon: 'bi-building', title: 'Seat Reservation Services', desc: 'Admissions can be unpredictable. To reduce this uncertainty, we help students secure seats early through formal reservation pathways, ensuring confirmed placements in preferred institutions before the peak admission rush begins.' },
  { num: '03', variant: 'sc-r', icon: 'bi-file-earmark-text', title: 'Institutional Liaison & Campus Tours', desc: 'We arrange college campus tours and interactions with college leadership, enabling students and parents to evaluate faculty, infrastructure, and campus facilities before final enrollment.' },
  { num: '04', variant: 'sc-r', icon: 'bi-bank2', title: 'Financial Planning & Loan Assistance', desc: 'We provide education loan assistance and help with scholarship applications, simplify documentation and help students navigate the approval process with trusted financial partners.' },
  { num: '05', variant: 'sc-w', icon: 'bi-airplane-engines-fill', title: 'NRI Admission Consulting', desc: 'Dedicated support for NRI students navigating the Indian education system, focusing on quota compliance, management quota admission, documentation, and seamless transition logistics for NRI admission in India.' },
  { num: '06', variant: 'sc-b', icon: 'bi-globe2', title: 'Global Admission Consulting', desc: 'We support students with comprehensive global admission guidance for international admissions in the UK, USA, and Europe—from university shortlisting and application preparation to visa processing and pre-departure guidance.' },
]

const StarSvg = () => (
  <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
)

const CollegeAdmissionGuidancePage = () => {
  const router = useRouter()
  const [navScrolled, setNavScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [stackCur, setStackCur] = useState(0)
  const [ctaSubmitted, setCtaSubmitted] = useState(false)
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const progressRef = useRef<HTMLDivElement>(null)

  // ── track whether any testimonial video is currently playing ──
  const [videoPlaying, setVideoPlaying] = useState(false)

  // ── FIX 3: College carousel with proper loop options to prevent white gap ──
  const [collegeEmblaRef, collegeEmblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    // These options prevent the white gap / jump on loop
    containScroll: false,
    dragFree: false,
  })
  const collegeScrollPrev = useCallback(() => collegeEmblaApi?.scrollPrev(), [collegeEmblaApi])
  const collegeScrollNext = useCallback(() => collegeEmblaApi?.scrollNext(), [collegeEmblaApi])

  // ── FIX 4: Testimonial carousel with proper loop config to prevent glitch ──
  const [testiEmblaRef, testiEmblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    // Prevent the double-flash on loop by using skipSnaps: false
    skipSnaps: false,
    // Ensure smooth loop without jump
    containScroll: false,
    dragFree: false,
    // Slow down the loop transition slightly to prevent glitch
    duration: 30,
  })
  const [testiIdx, setTestiIdx] = useState(0)
  const testiScrollPrev = useCallback(() => testiEmblaApi?.scrollPrev(), [testiEmblaApi])
  const testiScrollNext = useCallback(() => testiEmblaApi?.scrollNext(), [testiEmblaApi])

  useEffect(() => {
    if (!testiEmblaApi) return
    const onSelect = () => setTestiIdx(testiEmblaApi.selectedScrollSnap())
    testiEmblaApi.on('select', onSelect)
    onSelect()
    return () => { testiEmblaApi.off('select', onSelect) }
  }, [testiEmblaApi])

  // ── Listen for YouTube postMessage events to detect play / pause ──
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data
        if (data?.event === 'onStateChange') {
          // YouTube player states: 1 = playing, 2 = paused, 0 = ended, 3 = buffering
          if (data.info === 1 || data.info === 3) {
            setVideoPlaying(true)
          } else {
            setVideoPlaying(false)
          }
        }
      } catch {
        // ignore non-JSON / unrelated messages
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  // ── Auto-advance pauses while a video is playing ──
  useEffect(() => {
    if (!testiEmblaApi || videoPlaying) return
    const interval = setInterval(() => testiEmblaApi.scrollNext(), 6000)
    return () => clearInterval(interval)
  }, [testiEmblaApi, videoPlaying])

  // ── Progress bar also pauses while a video is playing ──
  useEffect(() => {
    // Reset bar width when video is playing
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

  // Sticky nav scroll
  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Reveal on scroll
  useEffect(() => {
    const reveals = document.querySelectorAll('.cag-main .reveal')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) }
      })
    }, { threshold: 0.12 })
    reveals.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // Card stack auto-advance
  useEffect(() => {
    const interval = setInterval(() => setStackCur(c => (c + 1) % 3), 4000)
    return () => clearInterval(interval)
  }, [])

  // ── College carousel auto-scroll ──
  useEffect(() => {
    if (!collegeEmblaApi) return
    const interval = setInterval(() => {
      collegeEmblaApi.scrollNext()
    }, 3000)
    return () => clearInterval(interval)
  }, [collegeEmblaApi])

  const initialValues = { name: '', email: '', contact: '', location: '', course: '', description: '' }

  const handleSubmit = async (values: any, { resetForm }: any) => {
    try {
      toast.loading('Processing')
      const formData = new FormData()
      formData.append('name', values.name)
      formData.append('email', values.email)
      formData.append('contact_number', values.contact)
      formData.append('location', values.location)
      formData.append('course_in_mind', values.course)
      formData.append('current_url', window.location.href)
      formData.append('description', values.description)
      formData.append('Source', 'Google Ads')
      formData.append('SourceCampaign', 'Learntech Guidance 2026-27')
      const response = await axios.post('api/website/landingpage/enquiry', formData)
      if (response.status === 200) {
        toast.dismiss()
        toast.success('Thank you. We will get back to you.')
        resetForm()
        router.push('/thank-you')
      }
    } catch (error) {
      toast.dismiss()
      toast.error('Try again later!')
      console.error('Error submitting form:', error)
    }
  }

  const handleCtaSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const fd = new FormData(form)
    try {
      toast.loading('Processing')
      const formData = new FormData()
      formData.append('name', fd.get('ctaName') as string)
      formData.append('contact_number', fd.get('ctaPhone') as string)
      formData.append('course_in_mind', fd.get('ctaCourse') as string)
      formData.append('current_url', window.location.href)
      formData.append('Source', 'Google Ads')
      formData.append('SourceCampaign', 'Learntech Guidance 2026-27')
      const response = await axios.post('api/website/landingpage/enquiry', formData)
      if (response.status === 200) {
        toast.dismiss()
        toast.success('Thank you!')
        setCtaSubmitted(true)
        form.reset()
      }
    } catch {
      toast.dismiss()
      toast.error('Try again later!')
    }
  }

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMobileOpen(false)
  }

  const getStackPos = (i: number) => ((i - stackCur + 3) % 3)

  return (
    <section className='cag-main'>
      <Head>
        <title>Learntech Edu | College Admission Guidance &amp; Counselling</title>
        <meta name='description' content='Get expert college admission guidance with Learntech Edu Solutions. 1000+ institutions, seat support, and personalised counselling to simplify your journey.' />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel='stylesheet' href='/css/collegeadmissionguidancelandingpage.css' />
        <link rel='canonical' href='https://learntechww.com/college-admission-guidance' />
        <link href='https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap' rel='stylesheet' />
        <link href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css' rel='stylesheet' />
      </Head>

      {/* WhatsApp Float */}
      <a href='https://wa.me/+919606949066' className='cag-whatsapp-float' target='_blank' rel='noreferrer'>
        <img src='/images/bams/whatsappc.gif' alt='WhatsApp' style={{ width: 56 }} />
      </a>

      {/* Phone Float */}
      <a href='tel:+919606949066' className='cag-phone-float'>
        <Image src='/images/icons/Phone-blue.svg' width={40} height={28} alt='phone' className='red-filter' />
      </a>


      <nav className={`navbar navbar-expand-lg cag-navbar ${navScrolled ? 'scrolled' : ''}`}>
        <div className='container navbarmobile' style={{ maxWidth: '95%' }}>
          <Link className='navbar-brand' href='/college-admission-guidance' onClick={e => { e.preventDefault(); scrollTo('cag-hero') }}>
            <img src='/images/collegeadmissions/logo.png' alt='LearnTech' className='navlinkimage' style={{ marginRight: '0.5rem' }} />
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            onClick={() => setMobileOpen(v => !v)}
            aria-expanded={mobileOpen}
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>

          <div
            className={`navbar-collapse bgwhitemobile${mobileOpen ? ' show' : ''}`}
            id='cagNavMenu'
          >
            <ul className='navbar-nav mx-auto gap-1'>
              <li className='nav-item'><a className='nav-link' onClick={() => scrollTo('cag-hero')}>Home</a></li>
              <li className='nav-item'><a className='nav-link' onClick={() => scrollTo('cag-who')}>Who We Are?</a></li>
              <li className='nav-item'><a className='nav-link' onClick={() => scrollTo('cag-what')}>What We Do?</a></li>
              <li className='nav-item'><a className='nav-link' onClick={() => scrollTo('cag-services')}>Our Services</a></li>
              <li className='nav-item'><a className='nav-link' onClick={() => scrollTo('cag-colleges')}>Institutions</a></li>
              <li className='nav-item'><a className='nav-link' onClick={() => scrollTo('cag-testi')}>Success Stories</a></li>
            </ul>
            <a className='nav-link btn-nav-cta ms-2 text-white' onClick={handleShow}>Get Started</a>
          </div>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section id='cag-hero' className='cag-hero'>
        <div className='container  herbobennerconatiner'>
          <div className='row align-items-center g-5 custom-row'>
            <div className='col-lg-6 mobilehomebanner'>
              <div className='eyebrow-glass-live'>
                <span className='dot'></span>
                <span className='text'>College Admissions Guidance</span>
              </div>
              <h1 className='hero-headline p20mobilw'>You Don&apos;t Have<br />to Decide <em>Alone</em></h1>
              <p className='hero-subhead p20mobilw'>1000+ Colleges. Multiple Rounds of Counselling.<br />Only One You. Not anymore.</p>
              <p className='hero-body p20mobilw'>Every student deserves the right guidance when choosing their college and career path. Because every superhero needs a sidekick.</p>
              <div className='hero-stats'>
                <div className='stat-item p20mobilw  '>
                  <div className='stat-num'>30<span>+</span></div>
                  <div className='stat-label'>Years of Consistent<br />Service</div>
                </div>
                <div className='stat-divider'></div>
                <div className='stat-item p20mobilw  '>
                  <div className='stat-num'>5,00,000<span>+</span></div>
                  <div className='stat-label'>Successful Admissions</div>
                </div>
                <div className='stat-divider'></div>
                <div className='stat-item p20mobilw  '>
                  <div className='stat-num'>1,000<span>+</span></div>
                  <div className='stat-label'>Partner Institutions</div>
                </div>
              </div>
            </div>
            <div className='col-lg-5 offset-lg-1'>
              <div className='form-card'>
                <div className='form-card-eyebrow'>Start your Journey with us</div>
                <h2 className='form-card-title'>Take The First Step Towards Your Future</h2>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                  {() => (
                    <Form>
                      <div className='row gy-2 gx-2'>
                        <div className='col-12'>
                          <label className='form-label'>Full Name *</label>
                          <Field type='text' name='name' className='form-control' placeholder='Your full name' required />
                        </div>
                        <div className='col-sm-6'>
                          <label className='form-label'>Email *</label>
                          <Field type='email' name='email' className='form-control' placeholder='Email' required />
                        </div>
                        <div className='col-sm-6' >
                          <label className='form-label'>Phone *</label>
                          <div className='form-group collegeadmisson' >
                            <PhoneInputField name='contact' />
                            <ErrorMessage name='contact' component='div' className='text-danger' />
                          </div>
                        </div>
                        <div className='col-sm-6'>
                          <label className='form-label'>Location *</label>
                          <Field type='text' name='location' className='form-control' placeholder='Location' required />
                        </div>
                        <div className='col-sm-6'>
                          <label className='form-label'>Interested course? *</label>
                          <Field type='text' name='course' className='form-control' placeholder='Interested course?' required />
                        </div>
                        <div className='col-12'>
                          <label className='form-label'>Message <span style={{ color: 'var(--cag-ink-muted)', fontWeight: 400, textTransform: 'none' as const, letterSpacing: 0 }}>(Optional)</span></label>
                          <Field as='textarea' name='description' className='form-control' placeholder='Message (Optional)' />
                        </div>
                        <div className='col-12 mt-3'>
                          <button type='submit' className='btn-submit mb-4'>Start My Journey &nbsp; <i className='bi bi-arrow-right'></i></button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHO WE ARE ══ */}
      <section id='cag-who' className='cag-section cag-who'>
        <div className='container' style={{ maxWidth: '95%' }}>
          <div className='row align-items-center g-5'>
            <div className='col-lg-5 reveal'>
              <div className='cag-stack-root'>
                <div className='cag-stack'>
                  {aboutImages.map((src, i) => (
                    <div key={i} className='cag-scard' data-pos={getStackPos(i)} onClick={() => { if (getStackPos(i) > 0) setStackCur(i) }}>
                      <img src={src} alt={`About ${i + 1}`} />
                      <div className='grad'></div>
                    </div>
                  ))}
                  <div className='cag-stack-nav'>
                    <button className='cag-stack-btn' onClick={() => setStackCur(c => (c - 1 + 3) % 3)}>&#8249;</button>
                    <div className='cag-stack-dots'>
                      {[0, 1, 2].map(i => (
                        <button key={i} className={`cag-stack-dot ${stackCur === i ? 'on' : ''}`} onClick={() => setStackCur(i)} />
                      ))}
                    </div>
                    <button className='cag-stack-btn' onClick={() => setStackCur(c => (c + 1) % 3)}>&#8250;</button>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-7'>
              <div className='reveal reveal-delay-1'>
                <div className='section-eyebrow'>Who We Are</div>
                <h2 className='section-title'>Experts Who&apos;ve <em>Been There</em></h2>
                <p className='section-body'>
                  Every year, over 30 lakh students fight for a place in India&apos;s top medical and engineering colleges. Your competition is not just the numbers, but the process of getting there. Multiple rounds of counselling, unpredictable cut-offs, and piles of paperwork. One wrong preference on a form, one missed deadline, and you may miss out on your dream. No matter what career options you are looking for, making the right choice demands getting rid of this uncertainty.<br /><br />
                  That&apos;s where Learntech comes to your rescue. We are a dedicated family of counsellors and ed-tech professionals turning career counselling into a clear, strategic roadmap to success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHAT WE DO ══ */}
      <section id='cag-what' className='cag-section cag-what'>
        <div className='container' style={{ maxWidth: '95%' }}>
          <div className='row'>
            <div className='col-lg-12 reveal'>
              <div className='section-eyebrow'>What We Do</div>
              <h2 className='section-title'>Turning Confusion Into <em>Clarity</em></h2>
              <p className='section-body'>
                Since 1994, LearnTech has served as the operational backbone for students navigating higher education. We specialize in managing every phase of the admission process, from initial applications to final enrollment. By streamlining the intricate requirements of admissions, expert counseling, and strategic financing, we remove the hurdles that often stall progress. This comprehensive support empowers students to focus entirely on their academic goals while we secure their placement and handle the logistical heavy lifting. Our legacy is built on transforming this stressful transition into a seamless launchpad for future success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SERVICES ══ */}
      <section id='cag-services' className='cag-services'>
        <div className='sw-bg-blob' style={{ width: 480, height: 480, background: '#274896', opacity: 0.04, top: -200, right: -180 }}></div>
        <div className='sw-bg-blob' style={{ width: 280, height: 280, background: '#e43441', opacity: 0.05, bottom: -100, left: -80 }}></div>
        <div className='sw-top'>
          <div>
            <div className='sw-eye'><span className='sw-eye-line'></span>Our Services</div>
            <h2 className='section-title'>Everything You <em>Need</em>, In One Place</h2>
          </div>
        </div>
        <div className='sw-rows'>
          <div className='sw-row'>
            {services.slice(0, 3).map((s, i) => (
              <div key={i} className={`sc ${s.variant}`} onClick={handleShow} style={{ cursor: 'pointer' }}>
                <div className='sc-blob'></div>
                <div className='sc-num'>{s.num}</div>
                <div className='sc-hex'><i className={`bi ${s.icon}`}></i></div>
                <div className='sc-title'>{s.title}</div>
                <div className='sc-desc'>{s.desc}</div>
                <div className='sc-foot'>
                  <span className='sc-lbl'>Learn more</span>
                  <div className='sc-btn'><i className='bi bi-arrow-right'></i></div>
                </div>
              </div>
            ))}
          </div>
          <div className='sw-row'>
            {services.slice(3, 6).map((s, i) => (
              <div key={i} className={`sc ${s.variant}`} onClick={handleShow} style={{ cursor: 'pointer' }}>
                <div className='sc-blob'></div>
                <div className='sc-num'>{s.num}</div>
                <div className='sc-hex'><i className={`bi ${s.icon}`}></i></div>
                <div className='sc-title'>{s.title}</div>
                <div className='sc-desc'>{s.desc}</div>
                <div className='sc-foot'>
                  <span className='sc-lbl'>Learn more</span>
                  <div className='sc-btn'><i className='bi bi-arrow-right'></i></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PARTNER COLLEGES ══ */}
      <section id='cag-colleges' className='cag-section'>
        <div className='heading-wrap'>
          <div className='cag-eyebrow'>Institutions</div>
          <h2 className='cag-h1'>Our <em>Partner</em> Colleges</h2>
        </div>
        <div className='cag-college-carousel'>
          <button className='cag-carousel-arrow arrow-prev' onClick={collegeScrollPrev}><i className='bi bi-arrow-left'></i></button>
          <button className='cag-carousel-arrow arrow-next' onClick={collegeScrollNext}><i className='bi bi-arrow-right'></i></button>
          <div className='cag-college-viewport' ref={collegeEmblaRef}>
            <div className='cag-college-track'>
              {colleges.map((c, i) => (
                <div key={i} className='cag-college-card'>
                  <div className='card-img'>
                    <div className='card-placeholder' style={{ background: c.gradient }}></div>
                    <img src={c.img} alt={c.name} onError={e => (e.currentTarget.style.display = 'none')} />
                    <div className='card-badge' style={{ background: c.badgeBg, color: '#fff', borderColor: c.badgeBorder }}>Admissions Open For AY 2026-27</div>
                  </div>
                  <div className='card-body'>
                    <div className='card-loc'><i className='bi bi-geo-alt-fill'></i>{c.loc}</div>
                    <div className='card-name' dangerouslySetInnerHTML={{ __html: c.name }}></div>
                    <a href='#' onClick={e => { e.preventDefault(); handleShow() }} className='card-apply'>Apply Now <i className='bi bi-arrow-up-right'></i></a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section id='cag-testi' className='cag-section'>
        <div className='text-center'>
          <div className='cag-eyebrow'>Testimonials</div>
          <h2 className='cag-h1'>Success <em>Stories</em></h2>
        </div>
        <div className='cag-testi-wrap'>
          <div className='cag-testi-viewport' ref={testiEmblaRef}>
            <div className='cag-testi-track'>
              {testimonials.map((t, i) => (
                <div key={i} className={`tc-card ${i === testiIdx ? 'active' : ''}`}>
                  <div className='tc-video'>
                    <div className='tc-num'>{t.num}</div>
                    {/* enablejsapi=1 is already baked into each URL in the testimonials array above */}
                    <iframe
                      src={t.video}
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      allowFullScreen
                      loading='lazy'
                    ></iframe>
                  </div>
                  <div className='tc-body'>
                    <div className='tc-stars'>{[...Array(5)].map((_, si) => <StarSvg key={si} />)}</div>
                    <p className='tc-quote'>{t.quote}</p>
                    <div className='tc-divider'></div>
                    <div className='tc-author'>
                      <div className='tc-ava' style={{ background: t.avaBg, color: t.avaColor }}>{t.initials}</div>
                      <div>
                        <div className='tc-name'>{t.name}</div>
                        <div className='tc-role'>{t.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='tc-controls'>
            <button className='tc-arrow' onClick={testiScrollPrev}>
              <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><polyline points='15 18 9 12 15 6' /></svg>
            </button>
            <div className='tc-dots'>
              {testimonials.map((_, i) => (
                <button key={i} className={`tc-dot ${i === testiIdx ? 'active' : ''}`} onClick={() => testiEmblaApi?.scrollTo(i)} />
              ))}
            </div>
            <div className='tc-progress'>
              <div className='tc-progress-fill' ref={progressRef}></div>
            </div>
            <button className='tc-arrow' onClick={testiScrollNext}>
              <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><polyline points='9 18 15 12 9 6' /></svg>
            </button>
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section id='cag-cta' className='cag-cta mt-5'>
        <div className='orb orb-r'></div>
        <div className='orb orb-l'></div>
        <div className='container position-relative' style={{ zIndex: 2 }}>
          <div className='cag-cta-eyebrow'>
            <span className='e-dot'></span> Admissions Open 2026
          </div>
          <h2 className='cta-headline'>Let&apos;s Build Your Future <span className='red'>Today</span></h2>
          <p className='cta-sub fs-3'>Know more about us</p>
          <div className='h-form-wrap'>
            {!ctaSubmitted ? (
              <form onSubmit={handleCtaSubmit}>
                <div className='h-form'>
                  <div className='h-field'>
                    <label className='h-label'>Full Name</label>
                    <input className='h-input' name='ctaName' type='text' placeholder='Your name' required />
                  </div>
                  <div className='h-field'>
                    <label className='h-label'>Phone Number</label>
                    <input className='h-input' name='ctaPhone' type='tel' placeholder='Phone number' required />
                  </div>
                  <div className='h-field'>
                    <label className='h-label'>Interested course?</label>
                    <input className='h-input' name='ctaCourse' type='text' placeholder='Interested course?' />
                  </div>
                  <button className='h-submit' type='submit'>Get Started &rarr;</button>
                </div>
                <p className='form-note'>Free session &nbsp;·&nbsp; No spam &nbsp;·&nbsp; No commitment</p>
              </form>
            ) : (
              <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 14, padding: '28px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: 34, marginBottom: 8 }}>🎉</div>
                <div style={{ color: '#fff', fontWeight: 600, fontSize: 16 }}>You&apos;re on the list!</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>Our counsellor will call you within 24 hours.</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className='cag-footer'>
        <div className='ft-inner'>
          <hr className='ft-rule' />
          <div className='ft-columns'>
            <div>
              <div className='ft-brand mt-5 mt-md-0'>
                <a href='#' onClick={e => { e.preventDefault(); scrollTo('cag-hero') }}>
                  <img src="/images/collegeadmissions/logo.png" alt='LearnTech' />
                </a>
              </div>
              <p className='ft-slogan'>The path to your dream college is yours to walk, we just make sure you never miss a turn.</p>
            </div>
            <div>
              <div className='ft-heading'>Navigate</div>
              <nav className='ft-menu'>
                <a href='#cag-who' onClick={e => { e.preventDefault(); scrollTo('cag-who') }}>Who We Are</a>
                <a href='#cag-what' onClick={e => { e.preventDefault(); scrollTo('cag-what') }}>What We Do</a>
                <Link href="https://learntechww.com/services" target='_blank'>Services</Link>
                <a href='#cag-testi' onClick={e => { e.preventDefault(); scrollTo('cag-testi') }}>Success Stories</a>
              </nav>
            </div>
            <div>
              <div className='ft-heading'>Contact</div>
              <div className='ft-contact-list'>
                <div className='ft-contact-row'>
                  <div className='ft-contact-icon'><i className='bi bi-geo-alt-fill'></i></div>
                  <span>#80 (4), &apos;D&apos; Main Rd, East End, 9th Block, Jayanagar, Bangalore, Karnataka - 560041</span>
                </div>
                <div className='ft-contact-row'>
                  <div className='ft-contact-icon'><i className='bi bi-envelope-fill'></i></div>
                  <a href='mailto:info@learntechww.com'>info@learntechww.com</a>
                </div>
                <div className='ft-contact-row'>
                  <div className='ft-contact-icon'><i className='bi bi-telephone-fill'></i></div>
                  <a href='tel:+919606949066'>+91 96069 49066</a>
                </div>
              </div>
            </div>
            <div>
              <div className='ft-heading'>Follow</div>
              <div className='ft-socials mb-5'>
                <a href='https://www.instagram.com/learntechedus' target='_blank' rel='noreferrer' aria-label='Instagram'><i className='bi bi-instagram'></i></a>
                <a href='https://www.youtube.com/channel/UCZP40_ivVcdelNOVhmQFr7w' target='_blank' rel='noreferrer' aria-label='YouTube'><i className='bi bi-youtube'></i></a>
                <a href='https://www.linkedin.com/company/learntech-edu-solutions-pvt-ltd/' target='_blank' rel='noreferrer' aria-label='LinkedIn'><i className='bi bi-linkedin'></i></a>
                <a href='https://www.facebook.com/learntechedu' target='_blank' rel='noreferrer' aria-label='Facebook'><i className='bi bi-facebook'></i></a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* ══ ENQUIRY MODAL ══ */}
      <Modal show={show} onHide={handleClose} centered className='cag-modal'>
        <Modal.Body>
          <div className='text-end'>
            <button type='button' className='btn-close' onClick={handleClose}></button>
          </div>
          <div className='heading-popup'>
            <h3 className='text-center pop-up text-black' style={{ fontSize: 22, fontWeight: 600 }}>Enter Your Details to Get Started</h3>
          </div>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {() => (
              <Form>
                <div className='form-group mb-3'>
                  <Field type='text' name='name' placeholder='Enter Name' required className='form-control' />
                </div>
                <div className='form-group mb-3'>
                  <Field type='email' name='email' placeholder='Enter Email' required className='form-control' />
                </div>
                <div className='mb-3 form-group'>
                  <PhoneInputField name='contact' />
                  <ErrorMessage name='contact' component='div' className='text-danger' />
                </div>
                <div className='form-group mb-3'>
                  <Field type='text' name='location' placeholder='Location' required className='form-control' />
                </div>
                <div className='form-group mb-3'>
                  <Field type='text' name='course' placeholder='Interested course?' required className='form-control' />
                </div>
                <div className='form-group mb-3'>
                  <Field as='textarea' name='description' placeholder='Message (Optional)' className='form-control' rows={2} />
                </div>
                <div className='form-group text-center'>
                  <button type='submit' className='btn-submit w-100'>Submit &nbsp;<i className='bi bi-arrow-right'></i></button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </section>
  )
}

export default CollegeAdmissionGuidancePage
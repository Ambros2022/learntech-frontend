'use client'
import React, { useEffect, useState, useCallback, useRef } from 'react'

import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Modal from 'react-bootstrap/Modal'
import { useRouter } from 'src/hooks/useCompatRouter'
import dynamic from 'next/dynamic'
import { Field, Form, Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { toast } from 'sonner'
import axios from 'src/configs/axios'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
const PhoneInputField = dynamic(() => import('src/@core/components/popup/PhoneInput'))


const accreditationLogos = [
    { src: '/images/symbiosis/ranking1.svg', alt: 'NAAC A++ Accredited', title: 'NAAC A++ Accredited', subtitle: 'Highest UGC Rating' },
    { src: '/images/symbiosis/ranking2.svg', alt: 'UGC Recognised', title: 'UGC Recognised', subtitle: '100% Valid Degrees' },
    { src: '/images/symbiosis/ranking3.svg', alt: 'Global Alumni Network', title: 'Global Alumni Network', subtitle: '50+ Countries' },
    { src: '/images/symbiosis/ranking4.svg', alt: '98% Placement Rate', title: '98% Placement Rate', subtitle: '500+ Hiring Partners' },
    { src: '/images/symbiosis/ranking5.svg', alt: '25,000+ Students', title: '25,000+ Students', subtitle: 'Active Learners' },
    { src: '/images/symbiosis/ranking6.svg', alt: 'Flexible Learning', title: 'Flexible Learning', subtitle: 'Learn Anytime, Anywhere' },
]

const courses = [
    {
        badge: 'UNDERGRADUATE',
        title: 'Bachelor of Business Administration (BBA) (Hons)',
        duration: '4 Years',
        desc: 'Build a strong foundation in management, marketing, finance, and entrepreneurship. The programme develops leadership abilities, strategic thinking, and business acumen suited for dynamic global markets.',
        specializations: ['Marketing', 'Finance', 'Logistics And Supply Chain', 'Human Resource Management', 'Accounting and Finance'],
        fee: '42,000 AED',
        colClass: 'col-lg-8 col-md-6',
    },
    {
        badge: 'UNDERGRADUATE',
        title: 'Bachelor of Business Administration- Dual Degree',
        duration: '4 Years (as per pathway)',
        desc: 'An internationally integrated programme offering global exposure and cross-border academic experience. Designed for students seeking international mobility and broader career opportunities. Upon graduation, you will hold a BBA from Symbiosis International University, Dubai and a B.Sc from Aston University, UK.',
        specializations: [],
        fee: '42,000 AED',
        colClass: 'col-lg-4 col-md-6',
    },
    {
        badge: 'UNDERGRADUATE',
        title: 'Bachelor of Computer Applications (BCA)',
        duration: '4 Years',
        desc: 'A technology-focused programme covering programming, software development, databases, and emerging digital technologies, preparing students for careers in IT and software industries.',
        specializations: [],
        fee: '42,000 AED',
        colClass: 'col-lg-4 col-md-6',
    },
    {
        badge: 'UNDERGRADUATE',
        title: 'Bachelor of Arts in Mass Communication (BAMC)',
        duration: '4 Years',
        desc: 'Focused on media studies, journalism, digital communication, advertising, and public relations, this programme prepares students for the evolving media and communication landscape.',
        specializations: [],
        fee: '42,000 AED',
        colClass: 'col-lg-4 col-md-6',
    },
    {
        badge: 'UNDERGRADUATE',
        title: 'B.Com with ACCA Preparation',
        duration: '4 Years',
        desc: 'A commerce programme integrated with ACCA preparation, enabling students to prepare for a globally recognised accounting qualification alongside their degree.',
        specializations: [],
        fee: '42,000 AED',
        colClass: 'col-lg-4 col-md-6',
    },
    {
        badge: 'UNDERGRADUATE',
        title: 'B.Com (Honors) with ACCA Preparation',
        duration: '4 Years',
        desc: 'An advanced commerce programme offering deeper specialization in finance and accounting, combined with ACCA preparation for global career prospects.',
        specializations: [],
        fee: '42,000 AED',
        colClass: 'col-lg-4 col-md-6',
    },
    {
        badge: 'UNDERGRADUATE',
        title: 'B.Sc Psychology (Honors)',
        duration: '4 Years',
        desc: 'A research-oriented programme covering behavioural science, cognitive psychology, and applied psychology, preparing students for careers in mental health, HR, and research. The university also offers an exit option after 3 years with a B.Sc degree in Psychology.',
        specializations: [],
        fee: '42,000 AED',
        colClass: 'col-lg-4 col-md-6',
    },
    {
        badge: 'UNDERGRADUATE',
        title: 'B.Tech in Computer Engineering',
        duration: '4 Years',
        desc: 'A comprehensive engineering programme focused on computing systems, software technologies, AI fundamentals, and advanced engineering applications with a heavy focus on emerging technologies, AI solutions, gaming design development, and cybersecurity.',
        specializations: [],
        fee: '53,550 AED',
        colClass: 'col-lg-4 col-md-6',
    },
]

const mbaCourse = {
    badge: 'POSTGRADUATE',
    title: 'Master of Business Administration (MBA)',
    duration: '2 Years',
    desc: 'A globally focused postgraduate programme designed to develop strategic leaders with expertise in management, innovation, analytics, and decision-making. The Symbiosis International University, Dubai MBA fees structure is designed in accordance with the amenities offered and the infrastructure available.',
    specializations: ['Marketing', 'Finance', 'International Business', 'Operations', 'Business Analytics', 'Strategy, Management & Leadership', 'Innovation Entrepreneurship'],
    fee: '45,000 AED',
}

const faqs = [
    {
        q: 'Are degrees from Symbiosis International University, Dubai globally recognised?',
        a: 'Yes. Degrees are awarded by Symbiosis International (Deemed University), a globally ranked institution recognised for academic excellence and international credibility.',
    },
    {
        q: 'What programmes are offered at Symbiosis International University, Dubai?',
        a: 'The university offers undergraduate programmes including BBA, BBA Dual Degree, BCA, BAMC, B.Com (with ACCA), B.Com (Hons) with ACCA, BSc Psychology (Hons), B.Tech in Computer Engineering, and a postgraduate MBA programme.',
    },
    {
        q: 'What is the admission process for undergraduate and postgraduate programmes?',
        a: 'The process includes application submission, document review, issuance of a conditional offer (if eligible), fee payment for confirmation, provisional admission, and final admission confirmation upon completion of required payments and document verification.',
    },
    {
        q: 'Is English proficiency mandatory for admission?',
        a: 'Yes. Applicants must meet the required English proficiency criteria (IELTS / TOEFL) or equivalent academic English requirements, depending on the programme level.',
    },
    {
        q: 'Does the university provide scholarship opportunities?',
        a: 'Yes, eligible students may receive a Symbiosis International University, Dubai scholarship based on academic performance, predicted grades, or previous qualifications.',
    },
]

const whyChooseItems = [
    { icon: 'bi-award-fill', title: 'Accreditation', desc: 'Among the first Indian universities in the UAE to earn CAA and MOE accreditation.' },
    { icon: 'bi-laptop-fill', title: 'Global Recognition', desc: 'Degrees awarded by Symbiosis International (Deemed University), one of India\'s top-ranked institutions with a strong global reputation.' },
    { icon: 'bi-people-fill', title: 'Future-Ready Education', desc: 'Industry-integrated programs centered on innovation, entrepreneurship, and emerging technologies.' },
    { icon: 'bi-bank2', title: 'Diverse Learning Community', desc: 'A multicultural campus that fosters international outlooks, collaboration, and inclusive growth.' },
    { icon: 'bi-briefcase-fill', title: 'Strategic Advantage', desc: 'Located in Dubai Knowledge Park, providing direct access to internships, industry partnerships, and global career pathways.' },
]

const campusFacilities = [
    { title: 'Dubai Campus', img: '/images/symbiosis/campus.webp' },
    { title: 'Classroom', img: '/images/symbiosis/classroom.webp' },
    { title: 'Study Area', img: '/images/symbiosis/studyarea.webp' },
    { title: 'Cafeteria', img: '/images/symbiosis/cafeteria.webp' },
    { title: 'Computer Lab', img: '/images/symbiosis/lab2.webp' },
    { title: 'Indoor Sports', img: '/images/symbiosis/sports3.webp' },
    { title: 'Library', img: '/images/symbiosis/Library.webp' },
]

const partnerLogos = [
    { src: '/images/symbiosis/Aston_University_Birmingham.svg', alt: 'Aston University Birmingham' },
    { src: '/images/symbiosis/Cisco_Networking_Academy.svg', alt: 'Cisco Networking Academy' },
    { src: '/images/symbiosis/Cyber_Secured_India.svg', alt: 'Cyber Secured India' },
    { src: '/images/symbiosis/Deakin_University.svg', alt: 'Deakin University' },
    { src: '/images/symbiosis/EDNex.svg', alt: 'EDNex' },
    { src: '/images/symbiosis/Edu_Scan_Institute.svg', alt: 'Edu Scan Institute' },
    { src: '/images/symbiosis/IEEE.svg', alt: 'IEEE' },
    { src: '/images/symbiosis/IDS.svg', alt: 'IDS' },
    { src: '/images/symbiosis/PwC.svg', alt: 'PwC' },
    { src: '/images/symbiosis/ThriveHQ.svg', alt: 'ThriveHQ' },
    { src: '/images/symbiosis/TNHRDN.svg', alt: 'The National HRD Network (TNHRDN).svg' },
]

const partnersResponsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1400 }, items: 5 },
    desktop: { breakpoint: { max: 1400, min: 1024 }, items: 4 },
    tablet: { breakpoint: { max: 1024, min: 600 }, items: 3 },
    mobile: { breakpoint: { max: 600, min: 0 }, items: 1 },
}

const ugSteps = [
    { num: '01', title: 'Submit Application', desc: 'Upload required documents: Grade 12 results, Grade 10 results, English proficiency (80% in High School English or IELTS 5.0 / TOEFL 500), SOP, recommendation letter, and passport copy.' },
    { num: '02', title: 'Application Review', desc: 'The Admissions Team evaluates your application and supporting documents.' },
    { num: '03', title: 'Receive Conditional Offer', desc: 'Eligible applicants receive a Conditional Offer Letter and Scholarship Letter (if applicable, based on predicted or final school results).' },
    { num: '04', title: 'Confirm Acceptance', desc: 'Pay AED 250 (non-refundable) + 10% of annual tuition fees (before scholarship adjustment).' },
    { num: '05', title: 'Provisional Admission', desc: 'Admission status updated to Provisionally Admitted upon payment. Invoice and receipt issued by the Finance Office.' },
    { num: '06', title: 'Final Admission Confirmation', desc: 'Issued after payment of the first installment, visa fees (if applicable), caution deposit, and submission of original documents at orientation.' },
]

const pgSteps = [
    { num: '01', title: 'Submit Application', desc: 'Upload required documents: bachelor\'s transcripts, English proficiency (IELTS 6.0 / TOEFL 550), SOP, recommendation letter, CV (if applicable), and passport copy.' },
    { num: '02', title: 'Application Review & Interview', desc: 'Applications are reviewed by the Admissions Team. Eligible candidates attend an academic interview.' },
    { num: '03', title: 'Receive Conditional Offer', desc: 'Selected applicants receive a Conditional Offer Letter and Scholarship Letter (if applicable).' },
    { num: '04', title: 'Confirm Acceptance', desc: 'Pay AED 250 (non-refundable) + 10% of annual tuition fees (before scholarship adjustment).' },
    { num: '05', title: 'Provisional Admission', desc: 'Admission confirmed upon payment. Invoice and receipt issued by Finance Office.' },
    { num: '06', title: 'Final Admission Confirmation', desc: 'Issued after payment of first installment, visa fees (if applicable), caution deposit, and submission of original documents.' },
]

const SymbiosisDubaiPage = () => {
    const router = useRouter()
    const [show, setShow] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [openFaq, setOpenFaq] = useState<number | null>(null)
    const [campusIndex, setCampusIndex] = useState(0)
    const campusTrackRef = useRef<HTMLDivElement>(null)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    useEffect(() => {
        AOS.init({ once: true, offset: 200, easing: 'ease-in-sine', delay: 100, duration: 1000 })

        const handleScroll = () => {
            setScrolled(window.scrollY > 60)

            // Reveal animations
            document.querySelectorAll('.sym-reveal,.sym-reveal-left,.sym-reveal-right').forEach((el) => {
                if (el.getBoundingClientRect().top < window.innerHeight - 80) el.classList.add('visible')
            })

            // Process card animations
            document.querySelectorAll('.sym-process-card').forEach((card) => {
                if (card.getBoundingClientRect().top < window.innerHeight - 100) {
                    card.classList.add('in-view')
                    const steps = card.querySelectorAll('.sym-step')
                    steps.forEach((step, i) => {
                        setTimeout(() => step.classList.add('lit'), 300 + i * 180)
                    })
                }
            })
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll() // initial check

        // Bootstrap JS for navbar toggle
        if (typeof window !== 'undefined') {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            import('bootstrap/dist/js/bootstrap.bundle.min.js').catch(() => { /* intentionally empty */ })
        }

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const initialValues = {
        name: '',
        email: '',
        contact: '',
        location: '',
        course: '',
        description: '',
    }

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        contact: Yup.string()
            .required('Phone number is required')
            .test('uae-phone', 'Phone number must be exactly 9 digits', (value) => {
                if (!value) return false
                const digits = value.replace(/[^0-9]/g, '').replace(/^971/, '')
                return digits.length === 9
            }),
        location: Yup.string().required('Location is required'),
        course: Yup.string().required('Please select a course'),
    })

    const handleSubmit = async (values: any, { resetForm }: any) => {
        try {
            toast.loading('Processing')
            const formData = new FormData()
            formData.append('name', values.name)
            formData.append('email', values.email)
            formData.append('contact_number', values.contact)
            formData.append('location', values.location)
            formData.append('current_url', window.location.href)
            formData.append('course_in_mind', values.course)
            formData.append('description', values.description || '')
            formData.append('Source', 'Google Ads')
            formData.append('SourceCampaign', 'Symbiosis Dubai 2026-27')

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

    const navigate = (id: string, offset = 0) => {
        const el = document.getElementById(id)
        if (el) {
            const top = el.getBoundingClientRect().top + window.pageYOffset
            window.scrollTo({ top: top - offset, behavior: 'smooth' })
        }
    }

    const closeNavbar = () => {
        const navbar = document.getElementById('symNavMenu')
        if (navbar && navbar.classList.contains('show')) {
            navbar.classList.remove('show')
        }
    }

    const toggleFaq = (idx: number) => {
        setOpenFaq(openFaq === idx ? null : idx)
    }

    // Campus carousel
    const getVisibleSlides = () => {
        if (typeof window === 'undefined') return 3
        if (window.innerWidth <= 600) return 1
        if (window.innerWidth <= 992) return 2
        return 3
    }

    const updateCampusCarousel = useCallback(() => {
        if (campusTrackRef.current && campusTrackRef.current.children[0]) {
            const slideWidth = (campusTrackRef.current.children[0] as HTMLElement).offsetWidth + 25
            campusTrackRef.current.style.transform = `translateX(-${campusIndex * slideWidth}px)`
        }
    }, [campusIndex])

    useEffect(() => {
        updateCampusCarousel()
        window.addEventListener('resize', updateCampusCarousel)
        return () => window.removeEventListener('resize', updateCampusCarousel)
    }, [updateCampusCarousel])

    const campusNext = () => {
        const visible = getVisibleSlides()
        setCampusIndex(prev => prev < campusFacilities.length - visible ? prev + 1 : 0)
    }

    const campusPrev = () => {
        const visible = getVisibleSlides()
        setCampusIndex(prev => prev > 0 ? prev - 1 : campusFacilities.length - visible)
    }

    // Form component (reusable for hero + modal)
    const EnquiryForm = ({ isModal = false }: { isModal?: boolean }) => (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {() => (
                <Form>
                    <div className='form-group'>
                        <Field type='text' name='name' placeholder='Full Name' required className='sym-form-field' />
                        <ErrorMessage name='name' component='div' className='text-danger small' />
                    </div>
                    <div className='form-group'>
                        <Field type='email' name='email' placeholder='Email' required className='sym-form-field' />
                        <ErrorMessage name='email' component='div' className='text-danger small' />
                    </div>
                    <div className='form-group mb-3'>
                        <PhoneInputField name='contact' country='ae' />
                        <ErrorMessage name='contact' component='div' className='text-danger small' />
                    </div>
                    <div className='form-group'>

                        <Field type='location' name='location' placeholder='Enter Location' required className='sym-form-field' />
                        <ErrorMessage name='location' component='div' className='text-danger small' />
                    </div>
                    <div className='form-group'>
                        <Field as='select' name='course' className='sym-form-field'>
                            <option value='' disabled selected>Select Course</option>
                            <option>Bachelor of Business Administration (BBA) (Hons)</option>
                            <option>Bachelor of Business Administration- Dual Degree</option>
                            <option>Bachelor of Computer Applications (BCA)</option>
                            <option>Bachelor of Arts in Mass Communication (BAMC)</option>
                            <option>B.Com with ACCA Preparation</option>
                            <option>B.Com (Honors) with ACCA Preparation</option>
                            <option>B.Sc Psychology (Honors)</option>
                            <option>B.Tech in Computer Engineering</option>
                            <option>Master of Business Administration (MBA)</option>
                        </Field>
                    </div>
                    <div className='form-group'>
                        <Field as='textarea' name='description' placeholder='Message (Optional)' rows={2} className='sym-form-field' style={{ resize: 'vertical' }} />
                    </div>
                    <div className='form-group text-center'>
                        <button type='submit' className={isModal ? 'btn sym-modal-submit' : 'sym-form-submit'}>
                            Submit <i className='bi bi-arrow-right-circle ms-1'></i>
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    )

    return (
        <section className='symbiosis-main'>
            <Head>
                <title>Symbiosis International University Dubai | Admission 2026–27</title>
                <meta name='description' content='Apply to Symbiosis International University Dubai for world-class UG & PG programs, industry-oriented curriculum, and global career opportunities. Enquire now!' />
                <meta name="robots" content="index, follow" />
                <link rel='canonical' href='https://learntechww.com/symbiosis-international-university-dubai' />
                {/* eslint-disable-next-line @next/next/no-css-tags */}
                <link rel='stylesheet' href='/css/symbiosisdubailandingpage.css' />
                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
                {/* eslint-disable-next-line @next/next/no-page-custom-font */}
                <link href='https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap' rel='stylesheet' />

                <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css' />
                <script
                    type='application/ld+json'
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'FAQPage',
                            mainEntity: faqs.map(f => ({
                                '@type': 'Question',
                                name: f.q,
                                acceptedAnswer: { '@type': 'Answer', text: f.a },
                            })),
                        }),
                    }}
                />
            </Head>

            {/* WhatsApp Float */}
            <a href='https://wa.me/+971502436552' target='_blank' rel='noopener noreferrer' className='sym-whatsapp-float'>
                <i className='bi bi-whatsapp'></i>
            </a>

            {/* Phone Float */}
            <a href='tel:+971502436552' className='sym-phone-float'>
                <i className='bi bi-telephone-fill'></i>
            </a>

            {/* ─── NAVBAR ──────────────────────────── */}
            <nav className={`navbar navbar-expand-lg sym-navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className='container'>
                    <a href='#sym-hero' className='navbar-brand' onClick={(e) => { e.preventDefault(); navigate('sym-hero', 0) }}>
                        <img src='/images/symbiosis/logo.svg' alt='Symbiosis International University' style={{ height: 64, width: 'auto', objectFit: 'contain' }} />
                    </a>
                    <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#symNavMenu'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse justify-content-end gap-3' id='symNavMenu'>
                        <ul className='navbar-nav align-items-lg-center gap-lg-2 mb-2 mb-lg-0 mt-3 mt-lg-0'>
                            <li className='nav-item '><a className='nav-link sym-nav-link' onClick={() => { navigate('sym-hero', 80); closeNavbar() }}>Home</a></li>
                            <li className='nav-item'><a className='nav-link sym-nav-link' onClick={() => { navigate('sym-about', 80); closeNavbar() }}>About</a></li>
                            <li className='nav-item'><a className='nav-link sym-nav-link' onClick={() => { navigate('sym-courses', 80); closeNavbar() }}>Courses</a></li>
                            <li className='nav-item'><a className='nav-link sym-nav-link' onClick={() => { navigate('sym-admission', 80); closeNavbar() }}>Admission Process</a></li>
                            <li className='nav-item'><a className='nav-link sym-nav-link' onClick={() => { navigate('sym-why', 80); closeNavbar() }}>Why Choose?</a></li>
                            <li className='nav-item'><a className='nav-link sym-nav-link' onClick={() => { navigate('sym-faq', 80); closeNavbar() }}>FAQs</a></li>
                            <li className='nav-item'><a className='nav-link sym-nav-link' onClick={() => { navigate('sym-cta', 80); closeNavbar() }}>Get In Touch</a></li>
                            <li className='nav-item ms-lg-2'>
                                <button className='sym-btn-red' onClick={handleShow} style={{ borderRadius: 'var(--sym-radius-sm)', padding: '.6rem 1.4rem', fontSize: '.85rem' }}>
                                    Apply Now <i className='bi bi-arrow-right'></i>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* ─── HERO ────────────────────────────── */}
            <section className='sym-hero' id='sym-hero'>
                <div className='container'>
                    <div className='sym-hero-content'>
                        <div className='row align-items-center g-5'>
                            <div className='col-lg-7'>
                                <div className='sym-hero-badge'>
                                    <div className='sym-hero-badge-dot'></div>
                                    <span>Admissions Open Symbiosis International University, Dubai</span>
                                </div>
                                <h1 className='sym-hero-title'>
                                    The World Comes to Dubai,
                                    <span className='accent'>&nbsp;At Symbiosis,</span><br />
                                    We Show You The World.
                                </h1>
                                <p className='sym-hero-desc'>
                                    Let your academics and career take off at Symbiosis International University, Dubai.
                                </p>
                                <div className='sym-hero-actions d-flex flex-wrap gap-3'>
                                    <button className='sym-btn-red' onClick={handleShow}>Apply Now <i className='bi bi-arrow-right'></i></button>
                                    <button className='sym-btn-outline' onClick={handleShow}><i className='bi bi-cloud-arrow-down-fill'></i> Download Brochure</button>
                                </div>
                                <div className='sym-hero-stats'>
                                    <div>
                                        <div className='sym-hero-stat-num'>98<span>%</span></div>
                                        <div className='sym-hero-stat-lbl'>MBA Internship Placement Rate</div>
                                    </div>
                                    <div>
                                        <div className='sym-hero-stat-num'>85<span>+</span></div>
                                        <div className='sym-hero-stat-lbl'>Countries Represented</div>
                                    </div>
                                    <div>
                                        <div className='sym-hero-stat-num'>50<span>+</span></div>
                                        <div className='sym-hero-stat-lbl'>Years of Excellence</div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-5'>
                                <div className='sym-hero-form-card'>
                                    <h3 className='text-center'>Take The First Step Towards Your Future</h3>
                                    <EnquiryForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── MARQUEE / ACCREDITATIONS ────────── */}
            <div className='sym-marquee-section mt-4'>
                <h2>Rankings <span>&</span> Accreditations</h2>
                <div className='sym-marquee-track'>
                    {[...accreditationLogos, ...accreditationLogos].map((item, idx) => (
                        <div className='sym-marquee-item' key={idx}>
                            <div className='sym-marquee-icon'>
                                <img src={item.src} alt={item.alt}
                                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x80?text=' + encodeURIComponent(item.alt) }}
                                />
                            </div>
                            <div className='sym-marquee-text'>
                                <strong>{item.title}</strong>
                                <span>{item.subtitle}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ─── ABOUT ───────────────────────────── */}
            <section className='sym-about' id='sym-about'>
                <div className='container'>
                    <div className='row align-items-center g-5'>
                        <div className='col-lg-5 sym-reveal-left'>
                            <div className='sym-about-visual'>
                                <div className='sym-about-img-main' >

                                </div>
                                <div className='sym-float-badge sym-float-badge-2'>
                                    <div className='lbl text-center'>Alumni from <div className='num'>50+</div> countries</div>
                                </div>
                                <div className='sym-float-badge sym-float-badge-1'>
                                    <div className='lbl text-center'>Partnerships with <div className='num'>15+</div> organisations</div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-7 sym-reveal-right'>
                            <div className='sym-section-tag'><i className='bi bi-mortarboard-fill'></i> About</div>
                            <h2 className='sym-section-heading'>Symbiosis International University, <span>Dubai</span></h2>
                            <p className='sym-section-sub mb-4'>
                                Symbiosis International (Deemed University) was established in 1971 by Prof. (Dr.) S.B. Mujumdar, for 'Promoting International Understanding through Quality Education'. The Dubai campus is known for its excellent infrastructure and international exposure and is one of the Indian universities in UAE. With various national and international accolades to their name, Symbiosis International University, Dubai has set a standard for excellence in education and earned their name amongst top Indian universities in Dubai.
                            </p>
                            <p className='sym-section-sub'>
                                Centrally located in the heart of Dubai Knowledge Park, the campus carries forward a legacy of 50+ years of educational excellence to a dynamic city. The exact symbiosis international university address is Symbiosis International University, Building 14 Dubai Knowledge Park.
                            </p>
                            <p className='sym-section-sub'>
                                The campus offers various internationally accredited programmes in computer science, psychology, management, media studies, and engineering. Therefore, you are likely to find this university on every list of Indian universities approved by the UAE.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── COURSES ─────────────────────────── */}
            <section className='sym-courses' id='sym-courses'>
                <div className='container'>
                    <div className='sym-courses-header sym-reveal'>
                        <div className='sym-section-tag'><i className='bi bi-grid-fill'></i> Our Programmes</div>
                        <h2 className='sym-section-heading'>Symbiosis International <span>University Courses</span></h2>
                        <p className='sym-section-sub'>Our programmes are designed to combine academic excellence with industry relevance, preparing students for global careers across business, technology, media, psychology, engineering, and management. The Symbiosis International University, Dubai fees is mentioned below to help you make your decision.</p>
                    </div>
                    <div className='row g-4'>
                        {courses.map((course, idx) => (
                            <div className={`${course.colClass} d-flex sym-reveal`} key={idx} style={{ transitionDelay: `${idx * 0.08}s` }}>
                                <div className='sym-course-card'>
                                    <div className='sym-course-card-top'>
                                        <span className='sym-course-badge'>{course.badge}</span>
                                        <div className='sym-course-title'>{course.title}</div>
                                    </div>
                                    <div className='sym-course-body'>
                                        <div className='sym-course-meta-row'>
                                            <div className='sym-course-meta-pill'><i className='bi bi-clock-fill'></i> {course.duration}</div>
                                        </div>
                                        <p className='sym-course-desc'>{course.desc}</p>
                                        {course.specializations.length > 0 && (
                                            <div className='sym-course-checks'>
                                                <h6><strong>Specialisations Offered:</strong></h6>
                                                {course.specializations.map((spec, si) => (
                                                    <div className='sym-course-check' key={si}>
                                                        <i className='bi bi-check-circle-fill '></i> {spec} {si < course.specializations.length - 1 ? '|' : ''}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        <div className='sym-course-footer'>
                                            <div className='sym-course-fee'>{course.fee} <small>Annual Tuition Fees</small></div>
                                            <button className='sym-btn-apply' onClick={handleShow}>Apply Now <i className='bi bi-arrow-right ms-1'></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* MBA Card */}
                        <div className='col-lg-12 d-flex sym-reveal' style={{ transitionDelay: '.64s' }}>
                            <div className='sym-course-card sym-mba-card'>
                                <div className='sym-course-card-top'>
                                    <span className='sym-course-badge'>{mbaCourse.badge}</span>
                                    <div className='sym-course-title'>{mbaCourse.title}</div>
                                </div>
                                <div className='sym-course-body'>
                                    <div className='sym-course-meta-row'>
                                        <div className='sym-course-meta-pill'><i className='bi bi-clock-fill'></i> {mbaCourse.duration}</div>
                                    </div>
                                    <p className='sym-course-desc'>{mbaCourse.desc}</p>
                                    <div className='sym-course-checks'>
                                        <h6><strong>Specialisations Offered:</strong></h6>
                                        {mbaCourse.specializations.map((spec, si) => (
                                            <div className='sym-course-check' key={si}>
                                                <i className='bi bi-check-circle-fill'></i> {spec} {si < mbaCourse.specializations.length - 1 ? '|' : ''}
                                            </div>
                                        ))}
                                    </div>
                                    <div className='sym-course-footer'>
                                        <div className='sym-course-fee'>{mbaCourse.fee} <small>Annual Tuition Fees</small></div>
                                        <button className='sym-btn-apply' onClick={handleShow}>Apply Now <i className='bi bi-arrow-right ms-1'></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className='text-center my-4' style={{ color: 'black' }}>
                        The university isn’t all about academia though. Symbiosis University, Dubai boasts a central location in Dubai Knowledge Park which offers networking opportunities and unparalleled infrastructural support to help students become the best versions of themselves. Read on for a snapshot of the Symbiosis International University, Dubai campus stories.
                    </p>
                </div>
            </section>

            {/* ─── ADMISSION PROCESS ───────────────── */}
            <section className='sym-admission-section' id='sym-admission'>
                <div className='container'>
                    <div className='text-center mb-5 sym-reveal'>
                        <div className='sym-section-tag'><i className='bi bi-bar-chart-steps'></i> Admission Process</div>
                        <h2 className='sym-section-heading'>Symbiosis International University Dubai<br /> <span>Admission Process</span></h2>
                        <p className='sym-section-sub'>To get admitted into one of the Symbiosis International University courses you have to follow the admission process of the university. This process is mentioned in detail below to help you familiarise yourself with it.</p>
                    </div>

                    <div className='sym-process-grid'>
                        {/* UG Card */}
                        <div className='sym-process-card sym-reveal'>
                            <span className='sym-card-tag'>
                                <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                                    <path d='M22 10v6M2 10l10-5 10 5-10 5z' />
                                    <path d='M6 12v5c3 3 9 3 12 0v-5' />
                                </svg>
                                Undergraduate
                            </span>
                            <h3 className='sym-card-title'>UG Admission Process</h3>
                            <div className='sym-steps'>
                                {ugSteps.map((step, idx) => (
                                    <div className='sym-step' key={idx}>
                                        <div className='sym-step-track'>
                                            <div className='sym-step-circle'>{step.num}</div>
                                            <div className='sym-step-line'></div>
                                        </div>
                                        <div className='sym-step-body'>
                                            <p className='sym-step-title'>{step.title}</p>
                                            <p className='sym-step-desc'>{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* PG Card */}
                        <div className='sym-process-card sym-reveal'>
                            <span className='sym-card-tag'>
                                <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                                    <rect x='2' y='7' width='20' height='14' rx='2' />
                                    <path d='M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16' />
                                </svg>
                                Postgraduate
                            </span>
                            <h3 className='sym-card-title'>PG Admission Process</h3>
                            <div className='sym-steps'>
                                {pgSteps.map((step, idx) => (
                                    <div className='sym-step' key={idx}>
                                        <div className='sym-step-track'>
                                            <div className='sym-step-circle'>{step.num}</div>
                                            <div className='sym-step-line'></div>
                                        </div>
                                        <div className='sym-step-body'>
                                            <p className='sym-step-title'>{step.title}</p>
                                            <p className='sym-step-desc'>{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── INDUSTRY PARTNERSHIPS ───────────── */}
            <section className='sym-partners' id='sym-partners'>
                <div className='container'>
                    <div className='sym-partners-header sym-reveal'>
                        <div className='sym-section-tag'><i className='bi bi-star-fill'></i> Collaborations</div>
                        <h2 className='sym-section-heading'>Industry <span>Partnerships</span></h2>
                        <p className='sym-section-sub'>To provide students with the best opportunities after graduation, the university has partnered with various organisations that add extra-curricular value to the education obtained. This is just one of the many reasons the Symbiosis International University, Dubai ranking has been consistently high.</p>
                    </div>
                    <div className='sym-reveal'>
                        <Carousel responsive={partnersResponsive} infinite autoPlay autoPlaySpeed={3000} arrows swipeable draggable>
                            {partnerLogos.map((item, idx) => (
                                <div className='sym-partner-logo' key={idx}>
                                    <img src={item.src} alt={item.alt}
                                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x70?text=' + encodeURIComponent(item.alt) }}
                                    />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </section>

            {/* ─── WHY CHOOSE ──────────────────────── */}
            <section className='sym-why' id='sym-why'>
                <div className='container'>
                    <div className='sym-why-header sym-reveal'>
                        <div className='sym-section-tag'><i className='bi bi-lightning-fill'></i> Why Symbiosis?</div>
                        <h2 className='sym-section-heading'>Why Choose <span>Symbiosis University,</span> Dubai</h2>
                        <p className='sym-section-sub'>
                            Symbiosis International University, Dubai offers a globally recognised education rooted in academic excellence, industry relevance, and international exposure. Backed by strong global rankings and a legacy of quality education, the university combines rigorous academics with practical learning, experienced faculty, and a multicultural campus environment. With programmes aligned to evolving industry demands, integrated professional certifications, and strong career support, students graduate with the skills, confidence, and global perspective needed to succeed in competitive international markets.
                        </p>
                        <p className='sym-section-sub'>
                            Here are some reasons why you should consider joining Symbiosis International University, Dubai for your studies.
                        </p>
                    </div>
                    <div className='row g-4 justify-content-center'>
                        {whyChooseItems.map((item, idx) => (
                            <div className='col-lg-4 col-md-6 sym-reveal' key={idx} style={{ transitionDelay: `${idx * 0.1}s` }}>
                                <div className='sym-why-card'>
                                    <div className='sym-why-icon'><i className={`bi ${item.icon}`} style={{ color: 'var(--sym-primary)' }}></i></div>
                                    <h5>{item.title}</h5>
                                    <p>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── CAMPUS INFRASTRUCTURE ───────────── */}
            <section className='sym-campus'>
                <div className='container'>
                    <div className='sym-campus-header'>
                        <div className='sym-section-tag'><i className='bi bi-radar'></i> Campus Facilities</div>
                        <h2>Symbiosis, Dubai <span>Infrastructure</span></h2>
                        <p className='sym-section-sub'>
                            The university boasts well-thought out and planned infrastructural support to help the students become the best version of themselves. The classrooms are equipped with good tables and chairs to ensure students remain comfortable. The library allows students to spend time in silence and consume knowledge while study areas encourage expansion of knowledge.
                        </p>
                    </div>
                    <div className='sym-campus-wrapper'>
                        <div className='sym-campus-track' ref={campusTrackRef}>
                            {campusFacilities.map((item, idx) => (
                                <div className='sym-campus-slide' key={idx}>
                                    <div className='sym-campus-card'>
                                        <img src={item.img} alt={item.title}
                                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x260?text=' + encodeURIComponent(item.title) }}
                                        />
                                        <div className='sym-campus-card-content'>
                                            <h4>{item.title}</h4>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='sym-carousel-controls'>
                        <button onClick={campusPrev}>&#8592;</button>
                        <button onClick={campusNext}>&#8594;</button>
                    </div>
                </div>
            </section>

            {/* ─── FAQ ─────────────────────────────── */}
            <section className='sym-faq' id='sym-faq'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-lg-4'>
                            <div className='sym-section-tag'><i className='bi bi-question-circle-fill'></i> FAQ</div>
                            <h2 className='sym-section-heading2' >Frequently Asked <span>Questions</span></h2>
                        </div>
                        <div className='col-lg-8'>
                            {faqs.map((faq, idx) => (
                                <div className={`sym-faq-item ${openFaq === idx ? 'open' : ''}`} key={idx}>
                                    <div className='sym-faq-q' onClick={() => toggleFaq(idx)}>
                                        <h6>{faq.q}</h6>
                                        <div className='sym-faq-toggle'>
                                            <i className={`bi ${openFaq === idx ? 'bi-x' : 'bi-plus'}`}></i>
                                        </div>
                                    </div>
                                    <div className='sym-faq-a' style={{ maxHeight: openFaq === idx ? '500px' : '0' }}>
                                        <div className='sym-faq-a-inner'>{faq.a}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── CTA ─────────────────────────────── */}
            <section className='sym-cta' id='sym-cta'>
                <div className='sym-cta-bg-pattern'></div>
                <div className='sym-cta-grid-lines'></div>
                <div className='sym-cta-rings'>
                    <div className='sym-cta-ring sym-cta-ring-1'></div>
                    <div className='sym-cta-ring sym-cta-ring-2'></div>
                </div>
                <div className='container'>
                    <div className='sym-cta-content sym-reveal'>
                        <h2 className='text-center'>Begin your global journey with <span>Symbiosis International University,</span> Dubai.</h2>
                        <p className='text-center'>Join a university that blends international recognition, industry-focused learning, and the dynamic advantage of Dubai to shape your future without borders.</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', justifyContent: 'center' }}>
                            <button className='sym-btn-cta-primary' onClick={handleShow}>
                                Start Your Application Now <i className='bi bi-arrow-right'></i>
                            </button>
                        </div>
                        <div className='sym-cta-trust'>
                            <div className='sym-cta-address'>
                                <i className='bi bi-geo-alt-fill'></i>
                                <a href='https://maps.google.com/?q=Symbiosis+International+University+Building+14+Dubai+Knowledge+Park' target='_blank' rel='noopener noreferrer'>
                                    SYMBIOSIS INTERNATIONAL UNIVERSITY, Building 14, Dubai Knowledge Park
                                </a>
                            </div>
                            <div className='sym-cta-phones'>
                                <div className='sym-cta-trust-item gap-3'>
                                    <div>
                                        <i className='bi bi-whatsapp mx-1' style={{ color: 'green' }}></i>
                                        <i className='bi bi-telephone-fill mx-1'></i>
                                        <a href='tel:+971502436552'>+971 50 243 6552</a>
                                    </div>

                                    <div>
                                        <i className='bi bi-telephone-fill mx-1'></i>
                                        {/* <p></p> */}
                                        <a href="tel:+971502436552">Botim Number - +971 50 243 6552</a>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* ─── MODAL ───────────────────────────── */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <div className='sym-modal-heading'>
                        <h3 className='text-center'>Take The First Step Towards Your Future</h3>
                    </div>
                    <EnquiryForm isModal={true} />
                </Modal.Body>
            </Modal>
        </section>
    )
}

export default SymbiosisDubaiPage

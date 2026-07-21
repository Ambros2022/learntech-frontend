import Image from 'next/image'
import JsonLd from 'src/app/components/JsonLd'
import styles from './SymbiosisPage.module.css'

import SymEnquiryTriggerClient from './SymEnquiryTriggerClient'
import SymEnquiryFormClient from './SymEnquiryFormClient'
import SymScrollEffectsClient from './SymScrollEffectsClient'
import SymPartnersCarouselClient from './SymPartnersCarouselClient'

const BASE_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://learntechww.com'
const PAGE_PATH = '/symbiosis-international-university-dubai'

/* ─── Static Data ─── */
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

const ugSteps = [
  { num: '01', title: 'Submit Application', desc: 'Upload required documents: Grade 12 results, Grade 10 results, English proficiency (80% in High School English or IELTS 5.0 / TOEFL 500), SOP, recommendation letter, and passport copy.' },
  { num: '02', title: 'Application Review', desc: 'The Admissions Team evaluates your application and supporting documents.' },
  { num: '03', title: 'Receive Conditional Offer', desc: 'Eligible applicants receive a Conditional Offer Letter and Scholarship Letter (if applicable, based on predicted or final school results).' },
  { num: '04', title: 'Confirm Acceptance', desc: 'Pay AED 250 (non-refundable) + 10% of annual tuition fees (before scholarship adjustment).' },
  { num: '05', title: 'Provisional Admission', desc: 'Admission status updated to Provisionally Admitted upon payment. Invoice and receipt issued by the Finance Office.' },
  { num: '06', title: 'Final Admission Confirmation', desc: 'Issued after payment of the first installment, visa fees (if applicable), caution deposit, and submission of original documents at orientation.' },
]

const pgSteps = [
  { num: '01', title: 'Submit Application', desc: "Upload required documents: bachelor's transcripts, English proficiency (IELTS 6.0 / TOEFL 550), SOP, recommendation letter, CV (if applicable), and passport copy." },
  { num: '02', title: 'Application Review & Interview', desc: 'Applications are reviewed by the Admissions Team. Eligible candidates attend an academic interview.' },
  { num: '03', title: 'Receive Conditional Offer', desc: 'Selected applicants receive a Conditional Offer Letter and Scholarship Letter (if applicable).' },
  { num: '04', title: 'Confirm Acceptance', desc: 'Pay AED 250 (non-refundable) + 10% of annual tuition fees (before scholarship adjustment).' },
  { num: '05', title: 'Provisional Admission', desc: 'Admission confirmed upon payment. Invoice and receipt issued by Finance Office.' },
  { num: '06', title: 'Final Admission Confirmation', desc: 'Issued after payment of first installment, visa fees (if applicable), caution deposit, and submission of original documents.' },
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
  { src: '/images/symbiosis/TNHRDN.svg', alt: 'The National HRD Network' },
]

const whyChooseItems = [
  { icon: 'bi-award-fill', title: 'Accreditation', desc: "Among the first Indian universities in the UAE to earn CAA and MOE accreditation." },
  { icon: 'bi-laptop-fill', title: 'Global Recognition', desc: "Degrees awarded by Symbiosis International (Deemed University), one of India's top-ranked institutions with a strong global reputation." },
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

/* ─── Metadata (Server-Side) ─── */
export async function generateMetadata() {
  const title = 'Symbiosis International University Dubai | Admission 2026–27'
  const description = 'Apply to Symbiosis International University Dubai for world-class UG & PG programs, industry-oriented curriculum, and global career opportunities. Enquire now!'
  const canonicalUrl = `${BASE_URL}${PAGE_PATH}`
  const ogImage = `${BASE_URL}/images/symbiosis/banner.webp`

  return {
    title,
    description,
    keywords: 'Symbiosis International University Dubai, SIU Dubai, BBA Dubai, MBA Dubai, Study in Dubai, Indian University Dubai',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Learntech Edu Solutions',
      locale: 'en_AE',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'Symbiosis International University Dubai Admissions 2026-27',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

/* ─── Page (Server Component) ─── */
export default function Page() {

  const universitySchema = {
    '@context': 'https://schema.org',
    '@type': 'CollegeOrUniversity',
    name: 'Symbiosis International University Dubai',
    description: 'Globally ranked Indian university in Dubai Knowledge Park offering UG and PG programmes.',
    url: `${BASE_URL}${PAGE_PATH}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Building 14, Dubai Knowledge Park',
      addressLocality: 'Dubai',
      addressCountry: 'AE',
    },
    telephone: '+971502436552',
    sameAs: ['https://www.symbiosisdubai.ac.ae'],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>

      <JsonLd id='sym-university-schema' schema={universitySchema} />
      <JsonLd id='sym-faq-schema' schema={faqSchema} />

      <SymEnquiryTriggerClient>
        <section className={styles.symMain}>

          {/* Scroll reveal + campus carousel + FAQ accordion — zero HTML output */}
          <SymScrollEffectsClient />

          {/* ── Float Buttons ─────────────────── */}
          <a
            href='https://wa.me/+971502436552'
            target='_blank'
            rel='noopener noreferrer'
            className={styles.symWhatsappFloat}
            aria-label='Chat on WhatsApp'
          >
            <i className='bi bi-whatsapp' />
          </a>
          <a href='tel:+971502436552' className={styles.symPhoneFloat} aria-label='Call us'>
            <i className='bi bi-telephone-fill' />
          </a>

          {/* ── HERO ──────────────────────────── */}
          <section className={styles.symHero} id='sym-hero'>
            <div className='container'>
              <div className={styles.symHeroContent}>
                <div className='row align-items-center g-5'>
                  <div className='col-lg-7'>
                    <div className={styles.symHeroBadge}>
                      <div className={styles.symHeroBadgeDot} />
                      <span>Admissions Open Symbiosis International University, Dubai</span>
                    </div>
                    <h1 className={styles.symHeroTitle}>
                      The World Comes to Dubai,{' '}
                      <span className={styles.accent}>At Symbiosis,</span><br />
                      We Show You The World.
                    </h1>
                    <p className={styles.symHeroDesc}>
                      Let your academics and career take off at Symbiosis International University, Dubai.
                    </p>
                    <div className={`${styles.symHeroActions} d-flex flex-wrap gap-3`}>
                      <button className={styles.symBtnRed} data-enquiry-trigger>
                        Apply Now <i className='bi bi-arrow-right' />
                      </button>
                      <button className={styles.symBtnOutline} data-enquiry-trigger>
                        <i className='bi bi-cloud-arrow-down-fill' /> Download Brochure
                      </button>
                    </div>
                    <div className={styles.symHeroStats}>
                      <div>
                        <div className={styles.symHeroStatNum}>98<span>%</span></div>
                        <div className={styles.symHeroStatLbl}>MBA Internship Placement Rate</div>
                      </div>
                      <div>
                        <div className={styles.symHeroStatNum}>85<span>+</span></div>
                        <div className={styles.symHeroStatLbl}>Countries Represented</div>
                      </div>
                      <div>
                        <div className={styles.symHeroStatNum}>50<span>+</span></div>
                        <div className={styles.symHeroStatLbl}>Years of Excellence</div>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-5'>
                    <div className={styles.symHeroFormCard}>
                      <h3 className='text-center'>Take The First Step Towards Your Future</h3>
                      <SymEnquiryFormClient />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── MARQUEE / ACCREDITATIONS ──────── */}
          <div className={`${styles.symMarqueeSection} mt-4`}>
            <h2>Rankings <span>&amp;</span> Accreditations</h2>
            <div className={styles.symMarqueeTrack}>
              {[...accreditationLogos, ...accreditationLogos].map((item, idx) => (
                <div className={styles.symMarqueeItem} key={idx}>
                  <div className={styles.symMarqueeIcon}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.src} alt={item.alt}  loading='lazy' />
                  </div>
                  <div className={styles.symMarqueeText}>
                    <strong>{item.title}</strong>
                    <span>{item.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── ABOUT ─────────────────────────── */}
          <section className={styles.symAbout} id='sym-about'>
            <div className='container'>
              <div className='row align-items-center g-5'>
                <div className='col-lg-5 sym-reveal-left'>
                  <div className={styles.symAboutVisual}>
                    <div className={styles.symAboutImgMain} role='img' aria-label='Symbiosis International University Dubai campus' />
                    <div className={`${styles.symFloatBadge} ${styles.symFloatBadge2}`}>
                      <div className='lbl text-center'>
                        Alumni from <div className={styles.symFloatBadgeNum}>50+</div> countries
                      </div>
                    </div>
                    <div className={`${styles.symFloatBadge} ${styles.symFloatBadge1}`}>
                      <div className='lbl text-center'>
                        Partnerships with <div className={styles.symFloatBadgeNum}>15+</div> organisations
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-lg-7 sym-reveal-right'>
                  <div className={styles.symSectionTag}><i className='bi bi-mortarboard-fill' /> About</div>
                  <h2 className={styles.symSectionHeading}>
                    Symbiosis International University, <span>Dubai</span>
                  </h2>
                  <p className={`${styles.symSectionSub} mb-4`}>
                    Symbiosis International (Deemed University) was established in 1971 by Prof. (Dr.) S.B. Mujumdar, for &apos;Promoting International Understanding through Quality Education&apos;. The Dubai campus is known for its excellent infrastructure and international exposure and is one of the Indian universities in UAE. With various national and international accolades to their name, Symbiosis International University, Dubai has set a standard for excellence in education and earned their name amongst top Indian universities in Dubai.
                  </p>
                  <p className={styles.symSectionSub}>
                    Centrally located in the heart of Dubai Knowledge Park, the campus carries forward a legacy of 50+ years of educational excellence to a dynamic city. The exact symbiosis international university address is Symbiosis International University, Building 14 Dubai Knowledge Park.
                  </p>
                  <p className={styles.symSectionSub}>
                    The campus offers various internationally accredited programmes in computer science, psychology, management, media studies, and engineering. Therefore, you are likely to find this university on every list of Indian universities approved by the UAE.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── COURSES ───────────────────────── */}
          <section className={styles.symCourses} id='sym-courses'>
            <div className='container'>
              <div className={`${styles.symCoursesHeader} sym-reveal`}>
                <div className={styles.symSectionTag}><i className='bi bi-grid-fill' /> Our Programmes</div>
                <h2 className={styles.symSectionHeading}>
                  Symbiosis International <span>University Courses</span>
                </h2>
                <p className={styles.symSectionSub}>
                  Our programmes are designed to combine academic excellence with industry relevance, preparing students for global careers across business, technology, media, psychology, engineering, and management. The Symbiosis International University, Dubai fees is mentioned below to help you make your decision.
                </p>
              </div>
              <div className='row g-4'>
                {courses.map((course, idx) => (
                  <div className={`${course.colClass} d-flex sym-reveal`} key={idx} style={{ transitionDelay: `${idx * 0.08}s` }}>
                    <div className={styles.symCourseCard}>
                      <div className={styles.symCourseCardTop}>
                        <span className={styles.symCourseBadge}>{course.badge}</span>
                        <div className={styles.symCourseTitle}>{course.title}</div>
                      </div>
                      <div className={styles.symCourseBody}>
                        <div className={styles.symCourseMetaRow}>
                          <div className={styles.symCourseMetaPill}>
                            <i className='bi bi-clock-fill' /> {course.duration}
                          </div>
                        </div>
                        <p className={styles.symCourseDesc}>{course.desc}</p>
                        {course.specializations.length > 0 && (
                          <div className={styles.symCourseChecks}>
                            <h6><strong>Specialisations Offered:</strong></h6>
                            {course.specializations.map((spec, si) => (
                              <div className={styles.symCourseCheck} key={si}>
                                <i className='bi bi-check-circle-fill' /> {spec}{si < course.specializations.length - 1 ? ' |' : ''}
                              </div>
                            ))}
                          </div>
                        )}
                        <div className={styles.symCourseFooter}>
                          <div className={styles.symCourseFee}>
                            {course.fee} <small>Annual Tuition Fees</small>
                          </div>
                          <button className={styles.symBtnApply} data-enquiry-trigger>
                            Apply Now <i className='bi bi-arrow-right ms-1' />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* MBA Card */}
                <div className='col-lg-12 d-flex sym-reveal' style={{ transitionDelay: '0.64s' }}>
                  <div className={`${styles.symCourseCard} ${styles.symMbaCard}`}>
                    <div className={styles.symCourseCardTop}>
                      <span className={styles.symCourseBadge}>{mbaCourse.badge}</span>
                      <div className={styles.symCourseTitle}>{mbaCourse.title}</div>
                    </div>
                    <div className={styles.symCourseBody}>
                      <div className={styles.symCourseMetaRow}>
                        <div className={styles.symCourseMetaPill}>
                          <i className='bi bi-clock-fill' /> {mbaCourse.duration}
                        </div>
                      </div>
                      <p className={styles.symCourseDesc}>{mbaCourse.desc}</p>
                      <div className={styles.symCourseChecks}>
                        <h6><strong>Specialisations Offered:</strong></h6>
                        {mbaCourse.specializations.map((spec, si) => (
                          <div className={styles.symCourseCheck} key={si}>
                            <i className='bi bi-check-circle-fill' /> {spec}{si < mbaCourse.specializations.length - 1 ? ' |' : ''}
                          </div>
                        ))}
                      </div>
                      <div className={styles.symCourseFooter}>
                        <div className={styles.symCourseFee}>
                          {mbaCourse.fee} <small>Annual Tuition Fees</small>
                        </div>
                        <button className={styles.symBtnApply} data-enquiry-trigger>
                          Apply Now <i className='bi bi-arrow-right ms-1' />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className='text-center my-4' style={{ color: 'black' }}>
                The university isn&apos;t all about academia though. Symbiosis University, Dubai boasts a central location in Dubai Knowledge Park which offers networking opportunities and unparalleled infrastructural support to help students become the best versions of themselves.
              </p>
            </div>
          </section>

          {/* ── ADMISSION PROCESS ─────────────── */}
          <section className={styles.symAdmissionSection} id='sym-admission'>
            <div className='container'>
              <div className='text-center mb-5 sym-reveal'>
                <div className={styles.symSectionTag}><i className='bi bi-bar-chart-steps' /> Admission Process</div>
                <h2 className={styles.symSectionHeading}>
                  Symbiosis International University Dubai<br /> <span>Admission Process</span>
                </h2>
                <p className={styles.symSectionSub}>
                  To get admitted into one of the Symbiosis International University courses you have to follow the admission process of the university. This process is mentioned in detail below to help you familiarise yourself with it.
                </p>
              </div>

              <div className={styles.symProcessGrid}>
                {/* UG Card */}
                <div className={`${styles.symProcessCard} sym-process-card sym-reveal`}>
                  <span className={styles.symCardTag}>
                    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                      <path d='M22 10v6M2 10l10-5 10 5-10 5z' />
                      <path d='M6 12v5c3 3 9 3 12 0v-5' />
                    </svg>
                    Undergraduate
                  </span>
                  <h3 className={styles.symCardTitle}>UG Admission Process</h3>
                  <div className={styles.symSteps}>
                    {ugSteps.map((step, idx) => (
                      <div className={`${styles.symStep} sym-step`} key={idx}>
                        <div className={styles.symStepTrack}>
                          <div className={styles.symStepCircle}>{step.num}</div>
                          <div className={styles.symStepLine} />
                        </div>
                        <div className={styles.symStepBody}>
                          <p className={styles.symStepTitle}>{step.title}</p>
                          <p className={styles.symStepDesc}>{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* PG Card */}
                <div className={`${styles.symProcessCard} sym-process-card sym-reveal`}>
                  <span className={styles.symCardTag}>
                    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                      <rect x='2' y='7' width='20' height='14' rx='2' />
                      <path d='M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16' />
                    </svg>
                    Postgraduate
                  </span>
                  <h3 className={styles.symCardTitle}>PG Admission Process</h3>
                  <div className={styles.symSteps}>
                    {pgSteps.map((step, idx) => (
                      <div className={`${styles.symStep} sym-step`} key={idx}>
                        <div className={styles.symStepTrack}>
                          <div className={styles.symStepCircle}>{step.num}</div>
                          <div className={styles.symStepLine} />
                        </div>
                        <div className={styles.symStepBody}>
                          <p className={styles.symStepTitle}>{step.title}</p>
                          <p className={styles.symStepDesc}>{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── INDUSTRY PARTNERSHIPS ─────────── */}
          <section className={styles.symPartnersSection} id='sym-partners'>
            <div className='container'>
              <div className={`${styles.symPartnersHeader} sym-reveal`}>
                <div className={styles.symSectionTag}><i className='bi bi-star-fill' /> Collaborations</div>
                <h2 className={styles.symSectionHeading}>Industry <span>Partnerships</span></h2>
                <p className={styles.symSectionSub}>
                  To provide students with the best opportunities after graduation, the university has partnered with various organisations that add extra-curricular value to the education obtained. This is just one of the many reasons the Symbiosis International University, Dubai ranking has been consistently high.
                </p>
              </div>
              <div className='sym-reveal'>
                <SymPartnersCarouselClient logos={partnerLogos} />
              </div>
              {/* Hidden list for SEO — all partner names crawlable */}
              <ul aria-hidden='true' style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
                {partnerLogos.map(p => <li key={p.alt}>{p.alt}</li>)}
              </ul>
            </div>
          </section>

          {/* ── WHY CHOOSE ────────────────────── */}
          <section className={styles.symWhy} id='sym-why'>
            <div className='container'>
              <div className={`${styles.symWhyHeader} sym-reveal`}>
                <div className={styles.symSectionTag}><i className='bi bi-lightning-fill' /> Why Symbiosis?</div>
                <h2 className={styles.symSectionHeading}>
                  Why Choose <span>Symbiosis University,</span> Dubai
                </h2>
                <p className={styles.symSectionSub}>
                  Symbiosis International University, Dubai offers a globally recognised education rooted in academic excellence, industry relevance, and international exposure. Backed by strong global rankings and a legacy of quality education, the university combines rigorous academics with practical learning, experienced faculty, and a multicultural campus environment. With programmes aligned to evolving industry demands, integrated professional certifications, and strong career support, students graduate with the skills, confidence, and global perspective needed to succeed in competitive international markets.
                </p>
                <p className={styles.symSectionSub}>
                  Here are some reasons why you should consider joining Symbiosis International University, Dubai for your studies.
                </p>
              </div>
              <div className='row g-4 justify-content-center'>
                {whyChooseItems.map((item, idx) => (
                  <div className='col-lg-4 col-md-6 sym-reveal' key={idx} style={{ transitionDelay: `${idx * 0.1}s` }}>
                    <div className={styles.symWhyCard}>
                      <div className={styles.symWhyIcon}>
                        <i className={`bi ${item.icon}`} style={{ color: 'var(--sym-primary)' }} />
                      </div>
                      <h5>{item.title}</h5>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── CAMPUS INFRASTRUCTURE ─────────── */}
          <section className={styles.symCampus}>
            <div className='container'>
              <div className={styles.symCampusHeader}>
                <div className={styles.symSectionTag}><i className='bi bi-radar' /> Campus Facilities</div>
                <h2>Symbiosis, Dubai <span>Infrastructure</span></h2>
                <p className={styles.symSectionSub}>
                  The university boasts well-thought out and planned infrastructural support to help the students become the best version of themselves. The classrooms are equipped with good tables and chairs to ensure students remain comfortable. The library allows students to spend time in silence and consume knowledge while study areas encourage expansion of knowledge.
                </p>
              </div>
              <div className={styles.symCampusWrapper}>
                <div className={styles.symCampusTrack} id='campus-track'>
                  {campusFacilities.map((item, idx) => (
                    <div className={styles.symCampusSlide} key={idx}>
                      <div className={styles.symCampusCard}>
                        <Image
                          src={item.img}
                          alt={item.title}
                          width={400}
                          height={260}
                          style={{ width: '100%', height: 260, objectFit: 'cover' }}
                          loading={idx < 3 ? 'eager' : 'lazy'}
                        />
                        <div className={styles.symCampusCardContent}>
                          <h4>{item.title}</h4>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.symCarouselControls}>
                <button id='campus-prev-btn' aria-label='Previous campus image'>&#8592;</button>
                <button id='campus-next-btn' aria-label='Next campus image'>&#8594;</button>
              </div>
            </div>
          </section>

          {/* ── FAQ ───────────────────────────── */}
          <section className={styles.symFaq} id='sym-faq'>
            <div className='container'>
              <div className='row justify-content-center'>
                <div className='col-lg-4'>
                  <div className={styles.symSectionTag}><i className='bi bi-question-circle-fill' /> FAQ</div>
                  <h2 className={styles.symSectionHeading2}>
                    Frequently Asked <span>Questions</span>
                  </h2>
                </div>
                <div className='col-lg-8'>
                  {faqs.map((faq, idx) => (
                    <div className={`${styles.symFaqItem} sym-faq-item`} key={idx}>
                      <div className={`${styles.symFaqQ} sym-faq-q`}>
                        <h6>{faq.q}</h6>
                        <div className={styles.symFaqToggle}>
                          <i className='bi bi-plus' />
                        </div>
                      </div>
                      <div className={`${styles.symFaqA} sym-faq-a`} style={{ maxHeight: 0 }}>
                        <div className={styles.symFaqAInner}>{faq.a}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── CTA ───────────────────────────── */}
          <section className={styles.symCta} id='sym-cta'>
            <div className={styles.symCtaBgPattern} />
            <div className={styles.symCtaGridLines} />
            <div className={styles.symCtaRings}>
              <div className={`${styles.symCtaRing} ${styles.symCtaRing1}`} />
              <div className={`${styles.symCtaRing} ${styles.symCtaRing2}`} />
            </div>
            <div className='container'>
              <div className={`${styles.symCtaContent} sym-reveal`}>
                <h2 className='text-center'>
                  Begin your global journey with <span>Symbiosis International University,</span> Dubai.
                </h2>
                <p className='text-center'>
                  Join a university that blends international recognition, industry-focused learning, and the dynamic advantage of Dubai to shape your future without borders.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', justifyContent: 'center' }}>
                  <button className={styles.symBtnCtaPrimary} data-enquiry-trigger>
                    Start Your Application Now <i className='bi bi-arrow-right' />
                  </button>
                </div>
                <div className={styles.symCtaTrust}>
                  <div className={styles.symCtaAddress}>
                    <i className='bi bi-geo-alt-fill' />
                    <a
                      href='https://maps.google.com/?q=Symbiosis+International+University+Building+14+Dubai+Knowledge+Park'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      SYMBIOSIS INTERNATIONAL UNIVERSITY, Building 14, Dubai Knowledge Park
                    </a>
                  </div>
                  <div className={styles.symCtaPhones}>
                    <div className={`${styles.symCtaTrustItem} gap-3`}>
                      <div>
                        <i className='bi bi-whatsapp mx-1' style={{ color: 'green' }} />
                        <i className='bi bi-telephone-fill mx-1' />
                        <a href='tel:+971502436552'>+971 50 243 6552</a>
                      </div>
                      <div>
                        <i className='bi bi-telephone-fill mx-1' />
                        <a href='tel:+971502436552'>Botim Number - +971 50 243 6552</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </section>
      </SymEnquiryTriggerClient>
    </>
  )
}

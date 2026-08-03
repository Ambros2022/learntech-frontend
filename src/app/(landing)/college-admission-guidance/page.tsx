import Image from 'next/image'
import Link from 'next/link'
import JsonLd from '../../components/JsonLd'
import styles from './CollegeAdmissionPage.module.css'
import CollegeAdmissionClientWrapper, {
  BamsEnquiryForm,
  BamsImageStack,
  BamsCollegeCarousel,
  BamsTestimonialCarousel,
  BamsCtaForm,
} from './CollegeAdmissionClientWrapper'

/* ─── Constants ─────────────────────────────────────────────── */
const BASE_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://learntechww.com'
const PAGE_PATH = '/college-admission-guidance'
const CANONICAL = `${BASE_URL}${PAGE_PATH}`

/* ─── Static Data ────────────────────────────────────────────── */
const aboutImages = [
  '/images/collegeadmissions/about1.webp',
  '/images/collegeadmissions/about2.webp',
  '/images/collegeadmissions/about3.webp',
]

const colleges = [
  {
    name: 'S-VYASA University, Bangalore',
    loc: 'Bengaluru',
    img: '/images/collegeadmissions/colleges1.webp',
    gradient: 'linear-gradient(145deg,#fdf0e4,#f5ddb8)',
    badgeBg: 'rgba(200,82,42,0.18)',
    badgeBorder: 'rgba(200,82,42,0.4)',
  },
  {
    name: 'S-VYASA University Kerala (upcoming campus)',
    loc: 'Kerala',
    img: '/images/collegeadmissions/colleges2.webp',
    gradient: 'linear-gradient(145deg,#e4f5e8,#c8ecd0)',
    badgeBg: 'rgba(42,122,68,0.2)',
    badgeBorder: 'rgba(42,122,68,0.4)',
  },
  {
    name: 'S-VYASA University (Yoga Campus)',
    loc: 'Bengaluru',
    img: '/images/collegeadmissions/colleges3.webp',
    gradient: 'linear-gradient(145deg,#f0e4f8,#e4ccf0)',
    badgeBg: 'rgba(122,42,200,0.2)',
    badgeBorder: 'rgba(122,42,200,0.35)',
  },
  {
    name: 'Yenepoya University, Bangalore',
    loc: 'Bengaluru',
    img: '/images/collegeadmissions/colleges4.webp',
    gradient: 'linear-gradient(145deg,#fdf0e4,#f5ddb8)',
    badgeBg: 'rgba(200,82,42,0.18)',
    badgeBorder: 'rgba(200,82,42,0.4)',
  },
  {
    name: 'Srinivas University, Mangalore',
    loc: 'Mangalore',
    img: '/images/collegeadmissions/colleges5.webp',
    gradient: 'linear-gradient(145deg,#e4f5e8,#c8ecd0)',
    badgeBg: 'rgba(42,122,68,0.2)',
    badgeBorder: 'rgba(42,122,68,0.4)',
  },
  {
    name: 'Chinmaya Vishwa Vidyapeeth (CVV), Kochi, Kerala',
    loc: 'Kerala',
    img: '/images/collegeadmissions/colleges6.webp',
    gradient: 'linear-gradient(145deg,#f0e4f8,#e4ccf0)',
    badgeBg: 'rgba(122,42,200,0.2)',
    badgeBorder: 'rgba(122,42,200,0.35)',
  },
  {
    name: 'Sri Devaraj URS, Kolar',
    loc: 'Kolar',
    img: '/images/collegeadmissions/colleges7.webp',
    gradient: 'linear-gradient(145deg,#fdf0e4,#f5ddb8)',
    badgeBg: 'rgba(200,82,42,0.18)',
    badgeBorder: 'rgba(200,82,42,0.4)',
  },
  {
    name: 'Sri Venkateshwara Dental College, Bangalore',
    loc: 'Bengaluru',
    img: '/images/collegeadmissions/colleges8.webp',
    gradient: 'linear-gradient(145deg,#e4f5e8,#c8ecd0)',
    badgeBg: 'rgba(42,122,68,0.2)',
    badgeBorder: 'rgba(42,122,68,0.4)',
  },
  {
    name: 'BGS and SJB Group of Institutions, Bangalore',
    loc: 'Bengaluru',
    img: '/images/collegeadmissions/colleges9.webp',
    gradient: 'linear-gradient(145deg,#f0e4f8,#e4ccf0)',
    badgeBg: 'rgba(122,42,200,0.2)',
    badgeBorder: 'rgba(122,42,200,0.35)',
  },
  {
    name: 'RV University, Mysuru',
    loc: 'Mysuru',
    img: '/images/collegeadmissions/colleges10.webp',
    gradient: 'linear-gradient(145deg,#f0e4f8,#e4ccf0)',
    badgeBg: 'rgba(122,42,200,0.2)',
    badgeBorder: 'rgba(122,42,200,0.35)',
  },
  {
    name: 'Sri Sri Ayurveda, Bengaluru',
    loc: 'Bengaluru',
    img: '/images/collegeadmissions/colleges11.webp',
    gradient: 'linear-gradient(145deg,#f0e4f8,#e4ccf0)',
    badgeBg: 'rgba(122,42,200,0.2)',
    badgeBorder: 'rgba(122,42,200,0.35)',
  },
  {
    name: 'GIBS Business School, Bangalore',
    loc: 'Bengaluru',
    img: '/images/collegeadmissions/colleges12.webp',
    gradient: 'linear-gradient(145deg,#f0e4f8,#e4ccf0)',
    badgeBg: 'rgba(122,42,200,0.2)',
    badgeBorder: 'rgba(122,42,200,0.35)',
  },
  {
    name: 'Alliance Ascent College, Bangalore',
    loc: 'Bengaluru',
    img: '/images/collegeadmissions/colleges13.webp',
    gradient: 'linear-gradient(145deg,#f0e4f8,#e4ccf0)',
    badgeBg: 'rgba(122,42,200,0.2)',
    badgeBorder: 'rgba(122,42,200,0.35)',
  },
]

const testimonials = [
  {
    num: '01 / 05',
    video: 'https://www.youtube.com/embed/5aUW_0wz018?rel=0&modestbranding=1&enablejsapi=1',
    quote: `"Hi! My name is Sakshi. I live in Bangalore. I am pursuing BCA with specialisation in AI, ML and robotics from S-VYASA deemed to be university. The environment and surroundings are very good. The college is located in an IT tech park consisting of tech giants. It is pretty. The internship is compulsory here which will be beneficial for us in the future."`,
    name: "Sakshi S Peddarpeth's",
    role: 'Student',
    initials: 'SP',
    avaBg: 'var(--cag-accent-pale)',
    avaColor: 'var(--cag-accent)',
  },
  {
    num: '02 / 05',
    video: 'https://www.youtube.com/embed/m8TmsutwywA?rel=0&modestbranding=1&enablejsapi=1',
    quote: `"Hi, My name is Varun and I got my admission into SRM Medical College, with the help of Learntech consultancy. The Learntech Institute motivated us to go to the SRM and physically we have seen that it's one of the best colleges as far as the colleges I have visited so far and we are really happy that we got admission through Learntech."`,
    name: "Varun Dhiman's",
    role: 'Student and Parent',
    initials: 'VD',
    avaBg: '#fff0f1',
    avaColor: 'var(--cag-gold)',
  },
  {
    num: '03 / 05',
    video: 'https://www.youtube.com/embed/qmMxwANw8AI?rel=0&modestbranding=1&enablejsapi=1',
    quote: `"Hi everyone, I am Ronak from Maharashtra. I couldn't make it to government medical seats this year and was searching for admission guidance to secure a seat in good MBBS colleges. Then I came to know about Learntech consultancy and their expert service in admission guidance. Right from the day I contacted them, they helped me with every procedure on my behalf. I am very grateful to the Learntech consultancy, helping me to secure admission in one of the top colleges in Bangalore."`,
    name: "Ronak's",
    role: 'Student',
    initials: 'R',
    avaBg: '#f0fff6',
    avaColor: '#1a7a4a',
  },
  {
    num: '04 / 05',
    video: 'https://www.youtube.com/embed/Ekgpd8tPFJ8?si=Cv2jzh-jS0VLoCNJ&enablejsapi=1',
    quote: `"Hello I'm Smriti Deo and I am from Bhopal (M.P). Thanks to the people from Bangalore Study. I have got admission in Cardiac Care Technology at Raja Rajeshwari Medical College. They have been really supportive and friendly. They made the whole process really simple and convenient to me."`,
    name: "Smriti Deo's",
    role: 'Student',
    initials: 'SD',
    avaBg: '#f0fff6',
    avaColor: '#1a7a4a',
  },
  {
    num: '05 / 05',
    video: 'https://www.youtube.com/embed/K7g_h2VJeKU?si=gRMQSMA7hSCnf8ia&enablejsapi=1',
    quote: `"I am Nikam Jokhio and I am from Arunachal Pradesh. I came to Bangalore for my further studies. The course I opted for is B. Sc Anesthesia at Dr. B R Ambedkar Medical College and Hospital. Learntech helped me find the best college. I am really thankful to Learntech and especially to Pooja ma'am."`,
    name: "Nikam Jokhio's",
    role: 'Student',
    initials: 'NK',
    avaBg: '#f0fff6',
    avaColor: '#1a7a4a',
  },
]

const services = [
  {
    num: '01',
    variant: 'scW' as const,
    icon: 'bi-person-lines-fill',
    title: 'Career & Admission Strategy',
    desc: 'Success in BAMS admissions is never accidental. It comes from navigating the admission process with the right strategy. We help students choose the courses and colleges where they have the strongest chance of securing a seat.',
  },
  {
    num: '02',
    variant: 'scB' as const,
    icon: 'bi-building',
    title: 'Seat Reservation Services',
    desc: 'Admissions can be unpredictable. To reduce this uncertainty, we help students secure seats early through formal reservation pathways, ensuring confirmed placements in preferred BAMS institutions before the peak admission rush begins.',
  },
  {
    num: '03',
    variant: 'scR' as const,
    icon: 'bi-file-earmark-text',
    title: 'Institutional Liaison & Campus Tours',
    desc: 'We arrange Ayurveda college campus tours and interactions with college leadership, enabling students and parents to evaluate faculty, infrastructure, and campus facilities before final enrollment.',
  },
  {
    num: '04',
    variant: 'scR' as const,
    icon: 'bi-bank2',
    title: 'Financial Planning & Loan Assistance',
    desc: 'We provide education loan assistance and help with scholarship applications, simplify documentation and help students navigate the approval process with trusted financial partners.',
  },
  {
    num: '05',
    variant: 'scW' as const,
    icon: 'bi-airplane-engines-fill',
    title: 'NRI Admission Consulting',
    desc: 'Dedicated support for NRI students navigating the Indian BAMS education system, focusing on quota compliance, management quota admission, documentation, and seamless transition logistics.',
  },
  {
    num: '06',
    variant: 'scB' as const,
    icon: 'bi-globe2',
    title: 'Global Admission Consulting',
    desc: 'We support students with comprehensive global admission guidance for Ayurveda and alternative medicine programmes in the UK, USA, and Europe—from university shortlisting to pre-departure guidance.',
  },
]

/* ─── Metadata ───────────────────────────────────────────────── */
export const metadata = {
  title: 'BAMS Counselling Process | Learntech Edu Solutions',
  description:
    'Get expert BAMS admission counselling with Learntech Edu Solutions. 1000+ Ayurveda colleges, seat support, and personalised guidance to simplify your BAMS admission journey.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'BAMS Counselling Process | Learntech Edu Solutions',
    description:
      'Expert BAMS college admission guidance. 30+ years of experience, 5,00,000+ successful admissions, 1000+ partner institutions.',
    url: CANONICAL,
    siteName: 'Learntech Edu Solutions',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/images/collegeadmissions/Img-BG.webp`,
        width: 1200,
        height: 630,
        alt: 'BAMS Counselling Process — Learntech',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BAMS Counselling Process | Learntech Edu Solutions',
    description: 'Expert BAMS admission guidance. 30+ years of experience, 5,00,000+ successful admissions.',
    images: [`${BASE_URL}/images/collegeadmissions/Img-BG.webp`],
  },
  robots: { index: true, follow: true },
}


/* ─── Page (Server Component) ────────────────────────────────── */
export default function Page() {
  /* JSON-LD Schemas */


  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Learntech Edu Solutions',
    description:
      'Expert BAMS admission counselling with 30+ years of experience and 5,00,000+ successful admissions.',
    url: BASE_URL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: "#80 (4), 'D' Main Rd, East End, 9th Block, Jayanagar",
      addressLocality: 'Bangalore',
      addressRegion: 'Karnataka',
      postalCode: '560041',
      addressCountry: 'IN',
    },
    telephone: '+919606949066',
    sameAs: [
      'https://www.instagram.com/learntechedus',
      'https://www.facebook.com/learntechedu',
      'https://www.linkedin.com/company/learntech-edu-solutions-pvt-ltd/',
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the BAMS counselling process?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The BAMS counselling process involves choosing the right Ayurveda college, understanding seat availability, applying through the right quota, and completing document verification. Learntech guides you through every step.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many years is the BAMS course?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The BAMS (Bachelor of Ayurvedic Medicine and Surgery) course is 5.5 years including a 1-year mandatory internship.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can NRI students apply for BAMS through Learntech?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Learntech provides dedicated NRI BAMS admission consulting including quota compliance, documentation, and logistical support.',
        },
      },
    ],
  }

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'BAMS Counselling Process | Learntech Edu Solutions',
    description:
      'Get expert BAMS admission counselling with Learntech Edu Solutions. 1000+ Ayurveda colleges, seat support, and personalised guidance to simplify your BAMS admission journey.',
    url: CANONICAL,
    publisher: {
      '@type': 'EducationalOrganization',
      name: 'Learntech Edu Solutions',
      url: BASE_URL,
    },
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'College Admission Guidance & BAMS Counselling Services',
    serviceType: 'Educational Consulting',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Learntech Edu Solutions',
      url: BASE_URL,
    },
    description:
      'Personalized higher education admission guidance, college shortlisting, quota compliance, and seat reservation services for BAMS and medical aspirants.',
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Featured Partner Colleges & Universities',
    itemListElement: colleges.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'EducationalOrganization',
        name: c.name,
        address: {
          '@type': 'PostalAddress',
          addressLocality: c.loc,
          addressCountry: 'IN',
        },
      },
    })),
  }

  return (
    <>
      <link rel='preload' as='image' href='/images/collegeadmissions/Img-BG.webp' />
      {/* JSON-LD — server rendered, XSS safe */}

      <JsonLd id='bams-org-schema' schema={organizationSchema} />
      <JsonLd id='bams-faq-schema' schema={faqSchema} />
      <JsonLd id='bams-webpage-schema' schema={webPageSchema} />
      <JsonLd id='bams-service-schema' schema={serviceSchema} />
      <JsonLd id='bams-itemlist-schema' schema={itemListSchema} />

      {/*
        CollegeAdmissionClientWrapper:
        - Renders navbar (client — scroll effect)
        - Manages modal state
        - Event-delegates data-bams-trigger clicks
        - Runs scroll-reveal IntersectionObserver
        All children below are SERVER-rendered HTML — crawlable, zero extra JS.
      */}
      <CollegeAdmissionClientWrapper>
        <section className={styles.cagMain}>

          {/* ── Float Buttons ──────────────────────────────────── */}
          <a
            href='https://wa.me/+919606949066'
            className={styles.cagWhatsappFloat}
            target='_blank'
            rel='noreferrer'
            aria-label='Chat on WhatsApp'
          >
            <img src='/images/bams/whatsappc.gif' alt='WhatsApp' style={{ width: 56 }} />
          </a>
          <a href='tel:+919606949066' className={styles.cagPhoneFloat} aria-label='Call us'>
            <Image
              src='/images/icons/Phone-blue.svg'
              width={40}
              height={28}
              alt='Phone'
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </a>

          {/* ══ HERO ═══════════════════════════════════════════ */}
          <section id='bams-hero' className={styles.cagHero}>
            <div className='container herbobennerconatiner' >
              <div className={`row align-items-center g-5 ${styles.customRow}`}>
                <div className={`col-lg-6 ${styles.mobilehomebanner}`}>
                  <div className={`${styles.eyebrowGlassLive}`}>
                    <span className='dot' />
                    <span className='text'>College Admissions Guidance</span>
                  </div>
                  <h1 className={`${styles.heroHeadline} ${styles.p20mobilw}`}>
                    You Don&apos;t Have<br />to Decide <em>Alone</em>
                  </h1>
                  <p className={`${styles.heroSubhead} ${styles.p20mobilw}`}>
                    1000+ Colleges. Multiple Rounds of Counselling.<br />Only One You. Not anymore.
                  </p>
                  <p className={`${styles.heroBody} ${styles.p20mobilw}`}>
                    Every student deserves the right guidance when choosing their college and career path.
                    Because every superhero needs a sidekick.
                  </p>
                  <div className={`${styles.heroStats} ${styles.p20mobilw}`}>
                    <div className='stat-item'>
                      <div className={styles.statNum}>30<span>+</span></div>
                      <div className={styles.statLabel}>Years of Consistent<br />Service</div>
                    </div>
                    <div className={styles.statDivider} />
                    <div className='stat-item'>
                      <div className={styles.statNum}>5,00,000<span>+</span></div>
                      <div className={styles.statLabel}>Successful Admissions</div>
                    </div>
                    <div className={styles.statDivider} />
                    <div className='stat-item'>
                      <div className={styles.statNum}>1,000<span>+</span></div>
                      <div className={styles.statLabel}>Partner Institutions</div>
                    </div>
                  </div>
                </div>

                <div className='col-lg-5 offset-lg-1'>
                  <div className={styles.formCard}>
                    <div className={styles.formCardEyebrow}>Start your Journey with us</div>
                    <h2 className={styles.formCardTitle}>Take The First Step Towards Your Future</h2>
                    {/* Client component — form interaction only */}
                    <BamsEnquiryForm />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ══ WHO WE ARE ══════════════════════════════════════ */}
          <section id='bams-who' className={`${styles.cagSection} ${styles.cagWho}`}>
            <div className='container' style={{ maxWidth: '95%' }}>
              <div className='row align-items-center g-5'>
                {/* Image stack — client for auto-rotate */}
                <div className='col-lg-5 bams-reveal'>
                  <BamsImageStack />
                </div>
                <div className='col-lg-7'>
                  <div className='bams-reveal'>
                    <div className={styles.sectionEyebrow}>Who We Are</div>
                    <h2 className={styles.sectionTitle}>
                      Experts Who&apos;ve <em>Been There</em>
                    </h2>
                    <p className={styles.sectionBody}>
                      Every year, over 30 lakh students fight for a place in India&apos;s top BAMS and Ayurveda
                      colleges. Your competition is not just the numbers, but the process of getting there.
                      Multiple rounds of counselling, unpredictable cut-offs, and piles of paperwork. One wrong
                      preference on a form, one missed deadline, and you may miss out on your dream. No matter
                      what career options you are looking for, making the right choice demands getting rid of
                      this uncertainty.
                      <br /><br />
                      That&apos;s where Learntech comes to your rescue. We are a dedicated family of counsellors
                      and ed-tech professionals turning BAMS career counselling into a clear, strategic roadmap
                      to success.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ══ WHAT WE DO ══════════════════════════════════════ */}
          <section id='bams-what' className={`${styles.cagSection} ${styles.cagWhat}`}>
            <div className='container' style={{ maxWidth: '95%' }}>
              <div className='row'>
                <div className='col-lg-12 bams-reveal'>
                  <div className={styles.sectionEyebrow}>What We Do</div>
                  <h2 className={styles.sectionTitle}>Turning Confusion Into <em>Clarity</em></h2>
                  <p className={styles.sectionBody}>
                    Since 1994, LearnTech has served as the operational backbone for students navigating higher
                    education in Ayurveda and traditional medicine. We specialize in managing every phase of the
                    BAMS admission process, from initial applications to final enrollment. By streamlining the
                    intricate requirements of admissions, expert counseling, and strategic financing, we remove
                    the hurdles that often stall progress. This comprehensive support empowers students to focus
                    entirely on their academic goals while we secure their placement and handle the logistical
                    heavy lifting. Our legacy is built on transforming this stressful transition into a seamless
                    launchpad for future success.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ══ SERVICES ════════════════════════════════════════ */}
          <section id='bams-services' className={styles.cagServices}>
            {/* Decorative blobs — no JS */}
            <div
              className={styles.swBgBlob}
              style={{ width: 480, height: 480, background: '#274896', opacity: 0.04, top: -200, right: -180 }}
            />
            <div
              className={styles.swBgBlob}
              style={{ width: 280, height: 280, background: '#e43441', opacity: 0.05, bottom: -100, left: -80 }}
            />
            <div className={styles.swTop}>
              <div>
                <div className={styles.swEye}>
                  <span className={styles.swEyeLine} />Our Services
                </div>
                <h2 className={styles.sectionTitle}>Everything You <em>Need</em>, In One Place</h2>
              </div>
            </div>
            <div className={styles.swRows}>
              {/* Row 1 */}
              <div className={styles.swRow}>
                {services.slice(0, 3).map((s, i) => (
                  <div key={i} className={`${styles.sc} ${styles[s.variant]}`} data-bams-trigger>
                    <div className={styles.scBlob} />
                    <div className={styles.scNum}>{s.num}</div>
                    <div className={styles.scHex}><i className={`bi ${s.icon}`} /></div>
                    <div className={styles.scTitle}>{s.title}</div>
                    <div className={styles.scDesc}>{s.desc}</div>
                    <div className={styles.scFoot}>
                      <span className={styles.scLbl}>Learn more</span>
                      <div className={styles.scBtn}><i className='bi bi-arrow-right' /></div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Row 2 */}
              <div className={styles.swRow}>
                {services.slice(3, 6).map((s, i) => (
                  <div key={i} className={`${styles.sc} ${styles[s.variant]}`} data-bams-trigger>
                    <div className={styles.scBlob} />
                    <div className={styles.scNum}>{s.num}</div>
                    <div className={styles.scHex}><i className={`bi ${s.icon}`} /></div>
                    <div className={styles.scTitle}>{s.title}</div>
                    <div className={styles.scDesc}>{s.desc}</div>
                    <div className={styles.scFoot}>
                      <span className={styles.scLbl}>Learn more</span>
                      <div className={styles.scBtn}><i className='bi bi-arrow-right' /></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ══ PARTNER COLLEGES ════════════════════════════════ */}
          <section id='bams-colleges' className={styles.cagSection}>
            <div className={styles.headingWrap}>
              <div className={styles.cagEyebrow}>Institutions</div>
              <h2 className={styles.cagH1}>Our <em>Partner</em> Colleges</h2>
            </div>
            {/*
              Hidden SEO list — all college names + links in server HTML.
              Googlebot indexes these even though the carousel is client-rendered.
            */}
            <ul aria-hidden='true' style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
              {colleges.map(c => <li key={c.name}>{c.name}</li>)}
            </ul>
            {/* Interactive carousel — client only */}
            <BamsCollegeCarousel colleges={colleges} />
          </section>

          {/* ══ TESTIMONIALS ════════════════════════════════════ */}
          <section id='bams-testi' className={styles.cagSection}>
            <div className='text-center'>
              <div className={styles.cagEyebrow}>Testimonials</div>
              <h2 className={styles.cagH1}>Success <em>Stories</em></h2>
            </div>
            <BamsTestimonialCarousel testimonials={testimonials} />
          </section>

          {/* ══ CTA ═════════════════════════════════════════════ */}
          <section id='bams-cta' className={`${styles.cagCta} mt-5`}>
            <div className={`${styles.orb} ${styles.orbR}`} />
            <div className={`${styles.orb} ${styles.orbL}`} />
            <div className='container position-relative' style={{ zIndex: 2 }}>
              <div className={styles.cagCtaEyebrow}>
                <span className={styles.eDot} /> Admissions Open 2026
              </div>
              <h2 className={styles.ctaHeadline}>
                Let&apos;s Build Your Future <span className={styles.red}>Today</span>
              </h2>
              <p className={`${styles.ctaSub} fs-3`}>Know more about us</p>
              <div className={styles.hFormWrap}>
                <BamsCtaForm />
              </div>
            </div>
          </section>

          {/* ══ FOOTER ══════════════════════════════════════════ */}
          <footer className={styles.cagFooter}>
            <div className={styles.ftInner}>
              <hr className={styles.ftRule} />
              <div className={styles.ftColumns}>
                <div>
                  <div className={`${styles.ftBrand} mt-2 mt-md-0`}>
                    <Link href='/'>
                      <img src='/images/collegeadmissions/logo.png' alt='LearnTech' />
                    </Link>
                  </div>
                  <p className={styles.ftSlogan}>
                    The path to your dream college is yours to walk, we just make sure you never miss a turn.
                  </p>
                </div>
                <div>
                  <div className={styles.ftHeading}>Navigate</div>
                  <nav className={styles.ftMenu}>
                    <a href='#bams-who'>Who We Are</a>
                    <a href='#bams-what'>What We Do</a>
                    <Link href='https://learntechww.com/services' target='_blank'>Services</Link>
                    <a href='#bams-testi'>Success Stories</a>
                  </nav>
                </div>
                <div>
                  <div className={styles.ftHeading}>Contact</div>
                  <div className={styles.ftContactList}>
                    <div className={styles.ftContactRow}>
                      <div className={styles.ftContactIcon}><i className='bi bi-geo-alt-fill' /></div>
                      <span>
                        #80 (4), &apos;D&apos; Main Rd, East End, 9th Block, Jayanagar,
                        Bangalore, Karnataka - 560041
                      </span>
                    </div>
                    <div className={styles.ftContactRow}>
                      <div className={styles.ftContactIcon}><i className='bi bi-envelope-fill' /></div>
                      <a href='mailto:info@learntechww.com'>info@learntechww.com</a>
                    </div>
                    <div className={styles.ftContactRow}>
                      <div className={styles.ftContactIcon}><i className='bi bi-telephone-fill' /></div>
                      <a href='tel:+919606949066'>+91 96069 49066</a>
                    </div>
                  </div>
                </div>
                <div>
                  <div className={styles.ftHeading}>Follow</div>
                  <div className={`${styles.ftSocials} mb-5`}>
                    <a href='https://www.instagram.com/learntechedus' target='_blank' rel='noreferrer' aria-label='Instagram'>
                      <i className='bi bi-instagram' />
                    </a>
                    <a href='https://www.youtube.com/channel/UCZP40_ivVcdelNOVhmQFr7w' target='_blank' rel='noreferrer' aria-label='YouTube'>
                      <i className='bi bi-youtube' />
                    </a>
                    <a href='https://www.linkedin.com/company/learntech-edu-solutions-pvt-ltd/' target='_blank' rel='noreferrer' aria-label='LinkedIn'>
                      <i className='bi bi-linkedin' />
                    </a>
                    <a href='https://www.facebook.com/learntechedu' target='_blank' rel='noreferrer' aria-label='Facebook'>
                      <i className='bi bi-facebook' />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </footer>

        </section>
      </CollegeAdmissionClientWrapper>
    </>
  )
}

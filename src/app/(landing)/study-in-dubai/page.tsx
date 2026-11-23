import JsonLd from 'src/app/components/JsonLd'
import StudyInDubaiEnquiryTriggerClient from './StudyInDubaiEnquiryTriggerClient'
import StudyInDubaiContent from './StudyInDubaiContent'
import { FAQ_DATA } from './StudyInDubaiFaqData'
import { COURSES, COLLEGES } from './StudyInDubaiData'

const BASE_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://learntechww.com'
const PAGE_PATH = '/study-in-dubai'
const CANONICAL_URL = `${BASE_URL}${PAGE_PATH}`

export const metadata = {
  title: 'Study in Dubai: Universities, Courses & Fees | Learntech',
  description:
    'Explore top Dubai universities, including Symbiosis and BITS Pilani. Compare BBA, MBA, B.Tech and BCA courses, fees and scholarships. Get admission guidance.',
  keywords:
    'Study in Dubai, Study Abroad Dubai, Universities in Dubai for Indian Students, Symbiosis International University Dubai, BITS Pilani Dubai, MBA in Dubai, BBA in Dubai, BTech in Dubai, Dubai Student Visa, Study in UAE, Learntech Edu Solutions',
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: 'Study in Dubai: Universities, Courses & Fees | Learntech',
    description:
      'Explore top Dubai universities, including Symbiosis and BITS Pilani. Compare BBA, MBA, B.Tech and BCA courses, fees and scholarships. Get admission guidance.',
    url: CANONICAL_URL,
    siteName: 'Learntech Edu Solutions',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/images/icons/learntech-logo.png`,
        width: 1200,
        height: 630,
        alt: 'Study in Dubai | Learntech Edu Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study in Dubai: Universities, Courses & Fees | Learntech',
    description:
      'Explore top Dubai universities, including Symbiosis and BITS Pilani. Compare BBA, MBA, B.Tech and BCA courses, fees and scholarships. Get admission guidance.',
    images: [`${BASE_URL}/images/icons/learntech-logo.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function StudyInDubaiLandingPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_DATA.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Learntech Edu Solutions Pvt. Ltd.',
    url: BASE_URL,
    logo: `${BASE_URL}/images/icons/learntech-logo.png`,
    telephone: '+91 96069 49066',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91 96069 49066',
      contactType: 'Admissions Counselling',
      areaServed: ['IN', 'AE'],
      availableLanguage: ['en', 'hi'],
    },
    sameAs: [
      'https://www.facebook.com/learntechedu',
      'https://www.linkedin.com/company/learntech-edu-solutions-pvt-ltd/',
      'https://www.instagram.com/learntechedus',
      'https://www.youtube.com/channel/UCZP40_ivVcdelNOVhmQFr7w',
    ],
  }

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Study in Dubai: Universities, Courses & Fees | Learntech',
    description:
      'Explore top Dubai universities, including Symbiosis and BITS Pilani. Compare BBA, MBA, B.Tech and BCA courses, fees and scholarships. Get admission guidance.',
    url: CANONICAL_URL,
    publisher: organizationSchema,
  }

  const coursesList = COURSES.map((c, idx) => ({
    '@type': 'Course',
    position: idx + 1,
    name: c.name,
    description: `${c.degree} offered by ${COLLEGES[c.c].fullName}. Duration: ${c.dur}. Tuition fee: ${c.fee}. Eligibility: ${c.eligibility}.`,
    provider: {
      '@type': 'CollegeOrUniversity',
      name: COLLEGES[c.c].fullName,
      address: {
        '@type': 'PostalAddress',
        addressLocality: COLLEGES[c.c].location,
        addressCountry: 'AE',
      },
    },
  }))

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Programmes Offered in Dubai Universities',
    numberOfItems: coursesList.length,
    itemListElement: coursesList,
  }

  return (
    <>
      <JsonLd id="study-in-dubai-webpage-schema" schema={webPageSchema} />
      <JsonLd id="study-in-dubai-org-schema" schema={organizationSchema} />
      <JsonLd id="study-in-dubai-courses-schema" schema={itemListSchema} />
      <JsonLd id="study-in-dubai-faq-schema" schema={faqSchema} />

      <StudyInDubaiEnquiryTriggerClient>
        <StudyInDubaiContent />
      </StudyInDubaiEnquiryTriggerClient>
    </>
  )
}

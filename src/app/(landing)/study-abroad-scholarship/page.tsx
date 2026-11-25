import JsonLd from 'src/app/components/JsonLd'
import DubaiScholarshipsEnquiryTriggerClient from './DubaiScholarshipsEnquiryTriggerClient'
import DubaiScholarshipsContent from './DubaiScholarshipsContent'
import { DUBAI_SCHOLARSHIPS_FAQS } from './DubaiScholarshipsFaqData'
import { PROGRAMMES, SIU_NAME, BITS_NAME } from './DubaiScholarshipsData'

const BASE_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://learntechww.com'
const PAGE_PATH = '/study-abroad-scholarship'
const CANONICAL_URL = `${BASE_URL}${PAGE_PATH}`

export const metadata = {
  title: 'Study Abroad Scholarships – Up to 50% | Study in Dubai',
  description:
    'Explore study abroad scholarship opportunities with Learntech. Get up to 50% scholarships for selected universities in Dubai. Enquire today!',
  keywords:
    'Study Abroad Scholarships, Dubai University Scholarships, Scholarships in Dubai, Study in Dubai Scholarship, Symbiosis Dubai Scholarship, BITS Pilani Dubai Scholarship, UAE Scholarships for Indian Students, Merit Scholarship Dubai, Learntech Edu Solutions',
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: 'Study Abroad Scholarships – Up to 50% | Study in Dubai',
    description:
      'Explore study abroad scholarship opportunities with Learntech. Get up to 50% scholarships for selected universities in Dubai. Enquire today!',
    url: CANONICAL_URL,
    siteName: 'Learntech Edu Solutions',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/images/icons/learntech-logo.png`,
        width: 1200,
        height: 630,
        alt: 'Study Abroad Scholarships | Learntech Edu Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study Abroad Scholarships – Up to 50% | Study in Dubai',
    description:
      'Explore study abroad scholarship opportunities with Learntech. Get up to 50% scholarships for selected universities in Dubai. Enquire today!',
    images: [`${BASE_URL}/images/icons/learntech-logo.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function DubaiScholarshipsLandingPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: DUBAI_SCHOLARSHIPS_FAQS.map((f) => ({
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
      contactType: 'Admissions & Scholarships Counselling',
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
    name: 'Study Abroad Scholarships – Up to 50% | Study in Dubai',
    description:
      'Explore study abroad scholarship opportunities with Learntech. Get up to 50% scholarships for selected universities in Dubai. Enquire today!',
    url: CANONICAL_URL,
    publisher: organizationSchema,
  }

  const coursesList = PROGRAMMES.map((c, idx) => {
    const universityName = c.college === 's' ? SIU_NAME : BITS_NAME
    const universityLoc = c.college === 's' ? 'Dubai Knowledge Park' : 'Dubai International Academic City'
    return {
      '@type': 'Course',
      position: idx + 1,
      name: c.title,
      description: `${c.degree} offered by ${universityName}. Level: ${c.level}. Scholarship: ${c.scholarship}. Tuition fee: ${c.fee}.`,
      provider: {
        '@type': 'CollegeOrUniversity',
        name: universityName,
        address: {
          '@type': 'PostalAddress',
          addressLocality: universityLoc,
          addressCountry: 'AE',
        },
      },
    }
  })

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Scholarships and Programmes in Dubai Universities',
    numberOfItems: coursesList.length,
    itemListElement: coursesList,
  }

  return (
    <>
      <JsonLd id="dubai-scholarships-webpage-schema" schema={webPageSchema} />
      <JsonLd id="dubai-scholarships-org-schema" schema={organizationSchema} />
      <JsonLd id="dubai-scholarships-courses-schema" schema={itemListSchema} />
      <JsonLd id="dubai-scholarships-faq-schema" schema={faqSchema} />

      <DubaiScholarshipsEnquiryTriggerClient>
        <DubaiScholarshipsContent />
      </DubaiScholarshipsEnquiryTriggerClient>
    </>
  )
}

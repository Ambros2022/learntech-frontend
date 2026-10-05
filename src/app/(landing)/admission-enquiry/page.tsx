import AdmissionEnquiryClient from './AdmissionEnquiryClient'
import JsonLd from 'src/app/components/JsonLd'

const BASE_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://learntechww.com'
const PAGE_PATH = '/admission-enquiry'
const CANONICAL = `${BASE_URL}${PAGE_PATH}`

export const metadata = {
  title: 'College Admission Enquiry | Learntech Edu Solutions',
  description:
    'Get personalised guidance on courses, colleges, fees, eligibility and admissions across India and abroad from Learntech Edu Solutions.',
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    title: 'College Admission Enquiry | Learntech Edu Solutions',
    description:
      'Get personalised guidance on courses, colleges, fees, eligibility and admissions across India and abroad from Learntech Edu Solutions.',
    url: CANONICAL,
    siteName: 'Learntech Edu Solutions',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/images/icons/learntech-logo.png`,
        width: 1200,
        height: 630,
        alt: 'College Admission Enquiry | Learntech Edu Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'College Admission Enquiry | Learntech Edu Solutions',
    description:
      'Get personalised guidance on courses, colleges, fees, eligibility and admissions across India and abroad from Learntech Edu Solutions.',
    images: [`${BASE_URL}/images/icons/learntech-logo.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function AdmissionEnquiryPage() {
  const contactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'College Admission Enquiry | Learntech Edu Solutions',
    description:
      'Get personalised guidance on courses, colleges, fees, eligibility and admissions across India and abroad from Learntech Edu Solutions.',
    url: CANONICAL,
    mainEntity: {
      '@type': 'EducationalOrganization',
      name: 'Learntech Edu Solutions Pvt. Ltd.',
      url: BASE_URL,
      logo: `${BASE_URL}/images/icons/learntech-logo.png`,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '1800 120 8696',
        contactType: 'Admissions Counselling',
        areaServed: 'IN',
        availableLanguage: ['en', 'hi', 'kn'],
      },
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Admission Enquiry',
        item: CANONICAL,
      },
    ],
  }

  return (
    <>
      {/* FontAwesome for stats and timeline icons matching reference design */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <link rel="preconnect" href="https://flagcdn.com" />

      {/* Structured data */}
      <JsonLd id="admission-contact-schema" schema={contactPageSchema} />
      <JsonLd id="admission-breadcrumb-schema" schema={breadcrumbSchema} />

      <AdmissionEnquiryClient />
    </>
  )
}

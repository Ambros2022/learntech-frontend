import JsonLd from 'src/app/components/JsonLd'
import SIUDubaiPage from './SIUDubaiPage'

const BASE_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://learntechww.com'
const PAGE_PATH = '/cu-online-mba-admission'
const CANONICAL = `${BASE_URL}${PAGE_PATH}`

export const metadata = {
  title: 'CU Online MBA Admission 2026–27 | Chandigarh University',
  description:
    'Apply for Chandigarh University (CU) Online MBA 2026–27. Check eligibility, fees, specializations, rankings, placements & admission process. Enquire Now!',
  keywords: 'CU Online MBA, Chandigarh University Online MBA, MBA Admission 2026, Online MBA India',
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    title: 'CU Online MBA Admission 2026–27 | Chandigarh University',
    description:
      'Apply for Chandigarh University (CU) Online MBA 2026–27. Check eligibility, fees, specializations, rankings, placements & admission process.',
    url: CANONICAL,
    siteName: 'Learntech Edu Solutions',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/images/cumba/herobanner3.webp`,
        width: 1200,
        height: 630,
        alt: 'CU Online MBA Admission 2026-27 | Chandigarh University',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CU Online MBA Admission 2026–27 | Chandigarh University',
    description:
      'Apply for Chandigarh University Online MBA 2026–27. Eligibility, fees, specializations & admission process.',
    images: [`${BASE_URL}/images/cumba/herobanner3.webp`],
  },
  robots: {
    index: true,
    follow: true,
  },
}



const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Which colleges offer the best online MBA in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Top universities such as Chandigarh University offer an online MBA programme that provides world-class business education and helps students stay ahead of the competition.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the required academic qualification to pursue MBA online at Chandigarh University?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To be eligible, you must have a bachelor’s degree with at least 50% marks. Graduates of recognized professional programmes like CA or ICWA are also eligible to apply.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is an entrance exam compulsory for Chandigarh University Online courses MBA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No entrance exam is required for CU Online MBA.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Chandigarh University online MBA ranking and NAAC accreditation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Chandigarh University is NAAC A+ accredited, UGC-approved, and ranked by NIRF and QS, ensuring top-tier academic credibility.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is work experience mandatory for pursuing online MBA Chandigarh University?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Chandigarh University online MBA can be pursued by both freshers and experienced professionals.',
      },
    },
  ],
}

export default function Page() {
  return (
    <>
      {/* Preloads for critical LCP hero images */}
      <link
        rel='preload'
        as='image'
        href='/images/cumba/herobanner3.webp'
        media='(min-width: 769px)'
      />
      <link
        rel='preload'
        as='image'
        href='/images/cumba/mobilebanner.webp'
        media='(max-width: 768px)'
      />

      <JsonLd id='cumba-faq-schema' schema={faqSchema} />
      <SIUDubaiPage />
    </>
  )
}

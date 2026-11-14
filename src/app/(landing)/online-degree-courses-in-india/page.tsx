import JsonLd from 'src/app/components/JsonLd'
import OnlineDegreeEnquiryTriggerClient from './OnlineDegreeEnquiryTriggerClient'
import OnlineDegreeContent from './OnlineDegreeContent'
import { FAQ_DATA } from './OnlineDegreeFaqData'
import { PROGRAMMES, AI_TRENDING_COURSES } from './OnlineDegreeData'

const BASE_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://learntechww.com'
const PAGE_PATH = '/online-degree-courses-in-india'
const CANONICAL_URL = `${BASE_URL}${PAGE_PATH}`

export const metadata = {
  title: 'Online Degree Courses in India | MBA, MCA, BCA | Learntech',
  description:
    'Compare online BBA, MBA, BCA, MCA & M.Sc AI programmes from NAAC A+ universities like Amrita, CHRIST & Alliance. Get free counselling from Learntech experts.',
  keywords:
    'Online Degree Courses in India, Online MBA, Online MCA, Online BCA, Online BBA, Online M.Sc, Distance Learning India, UGC Approved Online Degrees, NAAC Accredited Online Degrees, Amrita Online, CHRIST Online, Alliance Online, CU Online, Learntech Online',
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: 'Online Degree Courses in India | MBA, MCA, BCA | Learntech',
    description:
      'Compare online BBA, MBA, BCA, MCA & M.Sc AI programmes from NAAC A+ universities like Amrita, CHRIST & Alliance. Get free counselling from Learntech experts.',
    url: CANONICAL_URL,
    siteName: 'Learntech Edu Solutions',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/images/icons/learntech-logo.png`,
        width: 1200,
        height: 630,
        alt: 'Online Degree Courses in India | Learntech Edu Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Online Degree Courses in India | MBA, MCA, BCA | Learntech',
    description:
      'Compare online BBA, MBA, BCA, MCA & M.Sc AI programmes from NAAC A+ universities like Amrita, CHRIST & Alliance. Get free counselling from Learntech experts.',
    images: [`${BASE_URL}/images/icons/learntech-logo.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function OnlineDegreeLandingPage() {
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
    telephone: '1800 120 8696',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '1800 120 8696',
      contactType: 'Admissions Counselling',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi', 'kn'],
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
    name: 'Online Degree Courses in India | MBA, MCA, BCA | Learntech',
    description:
      'Compare online BBA, MBA, BCA, MCA & M.Sc AI programmes from NAAC A+ universities like Amrita, CHRIST & Alliance. Get free counselling from Learntech experts.',
    url: CANONICAL_URL,
    publisher: organizationSchema,
  }

  // Structured Course entity list
  const coursesList = [
    ...AI_TRENDING_COURSES.map((c) => ({
      name: c.title,
      description: c.desc,
      duration: c.duration,
      provider: c.logoAlt,
    })),
    ...PROGRAMMES.map((p) => ({
      name: `${p.name} - ${p.degree}`,
      description: `Accredited ${p.tag} degree programme offering comprehensive curriculum, ${p.dur} duration, fees ${p.fees}.`,
      duration: p.dur,
      provider: p.colleges.join(', ').replace(/_/g, ' '),
    })),
  ]

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Online Degree Programmes in India',
    description: 'Accredited UG and PG online degree courses from top Indian universities.',
    itemListElement: coursesList.map((course, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Course',
        name: course.name,
        description: course.description,
        provider: {
          '@type': 'EducationalOrganization',
          name: course.provider,
        },
      },
    })),
  }

  return (
    <>
      <JsonLd id="online-degree-faq-schema" schema={faqSchema} />
      <JsonLd id="online-degree-org-schema" schema={organizationSchema} />
      <JsonLd id="online-degree-webpage-schema" schema={webPageSchema} />
      <JsonLd id="online-degree-courses-schema" schema={itemListSchema} />

      <OnlineDegreeEnquiryTriggerClient>
        <OnlineDegreeContent />
      </OnlineDegreeEnquiryTriggerClient>
    </>
  )
}

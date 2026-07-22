import { getPageData, getAbroadPages } from 'src/lib/api/common'
import JsonLd from 'src/app/components/JsonLd'
import MbbsAbroadPage from 'src/views/MbbsAbroadPage'

const BASE_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://learntechww.com'
const PAGE_PATH = '/mbbs-abroad'
const DEFAULT_TITLE = 'MBBS Abroad For Indian Students | Learntech Edu Solutions'
const DEFAULT_DESCRIPTION =
  'Are you looking for Admission at Top College? Learntech Edu Solutions provides admission guidance to the students who look admission in India & Abroad.'

export async function generateMetadata() {
  const data = await getPageData('mbbs-abroad')
  const title = data?.meta_title || DEFAULT_TITLE
  const description = data?.meta_description || DEFAULT_DESCRIPTION
  const canonicalUrl = `${BASE_URL}${PAGE_PATH}`

  return {
    title,
    description,
    keywords: data?.meta_keyword || '',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Learntech Edu Solutions',
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: `${BASE_URL}/images/icons/learntech-logo.png`,
          width: 1200,
          height: 630,
          alt: 'Learntech Edu Solutions',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

const FAQ_DATA = [
  {
    questions: 'Can I practice medicine in India after completing my MBBS from abroad?',
    answers:
      '<p>Yes, Indian students who complete their MBBS from abroad can practice medicine in India. However, they must clear the Foreign Medical Graduates Examination (FMGE), which is mandatory for all foreign-educated medical graduates. Once they pass this exam, they can register with the National Medical Commission (NMC) and start practicing.</p>',
  },
  {
    questions: 'Are there any scholarships available for Indian students pursuing MBBS abroad?',
    answers:
      '<p>Yes, there are various scholarships available for Indian students who wish to study MBBS abroad. These scholarships can be provided by the respective universities, the governments of the host countries, or international organizations.</p>',
  },
  {
    questions: 'What are the career prospects after completing an MBBS abroad?',
    answers:
      '<p>After completing an MBBS abroad, students can pursue various career paths, such as practicing medicine in India (after clearing FMGE), continuing their education with postgraduate studies, or working in the host country if they meet the local licensing requirements. Many countries offer opportunities for further specialization and research in the medical field.</p>',
  },
  {
    questions: 'What are the language requirements for studying MBBS abroad?',
    answers:
      '<p>The language of instruction for MBBS in most countries like Russia, Ukraine, and the Philippines is English. However, some countries may require students to learn the local language, especially if they will be interacting with patients during clinical training. Universities often provide language courses to help international students.</p>',
  },
  {
    questions: 'How does the quality of education in foreign medical colleges compare to Indian colleges?',
    answers:
      '<p>The quality of education in foreign medical colleges can be on par with, or even exceed, that of Indian colleges, especially in countries like Russia, Ukraine, and the Philippines, which have well-established medical programs recognized by international bodies. The curriculum is often updated with the latest medical practices, and students gain exposure to diverse medical cases, enhancing their learning experience.</p>',
  },
]

export default async function Page() {
  const [pagedata, tags] = await Promise.all([
    getPageData('mbbs-abroad'),
    getAbroadPages(),
  ])

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_DATA.map((item) => ({
      '@type': 'Question',
      name: item.questions,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answers,
      },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org/',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${BASE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'MBBS Abroad',
        item: `${BASE_URL}${PAGE_PATH}`,
      },
    ],
  }

  return (
    <>
      <JsonLd id="mbbs-abroad-faq-schema" schema={faqSchema} />
      <JsonLd id="mbbs-abroad-breadcrumb-schema" schema={breadcrumbSchema} />
      <MbbsAbroadPage pagedata={pagedata} tags={tags} faqData={FAQ_DATA} />
    </>
  )
}

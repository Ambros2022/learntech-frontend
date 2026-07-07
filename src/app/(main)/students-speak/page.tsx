import { getPageData, getVideoTestimonials } from 'src/lib/api/common'
import JsonLd from 'src/app/components/JsonLd'
import StudentsSpeakPage from 'src/views/StudentsSpeakPage'

const BASE_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://learntechww.com'
const PAGE_PATH = '/students-speak'
const DEFAULT_TITLE = "Study in India | Study Abroad | Learntech Edu Solutions"
const DEFAULT_DESCRIPTION = "Are you looking for Admission at Top College? Learntech Edu Solutions provides admission guidance to the students who look admission in India & Abroad."

export async function generateMetadata() {
  const data = await getPageData('students-speak')
  const title = data?.meta_title || DEFAULT_TITLE
  const description = data?.meta_description || DEFAULT_DESCRIPTION
  const canonicalUrl = `${BASE_URL}${PAGE_PATH}`

  return {
    title,
    description,
    keywords: data?.meta_keyword || 'Learntechweb',
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

export default async function Page() {
  const [pagedata, testimonials] = await Promise.all([
    getPageData('students-speak'),
    getVideoTestimonials({ page: 1, size: 6, searchfrom: 'name', searchtext: '' }),
  ])

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
        name: "Students' Speak",
        item: `${BASE_URL}${PAGE_PATH}`,
      },
    ],
  }

  return (
    <>
      <JsonLd id="students-speak-breadcrumb-schema" schema={breadcrumbSchema} />
      <StudentsSpeakPage 
        pagedata={pagedata} 
        initialCards={testimonials?.data || []} 
        initialTotalPages={testimonials?.totalPages || 1} 
      />
    </>
  )
}

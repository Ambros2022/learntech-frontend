import { getPageData, getCountries, getStreams, getNewsList, getUpcomingExams, type UpcomingExam } from 'src/lib/api/common'
import JsonLd from 'src/app/components/JsonLd'
import MainExamPage from 'src/views/MainExamPage'

const BASE_URL = (process.env.NEXT_PUBLIC_WEB_URL || 'https://learntechww.com').replace(/\/+$/, '')
const PAGE_PATH = '/exams'
const DEFAULT_TITLE = "Study in India | Study Abroad | Learntech Edu Solutions"
const DEFAULT_DESCRIPTION = "Are you looking for Admission at Top College? Learntech Edu Solutions provides admission guidance to the students who look admission in India & Abroad."

export async function generateMetadata() {
  const data = await getPageData('exams')
  const title = data?.meta_title || DEFAULT_TITLE
  const description = data?.meta_description || DEFAULT_DESCRIPTION
  const canonicalUrl = `${BASE_URL}${PAGE_PATH}`

  return {
    title,
    description,
    keywords: data?.meta_keyword || 'Learntechweb',
    robots: { index: true, follow: true },
    alternates: { canonical: canonicalUrl },
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
  }
}

// Suffix helper for date formatting
function getDaySuffix(day: number): string {
  if (day >= 11 && day <= 13) return 'th'
  switch (day % 10) {
    case 1: return 'st'
    case 2: return 'nd'
    case 3: return 'rd'
    default: return 'th'
  }
}

// Formatting helper for date
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return dateString

  const day = date.getDate()
  const suffix = getDaySuffix(day)
  const options: Intl.DateTimeFormatOptions = { month: 'short', year: 'numeric' }
  const parts = date.toLocaleDateString('en-US', options).split(' ')
  const month = parts[0] || ''
  const year = parts[1] || ''

  return `${day}${suffix} ${month} ${year}`
}

// Full response fetch helper to get pagination metadata
async function fetchExamsWithPagination(params: Record<string, string | number>) {
  const API_URL = (process.env.NEXT_PUBLIC_API_URI || '').replace(/\/+$/, '')
  const sp = new URLSearchParams({
    page: '1', size: '9',
    ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])),
  })
  try {
    const response = await fetch(`${API_URL}/api/website/exams/get?${sp}`)
    if (!response.ok) return { data: [], totalPages: 1, totalItems: 0 }
    const json = await response.json()
    return {
      data: json?.data ?? [],
      totalPages: json?.totalPages ?? 1,
      totalItems: json?.totalItems ?? 0
    }
  } catch (error) {
    console.error('Failed to fetch exams pagination:', error)
    return { data: [], totalPages: 1, totalItems: 0 }
  }
}

export default async function Page() {
  const [
    pagedata,
    countryData,
    streams,
    newsData,
    newsDataAbroad,
    examsRes,
    abroadExamsRes,
    upcomingExams,
  ] = await Promise.all([
    getPageData('exams'),
    getCountries({ india: 'false' }),
    getStreams({ size: 100 }),
    getNewsList({ page: 1, size: 15, orderby: 'desc', columnname: 'created_at', country_id: 204, includeIndia: 'true' }),
    getNewsList({ page: 1, size: 15, orderby: 'desc', columnname: 'created_at', includeIndia: 'false' }),
    fetchExamsWithPagination({ page: 1, size: 9, isIndia: 'true' }),
    fetchExamsWithPagination({ page: 1, size: 9, isIndia: 'false' }),
    getUpcomingExams(),
  ])

  const breadcrumbSchema = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${BASE_URL}/`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Exams",
        "item": `${BASE_URL}${PAGE_PATH}`
      }
    ]
  }

  return (
    <>
      <JsonLd id="exams-breadcrumb-schema" schema={breadcrumbSchema} />
      <MainExamPage
        pagedata={pagedata}
        countryData={countryData}
        streams={streams}
        newsData={newsData}
        newsDataAbroad={newsDataAbroad}
        initialExams={examsRes?.data ?? []}
        initialExamsTotalPages={examsRes?.totalPages ?? 1}
        initialAbroadExams={abroadExamsRes?.data ?? []}
        initialAbroadExamsTotalPages={abroadExamsRes?.totalPages ?? 1}
        initialAbroadExamsTotalItems={abroadExamsRes?.totalItems ?? 0}
        upcomingExams={upcomingExams ?? []}
      />
    </>
  )
}

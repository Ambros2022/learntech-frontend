import {
  getPageData,
  getAbroadPages,
  getScholarshipLevels,
  getScholarshipTypes,
  getCountries,
  getScholarshipBanners,
  getScholarshipsList,
} from 'src/lib/api/common'
import JsonLd from 'src/app/components/JsonLd'
import ScholarshipPage from 'src/views/ScholarshipPage'

const BASE_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://learntechww.com'
const PAGE_PATH = '/scholarships'
const DEFAULT_TITLE = 'Study in India | Study Abroad | Learntech Edu Solutions'
const DEFAULT_DESCRIPTION =
  'Are you looking for Admission at Top College? Learntech Edu Solutions provides admission guidance to the students who look admission in India & Abroad.'

export async function generateMetadata() {
  const data = await getPageData('scholarships')
  const title = data?.meta_title || DEFAULT_TITLE
  const description = data?.meta_description || DEFAULT_DESCRIPTION

  return {
    title,
    description,
    keywords: data?.meta_keyword || 'Learntechweb',
    alternates: {
      canonical: `${BASE_URL}${PAGE_PATH}`,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}${PAGE_PATH}`,
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
  const [
    pagedata,
    abroadData,
    levelOptions,
    typeOptions,
    countryData,
    tabCountries,
    banners,
    initialScholarshipsData,
  ] = await Promise.all([
    getPageData('scholarships'),
    getAbroadPages(),
    getScholarshipLevels(),
    getScholarshipTypes(),
    getCountries({ page: 1, size: 50 }), // for Nationality dropdown
    getCountries({ page: 1, size: 50 }),  // for selective Country Tabs
    getScholarshipBanners(),
    getScholarshipsList({ page: 1, size: 9 }),
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
        name: 'Scholarships',
        item: `${BASE_URL}${PAGE_PATH}`,
      },
    ],
  }

  return (
    <>
      <JsonLd id="scholarships-breadcrumb-schema" schema={breadcrumbSchema} />
      <ScholarshipPage
        pagedata={pagedata}
        abroadData={abroadData}
        levelOptions={levelOptions}
        typeOptions={typeOptions}
        countryData={countryData}
        tabCountries={tabCountries}
        banners={banners}
        initialScholarships={initialScholarshipsData.data}
        initialTotalItems={initialScholarshipsData.totalItems}
      />
    </>
  )
}

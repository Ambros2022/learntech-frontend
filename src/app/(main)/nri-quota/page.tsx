import { getPageData, getNriPageBanners, getStreams, getColleges } from 'src/lib/api/common'
import JsonLd from 'src/app/components/JsonLd'
import NriQuotaPage from 'src/views/NriQuotaPage'

const BASE_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://learntechww.com'
const PAGE_PATH = '/nri-quota'
const DEFAULT_TITLE = 'Study in India | Study Abroad | Learntech Edu Solutions'
const DEFAULT_DESCRIPTION =
  'Are you looking for Admission at Top College? Learntech Edu Solutions provides admission guidance to the students who look admission in India & Abroad.'

export async function generateMetadata() {
  const data = await getPageData('nri-quota')
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
  const [pagedata, banners, courses, collegeRes] = await Promise.all([
    getPageData('nri-quota'),
    getNriPageBanners(),
    getStreams({ orderBy: 'asc', columnname: 'listing_order', size: 100 }),
    getColleges({ page: 1, size: 10, type: 'college' }),
  ])

  const colleges = collegeRes?.data ?? []

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
        name: 'NRI Quota',
        item: `${BASE_URL}${PAGE_PATH}`,
      },
    ],
  }

  return (
    <>
      <JsonLd id="nri-quota-breadcrumb-schema" schema={breadcrumbSchema} />
      <NriQuotaPage pagedata={pagedata} banners={banners} courses={courses} colleges={colleges} />
    </>
  )
}

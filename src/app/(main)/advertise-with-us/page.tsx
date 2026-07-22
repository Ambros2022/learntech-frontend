import { getAdvertisePageBanners, getAssociatedColleges, getPageData } from 'src/lib/api/common'
import JsonLd from 'src/app/components/JsonLd'
import AdvertisePage from 'src/views/AdvertisePage'

const BASE_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://learntechww.com'
const PAGE_PATH = '/advertise-with-us'
const DEFAULT_TITLE = 'Advertise With Us | Learntech Edu Solutions'
const DEFAULT_DESCRIPTION =
  'Advertise your institute with Learntech Edu Solutions. We elevate education brands through digital marketing and on-field marketing strategies for global reach.'

export async function generateMetadata() {
  const data = await getPageData('advertise-with-us')
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

export default async function Page() {
  const [banners, colleges] = await Promise.all([
    getAdvertisePageBanners(),
    getAssociatedColleges(),
  ])

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
        name: 'Advertise With Us',
        item: `${BASE_URL}${PAGE_PATH}`,
      },
    ],
  }

  return (
    <>
      <JsonLd id="advertise-breadcrumb-schema" schema={breadcrumbSchema} />
      <AdvertisePage banners={banners} colleges={colleges} />
    </>
  )
}

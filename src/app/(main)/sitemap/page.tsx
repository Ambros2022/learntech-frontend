import { getPageData, getSitemapData } from 'src/lib/api/common'
import JsonLd from 'src/app/components/JsonLd'
import SiteMapPage from 'src/views/SiteMapPage'

const BASE_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://learntechww.com'
const PAGE_PATH = '/sitemap'
const DEFAULT_TITLE = 'Sitemap | Learntech Edu Solutions'
const DEFAULT_DESCRIPTION =
  'Browse the complete sitemap of Learntech Edu Solutions — find colleges, universities, schools, exams, blogs, news, and more.'

export async function generateMetadata() {
  const page = await getPageData('sitemap')
  const title = page?.meta_title || DEFAULT_TITLE
  const description = page?.meta_description || DEFAULT_DESCRIPTION
  const canonicalUrl = `${BASE_URL}${PAGE_PATH}`

  return {
    title,
    description,
    keywords: page?.meta_keyword || 'Learntechweb',
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

export default async function Page() {
  const [data] = await Promise.all([getSitemapData()])

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
        name: 'Sitemap',
        item: `${BASE_URL}${PAGE_PATH}`,
      },
    ],
  }

  return (
    <>
      <JsonLd id='sitemap-breadcrumb-schema' schema={breadcrumbSchema} />
      <SiteMapPage data={data} />
    </>
  )
}

import { getPageData } from 'src/lib/api/common'
import WriteReviewPage from 'src/views/WriteReviewPage'
import JsonLd from 'src/app/components/JsonLd'

const BASE_URL = (process.env.NEXT_PUBLIC_WEB_URL || 'https://learntechww.com').replace(/\/+$/, '')
const PAGE_PATH = '/write-review'
const DEFAULT_TITLE = 'Write a Review | Learntech Edu Solutions'
const DEFAULT_DESCRIPTION =
  'Share your college or school experience and help future students make informed decisions. Write a genuine review on Learntech Edu Solutions.'

export async function generateMetadata() {
  const data = await getPageData('write-review')
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
  const pagedata = await getPageData('write-review')
  const canonicalUrl = `${BASE_URL}${PAGE_PATH}`

  // BreadcrumbList — tells Google the navigation path to this page
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Write a Review', item: canonicalUrl },
    ],
  }

  // WebPage with ReviewAction — signals to Google this is a review submission form.
  // Google doesn't have a standalone Form schema; potentialAction: ReviewAction is
  // the correct semantic pattern for "write a review" pages.
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: canonicalUrl,
    publisher: {
      '@type': 'Organization',
      name: 'Learntech Edu Solutions',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/icons/learntech-logo.png`,
      },
    },
    potentialAction: {
      '@type': 'ReviewAction',
      name: 'Write a Review',
      target: canonicalUrl,
    },
  }

  return (
    <>
      <JsonLd id="write-review-breadcrumb" schema={breadcrumbSchema} />
      <JsonLd id="write-review-webpage" schema={webPageSchema} />
      <WriteReviewPage pagedata={pagedata} />
    </>
  )
}

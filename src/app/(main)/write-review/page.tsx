import { getPageData } from 'src/lib/api/common'
import WriteReviewPage from 'src/views/WriteReviewPage'

const BASE_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://learntechww.com'
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

  return (
    <>
      <WriteReviewPage pagedata={pagedata} />
    </>
  )
}

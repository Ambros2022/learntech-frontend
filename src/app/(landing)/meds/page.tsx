import { getPageData } from 'src/lib/api/common'
import MedicalEduStudioPage from 'src/views/MeidcalEduStudioPage'

const BASE_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://learntechww.com'
const PAGE_PATH = '/meds'
const DEFAULT_TITLE = 'Medical Edu Studio | Learntech Edu Solutions'
const DEFAULT_DESCRIPTION =
  'Medical Edu Studio is an aid provided by Learntech Group that was commenced to help medical students in India, UAE, Bahrain and plenty more countries.'

export async function generateMetadata() {
  const data = await getPageData('meds')
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
  const pagedata = await getPageData('meds')



  return (
    <>

      <MedicalEduStudioPage pagedata={pagedata} />
    </>
  )
}

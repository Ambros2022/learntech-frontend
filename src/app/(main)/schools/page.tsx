import { getPageData } from 'src/lib/api/common'
import MainSchoolPage from 'src/views/MainSchoolPage'
import JsonLd from 'src/app/components/JsonLd'

const BASE_URL = (process.env.NEXT_PUBLIC_WEB_URL || '').replace(/\/+$/, '')
const DEFAULT_TITLE = 'Best Schools in India | Learntech Edu Solutions'
const DEFAULT_DESCRIPTION = 'Find the best schools in India with expert guidance from Learntech Edu Solutions.'

export async function generateMetadata() {
  const pagedata = await getPageData('schools')
  const title = pagedata?.meta_title || DEFAULT_TITLE
  const description = pagedata?.meta_description || DEFAULT_DESCRIPTION
  const url = `${BASE_URL}/schools`
  return {
    title,
    description,
    keywords: pagedata?.meta_keyword,
    robots: { index: true, follow: true },
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Learntech Edu Solutions',
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@learntechww',
    },
  }
}

export default async function Page() {
  const pagedata = await getPageData('schools')

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Learntech Edu Solutions – Schools',
    url: `${BASE_URL}/schools`,
    description: DEFAULT_DESCRIPTION,
    sameAs: ['https://learntechww.com/schools'],
  }

  return (
    <>
      <JsonLd id="schools-org-schema" schema={orgSchema} />
      <MainSchoolPage pagedata={pagedata} />
    </>
  )
}
